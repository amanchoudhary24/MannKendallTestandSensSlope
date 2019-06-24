//Global Declarations
var fileNameMonthly;
var fileNameSeasonal;
var chart1;
var flag=0;
var yAxisLabel="";
var lineOneLabel="";
var lineTwoLabel="";
var lineThreeLabel="";
var countYears=[];
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var SUrban=0;
var SNonUrban=0;
var SAoi=0;
var varSUrban=0;
var varSNonUrban=0;
var varSAoi=0;

var yearlyMeanUrban=[];
var yearlyMeanNonUrban=[];
var meanYears=[];

var PUrban=0;
var PNonUrban=0;
var PAoi=0;
var ZUrban=0;
var ZNonUrban=0;
var ZAoi=0;

var senUrbanData=[];
var senNonUrbanData=[];
var slopeSenUrbanData=0.0;
var slopeSenNonUrbanData=0.0;

var dateForReference=[];
var urbanData=[];
var nonUrbanData=[];
var aoiData=[];

var slopeUrbanData=[];
var slopeNonUrbanData=[];
var slopeAoiData=[];
var tempDataUrban=[];
var tempDataNonUrban=[];
var tempDataAoi=[];


function handleFiles(files) {
	// Check for the various File API support.
		if (window.FileReader) {
		// FileReader are supported.
		//console.log(document.getElementById("csvFileInput").value);
		fileNameMonthly="datafiles/"+files[0].name;
		flag=1;
		//alert("File name : " + fileNameMonthly);
		processData();
	} else {
		alert('FileReader are not supported in this browser.');
	}	
}

function getDataPointsFromCSV(csv, index) {
			//Emptying the required arrays
			dateForReference=[];
			urbanData=[];
			nonUrbanData=[];
			aoiData=[];
			slopeUrbanData=[];
			slopeNonUrbanData=[];
			slopeAoiData=[];
			tempDataUrban=[];
			tempDataNonUrban=[];
			tempDataAoi=[];

            var dataPoints = [];
            var csvLines=[];
            var points=[];
            csvLines = csv.split(/[\r?\n|\r|\n]+/);  
            var tempPoints=[];
            tempPoints=csvLines[0].split(","); 
            yAxisLabel=tempPoints[7]+"";
            lineOneLabel=tempPoints[2]+"";
            lineTwoLabel=tempPoints[3]+"";
            //console.log(yAxisLabel);
		   	var presentYear="";
		   	//console.log("TEMP YEAR: "+tempYear);
		   	//var count=1;
		   	//var k=0;
		   	countYears=[];
            for (var i = 1; i < csvLines.length; i++)
                if (csvLines[i].length > 0) {
                    points = csvLines[i].split(",");
                    if(points[0]!="")
                    {
                    	presentYear=points[0];
                    	countYears.push(parseInt(points[0]));
                    }
                    var tempDate=points[1]+" , "+presentYear;
                    dataPoints.push({
                        x: new Date(tempDate), 
                        y: parseFloat(points[index]),
                    });
                    dateForReference.push(tempDate);
                    urbanData.push(parseFloat(points[2]));
                    slopeUrbanData.push(parseFloat(points[2]));
                    tempDataUrban.push(parseFloat(points[2]));

                    nonUrbanData.push(parseFloat(points[3]));
                    slopeNonUrbanData.push(parseFloat(points[3]));
                    tempDataNonUrban.push(parseFloat(points[3]));

                    aoiData.push(parseFloat(points[7]));
                    slopeAoiData.push(parseFloat(points[7])); 
                    tempDataAoi.push(parseFloat(points[7]));         
           //       k+=1;
                }
            //console.log("dataPoints length: "+countYears.length);           
            return dataPoints;
        }
        function parseUrbanDataPoints () {
        	for(var i=slopeUrbanData.length-1;i>0;i--)
        	{
        		slopeUrbanData[i]=slopeUrbanData[i]-slopeUrbanData[i-1];
        	}
			var tempDataPoints=[];
	        for (var i = 0; i < slopeUrbanData.length; i++)
	        {
	        	if(dateForReference[i]=="")
	        		break;
	        	tempDataPoints.push({
		          	x: new Date(dateForReference[i]), 
		          	y: slopeUrbanData[i],
	          	}); 
	        	//console.log(dateForReference[i]+" - "+slopeUrbanData[i]);	
	        }   
	        return tempDataPoints;           
     	}
