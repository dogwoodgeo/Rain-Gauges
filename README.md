---

---

## LRWRA Rain Gauges

This application displays the current rain amounts for LRWRA’s 12 rain gauges that are located throughout the City.

The data is pulled from rain gauges into a database every five (5) minutes. This is represented with time stamps displayed on each gauge graphic. The web application queries this data every 2.5 minutes and adjusts the graphics accordingly. This keeps the maximum time between updates at about 7.5 minutes (i.e., if you opened the page one second before the database pulled values from the rain gauges).

The color of the rain gauge points on the map are synced with the color of the gauge graphics based on rain amounts.

- **Gray**: No rain
- **Green**: 0.01" to 1”
- **Yellow**: 1.01” to 3.5”
- **Orange**: 3.51” to 4.1”
- **Red**: > 4.1”



This application was developed using Ersi's [ArcGIS API for Javascript](https://developers.arcgis.com/javascript/). The awesome gauge graphics are made possible with this [library](https://github.com/naikus/svg-gauge).

View live version [here](https://gis.lrwu.com/rain-gauges).





### 
