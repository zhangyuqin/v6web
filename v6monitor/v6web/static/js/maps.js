var WORLD = 'world';
var AFRICA = '002';
var ASIA = '142';
var EUROPE = '150';
var OCEANIA = '009';
var AMERICA = '019';

var N_AMERICA = '021';
var C_AMERICA = '013';
var S_AMERICA = '005';
var CARIBBEAN = '029';

var N_AFRICA = '015';
var W_AFRICA = '011';
var M_AFRICA = '017';
var E_AFRICA = '014';
var S_AFRICA = '018';

var C_ASIA = '143';
var E_ASIA = '030';
var S_ASIA = '034';
var SE_ASIA = '035';
var W_ASIA = '145';

var N_EUROPE = '154';
var W_EUROPE = '155';
var E_EUROPE = '151';
var S_EUROPE = '039';

var AUSTRALIA = '053';
var MELANESIA = '054';
var MICRONESIA = '057';
var POLYNESIA = '061';

/* sublegends links to have access to map corresponding to the sublegend */
function handleDrawMap(region,num){
	drawMap(region);
	if(region==AFRICA){
		$("#sublegend"+num).html("<a href=\"javascript:\" onclick=\"drawMap(N_AFRICA)\">Northern Africa</a> | <a href=\"javascript:\" onclick=\"drawMap(W_AFRICA)\">Western Africa</a> | <a href=\"javascript:\" onclick=\"drawMap(M_AFRICA)\">Middle Africa</a> | <a href=\"javascript:\" onclick=\"drawMap(E_AFRICA)\">Eastern Africa</a> | <a href=\"javascript:\" onclick=\"drawMap(S_AFRICA)\">Southern Africa</a>");
	}
	else if(region==AMERICA){
		$("#sublegend"+num).html("<a href=\"javascript:\" onclick=\"drawMap(N_AMERICA)\">Northern America</a> | <a href=\"javascript:\" onclick=\"drawMap(C_AMERICA)\">Central America</a> | <a href=\"javascript:\" onclick=\"drawMap(S_AMERICA)\">South America</a> | <a href=\"javascript:\" onclick=\"drawMap(CARIBBEAN)\">Caribbean</a>");
	}
	else if(region==ASIA){
		$("#sublegend"+num).html("<a href=\"javascript:\" onclick=\"drawMap(W_ASIA)\">Western Asia</a> | <a href=\"javascript:\" onclick=\"drawMap(C_ASIA)\">Central Asia</a> | <a href=\"javascript:\" onclick=\"drawMap(E_ASIA)\">Eastern Asia</a> | <a href=\"javascript:\" onclick=\"drawMap(S_ASIA)\">Southern Asia</a> | <a href=\"javascript:\" onclick=\"drawMap(SE_ASIA)\">South-Eastern Asia</a>");
	}
	else if(region==EUROPE){
		$("#sublegend"+num).html("<a href=\"javascript:\" onclick=\"drawMap(N_EUROPE)\">Northern Europe</a> | <a href=\"javascript:\" onclick=\"drawMap(W_EUROPE)\">Western Europe</a> | <a href=\"javascript:\" onclick=\"drawMap(E_EUROPE)\">Eastern Europe</a> | <a href=\"javascript:\" onclick=\"drawMap(S_EUROPE)\">Southern Europe</a>");
	}
	else if(region==OCEANIA){
		$("#sublegend"+num).html("<a href=\"javascript:\" onclick=\"drawMap(AUSTRALIA)\">Australia and New Zealand</a> | <a href=\"javascript:\" onclick=\"drawMap(MELANESIA)\">Melanesia</a> | <a href=\"javascript:\" onclick=\"drawMap(MICRONESIA)\">Micronesia</a> | <a href=\"javascript:\" onclick=\"drawMap(POLYNESIA)\">Polynesia</a>");
	}
	else{
		$("#sublegend"+num).html("");
	}

}


var geoChart;
var geoData;
var geoOptions;
var pickerData;

