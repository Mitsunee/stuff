from tabulate import tabulate
import argparse

# some random docs c:
"""
Coordinate system:
       z--
        ↑
  x-- ←   → x++
        ↓
       z++

The script uses a concept of steps, which when multiplied with the step size
argument gives a distance for the current step. Each step then generates a
square around the 0,0 island based on that distance

Generated coordinates are in the following order for each step:

top middle -> top right -> bottom right
-> bottom left -> top left -> top middle (obviously excl. the first printed one)

x: 0, z: 0 is skipped as that's the vanilla ender dragon island
"""

class Coords:
  """
  Class to create enumerated coordinate objects
  """
  n = 0

  def __init__(self, x, z, step):
    Coords.n += 1
    self.n = Coords.n
    self.x = x
    self.z = z
    self.step = step

# Program config and argument parsing
parser = argparse.ArgumentParser(
  prog='coords-helper',
  description='Coordinate grid generator for Chaos Guardians in Draconic Evolution',
  epilog='This script is licensed under the WTFPL license (see http://www.wtfpl.net)'
)
parser.add_argument(
  '-s', '--step',
  type=int,
  metavar='<n>',
  help='Distance between Chaos Islands in your instance\'s config',
  default=10000
)
parser.add_argument(
  '-m', '--min-distance',
  type=int,
  metavar='<n>',
  help='Minimum distance for coordinates to print (default: 0)',
  default=0
)
parser.add_argument(
  'distance',
  type=int,
  help='Maximum Distance to generate coordinates for'
)

args = parser.parse_args()

# calculate max amount of steps based on args
max_steps = int(abs(args.distance) / args.step)
if max_steps <= 0:
  print("There are no dragons here.")
  exit(0)

# calculate min steps as well
min_step = int(abs(args.min_distance) / args.step) if args.min_distance else 1
if min_step < 1:
  min_step = 1

# generate grid
dragons = []
for step in range(1, max_steps + 1):
  distance = step * args.step
  distance_neg = -1 * distance
  # top middle -> top right
  for x in range(0, distance, args.step):
    dragons.append(Coords(x=x, z=distance_neg, step=step))
  # top right -> bottom right
  for z in range(distance_neg, distance, args.step):
    dragons.append(Coords(x=distance, z=z, step=step))
  # bottom right -> bottom left
  for x in range(distance, distance_neg, -1 * args.step):
    dragons.append(Coords(x=x, z=distance, step=step))
  # bottom left -> top left
  for z in range(distance, distance_neg, -1* args.step):
    dragons.append(Coords(x=distance_neg, z=z, step=step))
  # top left -> top middle -1
  for x in range(distance_neg, 0, args.step):
    dragons.append(Coords(x=x, z=distance_neg, step=step))
  
# generate table
table = [[coords.n, coords.x, coords.z] for coords in dragons if coords.step >= min_step]
if len(table) < 1:
  print('There are no dragons here.')
  exit(0)

first_shown = table[0][0]
if (first_shown > 1):
  print(f"Found {Coords.n} dragons ({first_shown - 1} hidden)")
else:
  print(f"Found {Coords.n} dragons")
print(tabulate(table, headers=["Dragon", "x", "z"]))
