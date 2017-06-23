const {expect} = require('chai');
const generate = require('../data/generate-csv-from-json');
const result = require('./data/results');
const fs = require('fs');

describe('generateCsvFromJson', ()=> {
  it('outputs a csv to destinations that matches the json', ()=> {
    return generate(result).then((output)=> {
      let data = fs.readFileSync(__dirname + '/data/test.csv', 'utf8');
      expect(output).to.equal(data)
    });
  });
});