function selectMap(indicator){
	var ISO_CODE = 0;
	var NAME = 1;
	var TOT=2;
	var ALLOC =3;
	var NET =4;
	var CONT =5;
	var USERS =6;

    $("#maxSelector").hide();
    $("#sublegend").html("");

	if(indicator=='all'){
		$("#treeUserMap").hide();
		geoData = new google.visualization.DataTable();
		var v6data = AllData.data;
		geoData.addRows(v6data.length);
		geoData.addColumn('string', 'Country');
		geoData.addColumn('number', 'IPv6 Deployment');
		geoData.addColumn('number', 'Relative Index');
		var max = 0.01;

		// Compute the maximum of user percentage
		var maxNet = 0.001, maxUser = 0.001;
		for (var i = 0; i < v6data.length; i++) {
			var u = v6data[i][CONT] * v6data[i][USERS];
			if (v6data[i][NET] > maxNet) {
				maxNet = v6data[i][NET];
			}
			if (u > maxUser) {
				maxUser = u;
			}
		}
		var totalPercent = new Array(v6data.length);
		var relativeIndex = new Array(v6data.length);
		for (var i = 0; i < v6data.length; i++) {
			totalPercent[i] = 25 * v6data[i][NET] + 75 * Math.sqrt(v6data[i][CONT] * v6data[i][USERS]);
			relativeIndex[i] = 25 * v6data[i][NET] / maxNet + 75 * Math.sqrt(v6data[i][CONT] * v6data[i][USERS] / maxUser);
			if(relativeIndex[i] > max){
				max = relativeIndex[i];
			}
		}
		for (var i = 0; i < v6data.length; i++) {
			geoData.setValue(i, 0, v6data[i][ISO_CODE]);
			geoData.setFormattedValue(i, 0, v6data[i][NAME]);
			geoData.setValue(i, 1, relativeIndex[i]*10/max);
			if ( relativeIndex[i]*10/max > 5) {
				console.log(v6data[i][NAME] + ": " + relativeIndex[i]*10/max); // EVYNCKE: do we still need those debugging messages in the console?
			}
			geoData.setFormattedValue(i, 2, Math.round(relativeIndex[i]*100/max)/10 + " out of 10");
			geoData.setFormattedValue(i, 1, Math.round(totalPercent[i]*100)/100 + "% (Prefixes : " + Math.round(v6data[i][ALLOC]*10000)/100 + "% | Transit AS : " + Math.round(v6data[i][NET]*10000)/100 + "% | Content : " + Math.round(v6data[i][CONT]*10000)/100 + "% | Users : " + Math.round(v6data[i][USERS]*10000)/100 + "%)");
		}
		geoOptions =  {	height: '768',
				width: '1366',
				datalessRegionColor: '#FFF',
				colorAxis: {colors: ["#FFF", "#228B22"],
					values: [0, 10]}
		};

		drawMap(WORLD);



	}

	else if (indicator=='prefixes'){
		$("#treeUserMap").hide();
		var ALLOCATED = 2;
		var ROUTABLE = 3;
		var ALIVE = 4;

		geoData = new google.visualization.DataTable();
		var v6data = AllocationData.data;
		geoData.addRows(v6data.length);
		var max = 0;
		geoData.addColumn('string', 'Country');
		geoData.addColumn('number', 'Ratio of routable IPv6 prefixes');
		geoData.addColumn('number', 'Ratio of allocated IPv6 prefixes / ratio of alive allocated IPv6 prefixes');
		for (var i = 0; i < v6data.length; i++) {
			geoData.setValue(i, 0, v6data[i][ISO_CODE]);
			geoData.setFormattedValue(i, 0, v6data[i][NAME]);
			geoData.setValue(i, 1, v6data[i][ROUTABLE]*100);
			geoData.setFormattedValue(i, 1, Math.round(v6data[i][ROUTABLE]*10000)/100 + "%");
			geoData.setFormattedValue(i, 2, Math.round(v6data[i][ALLOCATED]*10000)/100 + "%  /  " + Math.round(v6data[i][ALIVE]*10000)/100 + "%");
			if(v6data[i][ROUTABLE]*100 > max){
				max = v6data[i][ROUTABLE]*100;
			}
		}
		geoOptions =  {	keepAspectRatio:'true',
				width: '900',
				datalessRegionColor: '#FFF',
				colorAxis: {colors: AllocationData.gradientColors,
					values: AllocationData.gradientPoints}
		};
		geoOptions.colorAxis.values[1] = 100;
		drawMap(WORLD);


	}

	else if (indicator=='network'){
		$("#treeUserMap").hide();
		var ASN = 2;
		var ENABLED = 3;

		geoData = new google.visualization.DataTable();
		var v6data = NetworkData.data;
		geoData.addRows(v6data.length);
		geoData.addColumn('string', 'Country');
		geoData.addColumn('number', 'IPv6 transit AS');
		geoData.addColumn('number', 'IPv6 enabled transit AS');
		for (var i = 0; i < v6data.length; i++) {
			geoData.setValue(i, 0, v6data[i][ISO_CODE]);
			geoData.setFormattedValue(i, 0, v6data[i][NAME]);
			geoData.setValue(i, 1, v6data[i][ASN]*100);
			geoData.setFormattedValue(i, 1, Math.round(v6data[i][ASN]*10000)/100 + "%");
			geoData.setFormattedValue(i, 2, Math.round(v6data[i][ENABLED]*10000)/100 + "%");
		}
		geoOptions =  {	height: '562',
				width: '900',
				datalessRegionColor: '#FFF',
				colorAxis: {colors: NetworkData.gradientColors,
					values: NetworkData.gradientPoints}
		};
		drawMap(WORLD);


	}

	else if (indicator=='content'){
		$("#treeUserMap").hide();

		var GREEN = 2;
		var YELLOW = 3;
		var BLACK = 4;
		var RED = 5;
		var WGREEN = 6;
		var WYELLOW = 7;
		var WBLACK = 8;
		var WRED = 9;


		geoData = new google.visualization.DataTable();
		var v6data = ContentData.data;
		geoData.addRows(v6data.length);
		var max = 0;
		geoData.addColumn({type:'string',role:'domain', label:'Country'});
		geoData.addColumn({type:'number',role:'data', label:'% of Web Pages Available over IPv6'});
		geoData.addColumn({type:'number', role:'data',label:'Additional info'});
		for (var i = 0; i < v6data.length; i++) {
			geoData.setValue(i, 0, v6data[i][ISO_CODE]);
			geoData.setFormattedValue(i, 0, v6data[i][NAME]);
			geoData.setValue(i, 1, v6data[i][WGREEN]*100);
			geoData.setFormattedValue(i, 1, Math.round(v6data[i][WGREEN]*10000)/100 + "% | Number of working IPv6 sites: " +v6data[i][GREEN]+"/500");
			geoData.setFormattedValue(i, 2, "In development/test: " + Math.round(v6data[i][WYELLOW]*10000)/100 + "% ("+v6data[i][YELLOW]+"/500) | Failing IPv6 sites: " + Math.round(v6data[i][WBLACK]*10000)/100 + "% ("+v6data[i][BLACK]+"/500) | Not IPv6 enabled: " + Math.round(v6data[i][WRED]*10000)/100 + "% ("+v6data[i][RED]+"/500)");
			if(v6data[i][WGREEN]*100 > max){
				max = v6data[i][WGREEN]*100;
			}
		}
		geoOptions =  {	height: '562',
				width: '900',
				datalessRegionColor: '#FFF',
				colorAxis: {colors: ContentData.gradientColors,
					values: ContentData.gradientPoints}
		};
		//geoOptions.colorAxis.values[3] = max;
		drawMap(WORLD);


	}

else if (indicator=='users'){
		var GOOGLE = 2;
		var EST = 3;
        var APNIC = 4;
		$("#maxSelector").show();
		$("#treeUserMap").show();

		geoData = new google.visualization.DataTable();
		var v6data = UsersData.data;
		var max = 0;
		geoData.addRows(v6data.length);
		geoData.addColumn({type:'string',role:'domain', label:'Country'});
		geoData.addColumn({type:'number',role:'data', label:'Google Search / APNIC data'});
		geoData.addColumn({type:'number',role:'data', label:'Estimation'});
		for (var i = 0; i < v6data.length; i++) {
			geoData.setValue(i, 0, v6data[i][ISO_CODE]);
			geoData.setFormattedValue(i, 0, v6data[i][NAME]);
			geoData.setValue(i, 1, v6data[i][GOOGLE]*100);
			geoData.setFormattedValue(i,1, Math.round(v6data[i][GOOGLE]*10000)/100 + "% / "+ Math.round(v6data[i][APNIC]*100)/100 + "%");
			geoData.setFormattedValue(i,2,  Math.round(v6data[i][EST]/1000) + " K IPv6 users");
			if(v6data[i][GOOGLE]*100 > max){
				max = v6data[i][GOOGLE]*100;
			}

			/*for(var j =0 ; j < pickerMapData.length;j++){ // Try to find the same data but from APnic
				if(v6data[i][ISO_CODE]==pickerMapData[j][1]){
					geoData.setFormattedValue(i,1, Math.round(v6data[i][GOOGLE]*10000)/100 + "% / "+Math.round(pickerMapData[j][44]*100)/100 + "%");
					break;
				}
			}*/

		}
		geoOptions =  {	height: '562',
				width: '900',
				datalessRegionColor: '#FFF',
				colorAxis: {colors: UsersData.gradientColors,
					values: UsersData.gradientPoints}
		};
		max = Math.round(max*100)/100;
		geoOptions.colorAxis.values[1] = max;
		treeOptions.maxColorValue = max;
		$("#maxSet").attr("value",max);

		drawMap(WORLD);
		drawTreeMap();


	}
}

/* display the map of a specific area */
function drawMap(aRegion) {

	geoOptions.region = aRegion;
	geoChart.draw(geoData, geoOptions);
}

/* open a new window with the willing boxes div */
function initMap(indic) {
    var container = document.getElementById('geochart_div');
	if (container == null) {
		console.log('in initMap(' + indic + '), geochart_div does not exist') ;
		return ;
	}
	geoChart = new google.visualization.GeoChart(container);

	selectMap(indic);

    google.visualization.events.addListener(geoChart, 'select', function ()
    {

        var selection = geoChart.getSelection();


        var id = geoData.getValue(selection[0].row, 0);

        window.open('./cible.php?country='+id+'&option='+indic+'');


});

}


var treeOptions =  {
        minColor: '#FF3030',
        midColor: '#EEFC44',
        maxColor: '#228B22',
        headerHeight: 20,
        fontColor: 'black',
        showScale: true};

/* Only used in 'users' */
function drawTreeMap(){

	var tree = new google.visualization.TreeMap(document.getElementById('treeUserMap'));
	var treeUsersData = new google.visualization.arrayToDataTable(treeUsersDataTable);

	tree.draw(treeUsersData,treeOptions);
}
