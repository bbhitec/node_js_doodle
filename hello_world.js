/**
@author [mst]
basic js doodle

gains:
-basic syntax
-map

@since 2023.04
*/

////////////////// DECL_IMPL


// [demo] basic function call
function titleCall(title) {
    console.log(`\n---------- ${title} ----------`) // [demo] composition string with ``
}

function zipIndex(array) {
    const newArray = array.map(
        (item, i) => [i, item]    // [demo] i is an implicit index in the mapping function
    )
    return newArray
}


// checking sht variables scope
function scopeTest() {
    const x = 0;
    var y = 1;
    let z = 2;

    // manual scope
    {
        const a = 3;    // const and let see in the brackets only
        var b = 4;  // var see up to the parent function
        let c = 5;
    }

    console.log(x);
    console.log(y);
    console.log(z);
    //console.log(a); // ReferenceError
    console.log(b);
    //console.log(c); // ReferenceError
}


// some wrapped functions
function split(arg) {
    return arg.split('')
}
function reverse(arg) {
    return arg.reverse()
}
function join(arg) {
    return arg.join(',')    // [wip] how to pass the argument here to the composed functions
}

// compose a list of functions one after another
// based on tutorial: https://youtu.be/7-FUiAFwEVA
const compose =
    (...funcs) =>   // [demo] a rest operator makes this a variadric (indefinite arguments) function
    (str) => {
        // [wip,bp?] should the compose parameters are coming in right-to-left
        //console.log(funcs)  // we can print the function pointers to test

        // [bp] 'map' would return the functions result. forEach doesn't return anything
        funcs.forEach((func) => {
            str = func(str)
        })
        return str
    }

// [bp] same as above but with a reduce function
const composeReduce =
    (...funcs) =>
    (str) => {
        // [demo] 'reduce' will accumulate all function-applied values into one. 'map' will operate on every member
        return funcs.reduce((acc, currFunc) => currFunc(acc), str)
    }




function funcComposition() {
    const str = "String to reverse"
    // const revStr = str.split('').reverse().join('')    // [demo] a basic way to reverse a string
    // console.log(revStr)

    const composedReverse = composeReduce(split, reverse, join)
    console.log(composedReverse(str))
}



////////////////// DRIVER
console.log(`[mst] JavaScript doodle`)

////////// BASICS
titleCall("function calls")
console.log(zipIndex([1, 2, 3]))

var foo = 10 + '20';	// string will take over
console.log(foo)

////////// SPECIFICS
titleCall("scope tests")
scopeTest();

// titleCall("decorators")

titleCall("func composition")
funcComposition()

// titleCall("spread operator")
