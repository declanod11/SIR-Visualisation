  
d3.json("data.json", function(error, data) {
    // console.log(data)
});

function get_colors(n) {
    var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c",
    "#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6",
    "#6a3d9a"];
    
    return colors[ n % colors.length];}
      
var margin = {top: 61, right: 140, bottom: 101, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var  times = ["12am","1a", "2a", "3a", "4a", "5a", "6a",
//             "7a", "8a", "9a", "10a", "11a", "12pm", "1p",
//             "2p", "3p", "4p", "5p", "6p", "7p", "8p",
//             "9p", "10p", "11p"];

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
        .ticks(23, "s");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5, "s");

var area = d3.svg.area()
    .x(function(d) { return x(d.time); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });
    
    
var stack = d3.layout.stack()
    .values(function(d) { return d.values; });
    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
svg.append("text")
    .attr("x", 0)
    .attr("y", -40)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Susceptible/Infected/Recovered Chart")
    .style("font", "23px avenir")
    .style("fill", "#000000");
    
    
svg.append("text")
    .attr("x", 0)
    .attr("y", 402)
    .attr("dy", "0em")
    .style("font", "12px avenir")
    .style("fill", "#000000")
    .text("This is a plot of the proportion of the population occupying each category");
    
svg.append("text")
    .attr("x", 0)
    .attr("y", 402)
    .attr("dy", "3em")
    .style("font", "12px avenir")
    .style("fill", "#000000")
    .text("By Declan O'Donovan")
    .style("font-weight", "bold");
      
// var slider_s = d3.select("body").append("svg")
//     .attr("width",50)
//     .attr("height",500)
      
// var y_s = d3.scale.linear()
//     .domain([20, 0])
//     .range([0, 500])
//     .clamp(true);

// var brush = d3.svg.brush()
//     .y(y_s)
//     .extent([0, 0])
//     .on("brush", brushed);

// var g = slider_s.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var slider = g.append("g")
//     .attr("transform", "translate(" + 20 + ", 0)");

// slider.append("g")
//     .attr("class", "y axis")
//     .call(d3.svg.axis()
//             .scale(y_s)
//             .orient("right")
//             .tickFormat(function(d) { return d + "°"; })
//             .tickSize(0)
//             .tickPadding(13))
//     .select(".domain")
//     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "halo");

// var prevVal = 0;
// var handle = slider.append("path")
//     .attr("class", "handle")
//     .attr("d", "M-7 -4 L-7 4 L-5 6 L5 6 L11 0 L5 -6 L-5 -6 Z")
//     .attr("transform", "translate(0, " + y(prevVal) + ")");

// d3.select("body")
//     .style("background-color", d3.hsl(y(prevVal), .8, .8));

// var ruler = slider.append("g")
//     .attr("transform", "translate(-4, 0)")
//     .attr("class", "ruler")
//     .call(brush);

// ruler.selectAll(".extent,.resize")
//     .remove();

// ruler.select(".background")
//     .style("cursor", "ns-resize")
//     .attr("width", 20);

// // initial animation
// ruler.call(brush.event)
//     .transition()
//     .duration(750)
//     .ease("out-in")
//     .call(brush.extent([120, 120]))
//     .call(brush.event);

// function brushed() {
// var value = brush.extent()[1],
//     t = d3;

// if (d3.event.sourceEvent) { // not a programmatic event
//     value = y.invert(d3.mouse(this)[1]);
//     brush.extent([value, value]);
//     if (d3.event.sourceEvent.type === "mousemove") {
//         // interrupt transition
//         handle.interrupt();
//         d3.select("body").interrupt();
//     } else if (value != prevVal) {
//         // animate when is't a click, not a drag
//         t = d3.transition()
//                 .duration(Math.abs(y(value) - y(prevVal)))
//                 .ease("out-in");
//     }
// }

// t.select(".handle")
//     .attr("transform", "translate(0, " + y(value) + ")");
// t.select("body")
//     .style("background-color", d3.hsl(value, .8, .8));

// prevVal = value;
// }

function startAgain(data1,i){
    
}


function dispData(data1,i){
    var data= data1.splice(105*(i-1),105);
    
    $("#disp_params").change(function() {
        startAgain(data1,$("#disp_params").val())
    });
    // console.log(data)

    color.domain(d3.keys(data[0]).filter(function(key) {return key !== "time"; }));

    data.forEach(function(d) {  
        d.time = +d.time;
        d.susceptible = +d.susceptible;
        d.infected= +d.infected;
        d.recovered= +d.recovered;
    }); 
        
        

    var browsers = stack(color.domain().map(function(name) {
    return {
        name: name,
        values: data.map(function(d) {
        return {time: d.time, y: d[name] * 1};
        })
    };
    }));


    //   // Find the value of the hour with highest total value
    var maxHourVal = d3.max(data, function(d){
    var vals = d3.keys(d).map(
        function(key){ 
        return key !== "time" ? d[key] : 0 });
    return d3.sum(vals);
    });

    //   // Set domains for axes
    x.domain(d3.extent(data, function(d) { return d.time; }));
    y.domain([0, 1])

    var browser = svg.selectAll(".browser")
        .data(browsers)
        .enter().append("g")
        .attr("class", "browser");

    browser.append("path")
        .attr("class", "area")
        .attr("d", function(d) { return area(d.values); })
        .style("fill", function(d,i) { 
            return get_colors(i); });


        browser.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
        .attr("x", -6)
        .attr("dy", "-0.882em")
        .text(function(d) { 
                if(d.name == "susceptible"){
            return "susceptible";
            }
                    if(d.name == "infected"){
            return "infected";
            }    
                if(d.name == "recovered"){
            return d.name;
            }})
        .style("font", "15px avenir")
            .attr("transform", function(d) { return "translate(500," + y(d.value.y0 + d.value.y / 2) + ")"; }) 

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis).append("text")
            .attr("x", 350)
        .attr("y", 36)
        .attr("fill", "#000")
        .text("Time (Weeks)")
        .style("font-weight", "bold");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
            .attr("x", -250)
        .attr("y", -40)
        .attr("dy", "0.3408em")
        .attr("fill", "#000")
        .text("Proportion of Population")
            .style("font-weight", "bold");
        
    var legend = svg.selectAll(".legend")
            .data(color.domain()).enter()
            .append("g")
        .attr("class","legend")
        .attr("transform", "translate(" + (width +20) + "," + 0+ ")");

    legend.append("rect")
        .attr("x", 20) 
        .attr("y", function(d, i) { return 20 * i; })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i) {
            return get_colors(i);}); 

    legend.append("text")
        .attr("x", 40) 
        .attr("dy", "0.75em")
        .attr("y", function(d, i) { return 20 * i; })
        .text(function(d) {return d});
        
    legend.append("text")
        .attr("x",0) 
    //      .attr("dy", "0.75em")
        .attr("y",-10)
        .text("Categories");
    
    
};

d3.csv("data2.csv", function(error, data1) {

    dispData(data1,1);
    
});

