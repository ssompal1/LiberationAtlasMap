mapboxgl.accessToken = "pk.eyJ1Ijoic2hyYXZ5YS1zb21wYWxsaSIsImEiOiJjbGEycmZ3YnAwMzA4M3dwbjExejNqeDczIn0.U0UKRmRLgqJVkz1BizIQBg"
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-73.9010, 40.7555],
  zoom: 11.25
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
  let filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], 2006];
  let filterHouseYear = ['==', ['number', ['get', 'Year']], 2006];
  let filterP = ['==', ['string', ['get', 'LAW_CODE']], "PL 2300000"]
  let filterU = ['==', ['string', ['get', 'LAW_CODE']], "ED 6512001"]
  let filterDOB = ['==', ['string', ['get', 'type_of_violation']], "DOB code violation"]
  let filterHV = ['==', ['string', ['get', 'type_of_violation']], "maintenance code violation"]

  map.addLayer({
    id: 'collisions',
    type: 'heatmap',
    source: {
      type: 'geojson',
      data: '../src/geoData/NYPDArrestsNov2023.geojson'
    },
    layout: {
      visibility: 'none'
    },

    // Increase the heatmap color weight by zoom level
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

    'filter': ['all', filterYear, filterP]
  });

  map.addLayer({
    id: 'collisions1',
    type: 'heatmap',
    source: {
      type: 'geojson',
      data: '../src/geoData/NYPDArrestsNov2023.geojson'
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

    'filter': ['all', filterYear, filterU]
  });

  map.addLayer({
    id: 'collisions2',
    type: 'heatmap',
    source: {
      type: 'geojson',
      data: '../src/geoData/OATH_MUP_inspections_Jan2024.geojson'
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

    'filter': ['all', filterHouseYear]
  });
  //comment
  ///hearogiheoirghoaeig
  // update hour filter when the slider is dragged
  document.getElementById('slider').addEventListener('input', (event) => {
    const year = parseInt(event.target.value);
    //update the map
    const cumBreakdown = document.getElementById("cumulative").checked
    const byYearBreakdown = document.getElementById("byYear").checked
    if (cumBreakdown) {
      filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
      filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
    }
    else if (byYearBreakdown) {
      filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], year];
      filterHouseYear = ['==', ['number', ['get', 'Year']], year];
    }
    else {
      console.log('error');
    }
    filterP = ['==', ['string', ['get', 'LAW_CODE']], "PL 2300000"]
    filterU = ['==', ['string', ['get', 'LAW_CODE']], "ED 6512001"]
    map.setFilter('collisions', ['all', filterYear, filterP]);
    map.setFilter('collisions1', ['all', filterYear, filterU]);
    map.setFilter('collisions2', ['all', filterHouseYear]);
    // update text in the UI
    document.getElementById('active-year').innerText = year;
  });

  //update map when toggle is changed

  document
    .getElementById('timefilters')
    .addEventListener('input', (e) => {
      const timeBreakdown = e.target.value;
      const year = parseInt(document.getElementById('active-year').innerText)
      console.log(timeBreakdown)
      if (timeBreakdown == 'cumulative') {
        filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
        filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
      }
      else if (timeBreakdown == 'byYear') {
        filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], year];
        filterHouseYear = ['==', ['number', ['get', 'Year']], year];
      }
      else {
        console.log('error');
      }
      map.setFilter('collisions', ['all', filterYear, filterP]);
      map.setFilter('collisions1', ['all', filterYear, filterU]);
      map.setFilter('collisions2', ['all', filterHouseYear]);
    });

  document.getElementById('x').addEventListener('click', function () {
    document.getElementById('intropanel').style.display = 'none';
    document.getElementById('map').style.filter = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
  });

  document.getElementById('explore').addEventListener('click', function () {
    document.getElementById('intropanel').style.display = 'none';
    document.getElementById('map').style.filter = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
  });

  document.getElementById('viewhist').addEventListener('click', function () {
    document.getElementById('intropanel').style.display = 'none';
    document.getElementById('map').style.filter = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
    document.getElementById('hist-title').innerText = 'Policing of Asian Massage Workers in NYC';
    document.getElementById('hist-year').innerText = '2006-2023';
    document.getElementById('hist-description').innerText = 'Welcome! This demonstration will walk through major periods of policing of Asian massage work as a result of changes in state policies and tactics of criminalization';
    if (document.getElementById('hist-title').innerText === 'Policing of Asian Massage Workers in NYC') { document.getElementById('back').style.display = 'none'; }
    else { document.getElementById('back').innerText = 'BACK'; }
    if (document.getElementById('hist-title').innerText === 'Policing of Asian Massage Workers in NYC') { document.getElementById('next').innerText = 'START'; }
    else { document.getElementById('next').innerText = 'NEXT'; }
    document.getElementById('histpanel').style.display = 'block';
  });

  document.getElementById('reset').addEventListener('click', function () {
    // document.getElementById('intropanel').style.display= 'block';
    // document.getElementById('map').style.filter = 'blur(2px);';
    // document.getElementById('console').style.display = 'none';
    // document.getElementById('panel').style.display= 'none';
    window.location.reload();
  });


  var years = ['2006-2013', '2014-2017', '2018-2023'];
  var text1 = 'The introduction of the 2000 UN Palermo Protocol and passage of the 2000 US Trafficking Victims Protection Act, unleashed the contemporary movement to combat human trafficking, consolidating previous laws around gender, sex, child, labor, and migrant rights into a new framework. Used together, they have endorsed new forms of US imperialism and empire through mechanisms like the annual US State Department’s Trafficking in Persons report, an annual report, released each June, that ranks countries around the world on a four-tier ranking system in accordance with with compliance with a US set of “minimum standards” to address human trafficking. In 2006, legal scholar Janie Chuang first warned of the US’ “global sheriff” tendencies in anointing itself as the judge of anti-trafficking efforts around the world. The “sheriff” part of Dr. Chuang’s critique has been echoed by countless sex workers, activists, and scholars who assert that anti-trafficking policies have consistently prioritized policing and prosecutorial efforts over victim protection. RCS joins this chorus of voices in arguing for “rights not rescue,” – a rallying cry that demands worker protection, safe migration, and labor organizing, over police presence in our communities.'
  var text2 = 'In the past decade, Asian massage work has become synonymous with human trafficking. This is not accidental, but was an active target of US anti-trafficking organizations that have designed and devoted entire campaigns to shutting down “Illicit Massage Businesses.” Since the passage of the 2000 US Trafficking Victims Protection Act, most anti-trafficking rescue efforts have been funneled through the criminal legal system, often seeking criminal prosecution over victim protection (Chapkis 2005). Research on global anti-trafficking interventions—especially when they aim to target sex trafficking, as Asian massage work is often considered—have been critiqued for their predominantly “carceral feminist” commitments (Bernstein 2007). During this time period–taking their cues, funding, and political power from anti-trafficking organizations–dozens of laws were passed throughout North America that created new categories of “bodywork” (see, e.g. Rhode Island H7007 (2016) that allows law enforcement to police Asian massage work. Other laws, like North Carolina’s 2017 Senate Bill 548, were forged through a collaboration between the Polaris Project, one of the nation’s largest anti-trafficking organizations, and the American Massage Therapy Association. This law requires all massage therapists to display posters in their waiting rooms that show the phone number for the national human trafficking hotline. It also requires that workers have a high school diploma and demonstrate satisfactory proficiency in the English language. Such blatantly xenophobic requirements underscore how labor is legitimated through national and class markers, allowing the legitimate policing of Asian work. We invite you to see how the lobbying and adoption of these laws during this time period, led to escalated policing and arrests in the next.'
  var text3 = 'In recent years, a growing national consensus around the human rights merits of decriminalizing sex work has signaled important legislative changes. For instance, in 2021, New York City District Attorneys across the five boroughs announced that they would cease prosecuting prostitution and would close all open prostitution solicitation charges. Yet, paradoxically, since 2021, the arrests and citations of Asian massage workers for unlicensed massage and department of buildings violations has increased dramatically. In New York City, more than 90 percent of those receiving citations through these civil statutes are migrant Asian low wage women workers (Urban Justice 2021). In NYC Asian massage workers are cited and/or arrested for unlicensed massage under an age-old education statute. Unlicensed massage citations in New York apply a violation of New York Education Law 6512, which prohibits a person from practicing unlicensed massage therapies and from knowingly aiding three or more unlicensed persons to practice. These licensing laws have scripted white supremacy and xenophobia into law, while claiming to rescue Asian victims of human trafficking.These intrusions into civil justice have detrimental impacts on social, emotional, and economic livelihood of all migrant low wage workers. We invite you to see these shifting trends in policing through these maps.'
  var text = [text1, text2, text3];
  var histYear = document.getElementById('hist-year').innerText;
  var i = -1;

  document.getElementById('next').addEventListener('click', function () {
    next();
    document.getElementById('next').innerText = 'NEXT';
    document.getElementById('back').style.display = 'block';
  });

  document.getElementById('back').addEventListener('click', function () {
    back();
  });

  function next() {
    if (i >= 2) { return setHistText() };
    i++;
    if (i == 0) { }
    return setHistText()
  }

  function back() {
    if (i == 0) { return setHistText() };
    i--;
    return setHistText()
  }

  function setHistText() {
    document.getElementById('hist-description').innerText = text[i];
    document.getElementById('hist-year').innerText = years[i]
    if (i == 0) { document.getElementById('back').className = ('backOff') }
    else { document.getElementById('back').className = ('back') }
    if (i == 2) { document.getElementById('next').className = ('backOff') }
    else { document.getElementById('next').className = ('next') }
    if (document.getElementById('hist-year').innerText == '2006-2013') {
      return animate(years[i], 2006, 2013);
    }
    if (document.getElementById('hist-year').innerText == '2014-2017') {
      return animate(years[i], 2014, 2017);
    }
    if (document.getElementById('hist-year').innerText == '2018-2023') {
      return animate(years[i], 2018, 2023);
    }

  }



  async function animate(yearString, beginYear, endYear) {
    while (document.getElementById('hist-year').innerText == yearString) {
      if ((document.getElementById('slider').value == beginYear) && (document.getElementById(checks[0]).checked == false) &&(document.getElementById(checks[1]).checked == false) && (document.getElementById(checks[2]).checked == false) ) {
        for (let i = 0; i < checks.length; i++) {
          document
            .getElementById(checks[i]).click();
        }
      }
      for (let y = beginYear; y < endYear + 1; y++) {
        await delayFor(1000);
        if (document.getElementById('hist-year').innerText != yearString) {
          break;
        }
        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true,
        });
        document.getElementById('slider').value = y;
        document.getElementById('slider').dispatchEvent(inputEvent);
      }
    }
  }
  function delayFor(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }



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
  .setLngLat([-73.871042, 40.752154])
  .addTo(map);

