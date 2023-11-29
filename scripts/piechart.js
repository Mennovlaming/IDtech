import * as d3 from "d3";

// Define the JSON data directly in the JavaScript file
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

console.log('Data loaded successfully:', jsonData);

// ... rest of your code

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

  //hier wordt de chart getekend
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
jsonData.forEach((edition, index) => {
  createPieChart(edition, index + 1); //index + 1 om overeen te komen met section-ID
});
