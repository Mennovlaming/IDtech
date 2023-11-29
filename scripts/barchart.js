import * as d3 from "d3";

//nu is het wel async waardoor de code pas uitgevoerd word als de data geladen is, vandaar de .then()
d3.json('./data.json').then((data) => {

const width = 1000;
const height = 600;
const margin = { top: 60, bottom: 60, left: 40, right: 40 }

const svg = d3.select('#intro')
  .append('svg')
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)
  .attr('viewBox', [0, 0, width, height]); 

  //bepaal hier de x-as
const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);

  //bepaal hier de y-as
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.visitors)])
  .range([height - margin.bottom, margin.top]);

  //met append voeg je een 'groep' toe aan een svg
  svg.append('g')
  .selectAll('rect')
  .data(data.sort((a, b) => d3.ascending(+a.edition.match(/\d+/), +b.edition.match(/\d+/))))//voeg data toe aan de elementen
  .join('a')//voeg de links toe
  .attr('href', (d, i) => `#section-${i + 1}`)//voeg een href toe die naar de desbetrefende section gaat
  .append('rect')
  .attr('x', (d, i) => x(i))
  .attr('y', height - margin.bottom)
  .attr('width', x.bandwidth())
  .attr('class', 'rectangle')//voeg class toe voor hover
  .attr('height', 0)
  .transition() //kleine animatie duration 1.5s
  .duration(1500)
  .attr('fill', (d) => { //voor de online edities andere kleur
    if (d.edition === 'ADE 2020 online' || d.edition === 'ADE 2021 online') {
      return '#3b3b3b';
    } else {
      return '#FDCF57';
    }
  })
  .attr('y', (d) => y(d.visitors))//zet de hoogte aan het aantal visitors.
  .attr('height', (d) => height - margin.bottom - y(d.visitors));


  //select a elements
svg.selectAll('a')
.on('click', function (event, d) {
  //prevent reload
    event.preventDefault();
    const sectionId = this.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);//select section
    section.scrollIntoView({ behavior: 'smooth'});//smoothscroll
})

  function xAxis(g) {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => data[i].edition))
      .style('font-size', '18px')
      .selectAll('.tick text')
      .style('fill', 'black') //tick kleur aanpasssen (tick is streep)
      .call(wrap, x.bandwidth()); // Assuming x.bandwidth() is the maximum width you want for the tick text
  }

  function yAxis(g) {
    g.attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .style('font-size', '18px');
      
  }

  //Voor deze functie ChatGPT gebruikt, kwam er niet uit, hier word tekst gewrapt zodat hij mooier in de chart past.
  function wrap(text, width) {
    
    text.each(function () {
      //voor elk text element voert hij deze code uit.
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),//de tekst wordt gesplitst in losse woorden
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, //ems
        y = text.attr('y'),
        dy = parseFloat(text.attr('dy')) || 0,
        tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
  
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

});

