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

var yearForReference=[];
var djfUrbanData=[];
var djfNonUrbanData=[];
var mamUrbanData=[];
var mamNonUrbanData=[];
var jjaUrbanData=[];
var jjaNonUrbanData=[];
var sonUrbanData=[];
var sonNonUrbanData=[];

var slopeSendjfUrbanData=0.0;
var slopeSendjfNonUrbanData=0.0;
var slopeSenmamUrbanData=0.0;
var slopeSenmamNonUrbanData=0.0;
var slopeSenjjaUrbanData=0.0;
var slopeSenjjaNonUrbanData=0.0;
var slopeSensonUrbanData=0.0;
var slopeSensonNonUrbanData=0.0;

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

var ZdjfUrban=0;
var ZdjfNonUrban=0;
var ZmamUrban=0;
var ZmamNonUrban=0;
var ZjjaUrban=0;
var ZjjaNonUrban=0;
var ZsonUrban=0;
var ZsonNonUrban=0;

var PdjfUrban=0;
var PdjfNonUrban=0;
var PmamUrban=0;
var PmamNonUrban=0;
var PjjaUrban=0;
var PjjaNonUrban=0;
var PsonUrban=0;
var PsonNonUrban=0;

var SdjfUrban;
var SdjfNonUrban;
var SmamUrban;
var SmamNonUrban;
var SjjaUrban;
var SjjaNonUrban;
var SsonUrban;
var SsonNonUrban;

var tUrban=[];
var tNonUrban=[];
var tAoi=[];

