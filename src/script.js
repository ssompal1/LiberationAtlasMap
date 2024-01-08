mapboxgl.accessToken = "pk.eyJ1Ijoic2hyYXZ5YS1zb21wYWxsaSIsImEiOiJjbGEycmZ3YnAwMzA4M3dwbjExejNqeDczIn0.U0UKRmRLgqJVkz1BizIQBg"
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-74.0059, 40.7128],
  zoom: 11
});
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};
map.on('load', () => {
  // let filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], 2000];
  // let filterHouseYear = ['==', ['number', ['get', 'year_of_violation']], 2000];
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
      visibility: 'none'
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
      /*
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
          ]},*/
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(0,0,100,0)',
        0.2,
        'rgb(21,101,192)',
        0.4,
        'rgb(25,118,210)',
        0.6,
        'rgb(33,150,243)',
        0.8,
        'rgb(100,181,246)',
        1,
        'rgb(144,202,250)'
      ]
    },
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

    'filter': ['all', filterP]
  });

  map.addLayer({
    id: 'collisions1',
    type: 'heatmap',
    source: {
      type: 'geojson',
      data: '../src/geoData/arrests_by_year.geojson'
    },
    layout: {
      visibility: 'none'
    },

    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    paint: {
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0.05,
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
      /*
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
         ]},*/
      //TREE GREEN
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(102,0,0,0)',
        0.2,
        'rgb(60,100,0)',
        0.4,
        'rgb(131,220,0)',
        0.6,
        'rgb(166,255,35)',
        0.8,
        'rgb(198,255,115)',
        1,
        'rgb(219,255,165)'
      ]
    },

    'filter': ['all', filterU]
  });

  map.addLayer({
    id: 'collisions2',
    type: 'heatmap',
    source: {
      type: 'geojson',
      data: '../src/geoData/OATH_MUP_inspections_geocoded.geojson'
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
      // 'heatmap-color': [
      //     'interpolate',
      //     ['linear'],
      //     ['heatmap-density'],
      //     0,
      //     'rgba(0,72,100,0)',
      //     0.2,
      //     'rgb(0,76,160)',
      //     0.4,
      //     'rgb(5,124,255)',
      //     0.6,
      //     'rgb(55,206,255)',
      //     0.8,
      //     'rgb(165,182,255)',
      //     1,
      //     'rgb(165,208,255)'
      //     ]},
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(160,0,95,0)',
        0.2,
        'rgb(160,0,95)',
        0.4,
        'rgb(255,5,154)',
        0.6,
        'rgb(255,85,186)',
        0.8,
        'rgb(255,145,210)',
        1,
        'rgb(255,205,235)'
      ]
    },
    layout: {
      visibility: 'none'
    },

    'filter': ['all']
  });
  //comment
  ///hearogiheoirghoaeig
  // update hour filter when the slider is dragged
  // document.getElementById('slider').addEventListener('input', (event) => {
  //     const year = parseInt(event.target.value);
  //     //update the map
  //     const cumBreakdown = document.getElementById("cumulative").checked
  //     const byYearBreakdown = document.getElementById("byYear").checked
  //     if (cumBreakdown) {
  //         filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
  //         filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
  //     }
  //     else if (byYearBreakdown) {
  //         filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], year];
  //         filterHouseYear = ['==', ['number', ['get', 'Year']], year];
  //     }
  //     else {
  //         console.log('error');
  //     }  
  //     filterP = ['==', ['string', ['get', 'LAW_CODE']], "PL 2300000"]
  //     filterU = ['==', ['string', ['get', 'LAW_CODE']], "ED 6512001"]
  //     map.setFilter('collisions', ['all', filterYear, filterP]);
  //     map.setFilter('collisions1', ['all', filterYear, filterU]);
  //     map.setFilter('collisions2',['all',filterHouseYear]);
  //     // update text in the UI
  //     document.getElementById('active-year').innerText = year;
  //     });

  //update map when toggle is changed
  // document
  // .getElementById('timefilters')
  // .addEventListener('input', (e) => {
  //     const timeBreakdown = e.target.value;
  //     const year = parseInt(document.getElementById('active-year').innerText)
  //     console.log(timeBreakdown)
  //     if (timeBreakdown == 'cumulative') {
  //         filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
  //         filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
  //     }
  //     else if (timeBreakdown == 'byYear') {
  //         filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], year];
  //         filterHouseYear = ['==', ['number', ['get', 'Year']], year];
  //     }
  //     else {
  //         console.log('error');
  //     }
  //     map.setFilter('collisions', ['all', filterYear, filterP]);
  //     map.setFilter('collisions1', ['all', filterYear, filterU]);
  //     map.setFilter('collisions2',['all',filterHouseYear]);
  // });



  const layerIDs = ['collisions', 'collisions1', 'collisions2']
  const checks = ['prostitution', 'unlicensed massage', 'housing violation']
  for (let i = 0; i < checks.length; i++) {
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

  // Add a marker to the map
});
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
}

