mapboxgl.accessToken = "pk.eyJ1Ijoic2hyYXZ5YS1zb21wYWxsaSIsImEiOiJjbGEycmZ3YnAwMzA4M3dwbjExejNqeDczIn0.U0UKRmRLgqJVkz1BizIQBg"
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v11',
center: [-74.0059, 40.7128],
zoom: 11
});
 
map.on('load', () => {
let filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], 2000];
let filterHouseYear = ['==', ['number', ['get', 'year_of_violation']], 2000];
let filterP = ['==', ['string', ['get', 'LAW_CODE']], "PL 2300000"]
let filterU = ['==', ['string', ['get', 'LAW_CODE']], "ED 6512001"]
let filterDOB = ['==', ['string', ['get', 'type_of_violation']], "DOB code violation"]
let filterHV = ['==', ['string', ['get', 'type_of_violation']], "maintenance code violation"]

map.addLayer({
id: 'collisions',
type: 'heatmap',
source: {
type: 'geojson',
data: '../src/geoData/arrests_by_year.geojson' 
},
layout: {
    visibility: 'none'},

// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
paint: {
'heatmap-intensity': [
'interpolate',
['linear'],
['zoom'],
0,
0.3,
0.5,
1
],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.

// Adjust the heatmap radius by zoom level
'heatmap-radius': [
'interpolate',
['linear'],
['zoom'],
1,
2,
3,
5
],
'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(0,0,100,0)',
    0.2,
    'rgb(0,0,150)',
    0.4,
    'rgb(55,55,255)',
    0.6,
    'rgb(115,115,255)',
    0.8,
    'rgb(155,155,255)',
    1,
    'rgb(180,180,255)'
    ]},
/*
'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(48,0,100,0)',
    0.2,
    'rgb(105,5,220)',
    0.4,
    'rgb(150,55,255)',
    0.6,
    'rgb(182,115,255)',
    0.8,
    'rgb(208,165,255)',
    1,
    'rgb(229,205,255)'
    ]},*/

'filter': ['all', filterYear, filterP]
});

map.addLayer({
    id: 'collisions1',
    type: 'heatmap',
    source: {
    type: 'geojson',
    data: '../src/geoData/arrests_by_year.geojson' 
    },
    layout: {
        visibility: 'none'},
    
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    paint: {
    'heatmap-intensity': [
    'interpolate',
    ['linear'],
    ['zoom'],
    0,
    0.3,
    0.5,
    1
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': [
    'interpolate',
    ['linear'],
    ['zoom'],
    1,
    2,
    3,
    5
    ],
    /*'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(0,72,100,0)',
        0.2,
        'rgb(0,114,160)',
        0.4,
        'rgb(0,171,240)',
        0.6,
        'rgb(85,206,255)',
        0.8,
        'rgb(165,229,255)',
        1,
        'rgb(205,240,255)'
        ]},*/
        //ORANGE
     //RED  
     'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(102,0,0,0)',
        0.2,
        'rgb(154,26,26)',
        0.4,
        'rgb(188,32,32)',
        0.6,
        'rgb(218,52,52)',
        0.8,
        'rgb(229,101,101)',
        1,
        'rgb(239,181,181)'
        ]},

    'filter': ['all', filterYear, filterU]
    });

map.addLayer({
    id: 'collisions2',
    type: 'heatmap',
    source: {
    type: 'geojson',
    data: '../src/geoData/OATH_MUP_geocoded.geojson' 
    },
    
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    paint: {
    'heatmap-intensity': [
    'interpolate',
    ['linear'],
    ['zoom'],
    0,
    0.3,
    0.5,
    1
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': [
    'interpolate',
    ['linear'],
    ['zoom'],
    1,
    2,
    3,
    5
    ], 
    //LIGHT BLUE
    'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(0,72,100,0)',
        0.2,
        'rgb(0,76,160)',
        0.4,
        'rgb(5,124,255)',
        0.6,
        'rgb(55,206,255)',
        0.8,
        'rgb(165,182,255)',
        1,
        'rgb(165,208,255)'
        ]},
    layout: {
    visibility: 'none'},
    
    'filter': ['all', filterHouseYear]
    });

 
// update hour filter when the slider is dragged
document.getElementById('slider').addEventListener('input', (event) => {
const year = parseInt(event.target.value);
// update the map
filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
filterP = ['==', ['string', ['get', 'LAW_CODE']], "PL 2300000"]
filterU = ['==', ['string', ['get', 'LAW_CODE']], "ED 6512001"]
map.setFilter('collisions', ['all', filterYear, filterP]);
map.setFilter('collisions1', ['all', filterYear, filterU]);
map.setFilter('collisions2',['all',filterHouseYear]);
// update text in the UI
document.getElementById('active-year').innerText = year;
});

const layerIDs = ['collisions','collisions1','collisions2']
const checks = ['prostitution','unlicensed massage', 'housing violation']
for (let i=0;i<checks.length;i++){
    document
    .getElementById(checks[i])
    .addEventListener('change', (e) => {
        console.log(e)
        map.setLayoutProperty(
            layerIDs[i],
            'visibility',
            e.target.checked ? 'visible' : 'none'
            );
        });

}
/*document
.getElementById('filters')
.addEventListener('change', (e) => {
    console.log(e)
    for (let i=0;i<layerIDs.length;i++){
        map.setLayoutProperty(
            layerIDs[i],
            'visibility',
            e.target.checked ? 'visible' : 'none'
            );
        }*/


/*const charge = event.target.value;
map.setFilter('collisions', ['all', filterYear, filterP]);
// update the map filter
if (charge === 'prostitution') {
map.setLayoutProperty(
    'collisions1',
    'visibility',
    'none'
    );
map.setLayoutProperty(
    'collisions',
    'visibility',
    'visible'
    );
}
else{
    map.setLayoutProperty(
        'collisions',
        'visibility',
        'none'
        );
}
 if (charge === 'unlicensed massage') {
map.setLayoutProperty(
    'collisions',
    'visibility',
    'none'
    );
map.setLayoutProperty(
    'collisions1',
    'visibility',
    'visible'
    );
} else {
    map.setLayoutProperty(
        'collisions1',
        'visibility',
        'none'
        );
}*/
});


