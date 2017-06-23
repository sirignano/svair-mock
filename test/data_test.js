const {expect} = require('chai')
const Import = require('../data')
const result = require('./data/results')

describe('Import', ()=> {
  it('initializes with files', ()=> {
    const myImport = new Import('.');

    expect(myImport).to.have.property('files')
  })

  it('initializes with files from dir', ()=> {
    const folder = __dirname + '/data'
    const myImport = new Import(folder);

    expect(myImport.files).to.deep.equal([folder + '/test.csv'])
  })

  it('parses all files and return json data', ()=> {
    const myImport = new Import(__dirname + '/data');
    const dataPromise = myImport.data()
    expect(dataPromise).to.be.an.instanceof(Promise)
    return dataPromise.then((res) => {
      expect(res).to.deep.equal(result)
    })
  })
})
