var glmRef = new Firebase("https://rac2.firebaseio.com/glm/");
glmRef.once('value',function(snapshot){
    var glm = snapshot.val();
    var entry = [];
    _.each(_.keys(glm),function(n){
        entry.push({
            label:n,
            data:toJSON(glm[n])
        })
    })
    var ctx = document.getElementById("myChart").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(toChartData(entry));
    
})

function rInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function toJSON(input){
    var d = input.split('\n');
    d.shift();
    var json = {};
    _.each(d,function(n){
        var tmp = n.split(',');
        var tmpJSON = {};
        json[tmp[0]] = tmp[1];
    })
    return json;
}
function toChartData(input){
    var labels = [];
    _.each(input,function(n){
        labels.push(_.keys(n.data));
    })
    labels = _.uniq(_.flatten(labels));
    datasets = [];
    _.each(input,function(n){
        var arr = [];
        for (var i = 0; i < labels.length; i++) {
            arr.push(n.data[labels[i]]);
        }
        datasets.push({
            label: n.label,
            fillColor: "rgba(" + rInt(0,250) + "," + rInt(0,250) + "," + rInt(0,250) + "," + "0." + rInt(1,99) + ")",
            strokeColor: "rgba(" + rInt(0,250) + "," + rInt(0,250) + "," + rInt(0,250) + "," + "0." + rInt(1,99) + ")",
            highlightFill: "rgba(" + rInt(0,250) + "," + rInt(0,250) + "," + rInt(0,250) + "," + "0." + rInt(1,99) + ")",
            highlightStroke: "rgba(" + rInt(0,250) + "," + rInt(0,250) + "," + rInt(0,250) + "," + "0." + rInt(1,99) + ")",
            data: arr
        })
    })
    console.log(datasets);
    return {
        labels:labels,
        datasets:datasets
    }
}