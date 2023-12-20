# Minecraft Craft Helper

Recursively resolves provided crafting recipes to totals of components and provides detailed crafting instructions

## Installation

Simply download the [script](./craft-helper.py) via the download button in the top right of the code view or download this repository as a zip file and unzip the `python/minecraft-craft-helper` directory.

Minecraft Craft Helper uses the following packages which you may need to install:

```shell
pip install schema argparse pyyaml queue
```

## Usage

```
$ python craft-helper.py [-h] --recipes <file> items [items ...]
```

## Recipes File

Place all recipes that should be resolved to their components into a yaml file. An [example file](./recipes-example.yml) and [schema](./recipes-schema.json) have been provided with the script. The file should contain a list of item objects containing a `name`, an optional amount of `outputs` (read: amount of the item created by the crafting recipe, default: 1) and a list of `ingredients`, where each ingredient must also have a `name` and may optionally have an `amount` (default: 1).

```yml
- name: Redstone Repeater
  # outputs is assumed to be 1
  ingredients:
    - name: Redstone Torch
      amount: 2
    - name: Redstone
      # amount is assumed to be 1
    - name: Stone
      amount: 3
- name: Wood Plank
  outputs: 4
  ingredients:
    - name: Wood Logs
```

## Example

```
$ python craft-helper.py -r recipes-example.yml "Redstone Repeater,2" "Redstone Block"
```

**Output:**

```
Crafting List:
  - Redstone Repeater: 2
  - Redstone Block: 1

Total Ingredients:
  - Redstone: 15
  - Cobblestone: 6
  - Wood Logs: 1

Steps:
  - Craft 4 of Wood Plank
  - Craft 1 of Redstone Block
  - Craft 6 of Stone
  - Craft 4 of Stick
  - Craft 4 of Redstone Torch
  - Craft 2 of Redstone Repeater
```

## License

This script is published under the WTFPL license (see http://www.wtfpl.net/)
