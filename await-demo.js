
const express = require('express');
const app = express();
const axios = require('axios')


//c1 =====>Promise
// function getJSON() {

//     // To make the function blocking we manually create a Promise.
//     return new Promise( function(resolve) {
//         axios.get('https://tutorialzine.com/misc/files/example.json')
//             .then( function(json) {

//                 // The data from the request is available in a .then block
//                 // We return the result using resolve.
//                 resolve(json);
//                 console.log(json)
//             });
//     });
// }

// getJSON();

//c2 =====>Async - Await

async function getJSONxxx (){
    let json = await axios.get('https://tutorialzine.com/misc/files/example.json');
    console.log(json)
    // return json;
}

getJSONxxx()