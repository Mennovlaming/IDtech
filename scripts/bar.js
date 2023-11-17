/* Example adapted from https://d3-graph-gallery.com/graph/barplot_basic.html */

import * as d3 from "d3";

//Dataset
const data = [
  { Jaar: 2023, Bezoekers: 80000 },
  { Jaar: 2022, Bezoekers: 70000 },
  { Jaar: 2021, Bezoekers: 0 },
  { Jaar: 2020, Bezoekers: 0 },
  { Jaar: 2019, Bezoekers: 40000 },
  { Jaar: 2018, Bezoekers: 40000 },
  { Jaar: 2017, Bezoekers: 30000 },
];

//SVG, select body, 'append' een svg toe met attr w 400 en h 300,
const svg = d3.select('article section:first-of-type').append('svg')
  .attr('width', 400)
  .attr('height', 300)
  //voeg een groep(g) toe
  .append('g')
  .attr('transform', 'translate(50,50)');

//Scale de x-as op basis van het jaartal, d.Jaar
const xScale = d3.scaleBand()
  .domain(data.map(d => d.Jaar))
  .range([0, 300])
  .padding(0.1);

  //Scale de y-as op het aantal Bezoekers.
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.Bezoekers)])
  .range([200, 0]);

//Maak de barchart, eerst selecteer je de rechthoekige elementen (rect)
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', d => xScale(d.Jaar))
  .attr('y', d => yScale(d.Bezoekers))
  .attr('width', xScale.bandwidth())
  .attr('height', d => 200 - yScale(d.Bezoekers))
  .attr('fill', 'steelblue');

//x-as
svg.append('g')
  .attr('transform', 'translate(0,200)')
  .call(d3.axisBottom(xScale));

//y-as
svg.append('g')
  .call(d3.axisLeft(yScale).ticks(5));
  //met .ticks(5) kan je de weergave van aantallen aanpassen.

// // X-as label
// svg.append('text')
//   .attr('transform', 'translate(150,250)')
//   .style('text-anchor', 'middle')
//   .text('Jaar');

// // Y-as label
// svg.append('text')
//   .attr('transform', 'rotate(-90)')
//   .attr('y', 0 - 40)
//   .attr('x', 0 - 100)
//   .attr('dy', '1em')
//   .style('text-anchor', 'middle')
//   .text('Bezoekers');
