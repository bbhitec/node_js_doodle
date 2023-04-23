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



console.log("[mst] Hello Worldy!")

console.log(zipIndex([1,2,3]))
