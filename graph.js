
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
    width = 1060 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz3")
  .append("svg")
    .attr("width", (width + margin.left + margin.right)+450)
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
    .html("State Name :: " + d.originState+"<br> Date       :: "+d.flightDate+"<br> Species Size :: "+d.WildlifeSize+"<br>Phase of Flight ::"+d.phaseOfFight+
                      "<br>Speed:: "+d.speedIASinKnots+"<br>Model ::"+d.aircraftMakeModel+"<br>Aircraft Operator"+d.aircraftAirlineOperator)
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
    effectAmountofDamage.add(arrayData[i].aircraftAirlineOperator);
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
    .attr("fill", function(d){ return color(d.aircraftAirlineOperator)})
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)



// Animation
svg.selectAll("rect")
  .transition()
  .duration(2500)
  .attr("y", function(d) { return y(d.speedIASinKnots); })
  .attr("height", function(d) { return height - y(d.speedIASinKnots); })
  .delay(function(d,i){console.log(i) ; return(0)})

  // Add one dot in the legend for each name.
var size = 20
svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 1020)
    .attr("y", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 1030 + size*1.2)
    .attr("y", function(d,i){ return i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

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
   width = 900 - margin.left - margin.right,
   height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");

  // Add  background that makes ggplot2 famous
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
}
// Usually you have a color scale in your chart already
var color = d3v4.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeSet1);


// Add one dot in the legend for each name.
var size = 20
svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 730)
    .attr("y", function(d,i){ return 470 + i*(size+5)}) 
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 733 + size*1.2)
    .attr("y", function(d,i){ return 470 + i*(size+5) + (size/2)}) 
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
var width = 650
var height = 450

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", 850)
    .attr("height", 450)

 // A scale that gives a X target position for each group
 var x = d3.scaleOrdinal()
  .domain(["Night", "Day","Dawn","Dusk"])
  .range([50, 200,350,450])

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
    .attr("x", 670)
    .attr("y", function(d,i){ return 350 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 670 + size*1.2)
    .attr("y", function(d,i){ return 350 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

}

function TreeMapping(){
  //console.log(data);
  let arrayData=[];
   // Storing in an array 
  arrayData=storeInArrayTree(data);
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

       
  let groups = d3v7.rollup(arrayData, // rollup function to group the data by any of the categorical properties
                       
                      function(d) { return d.originState; },
                      function(d) { return d.airportName; },
                      function(d) { return d.aircraftAirlineOperator; },
                      function(d) { return d.speedIASinKnots; },
                      );
                      
                      // There are several ways in which hierarchical data can be visualised including trees, 
                      // treemaps, packed circles and sunbursts.
  console.log(groups);
  //console.log(d3v7.hierarchy(d3v7.group(arrayData, d => d.originState)));

  let root = d3v7.hierarchy(groups);
  console.log(root);
  root.sum(function(d) {
    return d[1];
   });
  const height = 900,width=1500;
    const links = root.links();
    const nodes = root.descendants();

     var drag = simulation => {
  
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3v7.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
  
    const simulation = d3v7.forceSimulation(nodes)
        .force("link", d3v7.forceLink(links).id(d => d.id).distance(0).strength(1))
        .force("charge", d3v7.forceManyBody().strength(-50))
        .force("x", d3v7.forceX())
        .force("y", d3v7.forceY());
  
    const svg = d3v7.create("svg")
        .attr("viewBox", [-width / 2, -height/2, width, height]);
  
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    //for colors
    const temp=new Set();
    const temp1=new Set();
    for(let i=0;i<arrayData.length;i++){
      temp.add(arrayData[i].aircraftAirlineOperator);
      temp1.add(arrayData.airportName);
    }
    var keys=[];
    var keys1=[];
    for(const element of temp){
      keys.push(element);
    }
    for(const element of temp1){
      keys1.push(element);
    }


    // Usually you have a color scale in your chart already
    var color = d3v7.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeTableau10);
    var color1 = d3v7.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeSet2);
  
    const node = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("fill", d => d.height==1 ? color(d.data[0]) : (d.height==2?color1(d.data[0]):"#000"))
        .attr("stroke", d => d.children ? null : "#fff")
        .attr("r", d => d.height==0 ? ((d.data[0]/100)*6) : (d.height==2?9:3.5))
        .call(drag(simulation))

    node.append("title")
        .text(d => d.data.name);
  
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });


var size = 10
svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 240)
    .attr("y", function(d,i){ return -420 + i*(size+5)}) 
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 250 + size*1.2)
    .attr("y", function(d,i){ return -420 + i*(size+5) + (size/2)}) 
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
  
  
    $("#my_dataviz4").append(svg.node());
     console.log("Zahid");  

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

//Store data in the form of array and return for tree
function storeInArrayTree(root){
  let arrayData=[];
  for(let i=0;i<root.length;i++){
      arrayData[i]={
       airportName:root[i]['Airport Name'],
       aircraftMakeModel:root[i]['Aircraft Make Model'],
       aircraftAirlineOperator:root[i]['Aircraft Airline Operator'],
       costOther:root[i]['Cost Other'],
       costRepair:root[i]['Cost Repair'],
       costTotal:root[i]['Cost Total $'],
       effectAmountofDamage:root[i]['Effect Amount of damage'],
       flightDate:root[i]['Flight Date'],
       originState:root[i]['Origin State'],
       phaseOfFight:root[i]['Phase of flight'],
       speedIASinKnots:root[i]['Speed IAS in knots'],
       Timeofday:root[i]['Time of day'],
       WildlifeSize:root[i]['Wildlife Size'],
       WildlifeSpecies:root[i]['Wildlife Species']
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
  $("#my_dataviz3").remove();
  $("#my_dataviz4").remove();
  $("#my_dataSpace1").append("<div id=\"my_dataviz1\"></div>");  
  $("#my_dataSpace1").append("<div id=\"my_dataviz2\"></div>");
  $("#my_dataSpace2").append("<div id=\"my_dataviz3\"></div>");
  $("#my_dataSpace3").append("<div id=\"my_dataviz4\"></div>");
  scatterPlotLoading();
  circularPlotLoading();
  barPlotLoading();
  TreeMapping();
}

let check1= document.getElementById('sometext1');
check1.oninput=function(){
  let val=document.getElementById("sometext").value+"/"+document.getElementById("sometext1").value;
  document.getElementById("rangeValue").innerHTML=val;
  $("#my_dataviz1").remove();
  $("#my_dataviz2").remove();
  $("#my_dataviz3").remove();
  $("#my_dataviz4").remove();
  $("#my_dataSpace1").append("<div id=\"my_dataviz1\"></div>"); 
  $("#my_dataSpace1").append("<div id=\"my_dataviz2\"></div>");
  $("#my_dataSpace2").append("<div id=\"my_dataviz3\"></div>");
  $("#my_dataSpace3").append("<div id=\"my_dataviz4\"></div>");
  scatterPlotLoading();
  circularPlotLoading();
  barPlotLoading();
  TreeMapping();
}


dataLoading();
barPlotLoading();
scatterPlotLoading();
circularPlotLoading();
TreeMapping();