const e2 = document.createElement('div');
e2.className = 'marker';
const marker2 = new mapboxgl.Marker(e2)
  .setLngLat([-73.790066, 40.768593])
  .addTo(map);
const e3 = document.createElement('div');
e3.className = 'marker';
const marker3 = new mapboxgl.Marker(e3)
  .setLngLat([-73.827695, 40.756897])
  .addTo(map);
const e4 = document.createElement('div');
e4.className = 'marker';
const marker4 = new mapboxgl.Marker(e4)
  .setLngLat([-73.807975, 40.753624])
  .addTo(map);

  const e5 = document.createElement('div');
  e5.className = 'marker';
  const marker5 = new mapboxgl.Marker(e5)
    .setLngLat([-73.8307, 40.7685])
    .addTo(map);
  
  const e6 = document.createElement('div')
  e6.className = 'marker';
  const marker6 = new mapboxgl.Marker(e6)
  .setLngLat([-73.88504484381795, 40.756106297889026])
  .addTo(map)

  const e7 = document.createElement('div')
  e7.className = 'marker';
  const marker7 = new mapboxgl.Marker(e7)
  .setLngLat([-73.812606, 40.771048])
  .addTo(map)

  const e8 = document.createElement('div')
  e8.className = 'marker';
  const marker8 = new mapboxgl.Marker(e8)
  .setLngLat([-73.815718, 40.766841])
  .addTo(map)

