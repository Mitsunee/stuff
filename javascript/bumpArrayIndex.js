/**
This is probably mostly useful for carousel components
**/

//example array
const arr = Array(16).fill(0);
// let's just pretend that this is 16 images for our gallery?

// now here's some neat functions:
const bumpUp => (val, length) => (val + 1) % length;
const bumpDown => (val, length) => (val - 1 + length) % length;

/*
using these you can put onClick functions like:
<button onClick={() => setIndex(val => bumpUp(val, arr.length)}>Next Image</button>
<button onClick={() => setIndex(val => bumpDown(val, arr.length)}>Previous Image</button>
*/
