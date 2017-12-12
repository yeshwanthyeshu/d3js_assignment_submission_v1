var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("widget");


// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// adding functionality to the save button
var savebutton = document.getElementById("modalsave");
var saved =[];
var num =1;
savebutton.onclick = function() {
	createtab();
	// the following adds the chart type to saved array
	var sel = document.getElementById("selectcharttype");
	var charttoshow  = sel.options[sel.selectedIndex].value;
	var nameofchart = document.getElementById("chartname").value;
	
	saved.push(["s.no:"+num,"name: "+nameofchart,"type:"+charttoshow]);
	num = num+1;
	modal.style.display = "none";
}



var data = [8, 10, 15,20,35,5,14];



newid=1;
// the following function is to add a tab 
function createtab() {
	
	var mydivid = "mydiv"+newid; // generating dynamic id
	var newdiv = document.createElement("div"); // creating newdiv
		newdiv.className="jumbotron";
		
		newdiv.style.border ="1px solid black";
		newdiv.id=mydivid;
	var height = document.getElementById("height").value;
	var width = document.getElementById("width").value;
		newdiv.style.width = width+"px";
		newdiv.style.height = height+"px";
	var cname = document.getElementById("chartname").value;
		newdiv.innerHTML ="<h2>The name of chart is : "+cname+"</h2>";
	// adding p elements
	var newp = document.createElement("p");
		newp.innerHTML="<h4>to see the chart click on me</h4>";
		newdiv.appendChild(newp);

 
 var mysvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	mysvgid = "mysvg"+newid;
	mysvg.id = mysvgid;
	mysvg.style.height=height;
	mysvg.style.width =width;
	mysvg.style.opacity = 0;
	newdiv.appendChild(mysvg);
	
	document.getElementById("tab").appendChild(newdiv);
	
	//newbarchart(mysvgid);
	//newlinechart(mysvgid);
	//newpiechart(mysvgid);
	
	var sel = document.getElementById("selectcharttype");
	var charttoshow  = sel.options[sel.selectedIndex].value;
	console.log(charttoshow);
	
	if(charttoshow == "pie"){
			newpiechart(mysvgid);
	}
	if(charttoshow == "bar"){
		newbarchart(mysvgid);
	}
	if(charttoshow == "line"){
		newlinechart(mysvgid);
	}
	
	// this is an alert event only for sample 
	var justdiv = document.getElementById(mydivid);
	justdiv.addEventListener('click', function (event) {
	var myfunsvg = document.getElementById(mysvgid);
	myfunsvg.style.opacity = 1;
	 //alert('Hi!');
	});
	newid = newid +1;  
}

// new bar chart is working fine

function newbarchart(val){
var dataArray = [8, 10, 15,20,35,5,14];

// Create variable for the SVG
var myid = "#"+val;
var svg = d3.select(myid)
		.attr("height","400px")
		.attr("width","50%");

// Select, append to SVG, and add attributes to rectangles for bar chart
svg.selectAll("rect")
	.data(dataArray)
	.enter().append("rect")
		  .attr("class", "bar")
		  .attr("height", function(d, i) {return (d * 10)})
		  .attr("width","40")
		  .attr("x", function(d, i) {return (i * 60) + 15})
		  .attr("y", function(d, i) {return 350 - (d * 10)});

// Select, append to SVG, and add attributes to text
svg.selectAll("text")
	.data(dataArray)
	.enter().append("text")
	.text(function(d) {return d})
		   .attr("class", "text")
		   .attr("x", function(d, i) {return (i * 60) + 36})
		   .attr("y", function(d, i) {return 415 - (d * 10)});
	

}


// the following is the line chart is working fine
function newlinechart(val) {
	val ="#"+val;
	var points = [[50, 250]];
	linedata = [8,10,5,9,11];
	for(var i=1; i<=linedata.length; i++){
		points.push([i*100,250- (10*linedata[i])]);
	}
	var m = [80, 80, 80, 80]; // margins
	var w = 1000 - m[1] - m[3]; // width
	var h = 400 - m[0] - m[2]; // height
	var xscale = d3.scaleLinear()
		.domain([0, 10])
		.range([0, 250]);
	var x_axis = d3.axisBottom()
		.scale(xscale);
	var yscale = d3.scaleLinear()
			   .domain([0, 10])
			   .range([500, 0]);
	var y_axis = d3.axisLeft()
			   .scale(yscale);		   
			   
			   
			   
			   
	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
	var line = d3.svg.line()
	// assign the X function to plot our line as we wish
	.x(function(d,i) { 
		// verbose logging to show what's actually being done
		console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
		// return the X coordinate where we want to plot this datapoint
		return x(i); 
	})
	.y(function(d) { 
		// verbose logging to show what's actually being done
		console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
		// return the Y coordinate where we want to plot this datapoint
		return y(d); 
	})

	// Add an SVG element with the desired dimensions and margin.
	var graph = d3.select(val)
		  .attr("width", 250)
		  .attr("height",400)
		  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	var xAxisTranslate = 250;
	graph.append("g")
		.attr("transform", "translate(20, " + xAxisTranslate  +")")
		.call(x_axis)
	graph.append("g")
	   .attr("transform", "translate(20, -255)")
	   .call(y_axis);
	var lineGenerator = d3.line()
		.curve(d3.curveCardinal);
		
	var pathData = lineGenerator(points);
	graph.append("path")
		.attr("d",pathData)
		.attr("stroke","blue")
		.attr("stroke-width",3)
		.attr("fill","none");
	
}




function newpiechart(val){
	val = "#"+val;
	var svg = d3.select(val),		
		radius = Math.min(250,200 ) / 2,
		g = svg.append("g").attr("transform", "translate(" + 200 / 2 + "," + 200 / 2 + ")");

	var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

	// Generate the pie
	var pie = d3.pie();

	// Generate the arcs
	var arc = d3.arc()
				.innerRadius(0)
				.outerRadius(radius);

	//Generate groups
	var arcs = g.selectAll("arc")
				.data(pie(data))
				.enter()
				.append("g")
				.attr("class", "arc")

	//Draw arc paths
	arcs.append("path")
		.attr("fill", function(d, i) {
			return color(i);
		})
		.attr("d", arc);
}





// the following function shows the saved charts to div
function savethecharts(){
	d3.select("#showcharts")
		.text("data is :["+data+"], saved charts:"+"["+saved+"]");
}


function addtodata() {
	val = document.getElementById("myinput").value;
	data.push(val);
	document.getElementById("mydiv").innerText = data;
}




