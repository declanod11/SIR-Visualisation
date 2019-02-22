var margin = {top: 20, right: 100, bottom: 100, left: 100};
var svg = d3.select("#main")
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var t = d3.transition()
    .duration(500)
    .ease(d3.easeLinear);

var xScale = d3.scaleLinear()
        .domain([1, 105])
        .range([0, width]),
    yScale = d3.scaleLinear()
        .domain([0, 0.25])
        .range([height, 0]),
    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    i = 0;

g.append("g")
    .attr("class", "axis xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", 40)
    .attr("x", width/2)
    .text("Time in Weeks");

g.append("g")
    .attr("class", "axis yAxis")
    .call(d3.axisLeft(yScale).ticks(5, "%"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -height/2)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Proportion of Population");

var path = g.append("path");

var line = d3.line()
    .x(function(d) {
        return xScale(+d.time)})
    .y(function(d) {
        return yScale(+d.infected)})
    .curve(d3.curveMonotoneX)
    
function createSlider(slider, boundTextField, max_val) {
    slider.slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: max_val,
        value: 0,
        slide: function( event, ui ) {
            // message="alpha_0 = " + (ui.value/8).toString(10);
            boundTextField.val(ui.value/8);
            full_data.then(render)
        }
    })
}

$(function() {
    createSlider($( "#slider-1" ), $( "#amount1" ), 31);
    createSlider($( "#slider-2" ), $( "#amount2" ), 7);
   
});

function render(data){
    var j = 0;
    var k = 0;
    if ($('#slider-2').slider("value")>-1){
        j=$('#slider-2').slider("value")
    }
    if ($('#slider-1').slider("value")>-1){
        k=$('#slider-1').slider("value")
    }
    
    // setInterval(function() {
    //     if(i<248){
    //         path.attr("class", "line")
    //             .attr("d", line(data.slice((i)*105,(i+1)*105)));
    //         console.log(i)
    //         i=i+1;
    //     }else{
    //         i=0;
    //         path.attr("class", "line")
    //             .attr("d", line(data.slice((i)*105,(i+1)*105)));
    //         i=i+1
    //     }
    // }, 500);
    data_set = j + k*7; 

    path.attr("class", "line")
        .attr("d", line(data.slice(data_set*105,(data_set+1)*105)));
}

var full_data = d3.csv("data2.csv").then(function(d){
    render(d);
    return d
})


