// Tower of Hanoi simulator
// solve algorithm based on https://www.youtube.com/watch?v=rf6uf3jNjbo

const arg = +process.argv[2]
const SIZE = isNaN(arg) || arg < 1 ? 3 : arg;

class Board {
  constructor(size) {
    this.rods = [Array.from({length: size}, (_,i) => size-i),[],[]];
    console.log("Created with board size " + size + "\n");
  }

  validate() {
    if (
      !this.rods.every(
        rod => rod.every((n,i,s) => i < 1 || n < s[i-1])
      )
    ) {
      throw new Error("Board state invalid");
    }
    return true;
  }

  print() {
    const rows = Math.max.apply(null, this.rods.map(rod => rod.length));
    for (let i = rows - 1; i >= 0; i--) {
      const [a,b,c] = this.rods.map(rod => rod[i]);
      console.log(
        (isNaN(a) ? "   " : `[${a}]`) +
        (isNaN(b) ? "   " : `[${b}]`) +
        (isNaN(c) ? "   " : `[${c}]`)
      );
    }
    console.log("---------");
  }

  solve(n, start, end, r = 0) {
    console.log(`${"=".repeat(r)}> Moving ${n} piece${n > 1 ? "s" : ""} from ${start} to ${end}`);
    if (n == 1) {
      this.move(start, end);
      return true;
    }

    const other = 6 - (start + end);
    this.solve(n - 1, start, other, r + 1);
    this.move(start, end);
    this.solve(n - 1, other, end, r + 1);
    return this.validate();
  }

  move(start, end) {
    const piece = this.rods[start - 1].pop();
    if (!piece) throw new Error("tried to move from empty rod");
    this.rods[end - 1].push(piece);
    this.print();
  }
}

const board = new Board(SIZE);
board.validate();
board.print();
board.solve(SIZE, 1, 3);
