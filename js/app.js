/**
 * * Created by Braldey Jones on 12/3/2019.
 */
require([
  'esri/Map',
  'esri/views/MapView',
  'esri/Basemap',
  'esri/layers/FeatureLayer',
  'esri/tasks/support/Query',
  'esri/tasks/QueryTask',
  'esri/renderers/UniqueValueRenderer', 
  'esri/widgets/Home',
  'esri/widgets/Expand'
],

function(
  Map,
  MapView,
  Basemap,
  FeatureLayer,
  Query,
  QueryTask,
  UniqueValueRenderer,
  Home,
  Expand
)

{
  //* Set Tag Variables
  //* --------------------
  const lmps = 'MAUMELLE.LM1941CAT.F_CV';
  const cab = 'ADAMS.CAB2295LQT.F_CV';
  const cvps = 'ADAMS.CV1942CAT.F_CV';
  const rrps = 'ADAMS.RR1942CAT.F_CV';
  const lfps = 'ADAMS.LF1941CAT.F_CV';
  const crps = 'ADAMS.CR1941LQT.F_CV';
  const asps = 'ADAMS.AS1941CAT.F_CV';
  const jrps = 'ADAMS.JR1941CAT.F_CV';
  const hrps = 'ADAMS.HR1942CAT.F_CV';
  const lps = 'ADAMS.LA1941CAT.F_CV';
  const afwrf = 'ADAMS.AF2295LQT.F_CV';
  const fcwrf = 'FOURCHE.FC2295LQT.F_CV';


	//* Using the LRWRA gray scale vector tile basemap
	const grayBasemap = new Basemap({
		portalItem: {
			id: '0b7accba45784b53b3a6e98b7fb19368',
			portal: 'https://gis.lrwu.com/portal'
		}
  });
  
  //* LABELS FOR RAIN GAUGES LAYER
  //* ----------------------------------
  //* GREEN LABELS
  const grayLabels = {
    symbol: {
      type: 'text',  
      color: '#686868',
      haloColor: 'white',
      haloSize: 1,
      font: {  
        family: 'sans-serif',
        size: 11,
        weight: 'bold' 
      }
    },
    labelPlacement: 'above-center',
    labelExpressionInfo: {
      expression: '$feature.NAME'
    }
  };

  //* YELLOW LABELS
  const yellowLabels = {
    labelPlacement: 'above-center',
    labelExpression: '[NAME]',
    symbol: {
      type: 'text',  
      color: '#B9B9B9',
      haloColor: '#808080',
      haloSize: 1,
      font: {  
        family: 'sans-serif',
        size: 11,
        weight: 'bold' 
      }
    },
  };

  //* ORANGE LABELS
  const orangeLabels = {
    labelPlacement: 'above-center',
    labelExpression: '[NAME]',
    symbol: {
      type: 'text',  
      color: '#F7AA38',
      haloColor: 'white',
      haloSize: 1,
      font: {  
        family: 'sans-serif',
        size: 11,
        weight: 'bold' 
      }
    }
  };

  //* RED LABELS
  const redLabels = {
    labelPlacement: 'above-center',
    labelExpression: '[NAME]',
    symbol: {
      type: 'text',  
      color: '#F7AA38',
      haloColor: 'white',
      haloSize: 1,
      font: {  
        family: 'sans-serif',
        size: 11,
        weight: 'bold' 
      }
    },
  };
  

  //* SYMBOLS FOR RAIN GAUGES LAYER
  //* -----------------------------
  //* GRAY Symbol
  const graySymbol = {
    type: "simple-marker",
    outline: { color: 'white' },
    size: 13,
    color: '#686868'
  };

  //* GREEN symbol
  const greenSymbol = {
    type: "simple-marker",
    outline: { color: 'white' },
    size: 13,
    color: '#309E75'
  };

  //* YELLOW symbol
  const yellowSymbol = {
    type: "simple-marker",
    outline: { color: '#808080' },
    size: 13,
    color: '#EDD977'
  };

  //* ORANGE symbol 
  const orangeSymbol = {
    type: "simple-marker",
    outline: { color: 'white' },
    size: 13,
    color: '#EA9E49'
  };

  //* RED symbol 
  const redSymbol = {
    type: "simple-marker",
    outline: { color: 'white' },
    size: 13,
    color: '#C4343E'
  };

  //* Create the Unique Value Renderer for the gauges layer
  let rainGaugesRenderer = new UniqueValueRenderer({
    //type: 'unique-value',
    field: 'TAG',
    defaultSymbol: graySymbol,
    uniqueValueInfos: [
      {
        value: lmps,
        symbol: graySymbol
      },
      {
        value: cab,
        symbol: graySymbol
      },
      {
        value:cvps,
        symbol: graySymbol
      },
      {
        value: rrps,
        symbol: graySymbol
      },
      {
        value: lfps,
        symbol: graySymbol
      },
      {
        value: crps,
        symbol: graySymbol
      },
      {
        value: asps,
        symbol: graySymbol
      },
      {
        value: jrps,
        symbol: graySymbol
      },
      {
        value: hrps,
        symbol: graySymbol
      },
      {
        value: lps,
        symbol: graySymbol
      },
      {
        value: afwrf,
        symbol: graySymbol
      },
      {
        value: fcwrf,
        symbol: graySymbol
      }
    ]
  });

  let simpleRenderer = {
    type: 'simple',
    symbol: graySymbol
  }

  const rainBasinsLayer = new FeatureLayer({
    url:'https://gis.lrwu.com/server/rest/services/RainGauges/Rain_Gauges/FeatureServer/1',
    
  });

  const rainGaugesLayer = new FeatureLayer({
    url:'https://gis.lrwu.com/server/rest/services/RainGauges/Rain_Gauges/FeatureServer/0',
    labelingInfo: [grayLabels],
    //renderer: simpleRenderer
  });
    
  //* Map object
  const map = new Map({
  basemap: grayBasemap,
  layers: [rainBasinsLayer, rainGaugesLayer]
  });

  //* MapView Object
  const view = new MapView({
  container: 'viewDiv',
  map: map,
  zoom: 11,
  center: [-92.356121,34.737015], 
  logo: false
  });

  //* Home widget
  var home = new Home({
    view: view
  });
  

  //* Build ABOUT Widget
  //* ===================
  const expandContent = `
    <h3>LRWRA Rain Gauges</h4>
    <p>This application displays the current rain amounts for LRWRA’s 12 rain gauges that are located throughout the City.</p>
    <p>The data is pulled from rain gauges into a database every five (5) minutes. This is represented with time stamps displayed on each gauge graphic. The web application queries this data every 2.5 minutes and adjusts the graphics accordingly. This keeps the maximum time between updates at about 7.5 minutes (i.e., if you opened the page one second before the database pulled values from the rain gauges). </p>
    <p>The color of the rain gauge points on the map are synced with the color of the gauge graphics based on rain amounts.</p>
    <ul>
      <li><span style="color: #808080; font-weight: bold;">Gray</span>: No rain</li>
      <li><span style="color: #309E75; font-weight: bold;">Green</span>: 0.01" to 1”</li>
      <li><span style="color: #EDD977; font-weight: bold;">Yellow</span>: 1.01” to 3.5”</li>
      <li><span style="color: #EA9E49; font-weight: bold;">Orange</span>: 3.51” to 4.1”</li>
      <li><span style="color: #CB2240; font-weight: bold;">Red</span>: > 4.1”</li>
    </ul>
    <p id="contact">Contact: <a href="mailto:Bradley.Jones@lrwra.com">Bradley Jones</a></p>
  `
  
  infoExpand = new Expand({
    expandIconClass: 'esri-icon-description',
    view: view,
    expandTooltip: 'Info about this app',
    content: expandContent,
    expanded: false,
    mode: 'auto'
  })
  
  view.ui.add(home, 'top-left');
  view.ui.add(infoExpand, 'top-left');


  //* BUILD GAUGE VISUALIZATIONS
  //* ======================================

  //* Little Maumelle PS
  //* -------------------
  let lmpsGauge = Gauge(document.getElementById("maumelle"), {
    min: 0,
    max: 6,
    // custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    // Custom dial colors (Optional)
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Clearwater Admin Building
  //* ---------------------------
  let cabGauge = Gauge(document.getElementById('cab'), {
    min: 0,
    max: 6,
    // custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    // Custom dial colors (Optional)
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Chenal Valley PS
  //* ---------------------------
  let cvpsGauge = Gauge(document.getElementById('chenal-valley'), {
    min: 0,
    max: 6,
    // custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    // Custom dial colors (Optional)
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* River Ridge PS
  //* ---------------------------
  let rrpsGauge = Gauge(document.getElementById('river-ridge'), {
    min: 0,
    max: 6,
    // custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    // Custom dial colors (Optional)
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Longfellow PS
  //* ---------------------------
  let lfpsGauge = Gauge(document.getElementById('longfellow'), {
    min: 0,
    max: 6,
    //* custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors 
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Cantrell Road PS
  //* ---------------------------
  let crpsGauge = Gauge(document.getElementById('cantrell-road'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Arch Street PS
  //* ---------------------------
  let aspsGauge = Gauge(document.getElementById('arch-street'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors 
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Jamison Road PS
  //* ---------------------------
  let jrpsGauge = Gauge(document.getElementById('jamison-road'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors 
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Heinke Road PS
  //* ---------------------------
  let hrpsGauge = Gauge(document.getElementById('heinke-road'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return "#fffa50"; // yellow
      }else if(value < 4.1) {
        return "#f7aa38"; // orange
      }else {
        return "#ef4655"; // red
      }
    }
  });

  //* Lamar PS
  //* ---------------------------
  let lpsGauge = Gauge(document.getElementById('lamar'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors 
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Adams Field WRF
  //* ---------------------------
  let afwrfGauge = Gauge(document.getElementById('adams-field'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //* Fourche Creek WRF
  //* ---------------------------
  let fcwrfGauge = Gauge(document.getElementById('fourche-creek'), {
    min: 0,
    max: 6,
    //* Custom label renderer
    label: function(value) {
      return value + '"';
    },
    value: 0,
    //* Custom dial colors 
    color: function(value) {
      if (value === 0) {
        return '#686868'; //gray
      }else if(value < 1) {
        return '#309E75'; // green
      }else if(value < 3.5) {
        return '#EDD977'; // yellow
      }else if(value < 4.1) {
        return '#EA9E49'; // orange
      }else {
        return '#C4343E'; // red
      }
    }
  });

  //! Set value and animate (value, animation duration in seconds)
  // cpuGauge.setValueAnimated(50, 1);

  //* Initialized so I can use values from setRainValue function for map symbols
  let value;

  //* Arrays 
  let greenArray = [];
  let yellowArray = [];
  let orangeArray = [];
  let redArray = [];

  //* Set initial rain values 
  //* ----------------------------------
  setRainValue(lmps, lmpsGauge, 'maumelle-datetime')
  setRainValue(cab, cabGauge, 'cab-datetime')
  setRainValue(cvps, cvpsGauge, 'chenal-datetime')
  setRainValue(rrps, rrpsGauge, 'riverridge-datetime')
  setRainValue(lfps, lfpsGauge, 'longfellow-datetime')
  setRainValue(crps, crpsGauge, 'cantrell-datetime')
  setRainValue(asps, aspsGauge, 'arch-datetime')
  setRainValue(jrps, jrpsGauge, 'jamison-datetime')
  setRainValue(hrps, hrpsGauge, 'heinke-datetime')
  setRainValue(lps, lpsGauge, 'lamar-datetime')
  setRainValue(afwrf, afwrfGauge, 'adams-datetime')
  setRainValue(fcwrf, fcwrfGauge, 'fourche-datetime')
  //* console.log tim the app initializes
  let initTime = new Date();
  console.log(`Initialized - ${initTime.toLocaleTimeString()}`);

  //* Update Rain Values Every 5 Minutes
  //* -----------------------------------

  setInterval(() => {updateRainValue()}, 150000);

//! setRainValue Function
//! **************************
  function setRainValue(tag, graph, node){

    let query = new Query();
    query.returnGeometry = false;
    query.outFields = ['VALUE', 'TIMESTAMP'];
    query.where = `TAGNAME = '${tag}'`;
    query.returnDistinctValues = true;



    let qTask = new QueryTask(
      'https://gis.lrwu.com/server/rest/services/RainGauges/Rain_Gauges/FeatureServer/2'
    );
    qTask.execute(query)
    .then((result) =>{
      let results = result.features
      results.forEach(feat => {
          //* Get the VALUE attribute
          let valueString = feat.getAttribute('VALUE');
          //* Get the TIMESTAMP attribute
          let timeStamp = feat.getAttribute('TIMESTAMP');
          //* Convert the TIMESTAMP to a meaningful date
          let date = new Date(timeStamp + 21600000);
          let newDate = date.toLocaleDateString('en-US',{
            year: '2-digit', 
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });


          //* Caste the VALuE string to a float
          value = parseFloat(valueString)
          value = +value.toFixed(2);

          //* Use VALUE (float) to set the value for the gauge visualization
          graph.setValue(value);

          //* Write the TIMESTAMP to the gauge visualization
          document.getElementById(node).innerHTML = `As of ${newDate}`;

          //* Change rain gauge layer symbols based on VALUE
          rainGaugesLayer.renderer = simpleRenderer;
          if(value === 0) {
            rainGaugesRenderer.removeUniqueValueInfo(tag);
            rainGaugesRenderer.addUniqueValueInfo({
              value: tag, 
              symbol: graySymbol
              });             
            greenArray.push(tag);
          }else if(value < 1) {
            rainGaugesRenderer.removeUniqueValueInfo(tag);
            rainGaugesRenderer.addUniqueValueInfo({
              value: tag, 
              symbol: greenSymbol
              });             
            greenArray.push(tag);
          }else if(value < 3.5) {
            rainGaugesRenderer.removeUniqueValueInfo(tag);
            rainGaugesRenderer.addUniqueValueInfo({
              value: tag, 
              symbol: yellowSymbol
            });
            yellowArray.push(tag);
          }else if(value < 4.1) {
            rainGaugesRenderer.removeUniqueValueInfo(tag);
            rainGaugesRenderer.addUniqueValueInfo({
              value: tag, 
              symbol: orangeSymbol
            });
            orangeArray.push(tag);
          }else {
            rainGaugesRenderer.removeUniqueValueInfo(tag);
            rainGaugesRenderer.addUniqueValueInfo({
              value: tag, 
              symbol: redSymbol
            });
            redArray.push(tag);
          }
          rainGaugesLayer.renderer = rainGaugesRenderer;
      });
    })
    .catch((error) => {
      console.log(error)
    })
  };

  //! updateRainValue Function
  //! ***************************
  function updateRainValue() {
    setRainValue(lmps, lmpsGauge, 'maumelle-datetime');
    setRainValue(cab, cabGauge, 'cab-datetime');
    setRainValue(cvps, cvpsGauge, 'chenal-datetime');
    setRainValue(rrps, rrpsGauge, 'riverridge-datetime');
    setRainValue(lfps, lfpsGauge, 'longfellow-datetime');
    setRainValue(crps, crpsGauge, 'cantrell-datetime');
    setRainValue(asps, aspsGauge, 'arch-datetime');
    setRainValue(jrps, jrpsGauge, 'jamison-datetime');
    setRainValue(hrps, hrpsGauge, 'heinke-datetime');
    setRainValue(lps, lpsGauge, 'lamar-datetime');
    setRainValue(afwrf, afwrfGauge, 'adams-datetime');
    setRainValue(fcwrf, fcwrfGauge, 'fourche-datetime');
    //* Console.log time the app updates
    let updateTime = new Date();
    console.log(`Updated - ${updateTime.toLocaleTimeString()}`);
  }

  // TODO: Set Symbol and Label Color for  Rain Gauge layer
  // function setMapSymbols() {
  //   let greenArray = [];
  //   let yellowArray = [];
  //   let orangeArray = [];
  //   let redArray = [];
  //   rainGaugesRenderer.removeUniqueValueInfo(tag);
  //   if(value < 1 || value === 0) {
  //     rainGaugesRenderer.addUniqueValueInfo(tag, greenSymbol);
  //     greenArray.push(tag);
  //   }else if(value < 3.5) {
  //     rainGaugesRenderer.addUniqueValueInfo(tag, yellowSymbol);
  //     yellowArray.push(tag);
  //   }else if(value < 4.1) {
  //     rainGaugesRenderer.addUniqueValueInfo(tag, orangeSymbol);
  //     orangeArray.push(tag);
  //   }else {
  //     rainGaugesRenderer.addUniqueValueInfo(tag, redSymbol);
  //     redArray.push(tag);
  //   }
  //*  Use Arrays to build where clauses for label classes
  //   greenWhereClause = `TAG IN (${greenArray.toString())}`;
  //   yellowWhereClause = `TAG IN (${yellowArray.toString())}`;
  //   orangeWhereClause = `TAG IN (${orangeArray.toString())}`;
  //   redWhereClause = `TAG IN (${redArray.toString()})`;

  // }

});