marker1.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Lisa';
  // document.getElementById('popup-description').innerText = 'Person 1';
  document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
  document.getElementById('interview-description').innerText = ''
  document.getElementById('mp4-content').src = 'oralHistories/Harm.mp4';
  document.getElementById('panel').style.display = 'block';
});

marker2.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Lisa';
  // document.getElementById('popup-description').innerText = 'Person 2';
  document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
  document.getElementById('interview-description').innerText = ''
  document.getElementById('mp4-content').src = 'oralHistories/DOB.mp4';
  document.getElementById('panel').style.display = 'block';

});

marker3.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Lisa';
  // document.getElementById('popup-description').innerText = 'Person 3';
  document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
  document.getElementById('interview-description').innerText = ''
  document.getElementById('mp4-content').src = 'oralHistories/cops.mp4';
  document.getElementById('panel').style.display = 'block';
});

marker4.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Lisa';
  // document.getElementById('popup-description').innerText = 'Mrs. H';
  document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
  document.getElementById('interview-description').innerText = ''
  document.getElementById('mp4-content').src = 'oralHistories/Ex1.mp4';
  document.getElementById('panel').style.display = 'block';
});

marker5.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Ms. Hwang';
  // document.getElementById('popup-description').innerText = 'Person 5';
  document.getElementById('interview-title').innerText = 'Ms. Hwang is a Korean migrant massage worker living and working in New York.'
  document.getElementById('interview-description').innerText = ''
  document.getElementById('mp4-content').src = 'oralHistories/RCS_LA_draft.mp4';
  document.getElementById('panel').style.display = 'block';
});

