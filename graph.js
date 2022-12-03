
//const data = await d3.json("./flare.json");
var data = await d3.csv("./birdstrikes.csv");
  
let clickme1= document.getElementById('clickmeQ1');
clickme1.onclick=function(){
    console.log("\nData Output from file\n");
    console.log(data);
   let root=d3.hierarchy(data);
    console.log("\nData Output from using d3.heirarchy\n");
    console.log(root.data[0]['Airport Name']);
}

