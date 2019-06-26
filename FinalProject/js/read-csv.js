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

var significancedjfUrbanMonthly="";
var significancedjfNonUrbanMonthly="";
var significancemamUrbanMonthly="";
var significancemamNonUrbanMonthly="";
var significancejjaUrbanMonthly="";
var significancejjaNonUrbanMonthly="";
var significancesonUrbanMonthly="";
var significancesonNonUrbanMonthly="";

var significanceUrbanMonthly="";
var significanceNonUrbanMonthly="";
var fileNameCity1="";
var fielNameCity2="";
var dataPointsUrbanCity1=[];
var dataPointsUrbanCity2=[];
var dataPointsNonUrbanCity1=[];
var dataPointsNonUrbanCity2=[];

var monthYearCity1=[];
var monthYearCity2=[];

var SUrban=0;
var SNonUrban=0;
var SAoi=0;
var varSUrban=0;
var varSNonUrban=0;
var varSAoi=0;

var yearlyMeanUrban=[];
var yearlyMeanNonUrban=[];
var meanYears=[];
var yearlyMinUrban=[];
var yearlyMaxUrban=[];
var yearlyMinNonUrban=[];
var yearlyMaxNonUrban=[];

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

var minUrbanDataPoints=[];
var maxUrbanDataPoints=[];
var minNonUrbanDataPoints=[];
var maxNonUrbanDataPoints=[];

var storedjfData=[];
var storemamData=[];
var storejjaData=[];
var storesonData=[];

function handleFiles(files){
	// Check for the various File API support.
		if (window.FileReader) {
		// FileReader are supported.
		fileNameMonthly="datafiles/"+files[0].name;
		flag=1;
		//alert("File name : " + fileNameMonthly);
		processData();
	} else {
		alert('FileReaders are not supported in this browser.');
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
			minUrbanDataPoints=[];
			minNonUrbanDataPoints=[];
			maxUrbanDataPoints=[];
			maxNonUrbanDataPoints=[];

			yearlyMeanUrban=[];
    		yearlyMeanNonUrban=[];
    		yearlyMinUrban=[];
			yearlyMaxUrban=[];
			yearlyMinNonUrban=[];
			yearlyMaxNonUrban=[];

            var dataPoints = [];
            var csvLines=[];
            var points=[];
            csvLines = csv.split(/[\r?\n|\r|\n]+/);  
            var tempPoints=[];
            tempPoints=csvLines[0].split(","); 
            yAxisLabel=tempPoints[7]+"";
            lineOneLabel=tempPoints[2]+"";
            lineTwoLabel=tempPoints[3]+"";
		   	var presentYear="";
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
                    minUrbanDataPoints.push(parseFloat(points[3]));
                    maxUrbanDataPoints.push(parseFloat(points[4]));
                    if(points[5]!="")
                    {
                    	yearlyMeanUrban.push(parseFloat(points[5]));
	                    yearlyMinUrban.push(parseFloat(points[6]));
	                    yearlyMaxUrban.push(parseFloat(points[7]));
                    }
                    nonUrbanData.push(parseFloat(points[12]));
                    slopeNonUrbanData.push(parseFloat(points[12]));
                    tempDataNonUrban.push(parseFloat(points[12]));
					minNonUrbanDataPoints.push(parseFloat(points[13]));
					maxNonUrbanDataPoints.push(parseFloat(points[14]));
					if(points[15]!="")
					{
						yearlyMeanNonUrban.push(parseFloat(points[15]));
	                    yearlyMinNonUrban.push(parseFloat(points[16]));
	                    yearlyMaxNonUrban.push(parseFloat(points[17]));   
					}
					
                }
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
	    }   
	return tempDataPoints;  
}
function parseYearlyMeanPointsUrban(){
	var tempDataPoints=[];
	for(var i=0;i<countYears.length;i++)
	{

		tempDataPoints.push({
	         	x: new Date("JAN, "+countYears[i]), 
	         	y: yearlyMeanUrban[i],
	       	}); 
	}
	return tempDataPoints;
}
function parseYearlyMeanPointsNonUrban(){
	var tempDataPoints=[];
	for(var i=0;i<countYears.length;i++)
	{
		tempDataPoints.push({
	         	x: new Date("JAN, "+countYears[i]), 
	         	y: parseFloat(yearlyMeanNonUrban[i]),
	       	}); 
	}
	return tempDataPoints;
}
function retrieveDataPoints(arr){
	var dataPoints=[];
	var k=0;
	for(var i=0;i<arr.length;i++)
	{	
		for(var j=0;j<12;j++)
		{
			dataPoints.push(
			{
				x: new Date(month[j]+", "+countYears[k]),
				y: parseFloat(arr[i]),
			});
			i+=1;
		}
		k+=1;
		i-=1;
	}
	return dataPoints;
}
function retrieveYearlyDataPoints(arr)
{
	var tempDataPoints=[];
	for(var i=0;i<arr.length;i++)
	{
		tempDataPoints.push(
		{
			x: new Date("JAN, "+countYears[i]),
			y: parseFloat(arr[i]),
		});
	}
	return tempDataPoints;
}

