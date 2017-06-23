const thenify = require('thenify')
const stringify = thenify(require('csv-stringify'));

function deeperKey(object = {}, res = [], acc = []) {
  for (let attr in object) {
    let current = acc.slice(0);
    current.push(attr);
    if (typeof object[attr] == 'object') {
      deeperKey(object[attr], res, current);

    } else {
      res.push(current.join('.'))
    }
  }
  return res;
}

function deeperValue(object = {}, res = []) {
  for (let attr in object) {
    if (typeof object[attr] == 'object') {
      deeperValue(object[attr], res);

    } else {
      res.push(object[attr])
    }
  }
  return res;
}

module.exports = function(json) {
  const result = [];

  let current = [];
  let first = Object.keys(json)[0];

  let header = ['id']
  result.push(header.concat(deeperKey(json[first])))

  delete json.first
  for (let id in json) {
    let row = [id]
    result.push(row.concat(deeperValue(json[id])))
  }

  return stringify(result, {delimiter: ';'})
}
