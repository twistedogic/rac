var fs = require('fs');
var _ = require('lodash');
var path = '../public/';
var data = fs.readFileSync(path + 'data.csv', 'utf8');
data = data.split('\n');
var header = data[0];
var version511 = [header];
var version514 = [header];
data.shift();
_.each(data,function(n){
    if(n.split(',')[3].toString() === '5.14'){
        version514.push(n);
    } else {
        version511.push(n);
    }
})
fs.writeFileSync(path + 'data511.csv', version511.join('\n'));
fs.writeFileSync(path + 'data514.csv', version514.join('\n'));