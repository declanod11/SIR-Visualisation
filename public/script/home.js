// var margin = {top: 20, right: 100, bottom: 100, left: 100};
// var svg = d3.select("#main")
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;

// var t = d3.transition()
//     .duration(500)
//     .ease(d3.easeLinear);

// var xScale = d3.scaleLinear()
//         .domain([1, 105])
//         .range([0, width]),
//     yScale = d3.scaleLinear()
//         .domain([0, 0.85])
//         .range([height, 0]),
//     g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
//     i = 0;

// g.append("g")
//     .attr("class", "axis xAxis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(xScale))
//     .append("text")
//     .attr("y", 40)
//     .attr("x", width/2)
//     .text("Time in Weeks");

// g.append("g")
//     .attr("class", "axis yAxis")
//     .call(d3.axisLeft(yScale).ticks(5, "%"))
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -50)
//     .attr("x", -height/2)
//     .attr("dy", "0.71em")
//     .attr("text-anchor", "end")
//     .text("Proportion of Population");

// g.append("text")
//     .attr("class","paramText")
//     .attr("y", 50)
//     .attr("x", width-50)
//     .text("Current parameters go here")

// var path1 = g.append("path");
// var path2 = g.append("path");

// var line1 = d3.line()
//     .x(function(d) {
//         return xScale(+d.time)})
//     .y(function(d) {
//         return yScale(+d.infected)})
//     .curve(d3.curveMonotoneX)

// var line2 = d3.line()
//     .x(function(d) {
//         return xScale(+d.time)})
//     .y(function(d) {
//         return yScale(+d.susceptible)})
//     .curve(d3.curveMonotoneX)
    
// function createSlider(slider, boundTextField, max_val) {
//     slider.slider({
//         orientation: "vertical",
//         range: "min",
//         min: 0,
//         max: max_val,
//         value: 0,
//         slide: function( event, ui ) {
//             // message="alpha_0 = " + (ui.value/8).toString(10);
//             boundTextField.val(ui.value/8);
//             full_data.then(render)
//         }
//     })
// }

// $(function() {
//     createSlider($( "#slider-1" ), $( "#amount1" ), 31);
//     createSlider($( "#slider-2" ), $( "#amount2" ), 7);
   
// });

// function render(data){
//     var j = 0;
//     var k = 0;
//     if ($('#slider-2').slider("value")>-1){
//         j=$('#slider-2').slider("value")
//     }
//     if ($('#slider-1').slider("value")>-1){
//         k=$('#slider-1').slider("value")
//     }
//     d3.selectAll(".paramText")
//         .remove()
//         .append("text")
//         .attr("y", 50)
//         .attr("x", width-50)
//         .text("hi")
    
//     // setInterval(function() {
//     //     if(i<248){
//     //         path.attr("class", "line")
//     //             .attr("d", line(data.slice((i)*105,(i+1)*105)));
//     //         console.log(i)
//     //         i=i+1;
//     //     }else{
//     //         i=0;
//     //         path.attr("class", "line")
//     //             .attr("d", line(data.slice((i)*105,(i+1)*105)));
//     //         i=i+1
//     //     }
//     // }, 500);
//     data_set = j + k*7; 

//     path1.attr("class", "line1")
//         .attr("d", line1(data.slice(data_set*105,(data_set+1)*105)));
//     path2.attr("class", "line2")
//         .attr("d", line2(data.slice(data_set*105,(data_set+1)*105)));
// }

// var full_data = d3.csv("data2.csv").then(function(d){
//     render(d);
//     return d
// })


// --------------------  Two Diseases -------------------------------

var margin = {top: 20, right: 80, bottom: 100, left: 80};
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
        .domain([0, 0.15])
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
    .call(d3.axisLeft(yScale).ticks(3, "%"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", 50-height/2)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Proportion of Population");

var legend = svg.append("g")
    .attr("class","legend")
    .attr("transform", "translate(" + (width +70) + "," + 100+ ")");

legend.append("rect")
    .attr("x", 0) 
    .attr("y", 20)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", "#1f77b4"); 
legend.append("rect")
    .attr("x", 0) 
    .attr("y", 40)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", "green"); 

legend.append("text")
    .attr("x", 20) 
    .attr("dy", "0.75em")
    .attr("y", 20)
    .text("Flu");
legend.append("text")
    .attr("x", 20) 
    .attr("dy", "0.75em")
    .attr("y", 40)
    .text("RSV");

var path1 = g.append("path");
var path2 = g.append("path");

var line1 = d3.line()
    .x(function(d) {
        return xScale(+d.time)})
    .y(function(d) {
        return yScale(+d.IFlu)})
    .curve(d3.curveMonotoneX)

var line2 = d3.line()
    .x(function(d) {
        return xScale(+d.time)})
    .y(function(d) {
        return yScale(+d.IRSV)})
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
    createSlider($( "#slider-1" ), $( "#amount1" ), 145);
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
    d3.selectAll(".paramText")
        .remove()

    param_keys.then(function(d){
        var b0f= d[k].b0f.toString(),
                b1f= d[k].b1f.toString(),
                b0r= d[k].b0r.toString(),
                b1r= d[k].b1r.toString();
            f_params = "Flu: beta0 = " + b0f + " , beta1 = " + b1f;
            r_params = "RSV: beta0 = " + b0r + " , beta1 = " + b1r;
        g.append("text")
            .attr("class", "paramText")
            .attr("y", 30)
            .attr("x", width-120)
            .text(f_params)
        g.append("text")
            .attr("class", "paramText")
            .attr("y", 50)
            .attr("x", width-120)
            .text(r_params)
    });
    
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
    data_set = j + k; 

    path1.attr("class", "line1")
        .attr("d", line1(data.slice(data_set*105,(data_set+1)*105)));
    path2.attr("class", "line2")
        .attr("d", line2(data.slice(data_set*105,(data_set+1)*105)));
}
var param_keys = d3.csv("keys_twoD.csv").then(function(d){
    return d
});

var full_data = d3.csv("data_twoD.csv").then(function(d){
    render(d);
    return d
});


