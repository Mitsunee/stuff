/**
 * Evaluates basic arithmatic (addition, subtraction, multiplication, divison) with simple support
 * for nested parenthesis
 * 
 * Example: `evalMathString("3 * (5 + 9 * 2) + 5")` (Result: 74)
 * 
 * @param str String containing the math query
 * @returns Number result
 */
function evalMathString(str) {
  let i;
  
  // Handle parens
  if ((i = str.indexOf("(")) >= 0) {
    let j = null; // matching ")"
    for (let skip = 0, k = i+1; k < str.length; k++) {
      // k = current index in linear search
      // skip = counter for ")" to skip since we found more "("
      
      if (str[k] == ")") {
        // we found a ")"
        if (!skip) {
          // this is the matching one, save position and break
          j = k;
          break;
        }

        skip--; // found end of a nested pair, decrease counter
      }

      if (str[k] == "(") skip++; // found start of new pair, bump counter
    }
    if (j == null) throw new Error("Invalid Syntax: No matching ) found");
    
    return evalMathString(
      str.slice(0,i) // string before parens start
      + evalMathString(str.slice(i + 1, j)) // eval content inside parens
      + str.slice(j + 1) // string past parens
    )
  }

  // handle operators
  // order is reversed since the deepest point of recursion is evaluated first
  if ((i = str.indexOf("+")) > 0) {
    return (
      evalMathString(str.slice(0,i)) // eval before operator
      + evalMathString(str.slice(i+1)) // eval after operator
    );
  }
  if ((i = str.indexOf("-")) > 0) {
    return (
      evalMathString(str.slice(0,i)) // eval before operator
      - evalMathString(str.slice(i+1)) // eval after operator
    );
  }
  if ((i = str.indexOf("*")) > 0) {
    return (
      evalMathString(str.slice(0,i)) // eval before operator
      * evalMathString(str.slice(i+1)) // eval after operator
    );
  }
  if ((i = str.indexOf("/")) > 0) {
    return (
      evalMathString(str.slice(0,i)) // eval before operator
      / evalMathString(str.slice(i+1)) // eval after operator
    );
  }

  // No more operators found, assume we're left with a number
  return Number(str.trim()); // trim just in case :)
}

/**
Demo test cases:

console.log({
  str: "3 * (5 + 9 * 2) + 5",
  res: evalMathString("3 * (5 + 9 * 2) + 5"),
  expected: 74
});

console.log({
  str: "100 / (5 + ((2+3)*4))",
  res: evalMathString("100 / (5 + ((2+3)*4))"),
  expected: 4
})

*/