marker6.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Si Si';
  // document.getElementById('popup-description').innerText = 'Person 6';
  document.getElementById('interview-title').innerText = 'Si Si is a massage worker in her 50s from Chongqing. She arrived in the US in 2017 and has lived in Queens and Long Island ever since.'
  var transcript = "<strong>What kind of work did you do when you first came to the US? </strong> <br><br>When I arrived in New York, I knew one person from my hometown who helped me get settled. I always thought I would work in a restaurant, \
   and worked a number of restaurant jobs and quickly learned that the pay was very low, I didn’t earn enough to pay back my debts. My friends told me, if you can’t speak English, massage \
   is the only way to make enough money to return our debts. Those of us who are older face a lot of pressure to pay back our debts quickly.<br><br>So working in massage helps us return our debts, \
   and is also less tiring, but its emotionally tiring because we are constantly scared of the police. So many of us are undocumented or don’t have massage licenses. Right after I learned massage, \
   I worked at a spa in Long Island, and I was arrested. At that time, I didn’t know too much. I had just been working a few months, and one day, seven of us were working, and the police went “fishing.” They asked if we were documented, \
   and first asked to see our work permits, then after that asked to see our licenses. When we couldn’t’ produce licenses, they arrested us.<br><br>That day we were arrested for two charges: prostitution and unlicensed massage. A free lawyer was assigned \
   to our case and told us that if you don’t have a massage license, I recommend you to accept the prostitution charge, he said it was a lighter charge. He told us that if we accepted the prostitution charge, and didn’t get arrested within the \
   next year, that we shouldn’t have future problems. At the time, I hadn’t done sex work. But still he told me to take the charge to avoid jail time.<br><br><strong>Was this the only time you were arrested?</strong><br><br>I was arrested one \
   other time coming out of a bar, after drinking with friends. There was a large group of us women on the street corner talking, waiting for friends. Some saw the police coming and went home. I didn’t leave immediately, \
   and they asked what you are doing on this street corner? I couldn’t understand or speak English, and later learned that they charged us with blocking transportation thoroughfare. When I showed up to my court date, my court \
   assigned lawyer told me that if I plead guilty, then I would pay a $35 fine. I thought to myself, that fine is less than my transportation costs to show up at court and so I paid it.<br><br>I can’t speak English. If I could, I’m not sure I would have pleaded guilty to these crimes if I understood them." 
  transcript = transcript.replace(/\n/g, '</p><p>&nbsp;</p><p>');
  // transcript = '<p>' + transcript + '</p>';

  document.getElementById('interview-description').innerHTML = transcript
  document.getElementById('mp4-content').src = 'oralHistories/Si SI.mp4';
  document.getElementById('panel').style.display = 'block';
});

