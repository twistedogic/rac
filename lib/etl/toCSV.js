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
    header.unshift('version');
    header.unshift('championId');
    header.unshift('region');
    header.unshift('_id');
    header = _.uniq(header)
    var data = [header];
    _.forEach(input,function(n){
        var rows = [];
        _.forEach(header,function(m){
            var tmp = n[m];
            if(m == 'version'){
                tmp = n[m].split('.');
                tmp = tmp[0] + '.' + tmp[1];
            }
            rows.push(tmp);
        })
        data.push(rows.join(','));
    })
    return data.join("\n");
}