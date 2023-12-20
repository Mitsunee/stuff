"""
Minecraft Crafting Helper

Recursively resolves provided crafting recipes to totals of components

usage: craft-helper.py [-h] -r <file> items [items ...]

positional arguments:
  items List of items you want to craft. Use "double quotes" for names with
        spaces. To craft multiple add the amount after the name inside the
        double quotes, separating the two values with either comma (,),
        semicolon (;), or asterisk (*). You may put spaces before or after the
        separator as you wish

options:
  -h, --help            show this help message and exit
  -r <file>, --recipes <file>
                        Path to your recipes.yml file

Example:

$ python w.py -r recipes.yml "Redstone Torch,3" "Redstone Block"
Crafting List:
  - Redstone Torch: 3
  - Redstone Block: 1

Total Ingredients:
  - Stick: 3
  - Redstone: 12

License: This script is published under the WTFPL license (see http://www.wtfpl.net/)
"""
from schema import Schema, And, Optional, Use
import argparse
import re
import yaml
from queue import Queue
try:
  from yaml import CLoader as Loader
except ImportError:
  from yaml import Loader

class ItemWithAmount:
  """Class that accepts single input of name followed by an optional amount"""
  def __init__(self, item, amount):
    self.item = item
    self.amount = amount

def item_argument(input_str):
  p = re.compile('([a-zA-Z ]+)( *(,|;|\*) *(\\d+))?')
  res = p.match(input_str)
  item = res.group(1)
  amount = 1
  try:
    amount = int(res.group(4))
  except:
    pass
  return ItemWithAmount(item=item, amount=amount)

def validate_recipes(recipes):
  recipes_dict = {}
  schema = Schema({
    'name': Use(str, error='Item name must be string'),
    'ingredients': And(
      [{'name': Use(str, error='Ingredient name must be string'), Optional('amount', default=1): int}],
      lambda l: len(l) >= 1
    )
  })

  if not isinstance(recipes, list):
    print('Top-level of recipes file should be a list')
    exit(1)

  for item in recipes:
    try:
      validated_item = schema.validate(item)
      recipes_dict[validated_item['name']] = validated_item
    except Exception as e:
      print(f"Error: Could not parse item no. {len(recipes_dict)+1} in recipes file")
      print(e)
      exit(1)

  return recipes_dict

# Program config
parser = argparse.ArgumentParser(
  prog='craft-helper',
  description='Recursively resolves provided crafting recipes to totals of components',
  epilog='This script is licensed under the WTFPL license (see http://www.wtfpl.net/)'
)
parser.add_argument(
  '-r', '--recipes',
  type=str,
  required=True,
  metavar='<file>',
  help='Path to your recipes.yml file'
)
parser.add_argument(
  'items',
  type=item_argument,
  nargs='+',
  help="""List of items you want to craft. Use "double quotes" for names with
  spaces. To craft multiple add the amount after the name inside the double
  quotes, separating the two values with either comma (,), semicolon (;), or
  asterisk (*). You may put spaces before or after the separator as you wish"""
)

# Parse args and create queue and dicts
args = parser.parse_args()
queue = Queue()
ingredients = {}
crafted = {}

# Load recipes
try:
  recipes_stream = open(args.recipes, mode='r')
  recipes = validate_recipes(yaml.load(recipes_stream, Loader=Loader))
except:
  print(f"Could not read recipes file {args.recipes}")
  exit(1)

# Add items from arguments to queue
print('Crafting List:')
for arg in args.items:
  queue.put(arg)
  print(f"  - {arg.item}: {arg.amount}")

# work through queue
while not queue.empty():
  item = queue.get()
  if item.item in recipes:
    # recipe exists for item, add to crafted dict
    if not item.item in crafted:
      crafted[item.item] = 0
    crafted[item.item] += item.amount
    # queue ingredients
    for ingredient in recipes[item.item]['ingredients']:
      total_amount = ingredient['amount'] * item.amount
      temp = ItemWithAmount(item=ingredient['name'],amount=total_amount)
      queue.put(temp)
  else:
    # raw material, add to ingredients dict
    if not item.item in ingredients:
      ingredients[item.item] = 0
    ingredients[item.item] += item.amount

# output result
print('\nTotal Ingredients:')
for item in ingredients.keys():
  print(f"  - {item}: {ingredients[item]}")

# instructions
crafted_done = set()
print('\nSteps:')
while len(crafted_done) < len(crafted):
  # for every item that has not been crafted yet
  for item in crafted_done.symmetric_difference(crafted):
    # check that all ingredients are raw material or have been crafted already
    ready=True
    for ingredient in recipes[item]['ingredients']:
      # skip if it's not a craftable item
      if not ingredient['name'] in recipes:
        continue
      # set ready to false if it's not crafted yet and break
      if not ingredient['name'] in crafted_done:
        ready=False
        break
    # skip if it's not ready to be crafted
    if not ready:
      continue
    # print crafting instruction and add item to set
    print(f"  - Craft {crafted[item]} of {item}")
    crafted_done.add(item)