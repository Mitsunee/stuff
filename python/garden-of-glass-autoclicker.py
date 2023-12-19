"""
This script is made to be used as an autoclicker for the
Minecraft mod Botania, specifically the Garden of Glass map
type, where players can rightclick Dirt or Grass to receive
one pebble, four of which can be crafted into Cobblestone.

There are two arguments available:
 -c, --clicks - The amount of clicks to perform (default: 1000)
 -w, --wait   - The amount of time (in seconds) to wait before
                the script starts clicking (default: 3)

The script uses three imports (see below) which may need to
be installed separately (via pip or system package)
"""

import argparse
import time
import pyautogui

parser = argparse.ArgumentParser()
parser.add_argument('-c', '--clicks', type=int, default=1000)
parser.add_argument('-w', '--wait', type=int, default=3)
args = parser.parse_args()
clicks =  args.clicks
wait = args.wait

print(f"Doing {clicks} clicks in...")

for x in range(wait):
  n = wait - x
  print(f"{n}...")
  time.sleep(1)

pyautogui.keyDown('shift')  # hold down the shift key
pyautogui.click(button='right', clicks=clicks)
pyautogui.keyUp('shift')    # release the shift key
pyautogui.press('esc')

print("Done")