function handleFiles(files){
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
function parseNonUrbanDataPoints(){
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
function parseAoiDataPoints(){
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
function getYearlyDataFromCsv(csv){
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
                //console.log("Hello World1");
}
function parseYearlyMeanPointsUrban(){
	var tempDataPoints=[];
	//console.log(meanYears);
	for(var i=0;i<yearlyMeanUrban.length;i++)
	{

		tempDataPoints.push({
	         	x: new Date("JAN, "+meanYears[i]), 
	         	y: yearlyMeanUrban[i],
	       	}); 
	}
	return tempDataPoints;
}
function parseYearlyMeanPointsNonUrban(){
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
function processData(){

	var chartHeading=fileNameMonthly.substring(10,fileNameMonthly.length-4).toUpperCase()+"  ©iirs|isro";//setting file name to chart
	//alert(chartHeading+ "");
	var dps=[];
	var yearlyFileName="datafiles/YEARLY "+fileNameMonthly.substring(18,fileNameMonthly.length);
	//console.log(yearlyFileName);
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
function handleFiles2(files){
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
function getDataPointsFromFile(csv,index){
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
function parseDjfUrbanDataPoints(){
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
function parseDjfNonUrbanDataPoints(){
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
function parseMamUrbanDataPoints(){
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
function parseMamNonUrbanDataPoints(){
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
function parseJjaUrbanDataPoints(){
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
function parseJjaNonUrbanDataPoints(){
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
function parseSonNonUrbanDataPoints(){
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
function parseSonUrbanDataPoints(){
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

function calcS(){
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
	for(var i=0;i<tempDataUrban.length;i++)
	{
		var res=0;
		while(i<(tempDataUrban.length-1)&&tempDataUrban[i]==tempDataUrban[i+1])
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
		while(i<(tempDataNonUrban.length-1)&&tempDataNonUrban[i]==tempDataNonUrban[i+1])
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
		while(i<(tempDataAoi.length-1)&&tempDataAoi[i]==tempDataAoi[i+1])
		{
			res+=1;
			i++;
		}
		tAoi.push(res);
	}
	tUrban.sort();
	tNonUrban.sort();
	tAoi.sort();
	//removing 1 from the list of tied groups
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
	//calculating variance
	var n=12*countYears.length;
	//console.log("Years : "+countYears.length);
	var tiedGroupUrbanSum=0;
	for(var i=0;i<tUrban.length;i++)
	{
		tiedGroupUrbanSum+=(tUrban[i]*(tUrban[i]-1)*((2*tUrban[i])+5));
	}
	varSUrban=((n*(n-1)*((2*n)+5))-tiedGroupUrbanSum)/18;

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
	varSAoi=((n*(n-1)*((2*n)+5))-tiedGroupAoiSum)/18;
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

function calcDataForSeasonalAnalysis()
{
	SdjfUrban=0;
	SdjfNonUrban=0;
	SmamUrban=0;
	SmamNonUrban=0;
	SjjaUrban=0;
	SjjaNonUrban=0;
	SsonUrban=0;
	SsonNonUrban=0;
	//calculation of S
	for(var i=0;i<djfUrbanData.length;i++)
		for(var j=i+1;j<djfUrbanData.length;j++)
		{
			if((djfUrbanData[j]-djfUrbanData[i])>0)
				SdjfUrban+=1;
			else if((djfUrbanData[j]-djfUrbanData[i])<0)
				SdjfUrban-=1;
		}
	for(var i=0;i<djfNonUrbanData.length;i++)
		for(var j=i+1;j<djfNonUrbanData.length;j++)
		{
			if((djfNonUrbanData[j]-djfNonUrbanData[i])>0)
				SdjfNonUrban+=1;
			else if((djfNonUrbanData[j]-djfNonUrbanData[i])<0)
				SdjfNonUrban-=1;
		}
	for(var i=0;i<mamUrbanData.length;i++)
		for(var j=i+1;j<mamUrbanData.length;j++)
		{
			if((mamUrbanData[j]-mamUrbanData[i])>0)
				SmamUrban+=1;
			else if((mamUrbanData[j]-mamUrbanData[i])<0)
				SmamUrban-=1;
		}
	for(var i=0;i<mamNonUrbanData.length;i++)
		for(var j=i+1;j<mamNonUrbanData.length;j++)
		{
			if((mamNonUrbanData[j]-mamNonUrbanData[i])>0)
				SmamNonUrban+=1;
			else if((mamNonUrbanData[j]-mamNonUrbanData[i])<0)
				SmamNonUrban-=1;
		}
	for(var i=0;i<jjaUrbanData.length;i++)
		for(var j=i+1;j<jjaUrbanData.length;j++)
		{
			if((jjaUrbanData[j]-jjaUrbanData[i])>0)
				SjjaUrban+=1;
			else if((jjaUrbanData[j]-jjaUrbanData[i])<0)
				SjjaUrban-=1;
		}
	for(var i=0;i<jjaNonUrbanData.length;i++)
		for(var j=i+1;j<jjaNonUrbanData.length;j++)
		{
			if((jjaNonUrbanData[j]-jjaNonUrbanData[i])>0)
				SjjaNonUrban+=1;
			else if((jjaNonUrbanData[j]-jjaNonUrbanData[i])<0)
				SjjaNonUrban-=1;
		}
	for(var i=0;i<sonUrbanData.length;i++)
		for(var j=i+1;j<sonUrbanData.length;j++)
		{
			if((sonUrbanData[j]-sonUrbanData[i])>0)
				SsonUrban+=1;
			else if((sonUrbanData[j]-sonUrbanData[i])<0)
				SsonUrban-=1;
		}
	for(var i=0;i<sonNonUrbanData.length;i++)
		for(var j=i+1;j<sonNonUrbanData.length;j++)
		{
			if((sonNonUrbanData[j]-sonNonUrbanData[i])>0)
				SsonNonUrban+=1;
			else if((sonNonUrbanData[j]-sonNonUrbanData[i])<0)
				SsonNonUrban-=1;
		}
	var tempdjfUrbanData=[];
	var tempdjfNonUrbanData=[];
	var tempmamUrbanData=[];
	var tempmamNonUrbanData=[];
	var tempjjaUrbanData=[];
	var tempjjaNonUrbanData=[];
	var tempsonUrbanData=[];
	var tempsonNonUrbanData=[];
	for(var i=0;i<djfUrbanData.length;i++)
	{
		tempdjfUrbanData.push(djfUrbanData[i]);
		tempdjfNonUrbanData.push(djfNonUrbanData[i]);
	}
	for(var i=0;i<mamUrbanData.length;i++)
	{
		tempmamUrbanData.push(mamUrbanData[i]);
		tempmamNonUrbanData.push(mamNonUrbanData[i]);
	}
	for(var i=0;i<jjaUrbanData.length;i++)
	{
		tempjjaUrbanData.push(jjaUrbanData[i]);
		tempjjaNonUrbanData.push(jjaNonUrbanData[i]);
	}
	for(var i=0;i<sonUrbanData.length;i++)
	{
		tempsonUrbanData.push(sonUrbanData[i]);
		tempsonNonUrbanData.push(sonNonUrbanData[i]);
	}
	//Sort the data using temp arrays
	tempdjfUrbanData.sort();
	tempdjfNonUrbanData.sort();
	tempmamUrbanData.sort();
	tempmamNonUrbanData.sort();
	tempjjaUrbanData.sort();
	tempjjaNonUrbanData.sort();
	tempsonUrbanData.sort();
	tempsonNonUrbanData.sort();
	//count occurence of the data and store them in t array
	var tdjfUrbanData=[];
	var tdjfNonUrbanData=[];
	var tmamUrbanData=[];
	var tmamNonUrbanData=[];
	var tjjaUrbanData=[];
	var tjjaNonUrbanData=[];
	var tsonUrbanData=[];
	var tsonNonUrbanData=[];
	var res=0;
	for(var i=0;i<tempdjfUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempdjfUrbanData.length-1)&&tempdjfUrbanData[i]==tempdjfUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tdjfUrbanData.push(res);
	}
	for(var i=0;i<tempdjfNonUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempdjfNonUrbanData.length-1)&&tempdjfNonUrbanData[i]==tempdjfNonUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tdjfNonUrbanData.push(res);
	}
	for(var i=0;i<tempmamUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempmamUrbanData.length-1)&&tempmamUrbanData[i]==tempmamUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tmamUrbanData.push(res);
	}
	for(var i=0;i<tempmamNonUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempmamNonUrbanData.length-1)&&tempmamNonUrbanData[i]==tempmamNonUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tmamNonUrbanData.push(res);
	}
	for(var i=0;i<tempjjaUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempjjaUrbanData.length-1)&&tempjjaUrbanData[i]==tempjjaUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tjjaUrbanData.push(res);
	}
	for(var i=0;i<tempjjaNonUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempjjaNonUrbanData.length-1)&&tempjjaNonUrbanData[i]==tempjjaNonUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tjjaNonUrbanData.push(res);
	}
	for(var i=0;i<tempsonUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempsonUrbanData.length-1)&&tempsonUrbanData[i]==tempsonUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tsonUrbanData.push(res);
	}
	for(var i=0;i<tempsonNonUrbanData.length-1;i++)
	{
		res=1;
		while(i<(tempsonNonUrbanData.length-1)&&tempsonNonUrbanData[i]==tempsonNonUrbanData[i+1])
		{
			res+=1;
			i+=1;
		}
		tsonNonUrbanData.push(res);
	}
	//caluclate variance considering tied groups also
	var tiedGroupdjfUrbanSum=0;
	var tiedGroupdjfNonUrbanSum=0;
	var tiedGroupmamUrbanSum=0;
	var tiedGroupmamNonUrbanSum=0;
	var tiedGroupjjaUrbanSum=0;
	var tiedGroupjjaNonUrbanSum=0;
	var tiedGroupsonUrbanSum=0;
	var tiedGroupsonNonUrbanSum=0;
	for(var i=0;i<tdjfUrbanData.length;i++)
	{
		tiedGroupdjfUrbanSum+=(tdjfUrbanData[i]*(tdjfUrbanData[i]-1)*((2*tdjfUrbanData[i])+5));
	}
	for(var i=0;i<tdjfNonUrbanData.length;i++)
	{
		tiedGroupdjfNonUrbanSum+=(tdjfNonUrbanData[i]*(tdjfNonUrbanData[i]-1)*((2*tdjfNonUrbanData[i])+5));
	}
	for(var i=0;i<tmamUrbanData.length;i++)
	{
		tiedGroupmamUrbanSum+=(tmamUrbanData[i]*(tmamUrbanData[i]-1)*((2*tmamUrbanData[i])+5));
	}
	for(var i=0;i<tmamNonUrbanData.length;i++)
	{
		tiedGroupmamNonUrbanSum+=(tmamNonUrbanData[i]*(tmamNonUrbanData[i]-1)*((2*tmamNonUrbanData[i])+5));
	}
	for(var i=0;i<tjjaUrbanData.length;i++)
	{
		tiedGroupjjaUrbanSum+=(tjjaUrbanData[i]*(tjjaUrbanData[i]-1)*((2*tjjaUrbanData[i])+5));
	}
	for(var i=0;i<tjjaNonUrbanData.length;i++)
	{
		tiedGroupjjaNonUrbanSum+=(tjjaNonUrbanData[i]*(tjjaNonUrbanData[i]-1)*((2*tjjaNonUrbanData[i])+5));
	}
	for(var i=0;i<tsonUrbanData.length;i++)
	{
		tiedGroupsonUrbanSum+=(tsonUrbanData[i]*(tsonUrbanData[i]-1)*((2*tsonUrbanData[i])+5));
	}
	for(var i=0;i<tsonNonUrbanData.length;i++)
	{
		tiedGroupsonNonUrbanSum+=(tsonNonUrbanData[i]*(tsonNonUrbanData[i]-1)*((2*tsonNonUrbanData[i])+5));
	}
	var n=0;
	var varSdjfUrban=0;
	var varSdjfNonUrban=0;
	var varSmamUrban=0;
	var varSmamNonUrban=0;
	var varSjjaUrban=0;
	var varSjjaNonUrban=0;
	var varSsonUrban=0;
	var varSsonNonUrban=0;
	n=djfUrbanData.length;
	var varSdjfUrban=((n*(n-1)*((2*n)+5))-tiedGroupdjfUrbanSum)/18;
	n=djfNonUrbanData.length;
	var varSdjfNonUrban=((n*(n-1)*((2*n)+5))-tiedGroupdjfNonUrbanSum)/18;
	n=mamUrbanData.length;
	var varSmamUrban=((n*(n-1)*((2*n)+5))-tiedGroupmamUrbanSum)/18;
	n=mamNonUrbanData.length;
	var varSmamNonUrban=((n*(n-1)*((2*n)+5))-tiedGroupmamNonUrbanSum)/18;
	n=jjaUrbanData.length;
	var varSjjaUrban=((n*(n-1)*((2*n)+5))-tiedGroupjjaUrbanSum)/18;
	n=jjaNonUrbanData.length;
	var varSjjaNonUrban=((n*(n-1)*((2*n)+5))-tiedGroupjjaNonUrbanSum)/18;
	n=sonUrbanData.length;
	var varSsonUrban=((n*(n-1)*((2*n)+5))-tiedGroupsonUrbanSum)/18;
	n=sonNonUrbanData.length;
	var varSsonNonUrban=((n*(n-1)*((2*n)+5))-tiedGroupsonNonUrbanSum)/18;
	//console.log("VarianceS :\n"+varSdjfUrban+" & "+varSmamNonUrban);
	//Calculate Z for all the 4 seasons
	if(SdjfUrban>0)
	{
		ZdjfUrban=(SdjfUrban-1)/(Math.sqrt(varSdjfUrban));
	}
	else if(SdjfUrban<0)
	{
		ZdjfUrban=(SdjfUrban+1)/(Math.sqrt(varSdjfUrban));
	}
	else
		ZdjfUrban=0;
	if(SdjfNonUrban>0)
	{
		ZdjfNonUrban=(SdjfNonUrban-1)/(Math.sqrt(varSdjfNonUrban));
	}
	else if(SdjfNonUrban<0)
	{
		ZdjfNonUrban=(SdjfNonUrban+1)/(Math.sqrt(varSdjfNonUrban));
	}
	else
		ZdjfNonUrban=0;

	if(SmamUrban>0)
	{
		ZmamUrban=(SmamUrban-1)/(Math.sqrt(varSmamUrban));
	}
	else if(SmamUrban<0)
	{
		ZmamUrban=(SmamUrban+1)/(Math.sqrt(varSmamUrban));
	}
	else
		ZmamUrban=0;
	if(SmamNonUrban>0)
	{
		ZmamNonUrban=(SmamNonUrban-1)/(Math.sqrt(varSmamNonUrban));
	}
	else if(SmamNonUrban<0)
	{
		ZmamNonUrban=(SmamNonUrban+1)/(Math.sqrt(varSmamNonUrban));
	}
	else
		ZmamNonUrban=0;

	if(SjjaUrban>0)
	{
		ZjjaUrban=(SjjaUrban-1)/(Math.sqrt(varSjjaUrban));
	}
	else if(SjjaUrban<0)
	{
		ZjjaUrban=(SjjaUrban+1)/(Math.sqrt(varSjjaUrban));
	}
	else
		ZjjaUrban=0;
	if(SjjaNonUrban>0)
	{
		ZjjaNonUrban=(SjjaNonUrban-1)/(Math.sqrt(varSjjaNonUrban));
	}
	else if(SdjfNonUrban<0)
	{
		ZjjaNonUrban=(SjjaNonUrban+1)/(Math.sqrt(varSjjaNonUrban));
	}
	else
		ZjjaNonUrban=0;

	if(SsonUrban>0)
	{
		ZsonUrban=(SsonUrban-1)/(Math.sqrt(varSsonUrban));
	}
	else if(SsonUrban<0)
	{
		ZsonUrban=(SsonUrban+1)/(Math.sqrt(varSsonUrban));
	}
	else
		ZsonUrban=0;
	if(SsonNonUrban>0)
	{
		ZsonNonUrban=(SsonNonUrban-1)/(Math.sqrt(varSsonNonUrban));
	}
	else if(SsonNonUrban<0)
	{
		ZsonNonUrban=(SsonNonUrban+1)/(Math.sqrt(varSsonNonUrban));
	}
	else
		ZsonNonUrban=0;
	//Calculating value of P using z obtained above
	PdjfUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZdjfUrban,2)));
	PdjfNonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZdjfNonUrban,2)));

	PmamUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZmamUrban,2)));
	PmamNonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZmamNonUrban,2)));

	PjjaUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZjjaUrban,2)));
	PjjaNonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZjjaNonUrban,2)));

	PsonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZsonUrban,2)));
	PsonNonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZsonNonUrban,2)));

	//Finding sens slope for Urban Data
	var temp=0;
	var sendjfUrbanData=[];
	for(var i=0;i<djfUrbanData.length;i++)
	{
		for(var j=i+1;j<djfUrbanData.length;j++)
		{
			var dk=(djfUrbanData[j]-djfUrbanData[i])/(j-i);
			sendjfUrbanData.push(dk);
		}
	}
	//console.log(sendjfUrbanData);
	sendjfUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	//console.log(sendjfUrbanData);
	temp=sendjfUrbanData.length;
	//console.log(temp);
	if(temp%2==0)//even case
	{

		slopeSendjfUrbanData=(sendjfUrbanData[(temp/2)-1]+sendjfUrbanData[temp/2])/2;
		if(slopeSendjfUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<sendjfUrbanData.length;i++)
				{
					if(sendjfUrbanData[i].toString()!="NaN")
					{
						slopeSendjfUrbanData=sendjfUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSendjfUrbanData=sendjfUrbanData[temp/2];
		if(slopeSendjfUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<sendjfUrbanData.length;i++)
				{
					if(sendjfUrbanData[i].toString()!="NaN")
					{
						slopeSendjfUrbanData=sendjfUrbanData[i];
						break;
					}
				}
			}
	}

	var sendjfNonUrbanData=[];
	for(var i=0;i<djfNonUrbanData.length;i++)
	{
		for(var j=i+1;j<djfNonUrbanData.length;j++)
		{
			var dk=(djfNonUrbanData[j]-djfNonUrbanData[i])/(j-i);
			sendjfNonUrbanData.push(dk);
		}
	}
	sendjfNonUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=sendjfNonUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSendjfNonUrbanData=(sendjfNonUrbanData[(temp/2)-1]+sendjfNonUrbanData[temp/2])/2;
		if(slopeSendjfNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<sendjfNonUrbanData.length;i++)
				{
					if(sendjfNonUrbanData[i].toString()!="NaN")
					{
						slopeSendjfNonUrbanData=sendjfNonUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSendjfNonUrbanData=sendjfNonUrbanData[temp/2];
		if(slopeSendjfNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<sendjfNonUrbanData.length;i++)
				{
					if(sendjfNonUrbanData[i].toString()!="NaN")
					{
						slopeSendjfNonUrbanData=sendjfNonUrbanData[i];
						break;
					}
				}
			}
	}

	//for MAM
	var senmamUrbanData=[];
	for(var i=0;i<mamUrbanData.length;i++)
	{
		for(var j=i+1;j<mamUrbanData.length;j++)
		{
			var dk=(mamUrbanData[j]-mamUrbanData[i])/(j-i);
			senmamUrbanData.push(dk);
		}
	}
	//console.log(sendjfUrbanData);
	senmamUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	//console.log(sendjfUrbanData);
	temp=senmamUrbanData.length;
	//console.log(temp);
	if(temp%2==0)//even case
	{

		slopeSenmamUrbanData=(senmamUrbanData[(temp/2)-1]+senmamUrbanData[temp/2])/2;
		if(slopeSenmamUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senmamUrbanData.length;i++)
				{
					if(senmamUrbanData[i].toString()!="NaN")
					{
						slopeSenmamUrbanData=senmamUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSenmamUrbanData=senmamUrbanData[temp/2];
		if(slopeSenmamUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senmamUrbanData.length;i++)
				{
					if(senmamUrbanData[i].toString()!="NaN")
					{
						slopeSenmamUrbanData=senmamUrbanData[i];
						break;
					}
				}
			}
	}

	var senmamNonUrbanData=[];
	for(var i=0;i<mamNonUrbanData.length;i++)
	{
		for(var j=i+1;j<mamNonUrbanData.length;j++)
		{
			var dk=(mamNonUrbanData[j]-mamNonUrbanData[i])/(j-i);
			senmamNonUrbanData.push(dk);
		}
	}
	senmamNonUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=senmamNonUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSenmamNonUrbanData=(senmamNonUrbanData[(temp/2)-1]+senmamNonUrbanData[temp/2])/2;
		if(slopeSenmamNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senmamNonUrbanData.length;i++)
				{
					if(senmamNonUrbanData[i].toString()!="NaN")
					{
						slopeSenmamNonUrbanData=senmamNonUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSenmamNonUrbanData=senmamNonUrbanData[temp/2];
		if(slopeSenmamNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senmamNonUrbanData.length;i++)
				{
					if(senmamNonUrbanData[i].toString()!="NaN")
					{
						slopeSenmamNonUrbanData=senmamNonUrbanData[i];
						break;
					}
				}
			}
	}
	//for JJA
	var senjjaUrbanData=[];
	for(var i=0;i<jjaUrbanData.length;i++)
	{
		for(var j=i+1;j<jjaUrbanData.length;j++)
		{
			var dk=(jjaUrbanData[j]-jjaUrbanData[i])/(j-i);
			senjjaUrbanData.push(dk);
		}
	}
	//console.log(sendjfUrbanData);
	senjjaUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	//console.log(sendjfUrbanData);
	temp=senjjaUrbanData.length;
	//console.log(temp);
	if(temp%2==0)//even case
	{

		slopeSenjjaUrbanData=(senjjaUrbanData[(temp/2)-1]+senjjaUrbanData[temp/2])/2;
		if(slopeSenjjaUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senjjaUrbanData.length;i++)
				{
					if(senjjaUrbanData[i].toString()!="NaN")
					{
						slopeSenjjaUrbanData=senjjaUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSenjjaUrbanData=senjjaUrbanData[temp/2];
		if(slopeSenjjaUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senjjaUrbanData.length;i++)
				{
					if(senjjaUrbanData[i].toString()!="NaN")
					{
						slopeSenjjaUrbanData=senjjaUrbanData[i];
						break;
					}
				}
			}
	}

	var senjjaNonUrbanData=[];
	for(var i=0;i<jjaNonUrbanData.length;i++)
	{
		for(var j=i+1;j<jjaNonUrbanData.length;j++)
		{
			var dk=(jjaNonUrbanData[j]-jjaNonUrbanData[i])/(j-i);
			senjjaNonUrbanData.push(dk);
		}
	}
	senjjaNonUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=senjjaNonUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSenjjaNonUrbanData=(senjjaNonUrbanData[(temp/2)-1]+senjjaNonUrbanData[temp/2])/2;
		if(slopeSenjjaNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senjjaNonUrbanData.length;i++)
				{
					if(senjjaNonUrbanData[i].toString()!="NaN")
					{
						slopeSenjjaNonUrbanData=senjjaNonUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSenjjaNonUrbanData=senjjaNonUrbanData[temp/2];
		if(slopeSenjjaNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<senjjaNonUrbanData.length;i++)
				{
					if(senjjaNonUrbanData[i].toString()!="NaN")
					{
						slopeSenjjaNonUrbanData=senjjaNonUrbanData[i];
						break;
					}
				}
			}
	}
	//For SON
	var sensonUrbanData=[];
	for(var i=0;i<sonUrbanData.length;i++)
	{
		for(var j=i+1;j<sonUrbanData.length;j++)
		{
			var dk=(sonUrbanData[j]-sonUrbanData[i])/(j-i);
			sensonUrbanData.push(dk);
		}
	}
	//console.log(sendjfUrbanData);
	sensonUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	//console.log(sendjfUrbanData);
	temp=sensonUrbanData.length;
	//console.log(temp);
	if(temp%2==0)//even case
	{

		slopeSensonUrbanData=(sensonUrbanData[(temp/2)-1]+sensonUrbanData[temp/2])/2;
		if(slopeSensonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<sensonUrbanData.length;i++)
				{
					if(sensonUrbanData[i].toString()!="NaN")
					{
						slopeSensonUrbanData=sensonUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSensonUrbanData=sensonUrbanData[temp/2];
		if((slopeSensonUrbanData+"").toString()=="NaN")
			{
				for(var i=temp/2;i<sensonUrbanData.length;i++)
				{
					if(sensonUrbanData[i].toString()!="NaN")
					{
						slopeSensonUrbanData=sensonUrbanData[i];
						break;
					}
				}
			}
	}

	var sensonNonUrbanData=[];
	for(var i=0;i<sonNonUrbanData.length;i++)
	{
		for(var j=i+1;j<sonNonUrbanData.length;j++)
		{
			var dk=(sonNonUrbanData[j]-sonNonUrbanData[i])/(j-i);
			sensonNonUrbanData.push(dk);
		}
	}
	sensonNonUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=sensonNonUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSensonNonUrbanData=(sensonNonUrbanData[(temp/2)-1]+sensonNonUrbanData[temp/2])/2;
		if(slopeSensonNonUrbanData.toString()=="NaN")
			{
				for(var i=temp/2;i<sensonNonUrbanData.length;i++)
				{
					if(sensonNonUrbanData[i].toString()!="NaN")
					{
						slopeSensonNonUrbanData=sensonNonUrbanData[i];
						break;
					}
				}
			}
	}
	else//odd case
	{
		slopeSensonNonUrbanData=sensonNonUrbanData[temp/2];
		if((slopeSensonNonUrbanData+"").toString()=="NaN")
			{
				for(var i=temp/2;i<sensonNonUrbanData.length;i++)
				{
					if(sensonNonUrbanData[i].toString()!="NaN")
					{
						slopeSensonNonUrbanData=sensonNonUrbanData[i];
						break;
					}
				}
			}
	}
}
function processData2(){
		var chartHeading=fileNameSeasonal.substring(10,fileNameSeasonal.length-4);//setting file name to chart
		$.get(fileNameSeasonal,function(data)
		{
			getDataPointsFromFile(data,0);//data initialisation in the arrays
			calcS();
			calcDataForSeasonalAnalysis();
			chartDJFUrban=new CanvasJS.Chart("chartContainer2",
			{
				title:
				{
					text: "Urban:DJF:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "This is a Subtitle",
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
					}
				]
			});
			chartMAMUrban = new CanvasJS.Chart("chartContainer3",
			{
				title:
				{
					text: "Urban:MAM:"+chartHeading.toUpperCase()
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
					}
				]
			});
			chartJJAUrban = new CanvasJS.Chart("chartContainer4",
			{
				title:
				{
					text: "Urban:JJA:"+chartHeading.toUpperCase()
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
					}
				]
			});
			chartSONUrban = new CanvasJS.Chart("chartContainer5",
			{
				title:
				{
					text: "Urban:SON:"+chartHeading.toUpperCase()
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
					}
				]
			});
			chartDJFNonUrban=new CanvasJS.Chart("chartContainer10",
			{
				title:
				{
					text: "Non Urban:DJF:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "This is a Subtitle",
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
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseDjfNonUrbanDataPoints()
					}]
			});
			chartMAMNonUrban = new CanvasJS.Chart("chartContainer11",
			{
				title:
				{
					text: "Non Urban:MAM:"+chartHeading.toUpperCase()
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
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseMamNonUrbanDataPoints()
					}
				]
			});
			chartJJANonUrban = new CanvasJS.Chart("chartContainer12",
			{
				title:
				{
					text: "Non Urban:JJA:"+chartHeading.toUpperCase()
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
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseJjaNonUrbanDataPoints()
					}]
			});
			chartSONNonUrban = new CanvasJS.Chart("chartContainer13",
			{
				title:
				{
					text: "Non Urban:SON:"+chartHeading.toUpperCase()
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
						name: "Non Urban :",
						axisYType: "primary",
						highlightEnabled: true,
						markerSize: 0,
						dataPoints: parseSonNonUrbanDataPoints()
					}
				]
			});
			chartDJFUrban.render();
			chartMAMUrban.render();
			chartJJAUrban.render();
			chartSONUrban.render();
			chartDJFNonUrban.render();
			chartMAMNonUrban.render();
			chartJJANonUrban.render();
			chartSONNonUrban.render();
		});
}

var fileNameCity1="";
var fielNameCity2="";
function handleFilesCity1()
{
// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		//console.log(document.getElementById("csvFileInput").value);
		fileNameCity1="datafiles/"+files[0].name;
		flag=1;
		//alert("File name : " + fileNameMonthly);
		processDataCity1();
	} else {
		alert('FileReader are not supported in this browser.');
	}	
}
function handleFilesCity2()
{
// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		//console.log(document.getElementById("csvFileInput").value);
		fileNameCity2="datafiles/"+files[0].name;
		flag=1;
		//alert("File name : " + fileNameMonthly);
		processDataCity2();
	} else {
		alert('FileReader are not supported in this browser.');
	}	
}