function parseNonUrbanDataPoints()
{
	for(var i=slopeNonUrbanData.length-1;i>0;i--)
		slopeNonUrbanData[i]=slopeNonUrbanData[i]-slopeNonUrbanData[i-1];
	var tempDataPoints=[];
	for (var i = 0; i < slopeNonUrbanData.length; i++)
	    {
	    	if(dateForReference[i]=="")
	       		break;
	       	tempDataPoints.push({
	         	x: new Date(dateForReference[i]), 
	         	y: slopeNonUrbanData[i],
	       	}); 
	      	//console.log(dateForReference[i]+" - "+slopeUrbanData[i]);	
	    }   
	return tempDataPoints;  
}
function parseAoiDataPoints()
{
	for(var i=slopeAoiData.length-1;i>0;i--)
		slopeAoiData[i]=slopeAoiData[i]-slopeAoiData[i-1];
	var tempDataPoints=[];
	for (var i = 0; i < slopeAoiData.length; i++)
	    {
	    	if(dateForReference[i]=="")
	       		break;
	       	tempDataPoints.push({
	         	x: new Date(dateForReference[i]), 
	         	y: slopeAoiData[i],
	       	}); 
	      	//console.log(dateForReference[i]+" - "+slopeUrbanData[i]);	
	    }   
	return tempDataPoints;  
}
function getYearlyDataFromCsv(csv)
{
	var dataPoints = [];   
    var csvLines=[];
    var points=[];
    meanYears=[];
    yearlyMeanUrban=[];
    yearlyMeanNonUrban=[];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);  
    var tempPoints=[];
    tempPoints=csvLines[0].split(","); 
    for (var i = 1; i < csvLines.length; i++)
                if (csvLines[i].length > 0) {
                    points = csvLines[i].split(",");
                    if(points[0]!="")
                    {
                    	meanYears.push(parseInt(points[0]));
                    	yearlyMeanUrban.push(parseFloat(points[1]));
                    	yearlyMeanNonUrban.push(parseFloat(points[2]));
                    }            
                }
                console.log("Hello World1");
}
function parseYearlyMeanPointsUrban()
{
	var tempDataPoints=[];
	//console.log(meanYears);
	for(var i=0;i<yearlyMeanUrban.length;i++)
	{

		tempDataPoints.push({
	         	x: new Date("JAN, "+meanYears[i]), 
	         	y: yearlyMeanUrban[i],
	       	}); 
	}
	                console.log("Hello World2");

	return tempDataPoints;
}
function parseYearlyMeanPointsNonUrban()
{
	var tempDataPoints=[];
	for(var i=0;i<yearlyMeanNonUrban.length;i++)
	{

		tempDataPoints.push({
	         	x: new Date("JAN, "+meanYears[i]), 
	         	y: yearlyMeanNonUrban[i],
	       	}); 
	}
	return tempDataPoints;
}
function processData()
{

	var chartHeading=fileNameMonthly.substring(10,fileNameMonthly.length-4).toUpperCase()+"  ©iirs|isro";//setting file name to chart
	//alert(chartHeading+ "");
	var dps=[];
	var yearlyFileName="datafiles/YEARLY "+fileNameMonthly.substring(18,fileNameMonthly.length);
	console.log(yearlyFileName);
	$.get(yearlyFileName,function(data)
		{
			getYearlyDataFromCsv(data);
		});
	$.get(fileNameMonthly, function(data){
	getDataPointsFromCSV(data,10);//dummy run to initialize all the values
	calcS();
	var chartSubHeading1="";
	var chartSubHeading2="";
	var chartSubHeading3="";
	var chartSubHeading7="";
	var chartSubHeading8="";
	if(ZUrban>0)
	{
		chartSubHeading7="z="+parseFloat(ZUrban).toPrecision(4);
		chartSubHeading8="Sens Slope="+parseFloat(slopeSenUrbanData).toPrecision(4);
		chartSubHeading1=" p="+parseFloat(PUrban).toPrecision(4);
		chartSubHeading2="Trend Increasing";
		if(PUrban<0.001||PUrban<0.01||PUrban<0.05||PUrban<0.1)
		{
			if(PUrban<0.001)
			{
				chartSubHeading3="SIGNIFICANT 99.9%";
			}
			else if(PUrban<0.01)
			{
				chartSubHeading3="SIGNIFICANT 99%";
			}
			else if(PUrban<0.05)
			{
				chartSubHeading3="SIGNIFICANT 95%";
			}	
			else
				chartSubHeading3="SIGNIFICANT 90%";
				
		}
		else
			chartSubHeading3=" NON SIGNIFICANT";
	}
	else
	{
		chartSubHeading7="z="+ZUrban;
		chartSubHeading8="Sens Slope="+slopeSenUrbanData;
		chartSubHeading1=" p="+ PUrban;
		chartSubHeading2=" Trend Decreasing ";
		if(PUrban<0.001||PUrban<0.01||PUrban<0.05||PUrban<0.1)
		{
			if(PUrban<0.001)
			{
				chartSubHeading3="SIGNIFICANT 99.9%";
			}
			else if(PUrban<0.01)
			{
				chartSubHeading3="SIGNIFICANT 99%";
			}
			else if(PUrban<0.05)
			{
				chartSubHeading3="SIGNIFICANT 95%";
			}	
			else
				chartSubHeading3="SIGNIFICANT 90%";
				
		}
		else
			chartSubHeading3=" NON SIGNIFICANT";
	}
	
	chart1 = new CanvasJS.Chart("chartContainer1", {
		title: {
			text: "Urban :"+chartHeading,
			//maxWidth:600,
		},
		subtitles:[
		{
			text: chartSubHeading1,
			fontStyle: "normal",
			fontWeight: "normal",
			horizontalAlign: "right",
			verticalAlign: "top",
			dockInsidePlotArea:false,
		},
		{
			text:chartSubHeading7,
			horizontalAlign: "right",
			fontWeight: "normal",
			verticalAlign: "top",
			dockInsidePlotArea:false,
		},
		{
			text:chartSubHeading8,
			horizontalAlign: "right",
			fontWeight: "normal",
			verticalAlign: "top",
			dockInsidePlotArea:false,
		},
		{
			text:chartSubHeading3,
			horizontalAlign: "right",
			fontWeight: "normal",
			verticalAlign: "top",
			dockInsidePlotArea:true,
		}
		],
		//backgroundColor: "rgba(252,251,251,.5)",
		backgroundColor: "#FFFFFF",
		exportEnabled: true,
		//zoomEnabled: true,
		axisX: [{
			title:" ",
			valueFormatString: "MMM",
			
			interval: 3,
			labelAngle: -70,
  			intervalType: "month",
		},{
          title: "Years",
          lineColor: "#ffffff",
          tickLength: 1,
          valueFormatString: "YYYY",
          interval:1,
        }],
		axisY: {
			title: yAxisLabel,
			interval:10,
			gridThickness: 0.2,
			minimum:0,
			valueFormatString:"#######",
		},
		toolTip: {
			shared: true,
			/*
			contentFormatter: function (e) {
				var content = " ";
				for (var i = 0; i < e.entries.length; i++) {
					content += month[e.entries[i].dataPoint.x.getMonth()] +" "+ e.entries[i].dataPoint.x.getFullYear() + " " ;
					content+="<strong> "+e.entries[i].dataSeries.name+": " + e.entries[i].dataPoint.y + "</strong>";

					content += "<br/>";
				}
				return content;
				
			},
			*/	
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "center",
			dockInsidePlotArea: false,
			itemclick: toogleDataSeries
		},
		
		data: [
		{//Urban Line
			type: "line",
			axisXIndex:0,
			axisYType: "primary",
			name: lineOneLabel,
			lineThickness:2,
			//lineColor: 'black',
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: getDataPointsFromCSV(data, 2)//reading data from the 3rd column
		},
		{//Slope Urban Line
			type:"line",
			axisXIndex:0,
			axisYType: "primary",
			name: "Slope Urban",
			lineThickness: 0,
			//showInLegend: true,
			lineColor: 'white',//to camoflague the line with the background
			highlightEnabled: false,//to disable the highlight on mouse over
			markerSize:0,
			yValueFormatString: "####.####",
			dataPoints: parseUrbanDataPoints()
		},
		{//Yearly Mean Points
			type:"line",
			lineColor: "#000000",
			axisXIndex:1,
			lineThickness:1,
			axisYType: "primary",
			name: "Yearly Mean Points",
			lineDashType: "dot",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: parseYearlyMeanPointsUrban()
		}]
	});

	var chartSubHeading4="";
	var chartSubHeading5="";
	var chartSubHeading6="";
	var chartSubHeading9="";
	var chartSubHeading10="";
	if(ZNonUrban>0)
	{
		chartSubHeading9="Z="+ZNonUrban;
		chartSubHeading10="Sens Slope="+slopeSenNonUrbanData;
		chartSubHeading4=" p="+PNonUrban;
		//chartSubHeading5="Trend Increasing";
		if(PNonUrban<0.001||PNonUrban<0.01||PNonUrban<0.05||PNonUrban<0.1)
		{
			if(PNonUrban<0.001)
			{
				chartSubHeading6="SIGNIFICANT 99.9%";
			}
			else if(PNonUrban<0.01)
			{
				chartSubHeading6="SIGNIFICANT 99%";
			}
			else if(PNonUrban<0.05)
			{
				chartSubHeading6="SIGNIFICANT 95%";
			}	
			else
				chartSubHeading6="SIGNIFICANT 90%";		
		}
		else
			chartSubHeading6=" NON SIGNIFICANT";
	}
	else
	{
		chartSubHeading9="Z="+parseFloat(ZNonUrban).toPrecision(4);
		chartSubHeading10="Sens Slope="+parseFloat(slopeSenNonUrbanData).toPrecision(4);
		chartSubHeading4=" p="+parseFloat(PNonUrban).toPrecision(4);
		//chartSubHeading5="Trend Increasing";
		if(PNonUrban<0.001||PNonUrban<0.01||PNonUrban<0.05||PNonUrban<0.1)
		{
			if(PNonUrban<0.001)
			{
				chartSubHeading6="SIGNIFICANT 99.9%";
			}
			else if(PNonUrban<0.01)
			{
				chartSubHeading6="SIGNIFICANT 99%";
			}
			else if(PNonUrban<0.05)
			{
				chartSubHeading6="SIGNIFICANT 95%";
			}	
			else
				chartSubHeading6="SIGNIFICANT 90%";
				
		}
		else
			chartSubHeading6=" NON SIGNIFICANT";
	}

		chart2 = new CanvasJS.Chart("chartContainer6", {
		title: {
			text: "Non Urban:"+chartHeading,
			//maxWidth:600,
		},
		subtitles:[
		{
			text: chartSubHeading4,
			fontStyle: "normal",
			fontWeight: "normal",
			horizontalAlign: "right",
			verticalAlign: "top",
			dockInsidePlotArea:false,
		},
		{
			text:chartSubHeading9,
			horizontalAlign: "right",
			verticalAlign: "top",
			dockInsidePlotArea:false,
		},
		{
			text:chartSubHeading10,
			horizontalAlign: "right",
			verticalAlign: "top",
			dockInsidePlotArea:false,
		},
		{
			text:chartSubHeading6,
			horizontalAlign: "right",
			verticalAlign: "top",
			dockInsidePlotArea:true,
		}
		],
		backgroundColor: "#FFFFFF",
		exportEnabled: true,
		zoomEnabled: true,
		axisX: [{
			title:" ",
			valueFormatString: "MMM",
			interval: 3,
			labelAngle: -70,
  			intervalType: "month",
		},
		{
          title: "Years",
          lineColor: "#ffffff",
          tickLength: 1,
          valueFormatString: "YYYY",
          interval:1,
        }],
		axisY: {
			title: yAxisLabel,
			interval:10,
			gridThickness: 0.2,
			minimum:0,
			valueFormatString:"#######",
		},
		toolTip: {
			shared: true,
			/*
			contentFormatter: function (e) {
				var content = " ";
				for (var i = 0; i < e.entries.length; i++) {
					content += month[e.entries[i].dataPoint.x.getMonth()] +" "+ e.entries[i].dataPoint.x.getFullYear() + " " ;
					content+="<strong> "+e.entries[i].dataSeries.name+": " + e.entries[i].dataPoint.y + "</strong>";

					content += "<br/>";
				}
				return content;
				
			},
			*/	
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "center",
			dockInsidePlotArea: false,
			itemclick: toogleDataSeries
		},
		
		data: [
		{//Non Urban Line
			type: "line",
			axisYType: "primary",
			name: lineTwoLabel,
			lineThickness:2,
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: getDataPointsFromCSV(data, 3)
		},
		{//Slope Non Urban Line
			type:"line",
			axisYType: "primary",
			name: "Slope Non Urban",
			lineThickness: 0,
			//showInLegend: true,
			lineColor: 'white',//to camoflague the line with the background
			highlightEnabled: false,//to disable the highlight on mouse over
			markerSize:0,
			yValueFormatString: "####.####",
			dataPoints: parseNonUrbanDataPoints()
		},
		{//Yearly Mean Points
			type:"line",
			lineColor: "#000000",
			axisXIndex:1,
			lineThickness:1,
			axisYType: "primary",
			name: "Yearly Mean Points",
			lineDashType: "dot",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: parseYearlyMeanPointsNonUrban()
		}
		]
	});
		
		

		chart1.render();
		chart2.render();
		//var textNode=document.createTextNode("Hello World");
		//document.getElementById("chartContainer1").appendChild(textNode);
	});
} 
function toogleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else{
			e.dataSeries.visible = true;
		}
		chart.render();	
	}
