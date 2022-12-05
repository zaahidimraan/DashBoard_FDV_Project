
var data = await d3.csv("./birdstrikes.csv");
  
//let clickme1= document.getElementById('clickmeQ1');
function dataLoading(){
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

//let clickme2= document.getElementById('clickmeQ2');
function barPlotLoading(){
    let root=d3.hierarchy(data);
    let arrayData=storeInArray(root);

    let arrayData1=[]
    let value=document.getElementById("sometext").value;
    let year=document.getElementById("sometext1").value;
    for(let i=0,j=0;i<arrayData.length;i++){
      let length=arrayData[i].flightDate.length;
      length=length-1;
      let length1=length;
      length1=length1-1;
      if((value == '')&&(year=='')) {
        if(('1'==arrayData[i].flightDate[0])&&(('/'==arrayData[i].flightDate[1]))){
          arrayData1[j]=arrayData[i];
          j++;
         }
       }
      else if((arrayData[i].flightDate[1] === '/')&&(value.length==1)){
         if((value[0]==arrayData[i].flightDate[0])&&(year[3]==arrayData[i].flightDate[length])&&(year[2]==arrayData[i].flightDate[length1])){
          arrayData1[j]=arrayData[i];
          j++;
         }
        }
      else if(value.length==2){
        if((value[1]==arrayData[i].flightDate[1])&&(year[3]==arrayData[i].flightDate[length])&&(year[2]==arrayData[i].flightDate[length1])){
          arrayData1[j]=arrayData[i];
          j++;
         }
      }
    }
    arrayData=arrayData1;
   // set the dimensions and margins of the graph
   var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 1460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Barplot
  var x = d3.scaleBand()
   .range([ 0, width ])
   .domain(arrayData.map(function(d) { return d.aircraftMakeModel; }))
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
  var Tooltip = d3.select("#my_dataviz3")
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
      .html("The exact value of<br>this cell is: " + d.speedIASinKnots)
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

  const effectAmountofDamage=new Set();
  for(let i=0;i<arrayData.length;i++){
    effectAmountofDamage.add(arrayData[i].aircraftMakeModel);
  }
  var keys=[];
  for(const element of effectAmountofDamage){
    keys.push(element);
    console.log(element);
  }
  // Usually you have a color scale in your chart already
  var color = d3v4.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeSet1);

// Bars
svg.selectAll("mybar")
  .data(arrayData)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.aircraftMakeModel); })
    .attr("width", x.bandwidth())
    .attr("fill", function(d){ return color(d.effectAmountofDamage)})
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)


// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.speedIASinKnots); })
  .attr("height", function(d) { return height - y(d.speedIASinKnots); })
  .delay(function(d,i){console.log(i) ; return(i*100)})


}

// clickme3= document.getElementById('clickmeQ3');
function scatterPlotLoading(){
   console.log("Zahid");
   let root=d3.hierarchy(data);
   let arrayData=[];
    // Storing in an array 
    arrayData=storeInArray(root);
    console.log(arrayData);

    // Making Sets
    let sets=setMaker(arrayData);

    let arrayData1=[]
    let value=document.getElementById("sometext").value;
    let year=document.getElementById("sometext1").value;
    for(let i=0,j=0;i<arrayData.length;i++){
      let length=arrayData[i].flightDate.length;
      length=length-1;
      let length1=length;
      length1=length1-1;
      if((value == '')&&(year=='')) {
        if(('1'==arrayData[i].flightDate[0])&&(('/'==arrayData[i].flightDate[1]))){
          arrayData1[j]=arrayData[i];
          j++;
         }
       }
      else if((arrayData[i].flightDate[1] === '/')&&(value.length==1)){
         if((value[0]==arrayData[i].flightDate[0])&&(year[3]==arrayData[i].flightDate[length])&&(year[2]==arrayData[i].flightDate[length1])){
          arrayData1[j]=arrayData[i];
          j++;
         }
        }
      else if(value.length==2){
        if((value[1]==arrayData[i].flightDate[1])&&(year[3]==arrayData[i].flightDate[length])&&(year[2]==arrayData[i].flightDate[length1])){
          arrayData1[j]=arrayData[i];
          j++;
         }
      }
    }
    arrayData=arrayData1;
    
    // set the dimensions and margins of the graph
   var margin = {top: 10, right: 30, bottom: 60, left: 60},
   width = 1200 - margin.left - margin.right,
   height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");

  // Add the grey background that makes ggplot2 famous
 svg
  .append("rect")
  .attr("x",0)
  .attr("y",0)
  .attr("height", height)
  .attr("width", width)
  .style("fill", "#E0EEEE")


    // Add X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(arrayData.map(function(d) { return d.originState; }))
    .padding(1);

   var xAxis=svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
     .attr("transform", "translate(-10,0)rotate(-45)")
     .style("text-anchor", "end")

// Add Y axis
   var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(arrayData.map(function(d) { return d.flightDate;
                                     }))
    .padding(1);
   var yAxis=svg.append("g")
    .call(d3.axisLeft(y).tickSize(-width*2.3).ticks(7))
    .select(".domain").remove()
    .selectAll("text")
     .style("text-anchor", "end");

  // Add a clipPath: everything out of this area won't be drawn.
  var clip = svg.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width )
  .attr("height", height )
  .attr("x", 0)
  .attr("y", 0);

     // Customization
  svg.selectAll(".tick line").attr("stroke", "#000000")
                             .style("opacity", .2)
                             
   // Add a tooltip div.
// Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#my_dataviz1")
   .append("div")
   .style("opacity", 0)
   .attr("class", "tooltip")
   .style("background-color", "white")
   .style("border", "solid")
   .style("border-width", "1px")
   .style("border-radius", "5px")
   .style("padding", "10px")



// A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
   tooltip
    .style("opacity", 1)
  }

  var mousemove = function(d) {
   tooltip
    .html("State Name :: " + d.originState+"<br> Date       :: "+d.flightDate+"<br> Species Size :: "+d.WildlifeSize+"<br>Phase of Flight ::"+d.phaseOfFight)
    .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (d3.mouse(this)[1]) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
   tooltip
     .transition()
     .duration(200)
     .style("opacity", 0)
   }

const setPhaseofFlight=new Set();
for(let i=0;i<arrayData.length;i++){
  setPhaseofFlight.add(arrayData[i].phaseOfFight);
}
var keys=[];
for(const element of setPhaseofFlight){
  keys.push(element);
  console.log(element);
}
// Usually you have a color scale in your chart already
var color = d3v4.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeSet1);


 // Add brushing
 var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
 .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
 .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function


// Add one dot in the legend for each name.
var size = 20
svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 1120)
    .attr("y", function(d,i){ return 50 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 1010 + size*1.2)
    .attr("y", function(d,i){ return 50 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")


// Add dots

// Create the scatter variable: where both the circles and the brush take place
var scatter = svg.append('g')
  .attr("clip-path", "url(#clip)")
// Add circles
scatter.selectAll("dot")
.data(arrayData) 
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.originState); } )
  .attr("cy", function (d) { return y(d.flightDate); } )
  .attr("r", function(d){ return (d.WildlifeSize=='Large'?15:(d.WildlifeSize=='Medium'?7:2))})
  .style("fill", function(d){ return color(d.phaseOfFight)})
  .style("opacity", function(d){ return (d.WildlifeSize=='Large'?.3:(d.WildlifeSize=='Medium'?.6:.9))})
  .style("stroke", "white")
.on("mouseover", mouseover )
.on("mousemove", mousemove )
.on("mouseleave", mouseleave )

//scatter
//.append("g")
//  .attr("class", "brush")
//  .call(brush);

// A function that set idleTimeOut to null
var idleTimeout
function idled() { idleTimeout = null; }

// A function that update the chart for given boundaries
function updateChart() {

  var extent = d3.event.selection;

  // If no selection, back to initial coordinate. Otherwise, update X axis domain
  if(!extent){
    if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
    x.domain([ 4,8])
  }else{
    x.domain([ x.continuous.invert(extent[0]), x.continuous.invert(extent[1]) ])
    scatter.select(".brush").call(brush.move, null) 
  }

  // Update axis and circle position
  xAxis.transition().duration(1000).call(d3.axisBottom(x))
  scatter
    .selectAll("dot")
    .transition().duration(1000)
    .attr("cx", function (d) { return x(d.originState); } )
    .attr("cy", function (d) { return y(d.flightDate); } )

  }




}

//let clickme4= document.getElementById('clickmeQ4');
function circularPlotLoading(){
  let root=d3.hierarchy(data);
  console.log(data);
  let arrayData=[];
   // Storing in an array 
  arrayData=storeInArray(root);
  let arrayData1=[];
  let value=document.getElementById("sometext").value;
  let year=document.getElementById("sometext1").value;
  for(let i=0,j=0;i<arrayData.length;i++){
    let length=arrayData[i].flightDate.length;
    length=length-1;
    let length1=length;
    length1=length1-1;
    if((value == '')&&(year=='')) {
      if(('1'==arrayData[i].flightDate[0])&&(('/'==arrayData[i].flightDate[1]))){
        arrayData1[j]=arrayData[i];
        j++;
       }
     }
    else if((arrayData[i].flightDate[1] === '/')&&(value.length==1)){
       if((value[0]==arrayData[i].flightDate[0])&&(year[3]==arrayData[i].flightDate[length])&&(year[2]==arrayData[i].flightDate[length1])){
        arrayData1[j]=arrayData[i];
        j++;
       }
      }
    else if(value.length==2){
      if((value[1]==arrayData[i].flightDate[1])&&(year[3]==arrayData[i].flightDate[length])&&(year[2]==arrayData[i].flightDate[length1])){
        arrayData1[j]=arrayData[i];
        j++;
       }
    }
  }
  arrayData=arrayData1;
  console.log(arrayData);
  // set the dimensions and margins of the graph
var width = 850
var height = 450

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", 1000)
    .attr("height", 450)

 // A scale that gives a X target position for each group
 var x = d3.scaleOrdinal()
  .domain(["Night", "Day","Dawn","Dusk"])
  .range([50, 250,450,650])

 // A color scale
 var color = d3.scaleOrdinal()
  .domain(["Night", "Day","Dawn","Dusk"])
  .range([ "blue", "red","purple","green"])

 // Initialize the circle: all located at the center of the svg area
 var node = svg.append("g")
  .selectAll("circle")
  .data(arrayData)
  .enter()
  .append("circle")
    .attr("r", 5)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", function(d){ return color(d.Timeofday)})
    .style("fill-opacity", 0.8)
    .attr("stroke", "black")
    .style("stroke-width", 2)
    .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

 // Features of the forces applied to the nodes:
 var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(6.5).x( function(d){ return x(d.Timeofday) } ))
    .force("y", d3.forceY().strength(3.1).y( height/2 ))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(6)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.1).radius(15).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
 simulation
    .nodes(arrayData)
    .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });

