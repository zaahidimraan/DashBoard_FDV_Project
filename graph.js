
//const data = await d3.json("./flare.json");
var data = await d3.csv("./birdstrikes.csv");
  
let clickme1= document.getElementById('clickmeQ1');
clickme1.onclick=function(){
    console.log("\nData Output from file\n");
    console.log(data);
   let root=d3.hierarchy(data);
    console.log("\nData Output from using d3.heirarchy\n");
    console.log(root.data[1001]);
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
    console.log(arrayData[1001]);
}

let clickme2= document.getElementById('clickmeQ2');
clickme2.onclick=function(){
    console.log("\nData Output from file\n");
    console.log(data);
   let root=d3.hierarchy(data);
    console.log("\nData Output from using d3.heirarchy\n");
    console.log(root.data[0]['Airport Name']);

// Barplot
    var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return root.data['Airport Name']; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 13000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Country); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Value); })
  .attr("height", function(d) { return height - y(d.Value); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

}