marker7.getElement().addEventListener('click', function () {
  // var iframeContainer = document.createElement('div');
  // iframeContainer.style = "position:relative;padding-top:max(60%,324px);width:100%;height:0;";

  // var iframe = document.createElement('iframe');
  // iframe.style = "position:absolute;border:none;width:100%;height:100%;left:0;top:0;";
  // iframe.src = "https://online.fliphtml5.com/thsxk/zopq/";
  // iframe.seamless = "seamless";
  // iframe.scrolling = "no";
  // iframe.frameborder = "0";
  // iframe.allowtransparency = "true";
  // iframe.allowfullscreen = "true";

  // iframeContainer.appendChild(iframe);

  // document.getElementById('zine').innerHTML = "";
  // document.getElementById('zine').appendChild(iframeContainer);

  document.getElementById('zinepanel').style.display = 'block';
});

marker8.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Sally';
  document.getElementById('mp4-content').style.display = 'none';
  document.getElementById('interview-title').innerText = 'Sally is a 51-year-old migrant sex worker who was displaced in a January 2024 raid of Jackson Heights, Corona, and Elmhurst, Queens. \
   This raid targeted Asian migrant street-based sex workers by posting Department of Buildings violation notices on businesses and subsequently arresting any workers entering these businesses.'
  document.getElementById('interview-description').innerText = "Since the massage parlor was closed down, there is no place to work. This Spring Festival has been very cold.\
   I was afraid of taking calls from my family in China.I had no money to pay the rent, eat, or send back to my family. My children need money for food. I was very sad that I couldn't answer the phone call from my family even though it was new year. \
   Every day, I go to the supermarket, which opens at nine o'clock, and buy expired vegetables for a dollar a bunch.\n \n I was crying silently in my rented room during the holiday, and my heart was dripping blood.\
    When I think of all the hardships I encountered in the United States, coupled with not being able to work, I don't know when this kind of suffering will come to an end.\n \nIn the middle of the night, when it's quiet, I secretly cry, shed tears, and my heart drips blood. \
    I don't know when these days will come to an end. I also want to end these days earlier and give us a job to earn money by ourselves, for the sake of our family and for ourselves. \
    I hope we will be given a chance to work.\n\n New Year's is supposed to be a time of celebration. But this year, there is no gathering with friends. My community members are all very sad and upset, there is no job, they can't pay the rent, they also buy expired food for a dollar. \
    Not in the mood to party together. There is no work on New Year's Eve, and there is no money for food. I should have been happy on New Year's Eve, wearing new clothes, but now my pants are torn. We should have gotten together, AA, and sang. \
    Every time we are in a rented room at night, we shed tears by ourselves every day, and we can't tell our family that we are having a bad time, and we have to report the good news. But we are really very bad, can not sleep every day, afraid of family worry.\n \n \
    I hope that friends from all walks of life will pay attention to our group and not come back to hurt us, our hearts are also very fragile. Thank you for your attention to our community as we demand change."
  document.getElementById('panel').style.display = 'block';
});

var videoElement = document.getElementById('mp4-content');

// Add an event listener to the close button
document.getElementById('markerclose').addEventListener('click', function () {
  // Pause the video when the panel is closed
  videoElement.pause();
});


// // Close the panel when the map is clicked
// map.on('click', function() {
//     document.getElementById('panel').style.display = 'none';
// });