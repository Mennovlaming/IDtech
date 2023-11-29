import * as d3 from "d3";


d3.json('./data.json').then((data) => {
    console.log('piechart.js');
  //functie maken voor 1 ade editie in dit geval
  function createPieChart(edition, index) {
    //gebruik deze data voor de chart
    const pieData = [
      { label: "Buiten", value: edition.outside },
      { label: "Binnen", value: edition.locations - edition.outside }
    ];

    const width = 250;
    const height = 250;
    const radius = Math.min(width, height) / 2;

    //kleurenschema
    const color = d3.scaleOrdinal().range(["#3b3b3b", "#FDCF57"]);

    //maak de piechart
    const pie = d3.pie().value(d => d.value);

    //maak een 'arc' met de bepaalde radius
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    //maak de SVG-container
    const svg = d3.select(`#pie-chart-${index}`).append("svg")
      .attr("width", width)
      .attr("height", height)
      //.attr, .append, hetzelfde als de barchart
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    //hier word de chart getekend
    const arcs = svg.selectAll(".arc")
      .data(pie(pieData))
      .enter().append("g")
      .attr("class", "arc");

      //vul met de desbetreffende kleur
    arcs.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.label));
  }

  //loop door data heen, en voor elke edition roep je de functie aan zodat hij een chart maakt.
  data.forEach((edition, index) => {
    createPieChart(edition, index + 1); //index + 1 om overeen te komen met section-ID
  });
});
