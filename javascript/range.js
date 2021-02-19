/*
 * range
 *
 * Generates an Array with all Numbers in a specified range
 * (see below for minimized version!)
 *
 * Number start - Start value. If this is the only argument this is length instead and the start value will be 0.
 * Number stop (optional, see above) - stop value
 * Number step (optional, default: 1) - steps between values
 * Number maxLength (optional) - maximum number of items in the resulting Array
 *
 * to skip optional arguments please put undefined as the argument.
 *
 * returns Array (or false if no valid values given)
 */
function range(start, stop, step, maxLength) {
    // validate input
    if (isNaN(start)) return false;
    if (isNaN(stop)) {
        stop = start;
        start = 0;
    }
    if (stop < start) [stop, start] = [start, stop];
    if (isNaN(step)) step = 1;
    
    // calculate length
    let length = (stop - start) / step;
    // DEBUG: console.log(`Calculated length: ${length}`);
    if (!isNaN(maxLength)) length = Math.min(length, maxLength);
    
    // DEBUG: console.log({start, stop, step, maxLength, length});
    
    // return array
    return Array(0|length).fill(0).map((_, index) => index * step + start);
}

/*
 * range (minimized)
 
function range(a,b,c,d){if(isNaN(a))return!1;isNaN(b)&&(b=a,a=0),b<a&&([b,a]=[a,b]),isNaN(c)&&(c=1);let e=(b-a)/c;return isNaN(d)||(e=Math.min(e,d)),Array(0|e).fill(0).map((b,d)=>d*c+a)}

 */