const e1 = document.createElement('div');
e1.className = 'marker';

const marker1 = new mapboxgl.Marker(e1)
  .setLngLat([-73.8831, 40.7557])
  .addTo(map);

const e2 = document.createElement('div');
e2.className = 'marker';
const marker2 = new mapboxgl.Marker(e2)
  .setLngLat([-74.00, 40.71])
  .addTo(map);
const e3 = document.createElement('div');
e3.className = 'marker';
const marker3 = new mapboxgl.Marker(e3)
  .setLngLat([-73.9757, 40.7479])
  .addTo(map);
const e4 = document.createElement('div');
e4.className = 'marker';
const marker4 = new mapboxgl.Marker(e4)
  .setLngLat([-73.9970, 40.7158])
  .addTo(map);
const e5 = document.createElement('div');
e5.className = 'marker';
const marker5 = new mapboxgl.Marker(e5)
  .setLngLat([-73.8307, 40.7685])
  .addTo(map);



// Add a popup to the marker
// var popup = new mapboxgl.Popup({ closeButton: false })
//     .setHTML('<h3>Marker Title</h3><p>Marker description.</p>');

// marker2.setPopup(popup);

// // Add a click event to the marker
marker1.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'NAME';
  document.getElementById('popup-description').innerText = 'Person 1';
  document.getElementById('interview-title').innerText = 'DESCRIPTION'
  document.getElementById('interview-description').innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  document.getElementById('mp4-content').src = 'oralHistories/Harm.mp4';
  document.getElementById('panel').style.display = 'block';
});
marker2.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'NAME';
  document.getElementById('popup-description').innerText = 'Person 2';
  document.getElementById('interview-title').innerText = 'DESCRIPTION'
  document.getElementById('interview-description').innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  document.getElementById('mp4-content').src = 'oralHistories/DOB.mp4';
  document.getElementById('panel').style.display = 'block';
});
marker3.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'NAME';
  document.getElementById('popup-description').innerText = 'Person 3';
  document.getElementById('interview-title').innerText = 'DESCRIPTION'
  document.getElementById('interview-description').innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  document.getElementById('mp4-content').src = 'oralHistories/cops.mp4';
  document.getElementById('panel').style.display = 'block';
});
marker4.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'NAME';
  document.getElementById('popup-description').innerText = 'Mrs. H';
  document.getElementById('interview-title').innerText = 'DESCRIPTION'
  document.getElementById('interview-description').innerText = ' "At first, I was in it for money only. I started because I needed money. I believed it was worthwhile to sacrifice myself for my family and my siblings. I would have done anything if I could earn money… I was ready to sacrifice myself, and now it’s my job. Now… I think the world needs this kind of occupation and we need people who do this work for others… in our society. So now, rather than considering my job as excruciating, I think that massage work is an occupation that contributes to the development of the society, like a wheel of a wheelbarrow. Other people might think I’m crazy or I should say such a thing. But in my opinion, massage work is an indispensable occupation. I think someone has to do this work, because everyone needs massage." '
  document.getElementById('mp4-content').src = 'oralHistories/Ex1.mp4';
  document.getElementById('panel').style.display = 'block';
});
marker5.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'NAME';
  document.getElementById('popup-description').innerText = 'Person 5';
  document.getElementById('interview-title').innerText = 'DESCRIPTION'
  document.getElementById('interview-description').innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  document.getElementById('mp4-content').src = 'oralHistories/LA_oralhistory_1.mp4';
  document.getElementById('panel').style.display = 'block';
});

var videoElement = document.getElementById('mp4-content');
// Add an event listener to the close button
document.querySelector('.w3-button.w3-display-topright').addEventListener('click', function () {
  // Pause the video when the panel is closed
  videoElement.pause();
});

// // Close the panel when the map is clicked
// map.on('click', function() {
//     document.getElementById('panel').style.display = 'none';
// });

