/**
@author [mst]
basic js doodle

gains:
-

@since 2023.04
*/


function zipIndex(array) {
    const newArray = array.map(
        (item,i) => [i,item]    // [demo] i is an implicit index in the mapping function
    )
    return newArray
}


var name = "John"
console.log(`[mst] Hello ${name}!`) // [demo] composition string with ``

console.log(zipIndex([1,2,3]))

var foo = 10 + '20';	// string will take over
console.log(foo)
