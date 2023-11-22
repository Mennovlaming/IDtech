import * as d3 from "d3";


var data = [
  { edition: "ADE 2016", visitors: 375000 },
  { edition: "ADE 2017", visitors: 395000 },
  { edition: "ADE 2018", visitors: 400000 },
  { edition: "ADE 2019", visitors: 400000 },
  { edition: "ADE 2020 online", visitors: 0 },
  { edition: "ADE 2021 online", visitors: 0 },
  { edition: "ADE 2022", visitors: 450000 },
  { edition: "ADE 2023", visitors: 500000 }
];

// Set up margins
var margin = { top: 20, right: 20, bottom: 40, left: 100 };
var width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// Set up the SVG canvas
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set up scales
var xScale = d3.scaleBand()
  .domain(data.map(function(d) { return d.edition; }))
  .range([0, width])
  .padding(0.2);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.visitors; })])
  .range([height, 0]);

// Create bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d) { return xScale(d.edition); })
  .attr("y", function(d) { return yScale(d.visitors); })
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) { return height - yScale(d.visitors); })
  .attr("fill", "steelblue");

// Add axes
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

svg.append("g")
  .call(d3.axisLeft(yScale));

// Add labels
svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.top + 10)
  .style("text-anchor", "middle")
  .text("ADE Editions");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left)
  .attr("x", -height / 2)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Number of Visitors");
