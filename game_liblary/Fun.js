exports.isIterable = function(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
exports.arrayRemove = function (arr, value, key) { 
    return arr.filter(function(ele){ 
        return ele[key] != value; 
    });
}