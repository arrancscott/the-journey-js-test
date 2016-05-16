var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line1 = d3.svg.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.speed); });

var chart1 = d3.select(".graph-speed").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('id', 'graph-speed')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return +d.time; }));
    y.domain(d3.extent(data, function(d) { return +d.speed; }));

    chart1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Speed (mph)");

    chart1.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line1);
});

var line2 = d3.svg.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.altitude); });

var chart2 = d3.select(".graph-altitude").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('id', 'graph-altitude')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return +d.time; }));
    y.domain(d3.extent(data, function(d) { return +d.altitude; }));

    chart2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart2.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    chart2.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2);
});