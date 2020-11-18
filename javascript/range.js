/*
 * range
 *
 * generates an array with all integers between and including two integers (or one integer and 0)
 * (see below for minimized version!)
 *
 * int min - minimum. If no maximum is giving this argument will be used as maximum instead and minimum will be assumed to be 0
 * int max (optional, see above) - maximum.
 *
 * returns Array
 */
function range(min, max) {
    if (isNaN(max)) {
        max = min;
        min = 0;
    }
    if (min > max) {
        let temp = min;
        min = max;
        max = temp;
    }
    let n = max - min + 1;
    return Array(n).fill(0).map((_,index)=>(index+min));
}

/*
 * range (minimized)
 */
function range(a,b){if(isNaN(b)&&(b=a,a=0),a>b){[a,b]=[b,a]}let n=b-a+1;return Array(n).fill(0).map((_,i)=>i+a)}