function handleFiles2(files)
{
	// Check for the various File API support.
		if (window.FileReader) {
		// FileReader are supported.
		//console.log(document.getElementById("csvFileInput").value);
		fileNameSeasonal="datafiles/"+files[0].name;
		//alert("File name : " + fileNameMonthly);
		processData2();
	} else {
		alert('FileReader are not supported in this browser.');
	}	
}
var yearForReference=[];
var djfUrbanData=[];
var djfNonUrbanData=[];
var mamUrbanData=[];
var mamNonUrbanData=[];
var jjaUrbanData=[];
var jjaNonUrbanData=[];
var sonUrbanData=[];
var sonNonUrbanData=[];

function getDataPointsFromFile(csv,index)
{
	yearForReference=[];
	mamUrbanData=[];
	djfUrbanData=[];
	jjaUrbanData=[];
	sonUrbanData=[];
	mamNonUrbanData=[];
	djfNonUrbanData=[];
	jjaNonUrbanData=[];
	sonNonUrbanData=[];

	var typeOfSeason="";
	var dataPoints=[];
	var csvLines=[];
	var points=[];
	csvLines = csv.split(/[\r?\n|\r|\n]+/);  
	for(var i=1;i<csvLines.length;i++)//store years in the array
	{
		if(csvLines[i].length>0)
		{
			points=csvLines[i].split(",");
			if(points[1]=="")
				break;
			else
				yearForReference.push(parseInt(points[1]));
		}
	}
	for(var i=1;i<csvLines.length;i++)
	{
		if(csvLines[i].length>0)
		{
			points=csvLines[i].split(",");
			if(points[0]!="")
				typeOfSeason=points[0].toUpperCase();
			if(typeOfSeason=="DJF")
			{
				djfUrbanData.push(parseFloat(points[2]));
				djfNonUrbanData.push(parseFloat(points[3]));
			}
			else if(typeOfSeason=="MAM")
			{
				mamUrbanData.push(parseFloat(points[2]));
				mamNonUrbanData.push(parseFloat(points[3]));
			}
			else if(typeOfSeason=="JJA")
			{
				jjaUrbanData.push(parseFloat(points[2]));
				jjaNonUrbanData.push(parseFloat(points[3]));
			}
			else if(typeOfSeason=="SON")
			{
				sonUrbanData.push(parseFloat(points[2]));
				sonNonUrbanData.push(parseFloat(points[3]));
			}
		}
	}
}
function parseDjfUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<djfUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: djfUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseDjfNonUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<djfNonUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: djfNonUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseMamUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<mamUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: mamUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseMamNonUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<mamNonUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: mamNonUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseJjaUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<jjaUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: jjaUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseJjaNonUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<jjaNonUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: jjaNonUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseSonNonUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<sonNonUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: sonNonUrbanData[i],
		});
	}
	return tempDataPoints;
}
function parseSonUrbanDataPoints()
{
	var tempDataPoints=[];
	for(var i=0;i<sonUrbanData.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date(yearForReference[i]+""),
			y: sonUrbanData[i],
		});
	}
	return tempDataPoints;
}

