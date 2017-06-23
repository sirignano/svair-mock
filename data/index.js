const fs = require('then-fs');
const thenify = require('thenify');
const parse = thenify(require('csv-parse'));

module.exports = class Import {
  constructor(dir) {
    const files = fs.readdirSync(dir);
    this.files = files.filter((file) => {
      return file.endsWith('.csv')
    }).map((file)=> { return dir + '/' + file});
  }

  data() {
    let filePromises = this.files.map((file) => {
      return fs.readFile(file, 'utf8')
    })
    return Promise.all(filePromises).then((csvs) => {
      let csvPromises = csvs.map((csv) => {
        return parse(csv, {delimiter: ';', columns: true}).then((data) => {
          let res = {}
          data.forEach((row) => {
            let id = row.id;
            res[id] = {};
            delete row.id;
            for (let attr in row) {
              let match = attr.match(/(.+)(\.(.+))+/);
              if(match) {
                let attrs = match.filter((attr) => { return !attr.match(/\./) })
                attrs.reduce((acc, deepAttr, i) => {
                  if (i < attrs.length - 1) {
                    acc[deepAttr] = acc[deepAttr] || {}
                    return acc[deepAttr]
                  } else {
                    acc[deepAttr] = row[attr]
                  }
                }, res[id])
              } else {
                res[id][attr] = row[attr];
              }
            }
          })
          return res;
        })
      });
      return Promise.all(csvPromises).then((infos) => {
        return infos.reduce((acc, info) => {
          return Object.assign(acc, info)
        }, {})
      })
    })
  }
}
