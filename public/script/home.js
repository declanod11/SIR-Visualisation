var margin = {top: 20, right: 140, bottom: 100, left: 150};
var svg = d3.select("#main")
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

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
    .call(d3.axisBottom(xScale));

g.append("g")
    .attr("class", "axis yAxis")
    .call(d3.axisLeft(yScale).ticks(5)) //, "%"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Proportion of Population");

g.append("g")
    .attr("class", "scroller")
    .attr("transform", "translate(" + width +", 0)")
    .append("text")
    .text("Scroller goes here")

var path = g.append("path");

var line = d3.line()
    .x(function(d) {
        return xScale(+d.time)})
    .y(function(d) {
        return yScale(+d.infected)})
    .curve(d3.curveMonotoneX)

function render(data){
    console.log(data)
    setInterval(function() {
        // console.log(i)
        i=i+1;
        path.attr("class", "line")
            .attr("d", line(data.slice((i-1)*105,i*105)))
    }, 1000); 

    // console.log(+data.time)

}

var data = d3.csv("data1.csv").then(render)