var tUrban=[];
var tNonUrban=[];
var tAoi=[];

function calcS()
{
	tUrban=[];
	tNonUrban=[];
	tAoi=[];
	SUrban=0;
	SNonUrban=0;
	SAoi=0;
	ZUrban=0;
	ZNonUrban=0
	ZAoi=0;
	varSUrban=0;
	varSNonUrban=0;
	varSAoi=0;
	PUrban=0;
	PNonUrban=0;
	PAoi=0;

	for(var i=0;i<slopeUrbanData.length;i++)
	{
		for(var j=i+1;j<slopeUrbanData.length;j++)
		{
			if((slopeUrbanData[j]-slopeUrbanData[i])>0)
			{
				SUrban+=1;
			}
			else if((slopeUrbanData[j]-slopeUrbanData[i])<0)
			{
				SUrban-=1;
			}
		}
	}
	//console.log("slopeUrbanData: "+slopeUrbanData.length+ "count: "+(18*12));
	for(var i=0;i<slopeNonUrbanData.length;i++)
	{
		for(var j=i+1;j<slopeNonUrbanData.length;j++)
		{
			if((slopeNonUrbanData[j]-slopeNonUrbanData[i])>0)
			{
				SNonUrban+=1;
			}
			else if((slopeNonUrbanData[j]-slopeNonUrbanData[i])<0)
			{
				SNonUrban-=1;
			}
		}
	}
	for(var i=0;i<slopeAoiData.length;i++)
	{
		for(var j=i+1;j<slopeAoiData.length;j++)
		{
			if((slopeAoiData[j]-slopeAoiData[i])>0)
			{
				SAoi+=1;
			}
			else if((slopeAoiData[j]-slopeAoiData[i])<0)
			{
				SAoi-=1;
			}
		}
	}
	//console.log("\nSUrban: "+SUrban+"\nSNonUrban: "+SNonUrban+"\nSAoi: "+SAoi);
	tempDataUrban.sort();
	tempDataNonUrban.sort();
	tempDataAoi.sort();
	for(var i=0;i<tempDataUrban.length-1;i++)
	{
		var res=0;
		while(tempDataUrban[i]==tempDataUrban[i+1])
		{
			res+=1;
			i++;
		}
		res+=1;
		tUrban.push(res);
	}
	for(var i=0;i<tempDataNonUrban.length-1;i++)
	{
		var res=0;
		while(tempDataNonUrban[i]==tempDataNonUrban[i+1])
		{
			res+=1;
			i++;
		}
		res+=1;
		tNonUrban.push(res);
	}
	for(var i=0;i<tempDataAoi.length-1;i++)
	{
		var res=1;
		while(tempDataAoi[i]==tempDataAoi[i+1])
		{
			res+=1;
			i++;
		}
		tAoi.push(res);
	}
	tUrban.sort();
	tNonUrban.sort();
	tAoi.sort();

	for( var i = 0; i < tAoi.length; i++){ 
   		if ( tAoi[i] === 1) {
     		tAoi.splice(i, 1); 
     		i--;
   		}
	}
	for( var i = 0; i < tUrban.length; i++){ 
   		if ( tUrban[i] === 1) {
     		tUrban.splice(i, 1); 
     		i--;
   		}
	}
	for( var i = 0; i < tNonUrban.length; i++){ 
   		if ( tNonUrban[i] === 1) {
     		tNonUrban.splice(i, 1); 
     		i--;
   		}
	}
	//console.log("Hello World");
	//calculating variance
	var n=12*countYears.length;
	//console.log("Years : "+countYears.length);
	var tiedGroupUrbanSum=0;
	for(var i=0;i<tUrban.length;i++)
	{
		tiedGroupUrbanSum+=(tUrban[i]*(tUrban[i]-1)*((2*tUrban[i])+5));
	}
	varSUrban=((n*(n-1)*((2*n)+5))/18)-tiedGroupUrbanSum;

	var tiedGroupNonUrbanSum=0;
	for(var i=0;i<tNonUrban.length;i++)
	{
		tiedGroupNonUrbanSum+=(tNonUrban[i]*(tNonUrban[i]-1)*((2*tNonUrban[i])+5));
	}
	varSNonUrban=((n*(n-1)*((2*n)+5))-tiedGroupNonUrbanSum)/18;

	var tiedGroupAoiSum=0;
	for(var i=0;i<tAoi.length;i++)
	{
		tiedGroupAoiSum+=(tAoi[i]*(tAoi[i]-1)*((2*tAoi[i])+5));
	}
	varSAoi=((n*(n-1)*((2*n)+5))/18)-tiedGroupAoiSum;
	//console.log("varSUrban: "+varSUrban+"  varSNonUrban: "+varSNonUrban);

	if(SUrban>0)
	{
		ZUrban=(SUrban-1)/(Math.sqrt(varSUrban));
	}
	else if(SUrban<0)
	{
		ZUrban=(SUrban+1)/(Math.sqrt(varSUrban));
	}
	else
		ZUrban=0;


	if(SNonUrban>0)
	{
		ZNonUrban=(SNonUrban-1)/(Math.sqrt(varSNonUrban));
	}
	else if(SNonUrban<0)
	{
		ZNonUrban=(SNonUrban+1)/(Math.sqrt(varSNonUrban));
	}
	else
		ZNonUrban=0;

	if(SAoi>0)
	{
		ZAoi=(SAoi-1)/(Math.sqrt(varSAoi));
	}
	else if(SAoi<0)
	{
		ZAoi=(SAoi+1)/(Math.sqrt(varSAoi));
	}
	else
		ZAoi=0;
	//console.log("ZUrban:"+ZUrban+"  ZNonUrban:"+ZNonUrban);


	PUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZUrban,2)));
	PNonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZNonUrban,2)));
	//console.log("PUrban : "+ PUrban);

	//Finding sens slope for Urban Data
	senUrbanData=[];
	for(var i=0;i<slopeUrbanData.length;i++)
	{
		for(var j=i+1;j<slopeUrbanData.length;j++)
		{
			var dk=(slopeUrbanData[j]-slopeUrbanData[i])/(j-i);
			senUrbanData.push(dk);
		}
	}
	senUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	var temp=senUrbanData.length;
	//console.log(temp);
	if(temp%2==0)//even case
	{
		slopeSenUrbanData=(senUrbanData[(temp/2)-1]+senUrbanData[temp/2])/2;
	}
	else//odd case
	{
		slopeSenUrbanData=senUrbanData[temp/2];
	}
	//console.log("Slope"+senUrbanData[temp/2]);
	senNonUrbanData=[];
	for(var i=0;i<slopeNonUrbanData.length;i++)
	{
		for(var j=i+1;j<slopeNonUrbanData.length;j++)
		{
			var dk=(slopeNonUrbanData[j]-slopeNonUrbanData[i])/(j-i);
			senNonUrbanData.push(dk);
		}
	}
	temp=senNonUrbanData.length;
	//console.log("Temp: "+temp);
	senNonUrbanData.sort(function(a,b)
		{
			return a-b;
		});
	if(temp%2==0)//even case
	{
		slopeSenNonUrbanData=(senNonUrbanData[(temp/2)-1]+senNonUrbanData[temp/2])/2;
	}
	else//odd case
	{
		slopeSenNonUrbanData=senNonUrbanData[temp/2];
	}
}
function processData2()
{
		var chartHeading=fileNameSeasonal.substring(10,fileNameSeasonal.length-4);//setting file name to chart
		$.get(fileNameSeasonal,function(data)
		{
			getDataPointsFromFile(data,0);//data initialisation in the arrays
			calcS();
			chartDJF=new CanvasJS.Chart("chartContainer2",
			{
				title:
				{
					text: "DJF:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "This is a Subtitle",
					//Uncomment properties below to see how they behave
					//fontColor: "red",
					//fontSize: 30
				}
				],
				exportEnabled: true,
				zoomEnabled: true,
				backgroundColor: "#FFFFFF",
				axisX:
				{
					title: " Year ",
					valueFormatString: "YYYY",

				},
				axisY:
				{
					title: " ",
					gridThickness: 0.2,
				},
				toolTip:
				{
					shared: true,
					
					contentFormatter: function(e)
					{
						var content="";
						for(var i=0;i<e.entries.length;i++)
						{
							content+=e.entries[i].dataPoint.x.getFullYear()+" ";
							content+="<strong>"+e.entries[i].dataSeries.name+ ":"+e.entries[i].dataPoint.y+ "</strong>";
							content+="<br>";
						}
						return content;
					},
				},
				legend:
				{
					cursor: "pointer",
					verticalAlign: "top",
					horizontalAlign: "right",
					dockInsidePlotArea: true,
					itemclick: toogleDataSeries
				},
				data:
				[
					{
						type: "line",
						name: "Urban ",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseDjfUrbanDataPoints()
					},
					{
						type: "line",
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseDjfNonUrbanDataPoints()
					}
				]
			});
			chartMAM = new CanvasJS.Chart("chartContainer3",
			{
				title:
				{
					text: "MAM:"+chartHeading.toUpperCase()
				},
				exportEnabled: true,
				zoomEnabled: true,
				backgroundColor: "#FFFFFF",
				axisX:
				{
					title: " Year ",
					valueFormatString: "YYYY",
				},
				axisY:
				{
					title: " ",
					gridThickness: 0.2,
				},
				toolTip:
				{
					shared: true,
					
					contentFormatter: function(e)
					{
						var content="";
						for(var i=0;i<e.entries.length;i++)
						{
							content+=e.entries[i].dataPoint.x.getFullYear()+" ";
							content+="<strong>"+e.entries[i].dataSeries.name+ ":"+e.entries[i].dataPoint.y+ "</strong>";
							content+="<br>";
						}
						return content;
					},	
				},
				legend:
				{
					cursor: "pointer",
					verticalAlign: "top",
					horizontalAlign: "right",
					dockInsidePlotArea: true,
					itemclick: toogleDataSeries
				},
				data:
				[
					{
						type: "line",
						name: "Urban ",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseMamUrbanDataPoints()
					},
					{
						type: "line",
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseMamNonUrbanDataPoints()
					}
				]
			});
			chartJJA = new CanvasJS.Chart("chartContainer4",
			{
				title:
				{
					text: "JJA:"+chartHeading.toUpperCase()
				},
				exportEnabled: true,
				zoomEnabled: true,
				backgroundColor: "#FFFFFF",
				axisX:
				{
					title: " Year ",
					valueFormatString: "YYYY",
				},
				axisY:
				{
					title: " ",
					gridThickness: 0.2,
				},
				toolTip:
				{
					shared: true,
					contentFormatter: function(e)
					{
						var content="";
						for(var i=0;i<e.entries.length;i++)
						{
							content+=e.entries[i].dataPoint.x.getFullYear()+" ";
							content+="<strong>"+e.entries[i].dataSeries.name+ ":"+e.entries[i].dataPoint.y+ "</strong>";
							content+="<br>";
						}
						return content;
					},
				},
				legend:
				{
					cursor: "pointer",
					verticalAlign: "top",
					horizontalAlign: "right",
					dockInsidePlotArea: true,
					itemclick: toogleDataSeries
				},
				data:
				[
					{
						type: "line",
						name: "Urban ",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseJjaUrbanDataPoints()
					},
					{
						type: "line",
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseJjaNonUrbanDataPoints()
					}
				]

			});
			chartSON = new CanvasJS.Chart("chartContainer5",
			{
				title:
				{
					text: "SON:"+chartHeading.toUpperCase()
				},
				exportEnabled: true,
				zoomEnabled: true,
				backgroundColor: "#FFFFFF",
				axisX:
				{
					title: " Year ",
					valueFormatString: "YYYY",
				},
				axisY:
				{
					title: " ",
					gridThickness: 0.2,
				},
				toolTip:
				{
					shared: true,
					contentFormatter: function(e)
					{
						var content="";
						for(var i=0;i<e.entries.length;i++)
						{
							content+=e.entries[i].dataPoint.x.getFullYear()+" ";
							content+="<strong>"+e.entries[i].dataSeries.name+ ":"+e.entries[i].dataPoint.y+ "</strong>";
							content+="<br>";
						}
						return content;
					},
				},
				legend:
				{
					cursor: "pointer",
					verticalAlign: "top",
					horizontalAlign: "right",
					dockInsidePlotArea: true,
					itemclick: toogleDataSeries
				},
				data:
				[
					{
						type: "line",
						name: "Urban ",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseSonUrbanDataPoints()
					},
					{
						type: "line",
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseSonNonUrbanDataPoints()
					}
				]
			});
			chartDJF.render();
			chartMAM.render();
			chartJJA.render();
			chartSON.render();
		});
}


