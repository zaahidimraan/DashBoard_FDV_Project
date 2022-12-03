
var data = await d3.csv("./birdstrikes.csv");
  
let clickme1= document.getElementById('clickmeQ1');
clickme1.onclick=function(){
    console.log("\nData Output from file\n");
    console.log(data);
   let root=d3.hierarchy(data);
    console.log("\nData Output from using d3.heirarchy\n");
    console.log(root.data[1001]);
    let arrayData=[];
    // Storing in array an
    arrayData=storeInArray(root);
    console.log(arrayData);
}


let clickme2= document.getElementById('clickmeQ2');
clickme2.onclick=function(){
    let root=d3.hierarchy(data);
    let arrayData1=storeInArray(root);
    let arrayData=arrayData1.slice(1,10);
   // set the dimensions and margins of the graph
   var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Barplot
  var x = d3.scaleBand()
   .range([ 0, width ])
   .domain(arrayData.map(function(d) { return d.flightDate; }))
   .padding(0.2);
  svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
   .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 300])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

  // create a tooltip
  var Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html("The exact value of<br>this cell is: " + d.airportName)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

// Bars
svg.selectAll("mybar")
  .data(arrayData)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.flightDate); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.speedIASinKnots); })
  .attr("height", function(d) { return height - y(d.speedIASinKnots); })
  .delay(function(d,i){console.log(i) ; return(i*100)})
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)

}


function storeInArray(root){
    let arrayData=[];
    for(let i=0;i<root.data.length;i++){
        arrayData[i]={
         airportName:root.data[i]['Airport Name'],
         aircraftMakeModel:root.data[i]['Aircraft Make Model'],
         aircraftAirlineOperator:root.data[i]['Aircraft Airline Operator'],
         costOther:root.data[i]['Cost Other'],
         costRepair:root.data[i]['Cost Repair'],
         costTotal:root.data[i]['Cost Total $'],
         effectAmountofDamage:root.data[i]['Effect Amount of damage'],
         flightDate:root.data[i]['Flight Date'],
         originState:root.data[i]['Origin State'],
         phaseOfFight:root.data[i]['Phase of flight'],
         speedIASinKnots:root.data[i]['Speed IAS in knots'],
         Timeofday:root.data[i]['Time of day'],
         WildlifeSize:root.data[i]['Wildlife Size'],
         WildlifeSpecies:root.data[i]['Wildlife Species'],
        }
     }
    return arrayData;
}

