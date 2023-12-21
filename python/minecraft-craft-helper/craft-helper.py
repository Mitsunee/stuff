"""
Minecraft Crafting Helper

Recursively resolves provided crafting recipes to totals of components and provides detailed crafting instructions

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
import math

class ItemWithAmount:
  """Class that accepts an item name and an amount"""
  def __init__(self, name, amount):
    self.name = name
    self.amount = amount

# compat function for argparse to use ItemWithAmount
def item_argument(input_str):
  p = re.compile('([a-zA-Z ]+)( *(,|;|\*) *(\\d+))?')
  res = p.match(input_str)
  name = res.group(1)
  amount = 1
  try:
    amount = int(res.group(4))
  except:
    pass
  return ItemWithAmount(name=name, amount=amount)

# input validation for recipes file
def validate_recipes(recipes):
  recipes_dict = {}
  schema = Schema({
    'name': Use(str, error='Item name must be string'),
    Optional('outputs', default=1): int,
    Optional('disabled', default=False): bool,
    'ingredients': And(
      [{
        'name': Use(str, error='Ingredient name must be string'),
        Optional('amount', default=1): int
      }],
      lambda l: len(l) >= 1
    )
  })

  if not isinstance(recipes, list):
    print('Top-level of recipes file should be a list')
    exit(1)

  for item in recipes:
    try:
      validated_item = schema.validate(item)
      if validated_item['disabled']:
        continue
      recipes_dict[validated_item['name']] = validated_item
    except Exception as e:
      print(f"Error: Could not parse item no. {len(recipes_dict)+1} in recipes file")
      print(e)
      exit(1)

  return recipes_dict

# Program config and argument parsing
parser = argparse.ArgumentParser(
  prog='craft-helper',
  description="""Recursively resolves provided crafting recipes to totals of
  components and provides detailed crafting instructions""",
  epilog="""This script is licensed under the WTFPL license(see
  http://www.wtfpl.net/)"""
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
args = parser.parse_args()

# Load recipes
try:
  recipes_stream = open(args.recipes, mode='r')
  recipes = validate_recipes(yaml.safe_load(recipes_stream))
except Exception as e:
  print(f"Could not read recipes file {args.recipes}")
  print(e)
  exit(1)

# create vars needed below :)
ingredients = {} # maps item name to amount needed for raw materials (no recipe)
inventory = {} # temporary inventory to handle recipes that output more than single item
crafted = {} # maps item name to amount crafted
crafted_done = set() # set of items that have been crafted
queue = Queue() # queue of items that need to be processed

# Add items from arguments to queue
print('Crafting List:')
for arg in args.items:
  queue.put(arg)
  print(f"  - {arg.name}: {arg.amount}")

# work through queue
while not queue.empty():
  item = queue.get()

  # found an item that's a raw material
  if not item.name in recipes:
    if not item.name in ingredients:
      ingredients[item.name] = 0
    ingredients[item.name] += item.amount
    continue

  # item has a recipe, process each ingredient
  # create crafted dict key if not existing
  if not item.name in crafted:
    crafted[item.name] = 0
  crafted[item.name] += item.amount

  # queue ingredients
  recipe = recipes[item.name]
  for ingredient in recipe['ingredients']:
    total_amount = ingredient['amount'] * item.amount

    # recipe outputs single item, simply queue for total_amount
    if recipe['outputs'] < 2:
      temp = ItemWithAmount(name=ingredient['name'], amount=total_amount)
      queue.put(temp)
      continue

    # create inventory key if not existing
    if not ingredient['name'] in inventory:
      inventory[ingredient['name']] = 0

    # if we already have enough of the item in inventory simply take them
    if inventory[ingredient['name']] >= total_amount:
      inventory[ingredient['name']] -= total_amount
      continue

    # remove from total_amount what we already had from before
    total_amount -= inventory[ingredient['name']] # should still leave > 0 items
    inventory[ingredient['name']] = 0

    # craft more
    crafting_ops = math.ceil(total_amount / recipe['outputs'])
    crafted_amount = crafting_ops * recipe['outputs']
    inventory[ingredient['name']] = crafted_amount - total_amount

    # queue for crafted amount
    temp = ItemWithAmount(name=ingredient['name'], amount=crafting_ops)
    queue.put(temp)

# output result
print('\nTotal Ingredients:')
for item in ingredients.keys():
  print(f"  - {item}: {ingredients[item]}")

# print crafting instructions
print('\nSteps:')
while len(crafted_done) < len(crafted):
  # for every item that has not been crafted yet
  for item in crafted_done.symmetric_difference(crafted):
    ready=True
    recipe = recipes[item]

    # check that all ingredients are raw material or have been crafted already
    for ingredient in recipe['ingredients']:
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
    crafted_amount = crafted[item]

    # round up for recipes that output more than single item
    if recipe['outputs'] > 1:
      crafting_ops = math.ceil(crafted[item] / recipe['outputs'])
      crafted_amount = crafting_ops * recipe['outputs']

    print(f"  - Craft {crafted_amount} of {item}")
    crafted_done.add(item)

