// function buildMetadata(sample) {
//   console.log("metadata");
//   console.log(sample);
//   var url = `/metadata/{$sample}`;
//   d3.json(url).then(function(response){
//   var sample_metadata = d3.select("#sample-metadata")
//   console.log("response" +response);
//   // @TODO: Complete the following function that builds the metadata panel

//   // Use `d3.json` to fetch the metadata for a sample
//     // Use d3 to select the panel with id of `#sample-metadata`

//     // Use `.html("") to clear any existing metadata
//   sample_metadata.html("");
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//   Object.defineProperties(response).forEach(function ([key,value]){
//     var row = sample_metadata.append("panel-body");
//     row.text(`${key}: ${value} \n`);
//     console.log(key + "value" +value)
// });

//     // BONUS: Build the Gauge Chart
//     // buildGauge(data.WFREQ);
//   });  
// };

function buildMetadata(sample) {
  console.log("in buildMetadata:  ")
  console.log("sample:  " + sample)
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url="/metadata/"+sample;

  console.log(url);
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(url).then(function(response){
    // if(error) {console.warn(error)};
    console.log(response);
    var metadata_Sample= d3.select("#sample-metadata");
    // Remove old metadata
    metadata_Sample.selectAll("p").remove();

    for(var key in response){
        if(response.hasOwnProperty(key)){
            metadata_Sample.append("p").text(key + ":   " + response[key]);
        }
    }
    console.log("Exiting  buildMetadata   ")
    // buildGauge(response.WFREQ);
});

// }  

// function buildCharts(sample) {
// var url = `/samples/${sample}`;

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   d3.json(url).then(function(data){
//     // console.log()
//   })
//     // @TODO: Build a Bubble Chart using the sample data
//   var x_data = data.otu_ids;
//   var y_data = data.sample_values;
//   var m_size = data.sample_values;
//   var m_colors = data.otu_ids;
//   var t_values = data.otu_labels;

//   var trace1 = {
//     x: x_data,
//     y: y_data,
//     text: t_values,
//     mode: 'markers',
//     marker: {
//       color: m_colors,
//       size: m_size}
//     };
//   var data=[trace1];
//   var layout = {
//     xaxis: {title: "OTU ID"},
//   };
//   plotly.newPlot('bubble', data, layout);
//   }
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  // d3.json(url).then(function(data){
  // var pie_values = data.sample_values.slice(0,11);
  // var pie_labels = data.otu_ids.slice(0,11);
  // var pie_hover = data.otu_labels.slice(0,11);

  // var data = [{
  //   values: pie_values,
  //   labels: pie_labels,
  //   hovertext: pie_hover,
  //   type: 'pie'
  // }];
  // Plotly.newPlot('pie', data);
  // });
    


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      console.log(sample)
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(sampleNames)
    // buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