// What happens when a circle is dragged?
 function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(.03).restart();
  d.fx = d.x;
  d.fy = d.y;
 }
 function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
 }
 function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(.03);
  d.fx = null;
  d.fy = null;
 }

// A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
var mouseover = function(d) {
  tooltip
   .style("opacity", 1)
 }

 var mousemove = function(d) {
  tooltip
   .html("State Name :: " + d.originState+"<br> Date       :: "+d.flightDate+"<br> Species Size :: "+d.WildlifeSize+"<br>Phase of Flight ::"+d.phaseOfFight)
   .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
   .style("top", (d3.mouse(this)[1]) + "px")
 }

 // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
 var mouseleave = function(d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
  }

const setTimeofday=new Set();
for(let i=0;i<arrayData.length;i++){
 setTimeofday.add(arrayData[i].Timeofday);
}
var keys=[];
for(const element of setTimeofday){
 keys.push(element);
 console.log(element);
}
// Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
 .domain(keys)
 .range(d3.schemeSet1);



// Add one dot in the legend for each name.
var size = 20
svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 50)
    .attr("y", function(d,i){ return 300 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 50 + size*1.2)
    .attr("y", function(d,i){ return 300 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

}

function TreeMapping(){
  let root1=d3.hierarchy(data);
  //console.log(data);
  let arrayData=[];
   // Storing in an array 
  arrayData=storeInArray(root1);
  //console.log(arrayData);

       
  let groups = d3v7.rollup(arrayData, // rollup function to group the data by any of the categorical properties
                      function(d) { return d.originState; },
                      function(d) { return d.airportName; },
                      function(d) { return d.speedIASinKnots; },
                      
                      );
                      
                      // There are several ways in which hierarchical data can be visualised including trees, 
                      // treemaps, packed circles and sunbursts.
  console.log(groups);

  let root = d3.hierarchy(groups);
  root.sum(function(d) {
      return d[1];
  });
  console.log(root);
}

//Store data in the form of array and return
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

//Store on unique values(states,species size, Phase of flight) from array
function setMaker(arrayData){
  let sets=[];
  const date=new Set();
  const Ssize=new Set();
  const Pflight=new Set();
  for(let i=0;i<arrayData.length;i++){
    date.add(`${arrayData[i].flightDate}`);
    Ssize.add(arrayData[i].WildlifeSize);
    Pflight.add(arrayData[i].phaseOfFight);
  }
  sets[0]=date;
  sets[1]=Ssize;
  sets[2]=Pflight;
  return sets;
}

let check= document.getElementById('sometext');
check.oninput=function(){
  let val=document.getElementById("sometext").value+"/"+document.getElementById("sometext1").value;
  document.getElementById("rangeValue").innerHTML=val;
  $("#my_dataviz1").remove();
  $("#my_dataviz2").remove();
  $("#my_dataSpace1").append("<div id=\"my_dataviz1\"></div>")  
  $("#my_dataSpace1").append("<div id=\"my_dataviz2\"></div>")
  scatterPlotLoading();
  circularPlotLoading();
}

let check1= document.getElementById('sometext1');
check1.oninput=function(){
  let val=document.getElementById("sometext").value+"/"+document.getElementById("sometext1").value;
  document.getElementById("rangeValue").innerHTML=val;
  $("#my_dataviz1").remove();
  $("#my_dataviz2").remove();
  $("#my_dataSpace1").append("<div id=\"my_dataviz1\"></div>")  
  $("#my_dataSpace1").append("<div id=\"my_dataviz2\"></div>")
  scatterPlotLoading();
  circularPlotLoading();
}


dataLoading();
barPlotLoading();
scatterPlotLoading();
circularPlotLoading();
TreeMapping();


