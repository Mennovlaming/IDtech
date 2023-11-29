import * as d3 from "d3";

// Load data from external file
d3.json('./data.json').then((data) => {
  // Function to create a pie chart for a specific edition
  function createPieChart(edition, index) {
    // Extract the required data for the pie chart
    const pieData = [
      { label: "Outside", value: edition.outside },
      { label: "Inside", value: edition.locations - edition.outside }
    ];

    // Set up the dimensions for the pie chart
    const width = 250;
    const height = 250;
    const radius = Math.min(width, height) / 2;

    // Create a color scale
    const color = d3.scaleOrdinal().range(["#3b3b3b", "#FDCF57"]); // Customize colors as needed

    // Create a pie chart layout
    const pie = d3.pie().value(d => d.value);

    // Create an arc generator
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    // Create the SVG container for the pie chart
    const svg = d3.select(`#pie-chart-${index}`).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Draw the pie chart
    const arcs = svg.selectAll(".arc")
      .data(pie(pieData))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.label));

  }

  // Call the createPieChart function for each edition
  data.forEach((edition, index) => {
    createPieChart(edition, index + 1); // Index + 1 to match section IDs
  });
});
