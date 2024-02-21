# Minecraft Draconic Evolution Chaos Dragon Coords Helper

Coordinate grid generator for Chaos Guardians in Draconic Evolution

## Usage

```
usage: coords-helper [-h] [-s <n>] [-m <n>] distance

positional arguments:
  distance              Maximum Distance to generate coordinates for

options:
  -s <n>, --step <n>    Distance between Chaos Islands in your instance's config
  -m <n>, --min-distance <n>
                        Minimum distance for coordinates to print (default: 0)
```

The script generates a list of coordinates of Chaos Islands up to a given distance. Coordinates are generated in steps such as that each step creates a square around the middle. The first Chaos Island of each step is immediatly north of the Ender Dragon Island and the square is mapped from there in clockwise direction

Here is an example grid showing the order for the first 24 Chaos Islands (where 0 is the Ender Dragon Island):

```
23 24  9 10 11
22  8  1  2 12
21  7  0  3 13
20  6  5  4 14
19 18 17 16 15
```

<details>
<summary>Coordinates</summary>
<table><thead><tr>
<th>Dragon</th><th>x</th><th>z</th>
</thead>
<tbody>
<tr><td>1</td><td>0</td><td>-10000</td>
<tr><td>2</td><td>10000</td><td>-10000</td>
<tr><td>3</td><td>10000</td><td>0</td>
<tr><td>4</td><td>10000</td><td>10000</td>
<tr><td>5</td><td>0</td><td>10000</td>
<tr><td>6</td><td>-10000</td><td>10000</td>
<tr><td>7</td><td>-10000</td><td>0</td>
<tr><td>8</td><td>-10000</td><td>-10000</td>
<tr><td>9</td><td>0</td><td>-20000</td>
<tr><td>10</td><td>10000</td><td>-20000</td>
<tr><td>11</td><td>20000</td><td>-20000</td>
<tr><td>12</td><td>20000</td><td>-10000</td>
<tr><td>13</td><td>20000</td><td>0</td>
<tr><td>14</td><td>20000</td><td>10000</td>
<tr><td>15</td><td>20000</td><td>20000</td>
<tr><td>16</td><td>10000</td><td>20000</td>
<tr><td>17</td><td>0</td><td>20000</td>
<tr><td>18</td><td>-10000</td><td>20000</td>
<tr><td>19</td><td>-20000</td><td>20000</td>
<tr><td>20</td><td>-20000</td><td>10000</td>
<tr><td>21</td><td>-20000</td><td>0</td>
<tr><td>22</td><td>-20000</td><td>-10000</td>
<tr><td>23</td><td>-20000</td><td>-20000</td>
<tr><td>24</td><td>-10000</td><td>-20000</td>
</tbody>
</table>
</details>

### Options

- `-s, --step`: Changes the distance between islands. Use this if the settings is not the default of 10000 in the configuration file of Draconic Evolution (for example Project Ozone 2 sets this to 1000)
- `-m, --min-distance`: Minimum distance for step to be printed. Use this if you've already slain some Chaos Dragons before.

## Installation

Install tabulate via pip and download the script

```
pip install tabulate
```