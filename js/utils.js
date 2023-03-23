// --------------------------------------------------------------------
// Helper functions
// --------------------------------------------------------------------

function stringsToNumbers (array) {
  return array.map(Number);
}

// Creates a map from an array of an object's string/string-like own enumerable property names in insertion order
// Example:
// getMap({a: 'foo', b: 'bar'}) // returns a map {0 => 'foo', 1 => 'bar'}
function getMap(obj) {
    let map = new Map();

    let names = Object.keys(obj);

    for (let i = 0; i < names.length; i++) {
       map.set(i, obj[names[i]]); 
    }

    return map;
}

// Sorts the elements of an array 'in place' by their number value and returns the sorted array with elements in descending order
// Examples:
// compareNumbers([6, 2, 4, 8], '') // returns [8, 6, 4, 2]
// compareNumbers([{num: 6}, {num: 2}, {num: 4}, {num: 8}], 'num') // returns [{num: 8}, {num: 6}, {num: 4}, {num: 2}]
function compareNumbers(arr, prop) {
  return arr.sort(function(a, b) {
    if (prop) {
        return b[prop] - a[prop];
    } else {
        return b - a;
    }
  });
}

// Sums the elements of an array after applying the filter to the elements by their index values
// Examples:
// sumSelectedItems([6, 2, 4, 8], '') or sumSelectedItems([6, 2, 4, 8], []) // returns 20
// sumSelectedItems([6, 2, 4, 8], [1, 3]) // returns 10
function sumSelectedItems(items, filterIndexes) {
    let arr = stringsToNumbers(items);
    
    return arr.filter(function(element, index) {
        return filterIndexes.indexOf(index) === -1;
    }).reduce(
        function (a, b) { 
            return a + b
    }, 0);
}

// As the numbers from data file range between 0 and 5, they will need to be transformed -
// while maintaining the original proportions - for visualisations  
function scaleNumber(number, scale) {
    return float(number) * scale;
}