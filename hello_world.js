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



// [demo] this will start a simple server at: http://localhost:8080/
function startServer() {
    var http = require('http');

    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    }).listen(8080);
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


function stringStuff() {
    var pos = "Big string".indexOf("str"); // substring search. returns -1 is not found
    console.log(pos);
    console.log("Hello".toLocaleLowerCase === "hello".toLocaleLowerCase); // case insensitive compare
}

function dateStuff() {
    var today = new Date();
    var date2 = new Date(2000, 0, 1);
    console.log(today);
    console.log(today.getDate());
    console.log(today.getFullYear());
    console.log(today.getTime() > date2.getTime()); // comparing dates as miliseconds

}

function classesStuff() {

    // sort of class method. this refers to the object calling the function
    function playerDets() {
        console.log(this.name + " has a rank of: " + this.rank)
    }

    // instantiating an object
    var player = new Object();
    player.name = "John";
    player.rank = 2;
    // can be shorthand:
    var player2 = { name: "Michael", rank: 1 };

    player.logDetails = playerDets; // function pointer
    player.logDetails();
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

titleCall("func composition")
funcComposition()

// titleCall("starting a server")
//startServer();

titleCall("strings stuff")
stringStuff();

titleCall("date stuff")
dateStuff();

titleCall("classes and oo")
classesStuff();


titleCall("longest...")

str4 = "ABCDDDEFGHIJ"
console.log(getLongestNonSimilar(str4))
console.log(getLongestNonRepeating("anviaj"))

// longest non-similar char substring (can have similar)
function getLongestNonSimilar(str) {
    if (str.length == 1) return 1;

    let longest = 0;
    let count = 1;
    let prev = str[0];

    // [demo] string to array and iteration in ES6
    [...str].forEach(c => {
        // console.log(c)
        if (c != prev) {
            count++;
            longest = Math.max(longest, count);
        } else {
            count = 1;
        }
        prev = c;
    });
    return longest;
}


// longest substring of different characters
// from: https://youtu.be/zue3lAZyAec
// also leetcode 3
//
// non-complete with: "anviaj", solved in leetcode solutions repo
function getLongestNonRepeating(str) {
    if (str.length == 1) return str;

    let longest = '';
    let validSubstr = '';
    let prev;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (validSubstr.includes(char)){
            // repeating char
            longest = (validSubstr.length > longest.length) ? validSubstr : longest;
            // consider step-back to previous char
            if (prev === char){
                validSubstr = char;
            }
            else {
                validSubstr = prev;
                i--;
            }
        }
        else {
            // legal char
            validSubstr += char;
            prev = char;
        }
    }
    // must have one last check!
    longest = (validSubstr.length > longest.length) ? validSubstr : longest;
    return longest;
}


