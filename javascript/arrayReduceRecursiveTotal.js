// source
const totalRecursive = (acc, value) => {
  if (typeof value === "number") {
    acc += value;
    return acc;
  }
  acc = value.reduce(totalRecursive, acc);
  return acc;
};

// minimized
const totalRcrs=(a,v)=>a+(typeof v==="number"?v:v.reduce(totalRcrs,0))
