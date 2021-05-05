/** NOTES:
  LICENSE: WTFPL
  AUTHOR: Mitsunee
  
  Note that due to the recusive nature of this reducer
  you have to change the function name inside the
  function body, if you wish to rename the function
**/


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
