defaultMaxLength = 10;

function Autocomplete(maxlength) {
  this.maxLength = maxlength || defaultMaxLength;
  this.__data__ = {};
}

Autocomplete.prototype.add = function(item) {
  var tmpKey, keyLength, key, i;
  keylength = this.maxLength < item.length ? this.maxLength : item.length;
  key = item.slice(0, keylength);
  for (i = 1; i <= keylength; i++) {
    var tmpKey = key.slice(0, i);
    if (typeof this.__data__[tmpKey] === "undefined") {
      this.__data__[tmpKey] = {};
    }
    this.__data__[tmpKey][item] = 1;
  }
}

Autocomplete.prototype.remove = function(item) {
  var tmpKey, keyLength, key, i;
  keylength = this.maxLength < item.length ? this.maxLength : item.length;
  key = item.slice(0, keylength);
  for (i = 1; i <= keylength; i++) {
    var tmpKey = key.slice(0, i);
    if (typeof this.__data__[tmpKey] !== "undefined") {
      delete(this.__data__[tmpKey][item]);
    }
  }
}

Autocomplete.prototype.complete = function(key) {
  var data = [];
  if (key == "") {
    for (var key in this.__data__) {
      if (key.length == 1) {
        for (var item in this.__data__[key]) {
          data.push(item);
        }
      }
    }
    return data;
  }

  if (key.length <= this.maxLength) {
    for (var item in this.__data__[key]) {
      data.push(item);
    }
    return data;
  } else {
    var partKey = key.slice(0, this.maxLength);
    for (var item in this.__data__[partKey]) {
      if (item.indexOf(key) == 0) {
        data.push(item);
      }
    }
    return data;
  }
}

module.exports = Autocomplete
