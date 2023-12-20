# Minecraft Craft Helper

Recursively resolves provided crafting recipes to totals of components

## Installation

Simply download the [script](./craft-helper.py) via the download button in the top right of the code view or download this repository as a zip file and unzip the `python/minecraft-craft-helper` directory.

Minecraft Craft Helper uses the following packages which you may need to install:

```shell
pip install schema argparse pyyaml queue
```

The LibYaml integration of PyYaml is supported and will be used if available

## Usage

```
$ python craft-helper.py [-h] --recipes <file> items [items ...]
```

## Recipes File

Place all recipes that should be resolved to their components into a yaml file. An [example file](./recipes-example.yml) and [schema](./recipes-schema.json) have been provided with the script. The file should contain a list of item objects containing a name and a list of ingredients, where each ingredient must also have a name and may optionally have an amount (the default amount is 1, see *Redstone Torch* in the example file).

## Example

```
$ python craft-helper.py -r recipes-example.yml "Redstone Torch,3" "Redstone Block"
```

**Output:**

```
Crafting List:
  - Redstone Torch: 3
  - Redstone Block: 1

Total Ingredients:
  - Stick: 3
  - Redstone: 12
```

## License

This script is published under the WTFPL license (see http://www.wtfpl.net/)
