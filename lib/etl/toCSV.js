var _ = require('lodash');
module.exports = function (input,count,filter){
    var header = [];
    var sample = _.sample(input,count);
    _.forEach(sample,function(n){
        header.push(_.keys(n));
    })
    header = _.flatten(header);
    if(filter){
        header = _.filter(header,function(n){
            return n.split('_')[0] == filter;
        })
    }
    header.push('version');
    header.push('championId');
    header.push('region');
    header = _.uniq(header)
    var data = [header];
    _.forEach(input,function(n){
        var rows = [];
        _.forEach(header,function(m){
            rows.push(n[m]);
        })
        data.push(rows.join(','));
    })
    return data.join("\n");
}