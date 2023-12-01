import * as d3 from "d3";

//De data uit sheets:
const jsonData = [
  { "edition": "ADE 2016", "visitors": 375000, "artists": 1800, "locations": 120, "outside": 20, "events": 450, "arests": 250 },
  { "edition": "ADE 2017", "visitors": 395000, "artists": 2200, "locations": 160, "outside": 30, "events": 500, "arests": 120 },
  { "edition": "ADE 2018", "visitors": 400000, "artists": 2500, "locations": 200, "outside": 40, "events": 550, "arests": 74 },
  { "edition": "ADE 2019", "visitors": 400000, "artists": 2400, "locations": 200, "outside": 40, "events": 500, "arests": 80 },
  { "edition": "ADE 2020 online", "visitors": 100000, "artists": 0, "locations": 0, "outside": 0, "events": 0, "arests": 0 },
  { "edition": "ADE 2021 online", "visitors": 100000, "artists": 0, "locations": 0, "outside": 0, "events": 0, "arests": 0 },
  { "edition": "ADE 2022", "visitors": 450000, "artists": 2500, "locations": 140, "outside": 20, "events": 450, "arests": 100 },
  { "edition": "ADE 2023", "visitors": 500000, "artists": 2900, "locations": 200, "outside": 40, "events": 1000, "arests": 200 }
];

//hier de grootte variabelen
const width = 1000;
const height = 600;
const margin = { top: 60, bottom: 60, left: 40, right: 40 }

//werkt als een query selector, selecteer hier de div waar een svg in komt.
//met append voeg je iets toe aan het element, met .attr voeg je een eigenschap toe.
const svg = d3.select('#intro')
  .append('svg')
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)
  .attr('viewBox', [0, 0, width, height]); 

//bepaal hier de x-as
const x = d3.scaleBand()
  .domain(d3.range(jsonData.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);

//bepaal hier de y-as
const y = d3.scaleLinear()
  .domain([0, d3.max(jsonData, d => d.visitors)])
  .range([height - margin.bottom, margin.top]);

// met append voeg je een 'groep' toe aan een svg
svg.append('g')
  .selectAll('rect')
  .data(jsonData.sort((a, b) => d3.ascending(+a.edition.match(/\d+/), +b.edition.match(/\d+/))))//sorteren op waarde
  .join('a')//voeg een link toe met join
  .attr('href', (d, i) => `#section-${i + 1}`) //link naar de desbetreffende section
  .append('rect')
  .attr('x', (d, i) => x(i))
  .attr('y', height - margin.bottom)
  .attr('width', x.bandwidth())
  .attr('class', 'rectangle')
  .attr('height', 0)
  .transition()//animatie transition 1.5 seconde
  .duration(1500)
  .attr('fill', (d) => {
    //verander de kleur naar ADE kleuren, zwart als het om een online editie gaat.
    if (d.edition === 'ADE 2020 online' || d.edition === 'ADE 2021 online') {
      return '#3b3b3b';
    } else {
      return '#FDCF57';
    }
  })
  //bepaal de hoogte (y-as) op basis van de visitors
  .attr('y', (d) => y(d.visitors))
  .attr('height', (d) => height - margin.bottom - y(d.visitors));

svg.selectAll('a')
//hier selecteerd je de a links
  .on('click', function (event, d) {
    //niet reloaden, blijven op dezelfde page
    event.preventDefault();

    const sectionId = this.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
    //smooth scroll
  })

function xAxis(g) {
  g.attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat((i) => jsonData[i].edition))
    .style('font-size', '18px')
    .selectAll('.tick text')
    .style('fill', 'black')//maak de 'tick' zwart, dat zijn de lijntjes
    .call(wrap, x.bandwidth());
    //gebruik de functie 'wrap' voor het wrappen van de tekst
}

function yAxis(g) {
  g.attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, jsonData.format))
    .style('font-size', '18px');
}

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),//split de tekst in woorden
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1,//em lijnhoogte
      y = text.attr('y'),
      dy = parseFloat(text.attr('dy')) || 0,
      tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');


      //dit hieronder is uitgebruik door chatgpt, als ik het goed begrijp 'popt' hij de tekst als het te lang word.
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width && line.length > 1) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
      }
    }
  });
}

svg.append('g').call(xAxis);
svg.append('g').call(yAxis);
svg.node();