function processData(){

	var chartHeading=fileNameMonthly.substring(10,fileNameMonthly.length-4).toUpperCase()+"  ©iirs|isro";//setting file name to chart
	var dps=[];
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
	significanceUrbanMonthly=chartSubHeading3;
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
          title: " ",
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
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "center",
			dockInsidePlotArea: false,
			
			itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
 
                e.chart.render();
            }
		},
		data: [
		{//Max Urban Line
			type: "line",
			axisXIndex:0,
			axisYType: "primary",
			name: "MAX",
			lineThickness:2,
			//lineColor: 'black',
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: retrieveDataPoints(maxUrbanDataPoints)//reading data from the 3rd column
		},
		{//Urban Line
			type: "line",
			axisXIndex:0,
			axisYType: "primary",
			name: "MEAN",
			lineThickness:2,
			//lineColor: 'black',
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: getDataPointsFromCSV(data, 2)//reading data from the 3rd column
		},
		{//Min Urban Line
			type: "line",
			axisXIndex:0,
			axisYType: "primary",
			name: "MIN",
			lineThickness:2,
			//lineColor: 'black',
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: retrieveDataPoints(minUrbanDataPoints)//reading data from the 3rd column
		},
		{//Yearly Max Points
			type:"scatter",
			axisXIndex:1,
			axisYType: "primary",
			name: "Yearly Max",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: retrieveYearlyDataPoints(yearlyMaxUrban)
		},
		{//Yearly Mean Points
			type:"scatter",
			axisXIndex:1,
			axisYType: "primary",
			name: "Yearly Mean ",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: parseYearlyMeanPointsUrban()
		},
		{//Yearly Min Points
			type:"scatter",
			axisXIndex:1,
			axisYType: "primary",
			name: "Yearly Min",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: retrieveYearlyDataPoints(yearlyMinUrban)
		},
		]
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
		significanceNonUrbanMonthly=chartSubHeading6;
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
          title: " ",
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
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "center",
			dockInsidePlotArea: false,
			itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
 
                e.chart.render();
            }
		},
		
		data: [
		{//Non Urban Max Line
			type: "line",
			axisYType: "primary",
			name: "MAX",
			lineThickness:2,
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: retrieveDataPoints(maxNonUrbanDataPoints),
		},
		{//Non Urban Line
			type: "line",
			axisYType: "primary",
			name: "MEAN",
			lineThickness:2,
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: getDataPointsFromCSV(data, 3)
		},
		{//Non Urban Min Line
			type: "line",
			axisYType: "primary",
			name: "MIN",
			lineThickness:2,
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "####.####",
			dataPoints: retrieveDataPoints(minNonUrbanDataPoints),
		},
		{//Yearly Max Points
			type:"scatter",
			axisXIndex:1,
			axisYType: "primary",
			name: "Yearly Max",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: retrieveYearlyDataPoints(yearlyMaxNonUrban),
		},
		{//Yearly Mean Points
			type:"scatter",
			axisXIndex:1,
			axisYType: "primary",
			name: "Yearly Mean ",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: parseYearlyMeanPointsNonUrban()
		},
		{//Yearly Min Points
			type:"scatter",
			axisXIndex:1,
			axisYType: "primary",
			name: "Yearly Min",
			showInLegend: true,
			yValueFormatString: "####.####",
			dataPoints: retrieveYearlyDataPoints(yearlyMinNonUrban),
		}
		]
	});
		
		

		chart1.render();
		chart2.render();
	});
} 
function handleFiles2(files){
	// Check for the various File API support.
		if (window.FileReader) {
		// FileReader are supported.
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
	csvLines = csv.split(/[\r?\n|\r|\n]+/);
	for(var i=1;i<csvLines.length;i++)
	{
		if(csvLines[i].length>0)
		{
			points=csvLines[i].split(",");
			if(points[0]!=""&&points[0].toUpperCase()!="YEAR")
				typeOfSeason=points[0].toUpperCase();
			if(typeOfSeason=="DJF"&&parseFloat("0"+points[1])>0)
			{
				djfUrbanData.push(parseFloat(points[2]));
				djfNonUrbanData.push(parseFloat(points[3]));
			}
			else if(typeOfSeason=="MAM"&&parseFloat("0"+points[1])>0)
			{
				mamUrbanData.push(parseFloat(points[2]));
				mamNonUrbanData.push(parseFloat(points[3]));
			}
			else if(typeOfSeason=="JJA"&&parseFloat("0"+points[1])>0)
			{
				jjaUrbanData.push(parseFloat(points[2]));
				jjaNonUrbanData.push(parseFloat(points[3]));
			}
			else if(typeOfSeason=="SON"&&parseFloat("0"+points[1])>0)
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


	PUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZUrban,2)));
	PNonUrban=0.3989422804*(Math.exp(-0.5*Math.pow(ZNonUrban,2)));

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
	if(temp%2==0)//even case
	{
		slopeSenUrbanData=(senUrbanData[(temp/2)-1]+senUrbanData[temp/2])/2;
	}
	else//odd case
	{
		slopeSenUrbanData=senUrbanData[temp/2];
	}
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
function calcDataForSeasonalAnalysis(){
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
		tempsonUrbanData.push(parseFloat(sonUrbanData[i]));
		tempsonNonUrbanData.push(parseFloat(sonNonUrbanData[i]));
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
			sendjfUrbanData.push(parseFloat(dk));
		}
	}
	sendjfUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=sendjfUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSendjfUrbanData=(sendjfUrbanData[parseInt((temp-2)/2)]+sendjfUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSendjfUrbanData=sendjfUrbanData[parseInt(temp/2)];
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
		slopeSendjfNonUrbanData=(sendjfNonUrbanData[parseInt((temp/2)-1)]+sendjfNonUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSendjfNonUrbanData=sendjfNonUrbanData[parseInt(temp/2)];
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
	senmamUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=senmamUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSenmamUrbanData=(senmamUrbanData[parseInt((temp/2)-1)]+senmamUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSenmamUrbanData=senmamUrbanData[parseInt(temp/2)];
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
		slopeSenmamNonUrbanData=(senmamNonUrbanData[parseInt((temp/2)-1)]+senmamNonUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSenmamNonUrbanData=senmamNonUrbanData[parseInt(temp/2)];
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
	senjjaUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=senjjaUrbanData.length;
	if(temp%2==0)//even case
	{
		slopeSenjjaUrbanData=(senjjaUrbanData[parseInt((temp/2)-1)]+senjjaUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSenjjaUrbanData=senjjaUrbanData[parseInt(temp/2)];
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
		slopeSenjjaNonUrbanData=(senjjaNonUrbanData[parseInt((temp/2)-1)]+senjjaNonUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSenjjaNonUrbanData=senjjaNonUrbanData[parseInt(temp/2)];
	}
	//For SON
	var sensonUrbanData=[];
	for(var i=0;i<sonUrbanData.length;i++)
	{
		for(var j=i+1;j<sonUrbanData.length;j++)
		{
			var dk=(parseFloat(sonUrbanData[j])-parseFloat(sonUrbanData[i]))/(j-i);
			sensonUrbanData.push(parseFloat("0"+dk));
		}
	}
	sensonUrbanData.sort(
		function(a,b)
		{
			return a-b;
		});
	temp=sensonUrbanData.length;
	if(temp%2==0)//even case
	{

		slopeSensonUrbanData=(sensonUrbanData[parseInt((temp/2)-1)]+sensonUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSensonUrbanData=sensonUrbanData[parseInt(temp/2)];
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
		slopeSensonNonUrbanData=(sensonNonUrbanData[parseInt((temp/2)-1)]+sensonNonUrbanData[parseInt(temp/2)])/2;
	}
	else//odd case
	{
		slopeSensonNonUrbanData=sensonNonUrbanData[parseInt(temp/2)];
	}
}
function processData2(){
		var chartHeading=fileNameSeasonal.substring(10,fileNameSeasonal.length-4);//setting file name to chart
		$.get(fileNameSeasonal,function(data)
		{
			getDataPointsFromFile(data,0);//data initialisation in the arrays
			calcS();
			calcDataForSeasonalAnalysis();
			if(PdjfUrban<0.001||PdjfUrban<0.01||PdjfUrban<0.05||PdjfUrban<0.1)
			{
				if(PdjfUrban<0.001)
				{
					significancedjfUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PdjfUrban<0.01)
				{
					significancedjfUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PdjfUrban<0.05)
				{
					significancedjfUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancedjfUrbanMonthly="SIGNIFICANT 90%";
					
			}
			else
				significancedjfUrbanMonthly=" NON SIGNIFICANT";
			chartDJFUrban=new CanvasJS.Chart("chartContainer2",
			{
				title:
				{
					text: "Urban:DJF:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PdjfUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZdjfUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+parseFloat(slopeSendjfUrbanData).toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancedjfUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
			if(PmamUrban<0.001||PmamUrban<0.01||PmamUrban<0.05||PmamUrban<0.1)
			{
				if(PmamUrban<0.001)
				{
					significancemamUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PmamUrban<0.01)
				{
					significancemamUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PmamUrban<0.05)
				{
					significancemamUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancemamUrbanMonthly="SIGNIFICANT 90%";
					
			}
			else
				significancemamUrbanMonthly=" NON SIGNIFICANT";
			chartMAMUrban = new CanvasJS.Chart("chartContainer3",
			{
				title:
				{
					text: "Urban:MAM:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PmamUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZmamUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+parseFloat(slopeSenmamUrbanData).toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancemamUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
						dataPoints: parseMamUrbanDataPoints()
					}
				]
			});
			if(PjjaUrban<0.001||PjjaUrban<0.01||PjjaUrban<0.05||PjjaUrban<0.1)
			{
				if(PjjaUrban<0.001)
				{
					significancejjaUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PjjaUrban<0.01)
				{
					significancejjaUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PjjaUrban<0.05)
				{
					significancejjaUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancejjaUrbanMonthly="SIGNIFICANT 90%";
					
			}
			else
				significancejjaUrbanMonthly=" NON SIGNIFICANT";
			chartJJAUrban = new CanvasJS.Chart("chartContainer4",
			{
				title:
				{
					text: "Urban:JJA:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PjjaUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZjjaUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+parseFloat(slopeSenjjaUrbanData).toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancejjaUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
						dataPoints: parseJjaUrbanDataPoints()
					}
				]
			});
			if(PsonUrban<0.001||PsonUrban<0.01||PsonUrban<0.05||PsonUrban<0.1)
			{
				if(PsonUrban<0.001)
				{
					significancesonUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PsonUrban<0.01)
				{
					significancesonUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PsonUrban<0.05)
				{
					significancesonUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancesonUrbanMonthly="SIGNIFICANT 90%";
					
			}
			else
				significancesonUrbanMonthly=" NON SIGNIFICANT";
			chartSONUrban = new CanvasJS.Chart("chartContainer5",
			{
				title:
				{
					text: "Urban:SON:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PsonUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZsonUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+slopeSensonUrbanData.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancesonUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
						dataPoints: parseSonUrbanDataPoints()
					}
				]
			});
			if(PdjfNonUrban<0.1)
			{
				if(PdjfNonUrban<0.001)
				{
					significancedjfNonUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PdjfNonUrban<0.01)
				{
					significancedjfNonUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PdjfNonUrban<0.05)
				{
					significancedjfNonUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancedjfNonUrbanMonthly="SIGNIFICANT 90%";	
			}
			else
				significancedjfNonUrbanMonthly=" NON SIGNIFICANT";
			chartDJFNonUrban=new CanvasJS.Chart("chartContainer10",
			{
				title:
				{
					text: "Non Urban:DJF:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PdjfNonUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZdjfNonUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+slopeSendjfNonUrbanData.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancedjfNonUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
			if(PmamNonUrban<0.1)
			{
				if(PmamNonUrban<0.001)
				{
					significancemamNonUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PmamNonUrban<0.01)
				{
					significancemamNonUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PmamNonUrban<0.05)
				{
					significancemamNonUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancemamNonUrbanMonthly="SIGNIFICANT 90%";	
			}
			else
				significancemamNonUrbanMonthly=" NON SIGNIFICANT";
			chartMAMNonUrban = new CanvasJS.Chart("chartContainer11",
			{
				title:
				{
					text: "Non Urban:MAM:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PmamNonUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZmamNonUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+slopeSenmamNonUrbanData.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancemamNonUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
						dataPoints: parseMamNonUrbanDataPoints()
					}
				]
			});
			if(PjjaNonUrban<0.1)
			{
				if(PjjaNonUrban<0.001)
				{
					significancejjaNonUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PjjaNonUrban<0.01)
				{
					significancejjaNonUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PjjaNonUrban<0.05)
				{
					significancejjaNonUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancejjaNonUrbanMonthly="SIGNIFICANT 90%";	
			}
			else
				significancejjaNonUrbanMonthly=" NON SIGNIFICANT";
			chartJJANonUrban = new CanvasJS.Chart("chartContainer12",
			{
				title:
				{
					text: "Non Urban:JJA:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PjjaNonUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZjjaNonUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+slopeSenjjaNonUrbanData.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancejjaNonUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
						dataPoints: parseJjaNonUrbanDataPoints()
					}]
			});
			if(PsonNonUrban<0.1)
			{
				if(PsonNonUrban<0.001)
				{
					significancesonNonUrbanMonthly="SIGNIFICANT 99.9%";
				}
				else if(PsonNonUrban<0.01)
				{
					significancesonNonUrbanMonthly="SIGNIFICANT 99%";
				}
				else if(PsonNonUrban<0.05)
				{
					significancesonNonUrbanMonthly="SIGNIFICANT 95%";
				}	
				else
					significancesonNonUrbanMonthly="SIGNIFICANT 90%";	
			}
			else
				significancesonNonUrbanMonthly=" NON SIGNIFICANT";
			chartSONNonUrban = new CanvasJS.Chart("chartContainer13",
			{
				title:
				{
					text: "Non Urban:SON:"+chartHeading.toUpperCase()
				},
				subtitles:[
				{
					text: "P: "+PsonNonUrban.toPrecision(4),
					fontStyle: "normal",
					fontWeight: "normal",
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Z: "+ZsonNonUrban.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:"Sens Slope: "+slopeSensonNonUrbanData.toPrecision(4),
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:false,
				},
				{
					text:significancesonNonUrbanMonthly,
					horizontalAlign: "right",
					verticalAlign: "top",
					dockInsidePlotArea:true,
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
function initialiseDataPointsCity1(csv){
	var dataPoints = [];   
    var csvLines=[];
    var points=[];
    dataPointsUrbanCity1=[];
    dataPointsNonUrbanCity1=[];
    monthYearCity1=[];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);
    presentYear="";
	for(var i=1;i<csvLines.length;i++)
	{
		if(csvLines[i].length>0)
		{
			points=csvLines[i].split(",");
			if(points[0]!="")
				presentYear=points[0];
			var tempDate=points[1].substring(0,3)+", "+presentYear;
			monthYearCity1.push(tempDate);
			dataPointsUrbanCity1.push(points[2]);
			dataPointsNonUrbanCity1.push(points[3]);
		}
	}
}
function initialiseDataPointsCity2(csv){
	var dataPoints = [];   
    var csvLines=[];
    var points=[];
    dataPointsUrbanCity2=[];
    dataPointsNonUrbanCity2=[];
    monthYearCity2=[];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);
    presentYear="";
	for(var i=1;i<csvLines.length;i++)
	{
		if(csvLines[i].length>0)
		{
			points=csvLines[i].split(",");
			if(points[0]!="")
				presentYear=points[0];
			var tempDate=points[1].substring(0,3)+", "+presentYear;
			monthYearCity2.push(tempDate);
			dataPointsUrbanCity2.push(points[2]);
			dataPointsNonUrbanCity2.push(points[3]);
		}
	}
}
function parseDataPointsCity1(){
	var tempDataPoints=[];
	for(var i=0;i<dataPointsUrbanCity1.length;i++)
	{
		tempDataPoints.push({
	         	x: new Date(monthYearCity1[i]), 
	         	y: parseFloat(dataPointsUrbanCity1[i]),
	       	});
	}
	return tempDataPoints;
}
function parseDataPointsCity2(){
	var tempDataPoints=[];	
	for(var i=0;i<dataPointsUrbanCity2.length;i++)
	{
		tempDataPoints.push({
	         	x: new Date(monthYearCity2[i]), 
	         	y: parseFloat(dataPointsUrbanCity2[i]),
	       	}); 
	}
	return tempDataPoints;
}
function parseNonUrbanDataPointsCity1(){
	var tempDataPoints=[];
	for(var i=0;i<dataPointsNonUrbanCity1.length;i++)
	{
		tempDataPoints.push({
	         	x: new Date(monthYearCity1[i]), 
	         	y: parseFloat(dataPointsNonUrbanCity1[i]),
	       	});
	}
	return tempDataPoints;
}
function parseNonUrbanDataPointsCity2(){
	var tempDataPoints=[];	
	for(var i=0;i<dataPointsNonUrbanCity2.length;i++)
	{
		tempDataPoints.push({
	         	x: new Date(monthYearCity2[i]), 
	         	y: parseFloat(dataPointsNonUrbanCity2[i]),
	       	}); 
	}
	return tempDataPoints;
}
function displayChart(){
	var tempCity1Name=(fileNameCity1.substring(10,fileNameCity1.length-4)).split(" ");
	var tempCity2Name=(fileNameCity2.substring(10,fileNameCity2.length-4)).split(" ");

	var chartComparisonUrban = new CanvasJS.Chart("chartContainer15", {
	title: {
		text: "Urban: "+tempCity1Name[2]+" AND "+tempCity2Name[2],
	},
	axisX: {
		valueFormatString: "MMM YYYY"
	},
	axisY: {
		title: "Values",
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		verticalAlign: "bottom",
		horizontalAlign: "center",
		dockInsidePlotArea: false,
		itemclick: toogleDataSeries
	},
	data:[
	{
		type: "line",
		axisYType: "primary",
		name: ""+tempCity1Name[2],
		showInLegend: true,
		markerSize: 0,
		yValueFormatString: "####.####",
		dataPoints: parseDataPointsCity1(),
	},
	{
		type: "line",
		axisYType: "primary",
		name: ""+tempCity2Name[2],
		showInLegend: true,
		markerSize: 0,
		yValueFormatString: "####.####",
		dataPoints: parseDataPointsCity2(),
	}]
	});

	var chartComparisonNonUrban = new CanvasJS.Chart("chartContainer16", {
	title: {
		text: "Non Urban: "+tempCity1Name[2]+" AND "+tempCity2Name[2],
	},
	axisX: {
		valueFormatString: "MMM YYYY"
	},
	axisY: {
		title: "Values",
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		verticalAlign: "bottom",
		horizontalAlign: "center",
		dockInsidePlotArea: false,
		itemclick: toogleDataSeries
	},
	data:[
	{
		type: "line",
		axisYType: "primary",
		name: ""+tempCity1Name[2],
		showInLegend: true,
		markerSize: 0,
		yValueFormatString: "####.####",
		dataPoints: parseNonUrbanDataPointsCity1(),
	},
	{
		type: "line",
		axisYType: "primary",
		name: ""+tempCity2Name[2],
		showInLegend: true,
		markerSize: 0,
		yValueFormatString: "####.####",
		dataPoints: parseNonUrbanDataPointsCity2(),
	}]
});
	chartComparisonUrban.render();
	chartComparisonNonUrban.render();
}
function processDataCity1(){
	$.get(fileNameCity1,function(data)
	{
		initialiseDataPointsCity1(data);
	});
}
function processDataCity2(){
	$.get(fileNameCity2,function(data)
	{
		initialiseDataPointsCity2(data);
		displayChart();
	});
}
function handleFilesCity1(files){
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		fileNameCity1="datafiles/"+files[0].name;
		processDataCity1();
	} else {
		alert('FileReader are not supported in this browser.');
	}	
}
function handleFilesCity2(files){
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		fileNameCity2="datafiles/"+files[0].name;
		processDataCity2();
	} else {
		alert('FileReader are not supported in this browser.');
	}	
}
function toogleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else{
			e.dataSeries.visible = true;
		}
		chart.render();	
}
function addDataToTable(){//add urban as well as non urban data

	var table = document.getElementById("MonthlyComparisonTableUrban1");
	var row = table.insertRow();
	row.class="row100 body";
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = "URBAN: &nbsp &nbsp "+fileNameMonthly.substring(10,fileNameMonthly.length-4);
	cell2.innerHTML = PUrban.toPrecision(4);
	cell3.innerHTML = ZUrban.toPrecision(4);
	cell4.innerHTML = slopeSenUrbanData.toPrecision(4);
	cell5.innerHTML = significanceUrbanMonthly;

	table = document.getElementById("MonthlyComparisonTableNonUrban1");
	row = table.insertRow();
	row.class="row100 body";
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell4 = row.insertCell(3);
	cell5 = row.insertCell(4);
	cell1.innerHTML = "NON URBAN: "+fileNameMonthly.substring(10,fileNameMonthly.length-4);
	cell2.innerHTML = PNonUrban.toPrecision(4);
	cell3.innerHTML = ZNonUrban.toPrecision(4);
	cell4.innerHTML = slopeSenNonUrbanData.toPrecision(4);
	cell5.innerHTML = significanceNonUrbanMonthly;}
function addDataToSeasonalTable(){
	var table = document.getElementById("DJFComparison1");
	var row = table.insertRow();
	row.class="row100 body";
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = "URBAN: &nbsp &nbsp "+fileNameSeasonal.substring(10,fileNameSeasonal.length-4);
	cell2.innerHTML = PdjfUrban.toPrecision(4);
	cell3.innerHTML = ZdjfUrban.toPrecision(4);
	cell4.innerHTML = slopeSendjfUrbanData.toPrecision(4);
	cell5.innerHTML = significancedjfUrbanMonthly;

	table = document.getElementById("MAMComparison1");
	row = table.insertRow();
	row.class="row100 body";
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell4 = row.insertCell(3);
	cell5 = row.insertCell(4);
	cell1.innerHTML = "URBAN: &nbsp &nbsp "+fileNameSeasonal.substring(10,fileNameSeasonal.length-4);
	cell2.innerHTML = PmamUrban.toPrecision(4);
	cell3.innerHTML = ZmamUrban.toPrecision(4);
	cell4.innerHTML = slopeSenmamUrbanData.toPrecision(4);
	cell5.innerHTML = significancemamUrbanMonthly;

	table = document.getElementById("JJAComparison1");
	row = table.insertRow();
	row.class="row100 body";
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell4 = row.insertCell(3);
	cell5 = row.insertCell(4);
	cell1.innerHTML = "URBAN: &nbsp &nbsp "+fileNameSeasonal.substring(10,fileNameSeasonal.length-4);
	cell2.innerHTML = PjjaUrban.toPrecision(4);
	cell3.innerHTML = ZjjaUrban.toPrecision(4);
	cell4.innerHTML = slopeSenjjaUrbanData.toPrecision(4);
	cell5.innerHTML = significancejjaUrbanMonthly;

	table = document.getElementById("SONComparison1");
	row = table.insertRow();
	row.class="row100 body";
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell4 = row.insertCell(3);
	cell5 = row.insertCell(4);
	cell1.innerHTML = "URBAN: &nbsp &nbsp "+fileNameSeasonal.substring(10,fileNameSeasonal.length-4);
	cell2.innerHTML = PsonUrban.toPrecision(4);
	cell3.innerHTML = ZsonUrban.toPrecision(4);
	cell4.innerHTML = slopeSensonUrbanData.toPrecision(4);
	cell5.innerHTML = significancesonUrbanMonthly;
}
