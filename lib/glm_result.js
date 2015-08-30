var fs = require('fs');
var _ = require('lodash');
var path = __dirname + '/../glm_result/';

function cleanup(input){
    var data = input.split('\n');
    var header = "name,coefficient";
    var output = [header];
    data.shift();
    _.each(data,function(n){
        var tmp = n.split('\t');
        if(tmp[2] == 'NEG'){
            tmp[1] = -Math.abs(tmp[1])
        }
        output.push(tmp[0] + ',' + tmp[1]);
    })
    return output.join('\n');
}
module.exports = {
    '5_11':cleanup(fs.readFileSync(path + 'glm_511.tsv','utf8')),
    '5_14':cleanup(fs.readFileSync(path + 'glm_514.tsv','utf8'))
}