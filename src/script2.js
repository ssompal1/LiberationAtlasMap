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
  let filterArrestPoints = ['>',['number',['get','arrestPoints']],0]
  let selectedYear = 2006;


  arrestsColorRamp = ['rgba(0,0,100,0)','rgb(21,101,192)','rgb(25,118,210)','rgb(33,150,243)','rgb(100,181,246)','rgb(144,202,250)']
  //green
  umColorRamp = ['rgba(102,0,0,0)','rgb(60,100,0)','rgb(131,220,0)','rgb(166,255,35)','rgb(198,255,115)','rgb(219,255,165)']
  //
  dobColorRamp = ['rgba(160,0,95,0)',
  'rgb(160,0,95)',
  'rgb(255,5,154)',
  'rgb(255,85,186)',
  'rgb(255,145,210)',
  'rgb(255,205,235)']
  console.log("right before layer add")

  map.addLayer({
    id: 'prostitution',
    type: 'fill',
    source: {
      type: 'geojson',
      data: '../src/geoData/dobInHex.geojson'
    },
    paint: {
      'fill-color': ['interpolate', ['linear'], ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0],
      0, 'transparent',
      1, 'rgb(0,76,153)', 
      200, 'rgb(0,255,255)'
    ],
    'fill-opacity': 0.75
    },
    layout: {
      visibility: 'none'
    }
  });

  map.addLayer({
    id: 'um',
    type: 'fill',
    source: {
      type: 'geojson',
      data: '../src/geoData/dobInHex.geojson'
    },
    paint: {
      'fill-color': ['interpolate', ['linear'], ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0],
      0, 'transparent',
      1, 'rgb(0,102,51)', 
      40, 'rgb(51,255,51)'
    ],
    'fill-opacity': 0.75
    },
    layout: {
      visibility: 'none'
    }
  });

  map.addLayer({
    id: 'dob',
    type: 'fill',
    source: {
      type: 'geojson',
      data: '../src/geoData/dobInHex.geojson'
    },
    paint: {
      'fill-color': ['interpolate', ['linear'], ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0],
      0, 'transparent',
      1, 'rgb(102,0,51)', 
      50, 'rgb(255,51,153)'
    ],
    'fill-opacity': 0.75
    },
    layout: {
      visibility: 'none'
    }
  });


  map.addLayer({
    id: 'collisions1',
    type: 'fill',
    source: {
      type: 'geojson',
      data: '../src/geoData/dobInHex.geojson'
    },
    paint: {
      'fill-color': [
        'case',
        ['all',
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0], 0
          ]
        ],
        ['interpolate', ['linear'], ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]],
          1, 'rgb(0,76,153)', 
          200, 'rgb(0,255,255)'
        ],
        ['all',
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0], 0
          ]
        ],
        ['interpolate', ['linear'], ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]],
          1, 'rgb(0,102,51)', 
          40, 'rgb(51,255,51)'
        ],
        ['all',
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0], 0
          ]
        ],
        ['interpolate', ['linear'], ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]],
          1, 'rgb(102,0,51)', 
          50, 'rgb(255,51,153)'
        ],
        'transparent'],
'fill-opacity': 0.75
//,
//"fill-extrusion-height" :["get", "arrestHeight"]
}
});


  //comment
  ///hearogiheoirghoaeig
  //update hour filter when the slider is dragged
  document.getElementById('slider').addEventListener('input', (event) => {
    const year = parseInt(event.target.value);
    //update the map
    //const cumBreakdown = document.getElementById("cumulative").checked
    //const byYearBreakdown = document.getElementById("byYear").checked
    // if (cumBreakdown) {
    //   filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
    //   filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
    // }
    //if (byYearBreakdown) {
      selectedYear = year;
      const updatedAllColor = getAllFillColor(selectedYear);
      const updatedProstitutionColor = getProstitutionFillColor(selectedYear)
      const updatedUmColor = getUmFillColor(selectedYear);
      const updatedDobColor = getDobFillColor(selectedYear);
      map.setPaintProperty('collisions1', 'fill-color', updatedAllColor); 
      map.setPaintProperty('prostitution', 'fill-color', updatedProstitutionColor); 
      map.setPaintProperty('um', 'fill-color', updatedUmColor); 
      map.setPaintProperty('dob', 'fill-color', updatedDobColor); 

      // filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], year];
      // filterHouseYear = ['==', ['number', ['get', 'Year']], year];
   // }
   // else {
      console.log('error');
   // }
    // filterP = ['==', ['string', ['get', 'LAW_CODE']], "PL 2300000"]
    // filterU = ['==', ['string', ['get', 'LAW_CODE']], "ED 6512001"]
    // map.setFilter('collisions', ['all', filterYear, filterP]);
    // map.setFilter('collisions1', ['all', filterYear, filterU]);
    // map.setFilter('collisions2', ['all', filterHouseYear]);
    // update text in the UI
    document.getElementById('active-year').innerText = year;
  });

  // console.log('loaded slider')

  //update map when toggle is changed

  // document
  //   .getElementById('timefilters')
  //   .addEventListener('input', (e) => {
  //     const timeBreakdown = e.target.value;
  //     const year = parseInt(document.getElementById('active-year').innerText)
  //     console.log(timeBreakdown)
  //     if (timeBreakdown == 'cumulative') {
  //       filterYear = ['<=', ['number', ['get', 'ARREST_YEAR']], year];
  //       filterHouseYear = ['<=', ['number', ['get', 'Year']], year];
  //     }
  //     else if (timeBreakdown == 'byYear') {
  //       filterYear = ['==', ['number', ['get', 'ARREST_YEAR']], year];
  //       filterHouseYear = ['==', ['number', ['get', 'Year']], year];
  //     }
  //     else {
  //       console.log('error');
  //     }
  //     map.setFilter('collisions', ['all', filterYear, filterP]);
  //     map.setFilter('collisions1', ['all', filterYear, filterU]);
  //     map.setFilter('collisions2', ['all', filterHouseYear]);
  //   });

  document.getElementById('x').addEventListener('click', function () {
    console.log("cliked x");
    document.getElementById('intropanel').style.display = 'none';
    document.getElementById('map').style.filter = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
    document.getElementById('btn-prostitution').style.display = 'block';
    document.getElementById('btn-um').style.display = 'block';
    document.getElementById('btn-dob').style.display = 'block';
    document.getElementById('btn-all').style.display = 'block';
  });

  document.getElementById('explore').addEventListener('click', function () {
    document.getElementById('intropanel').style.display = 'none';
    document.getElementById('map').style.filter = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
    document.getElementById('btn-prostitution').style.display = 'block';
    document.getElementById('btn-um').style.display = 'block';
    document.getElementById('btn-dob').style.display = 'block';
    document.getElementById('btn-all').style.display = 'block';
    document.getElementById('btn-all').classList.add('focus');
  });

  document.getElementById('viewhist').addEventListener('click', function () {
    if (window.location.hash) {
      if (window.location.hash == "#en") {
        document.getElementById('hist-title').innerText = 'Policing of Asian Massage Workers in NYC';
        document.getElementById('hist-description').innerText = 'Welcome! This demonstration will walk through major periods of policing of Asian massage work as a result of changes in state policies and tactics of criminalization';
        if (document.getElementById('hist-title').innerText === 'Policing of Asian Massage Workers in NYC') { document.getElementById('back').style.display = 'none'; }
        else { document.getElementById('back').innerText = 'BACK'; }
        if (document.getElementById('hist-title').innerText === 'Policing of Asian Massage Workers in NYC') { document.getElementById('next').innerText = 'START'; }
        else { document.getElementById('next').innerText = 'NEXT'; }
    }
    else if (window.location.hash == '#es') {
      document.getElementById('hist-title').innerText = 'Vigilancia Policial de Trabajadores de Masaje Asiáticos en NYC';
      document.getElementById('hist-description').innerText = '¡Bienvenido/a! Esta demostración cubrirá las etapas más importantes de la vigilancia policial del masaje asiatico resultado por cambios en políticas estatales y tácticas de criminalización.';
      if (document.getElementById('hist-title').innerText === 'Vigilancia Policial de Trabajadores de Masaje Asiáticos en NYC') { document.getElementById('back').style.display = 'none'; }
      else { document.getElementById('back').innerText = 'REGRESAR'; }
      if (document.getElementById('hist-title').innerText === 'Vigilancia Policial de Trabajadores de Masaje Asiáticos en NYC') { document.getElementById('next').innerText = 'INICIAR'; }
      else { document.getElementById('next').innerText = 'SIGUIENTE'; }
    }
    else if (window.location.hash == "#zh") {
      document.getElementById('hist-title').innerText = '纽约市对于亚裔按摩工人的监控与暴力';
      document.getElementById('hist-description').innerText = '欢迎！这幅图表会带你走过几个主要的时期，了解纽约州政策和定罪方式的变化，以及它们给亚裔按摩工人带来的监控和暴力。';
      if (document.getElementById('hist-title').innerText === '纽约市对于亚裔按摩工人的监控与暴力') { document.getElementById('back').style.display = 'none'; }
      else { document.getElementById('back').innerText = '回去'; }
      if (document.getElementById('hist-title').innerText === '纽约市对于亚裔按摩工人的监控与暴力') { document.getElementById('next').innerText = '开始'; }
      else { document.getElementById('next').innerText = '下一个'; }
  }
}
    document.getElementById('intropanel').style.display = 'none';
    document.getElementById('map').style.filter = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
    document.getElementById('btn-prostitution').style.display = 'block';
    document.getElementById('btn-um').style.display = 'block';
    document.getElementById('btn-dob').style.display = 'block';
    document.getElementById('btn-all').style.display = 'block';
    document.getElementById('btn-all').classList.add('focus');

    document.getElementById('hist-year').innerText = '2006-2023';
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

  var text1zh = '2000年联合国《巴勒莫议定书》出台，同年美国《人口贩卖受害者保护法》通过，开始了当代打击人口贩卖的运动，将以往有关性别、性、儿童、劳工和移民权利的法律整合为一个新的框架。就此，它们共同为美国帝国主义增添了新的手段，比如：每年 6 月，美国国务院都会发布《人口贩卖报告》，根据各国是否符合解决人口贩卖问题的 "最低标准"（此标准由美国制定），对世界各国进行四项排名。2006 年，法律学者简妮·庄（Janie Chuang）首次对美国的 "世界警察 "倾向提出警告，认为美国自封为法官，对全球各地的反人口贩卖工作进行裁决。无数性工作者、行动者和学者对庄博士批评中的“警察"部分表示赞同，ta们认为反人口贩卖政策始终将警务和起诉工作置于受害者保护之上。红莺歌Red Canary Song加入了这一呼声，主张 "权利而非救援"，即要求保护工人、移民安全和劳工组织，而非在我们的社区派驻警察。  ';
  var text2zh = '在过去十年中，亚洲按摩工作已成为人口贩卖的代名词。这并非偶然，而是美国反人口贩卖组织促成的结果，这些组织设计并开展了整场运动来取缔 "不正当按摩业"。自 2000 年美国《人口贩卖受害者保护法》通过以来，大多数反人口贩卖救援工作都是通过刑事法律系统进行的，通常是寻求刑事起诉而非受害者保护（Chapkis，2005 年）。关于全球反人口贩卖干预措施的研究常常受困于主流的 "监禁女权主义"而受到批评，尤其是当这些干预措施聚焦于性交易时，并且亚裔按摩工作常常被错认为性交易。（Bernstein，2007 年）。在此期间，北美各地通过了数十项法律，从反人口贩卖组织获得灵感、资金和政治权力，对 "身体工作 "进行了新的分类进行监管（例如，罗德岛州2016年通过的 H7007允许执法部门对亚裔按摩工作进行监管）。其它法律，如北卡罗来纳州 2017 年参议院第 548 号法案，是由美国最大的反人口贩卖组织之一 "北极星计划"（Polaris Project）与美国按摩治疗协会（American Massage Therapy Association）合作制定的。这项法律要求所有按摩师在候诊室张贴海报，标明全国人口贩卖热线电话号码。该法还要求从业人员必须拥有高中文凭，并且证明自己会说流利的英语。这种公然排外的规定体现了不同国族和阶级的劳动是如何被区分出正当与不正当的，从而允许政府对亚裔工作进行合法的监控和暴力。我们邀请你来看看，在这一时期政客游说并通过这些法律，是如何导致下一时期的治安和逮捕行动升级的。';
  var text3zh = "近年来，围绕性工作去罪化在人权方面的益处，越来越多的国家达成了共识，这预示着重要的立法变革。例如，2021 年，纽约市五个区的地方检察官宣布停止起诉卖淫，并取消所有对于公开卖淫拉客的指控。然而，矛盾的是，自 2021 年以来，亚裔按摩工人因无证按摩和违反楼宇局规定而被逮捕和传唤的人数急剧增加。在纽约市，因为这些民事法规收到传票的人中，90% 以上是亚裔低薪移民女工（城市正义中心，2021 年）。在纽约市，亚裔按摩工人因无证按摩而被传唤和/或逮捕，其实根据的是一项很久以前设立的教育法规。纽约的无证按摩传票适用于违反《纽约教育法》第 6512 条的行为，该条禁止个人从事无证按摩，以及在知情的情况下帮助三个或三个以上的无证人员从事按摩。这些执照法将白人至上主义和仇外心理写入法律，同时声称要拯救人口贩卖的亚裔受害者。这些对民事司法的侵犯对所有低薪移民工人的社会、情感和经济生活造成了极大伤害。我们邀请你通过地图来了解这些不断变化的警务趋势。";
  var textzh = [text1zh, text2zh, text3zh];

  var text1es = 'La Introducción del Protocolo Palermo en la UN junto al pasaje del Acto Para La Protección de Víctimas de Trata en los Estados Unidos en el año 2000 soltó al movimiento contemporáneo para luchar contra la trata de personas, consolidando a leyes previas sobre el genero, la sexo, los hijos, el empleo, y los migrantes a un nuevo systema. Utilizados juntos, estos acuerdos han respaldado nuevas formas de Imperialismo Americano a través de mecanismos como el Reporte Anual del Departamento de Estado de los EE. UU. del Trato de Personas, que cada junio clasifica a los países del mundo en acuerdo a unos “estándares mínimos” para abordar el trato de las personas. En el año 2006, la académica jurídica Janie Chuang advirtió por primera vez de las tendencias “globales alguaciles” de los EE. UU. por el hecho de que se había designado el juez contra el trato de las personas alrededor del mundo. El tema “alguacil” de los estudios de Chuang ha sido repetido por innumerables trabajadores sexuales, activistas, y académicos que afirman.';
  var text2es = 'En la última década, el trabajo de masaje asiático se ha convertido sinónimo a la trata de personas. Esto no es por equivocacíon, sino que fue un objetivo activo de las organizaciones estadounidenses contra la trata de personas que han diseñado y dedicado campañas enteras para cerrar los “Negocios Ilícitos de Masajes”. Desde la aprobación de la Ley de Protección a las Víctimas de la Trata de Estados Unidos de 2000, la mayoría de los esfuerzos de rescate contra la trata se han hecho a través del sistema legal penal, buscando a menudo el procesamiento penal en lugar de la protección de las víctimas (Chapkis 2005). Las investigaciones sobre intervenciones globales contra la trata–especialmente cuando apuntan a combatir el tráfico sexual, como a menudo se considera el trabajo de masaje asiático– han sido criticadas por sus compromisos predominantemente “feministas carcelarios” (Bernstein 2007). Durante este período, siguiendo el ejemplo, la financiación y el poder político de las organizaciones contra la trata de personas, se aprobaron docenas de leyes en toda América del Norte que crearon nuevas categorías de “trabajo corporal” (ver, por ejemplo, Rhode Island H7007 (2016), que permite a las fuerzas del orden para vigilar el trabajo de masaje asiático. Otras leyes, como el Proyecto de Ley 548 del Senado de Carolina del Norte de 2017, se forjaron a través de una colaboración entre el Proyecto Polaris, una de las organizaciones contra el tráfico de las personas más grandes del país, y la Asociación Estadounidense de Terapia de Masaje. Esta ley requiere que todos los terapeutas de masaje exponan carteles en sus salas de espera que muestren el número de teléfono de la línea directa nacional contra la trata de personas. También exige que los empleados tengan un diploma de escuela secundaria y que demuestren un dominio satisfactorio del idioma inglés. Estos requisitos descaradamente xenófobos subrayan cómo el trabajo está legitimado a través de las normas nacionales y marcadores de clase, permitiendo la vigilancia legítima del trabajo asiático. Le invitamos a usted a ver cómo el cabildeo y la adopción de estas leyes durante esta época llevaron a una intensificación de la vigilancia y los arrestos en la siguiente.';
  var text3es = "En los años mas recientes, un creciente consenso nacional sobre los beneficios para los derechos humanos que vienen con el despenalizar del trabajo sexual ha señalado importantes cambios legislativos. Por ejemplo, en 2021, los fiscales de distrito de la ciudad de Nueva York en los cinco condados anunciaron que dejarían de procesar la prostitución y cerrarían todos los cargos abiertos de solicitación de prostitución. Sin embargo, paradójicamente, desde el año 2021, los arrestos y citaciones de masajistas asiáticos por masajes sin licencia y violaciones del departamento de edificios han aumentado dramáticamente. En la ciudad de Nueva York, más del 90 por ciento de las personas que reciben citaciones a través de estos estatutos civiles son trabajadoras asiáticas migrantes con salarios bajos (Urban Justice 2021). En Nueva York, los masajistas asiáticos son citados y/o arrestados por masajes sin licencia según un antiguo estatuto educativo. Las citaciones por masajes sin licencia en Nueva York suponen una violación de la Ley de Educación 6512 de Nueva York, que prohíbe a una persona practicar terapias de masajes sin licencia y ayudar conscientemente a tres o más personas sin licencia a practicar. Estas leyes de concesión de licencias han convertido en ley la supremacía blanca y la xenofobia, al tiempo que pretenden rescatar a las víctimas asiáticas de la trata de personas. Estas intrusiones en la justicia civil tienen impactos perjudiciales en el sustento social, emocional y económico de todos los trabajadores migrantes con salarios bajos. Le invitamos a usted a ver estas tendencias cambiantes en la actuación policial a través de estos mapas.";
  var textes = [text1es, text2es, text3es];


  document.getElementById('next').addEventListener('click', function () {
    next();
    //document.getElementById('next').innerText = 'NEXT';
  
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
    if (window.location.hash) {
      if (window.location.hash == "#en") {
        document.getElementById('next').innerText = 'NEXT';
        document.getElementById('back').innerText = 'BACK';
        document.getElementById('hist-description').innerText = text[i];
    }
    else if (window.location.hash == '#es'){
      document.getElementById('next').innerText = 'SIGUIENTE';
      document.getElementById('back').innerText = 'REGRESAR';
      document.getElementById('hist-description').innerText = textes[i];
      
    }
    else if (window.location.hash == "#zh") {
      document.getElementById('back').innerText = '回去'; 
      document.getElementById('next').innerText = '下一个';
      document.getElementById('hist-description').innerText = textzh[i];
  }
}
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
  function getProstitutionFillColor(selectedYear){
    return ['interpolate', ['linear'], ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0],
    0, 'transparent',
    1, 'rgb(0,76,153)', 
    200, 'rgb(0,255,255)'
    ]

  }
  function getUmFillColor(selectedYear){
   return  ['interpolate', ['linear'], ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0],
      0, 'transparent',
      1, 'rgb(0,102,51)', 
      40, 'rgb(51,255,51)'
    ]
    
  }
  function getDobFillColor(selectedYear){
   return ['interpolate', ['linear'], ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0],
      0, 'transparent',
      1, 'rgb(102,0,51)', 
      30, 'rgb(255,153,204)'
    ]
    
  }


  function getAllFillColor(selectedYear) {
    return [
      'case',
        ['all',
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0], 0
          ]
        ],
        ['interpolate', ['linear'], ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]],
          1, 'rgb(0,76,153)', 
          200, 'rgb(0,255,255)'
        ],
        ['all',
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0], 0
          ]
        ],
        ['interpolate', ['linear'], ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]],
          1, 'rgb(0,102,51)', 
          40, 'rgb(51,255,51)'
        ],
        ['all',
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'prostitutionPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0], 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'umPoints']]], 0]
          ],
          ['>', 
            ['coalesce', ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]], 0], 0
          ]
        ],
        ['interpolate', ['linear'], ['get', ['to-string', selectedYear], ['get', 'yearlyData', ['get', 'dobPoints']]],
          1, 'rgb(102,0,51)', 
          30, 'rgb(255,153,204)'
        ],
      // Default color if no data matches (or the values are zero)
      'transparent'
    ];
  }



  async function animate(yearString, beginYear, endYear) {
    while (document.getElementById('hist-year').innerText == yearString) {
      // if ((document.getElementById('slider').value == beginYear) && (document.getElementById(checks[0]).checked == false) &&(document.getElementById(checks[1]).checked == false) && (document.getElementById(checks[2]).checked == false) ) {
      //   for (let i = 0; i < checks.length; i++) {
      //     document
      //       .getElementById(checks[i]).click();
      //   }
      // }
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

  const buttonIDs = ['btn-prostitution','btn-dob','btn-um','btn-all']
  const layerIDs = ['prostitution','dob','um','collisions1']
  for (let i = 0; i < buttonIDs.length; i++) {
    document
      .getElementById(buttonIDs[i])
      .addEventListener('click', (e) => {
        // Loop through all layer IDs
        console.log('registered click')
        buttonIDs.forEach(id => document.getElementById(id).classList.remove('focus'));
        document.getElementById(buttonIDs[i]).classList.add('focus');
        layerIDs.forEach((layerID, index) => {
          // Set visibility based on whether this is the clicked layer or not
          map.setLayoutProperty(
            layerID,
            'visibility',
            index === i ? 'visible' : 'none'
          );
        });
      });
  }


  // const checks = ['prostitution', 'unlicensed massage', 'housing violation']
  // const layerIDs = ['collisions1', 'collisions2']
  // const checks = ['prostitution', 'housing violation']
  // for (let i = 0; i < checks.length; i++) {
  //   document
  //     .getElementById(checks[i])
  //     .addEventListener('change', (e) => {
  //       console.log(e)
  //       map.setLayoutProperty(
  //         layerIDs[i],
  //         'visibility',
  //         e.target.checked ? 'visible' : 'none'
  //       );
  //     });

  // }



  // const layerIDs = ['collisions', 'collisions1', 'collisions2']
  // const checks = ['prostitution', 'unlicensed massage', 'housing violation']
  // const layerIDs = ['collisions1', 'collisions2']
  // const checks = ['prostitution', 'housing violation']
  // for (let i = 0; i < checks.length; i++) {
  //   document
  //     .getElementById(checks[i])
  //     .addEventListener('change', (e) => {
  //       console.log(e)
  //       map.setLayoutProperty(
  //         layerIDs[i],
  //         'visibility',
  //         e.target.checked ? 'visible' : 'none'
  //       );
  //     });

  // }

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
  if (window.location.hash) {
    if (window.location.hash == "#en") {
      document.getElementById('popup-title').innerText = 'Lisa';
      document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
      document.getElementById('interview-description').innerText = '';
    }
  else if (window.location.hash == "#es") {
    document.getElementById('popup-title').innerText = 'Lisa';
    document.getElementById('interview-title').innerText = 'Lisa es una masajista china migrante que también es organizadora principal del equipo de alcance a personas chinas de Red Canary Song.'
    document.getElementById('interview-description').innerText = 'Los propietarios de negocios y la farmacia de al lado piensan que tenemos demasiados hombres de ida y vuelta a toda hora. Si eres masajista, claro que no te van a respetar, ¿verdad? Primero que todo, piensan que eres un(a) migrante, una recién llegada. Nosotras no tenemos tanto tiempo en este barrio como ellos y ellas, que han estado aquí por como diez o veinte años… solo te verán como una chica migrante. Nosotras los hacemos sentir incómodos. Si por accidente dejamos la basura en algún lado yo se nos olvida, ellos la arrastran hasta el escalón. Un señor hizo esto dos veces - él esparció la basura por todo nuestro escalón. Mi punto de vista en todo esto… como lo puedo explicar… Honestamente, estamos haciendo una buena acción. Nosotros ayudamos a los trabajadores migrantes en esta ciudad. Cuando ellos se cansan, nosotras ayudamos a aliviar su cansancio. Para sus necesidades corporales, nosotras no ayudamos con nuestros cuerpos, si no que ayudamos con nuestras técnicas manuales. Para ellos, esto también es una forma de catarsis corporal, una pequeña consolación. Honestamente, esto no es fácil para estos hombres trabajadores migrantes. Sus casas no están aquí, ni sus espozas o hijos. Cuando ves esta expresión de ser deseado en sus caras, no puedes evitar sentir un poco de simpatía. Algunos hombres no lloran fácilmente. Pero, una vez me encontré con este señor – en serio me abrazo y lloro. Él me dijo que hacía investigaciones en una instalación restringida y que no había visto a una mujer en tres años. ¿Qué haces en esa situación? Seguro estaba sufriendo demasiado a causa de toda esta represión. Él prácticamente te estaba suplicando. Entonces qué le dices a eso? Él era joven, un seńor de como treinta y pico ańos. ¿Qué haces en esa situación? Mi deseo es que cada vez lleve a mis hermanas a cantar karaoke! [risa…] Yo las puedo hacer felices – si ellas se sienten felices, yo soy feliz. Si ellas se sienten tristes, yo también estoy triste.';
}
  else if (window.location.hash == "#zh") {
    document.getElementById('popup-title').innerText = '丽莎';
    document.getElementById('interview-title').innerText = 'Lisa是一位中国移民按摩女工，也是红莺歌中国外展队的队长和组织者。';
    document.getElementById('interview-description').innerText = '';
  }
}
  document.getElementById('mp4-content').src = 'oralHistories/Harm.mp4';
  document.getElementById('mp4-content').style.display = 'inline';
  document.getElementById('panel').style.display = 'block';
});

marker2.getElement().addEventListener('click', function () {
  if (window.location.hash) {
    if (window.location.hash == "#en") {
      document.getElementById('popup-title').innerText = 'Lisa';
      document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
      document.getElementById('interview-description').innerText = '';
    }
  else if (window.location.hash == "#es") {
    document.getElementById('popup-title').innerText = 'Lisa';
    document.getElementById('interview-title').innerText = 'Lisa es una masajista china migrante que también es organizadora principal del equipo de alcance a personas chinas de Red Canary Song.'
    document.getElementById('interview-description').innerText = 'La segunda vez que vinieron nos acusaron de las dos cosas: masaje sin licencia y prostitucion. Después vinieron una tercera vez. Esta tercera vez no nos arrestaron ni nos pidieron que nos fuésemos con ellos. Vinieron como una docena, algunos con el departamento de edificios, algunos con la FBI. En cualquier caso, gente de varios departamentos vinieron todos. Cerraron la sala de masajes. Después, fue la demanda. Todos los días por como tres meses cargaba mi mochila conmigo, tomando café en frente del precinto 109. Sin trabajo ni saber a donde ir, sufrí cada día de esa manera. Claro, el propietario estaba equivocado. Pero aunque estaba equivocado, pensé que era mejor no gastar energía en luchar contra algo como esto, porque si de alguna manera ganas en la corte, todavía habrás perdido el tiempo. Mucha gente no lucharía. Uno solo puede enfocarse en sí mismo, soltar, y perdurar.';
    //document.getElementById('interview-description').innerText = 'Es como la vez que me robaron. Paso en esta misma sala. Ese dia estaba a punto de salir del trabajo, pero el me dijo que “solo necesitaba que le haga media hora (de masaje)”. Cuando terminé, no se levantó por un largo rato. Al fin me dijo “paseme su telefono, telefono, telefono”. Pensé que a lo mejor necesitaba usar una aplicación para traducir algo. Pero, él escribió “acuéstese” y “robo”. Me pregunto si quería ver a mi madre y a mi padre de nuevo. Yo le entendi. Claro que quería ver a mis padres. “Si quieres ver a tu madre y a tu padre, saca tu dinero”. “Dinero, dinero dinero.” Me decía, “dinero dinero dinero dinero.” “dinero dinero dinero”. Yo le dije, “no dinero”. No tenía dinero, entonces me apuntó el arma. El busco en todas partes, destrozó todo el lugar. Él lo encontró en ese gabinete. El dijo que yo le mentí – que había tanta plata ahí pero yo dije que “no tenía dinero”. Me amenazó con dispararme. Lo único que pude hacer fue arrodillarme en el suelo y dije “perdoneme, perdoneme, perdoneme”. Dije que este dinero era para pagar el alquiler de la casa. “Perdoneme perdoneme perdoneme”. Dinero - pagar - casa - dinero. Porque lo había guardado en una bolsa plástica, había ahorrado para poder pagar dos meses de alquiler. Originalmente iba a pagar un mes, pero el propietario de la casa me había ofrecido un descuento si pagaba los dos meses en un solo pago. En esa bolsa tenía esa plata más lo que había ganado ese día. Ese día había tenido mucha suerte. Todos los clientes que había conocido fueran tan generosos, pensé yo. $120, $120… había hecho como dos o tres sesiones de $120. Fue lo máximo que había ganado en un solo día desde mi llegada a nueva york–todo me lo robaron. Llamar a la policía no ayudaría nada. Ellos no pueden perseguir la plata hasta que me la regresen, de todos modos. Además, si hubiese ido a la estación, me hubieran interrogado toda la noche.';
  }
  else if (window.location.hash == "#zh") {
    document.getElementById('popup-title').innerText = '丽莎';
    document.getElementById('interview-title').innerText = 'Lisa是一位中国移民按摩女工，也是红莺歌中国外展队的队长和组织者。';
    document.getElementById('interview-description').innerText = '';
  }
}
  document.getElementById('mp4-content').src = 'oralHistories/DOB.mp4';
  document.getElementById('mp4-content').style.display = 'inline';
  document.getElementById('panel').style.display = 'block';

});

marker3.getElement().addEventListener('click', function () {
  if (window.location.hash) {
    if (window.location.hash == "#en") {
      document.getElementById('popup-title').innerText = 'Lisa';
      document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
      document.getElementById('interview-description').innerText = '';
    }
  else if (window.location.hash == "#es") {
    document.getElementById('popup-title').innerText = 'Lisa';
    document.getElementById('interview-title').innerText = 'Lisa es una masajista china migrante que también es organizadora principal del equipo de alcance a personas chinas de Red Canary Song.'
    document.getElementById('interview-description').innerText = 'Es como la vez que me robaron. Paso en esta misma sala. Ese dia estaba a punto de salir del trabajo, pero el me dijo que “solo necesitaba que le haga media hora (de masaje)”. Cuando terminé, no se levantó por un largo rato. Al fin me dijo “paseme su telefono, telefono, telefono”. Pensé que a lo mejor necesitaba usar una aplicación para traducir algo. Pero, él escribió “acuéstese” y “robo”. Me pregunto si quería ver a mi madre y a mi padre de nuevo. Yo le entendi. Claro que quería ver a mis padres. “Si quieres ver a tu madre y a tu padre, saca tu dinero”. “Dinero, dinero dinero.” Me decía, “dinero dinero dinero dinero.” “dinero dinero dinero”. Yo le dije, “no dinero”. No tenía dinero, entonces me apuntó el arma. El busco en todas partes, destrozó todo el lugar. Él lo encontró en ese gabinete. El dijo que yo le mentí – que había tanta plata ahí pero yo dije que “no tenía dinero”. Me amenazó con dispararme. Lo único que pude hacer fue arrodillarme en el suelo y dije “perdoneme, perdoneme, perdoneme”. Dije que este dinero era para pagar el alquiler de la casa. “Perdoneme perdoneme perdoneme”. Dinero - pagar - casa - dinero. Porque lo había guardado en una bolsa plástica, había ahorrado para poder pagar dos meses de alquiler. Originalmente iba a pagar un mes, pero el propietario de la casa me había ofrecido un descuento si pagaba los dos meses en un solo pago. En esa bolsa tenía esa plata más lo que había ganado ese día. Ese día había tenido mucha suerte. Todos los clientes que había conocido fueran tan generosos, pensé yo. $120, $120… había hecho como dos o tres sesiones de $120. Fue lo máximo que había ganado en un solo día desde mi llegada a nueva york–todo me lo robaron. Llamar a la policía no ayudaría nada. Ellos no pueden perseguir la plata hasta que me la regresen, de todos modos. Además, si hubiese ido a la estación, me hubieran interrogado toda la noche.';
  }
  else if (window.location.hash == "#zh") {
    document.getElementById('popup-title').innerText = '丽莎';
    document.getElementById('interview-title').innerText = 'Lisa是一位中国移民按摩女工，也是红莺歌中国外展队的队长和组织者。';
    document.getElementById('interview-description').innerText = '';
  }
}
  document.getElementById('mp4-content').src = 'oralHistories/cops.mp4';
  document.getElementById('mp4-content').style.display = 'inline';
  document.getElementById('panel').style.display = 'block';
});

marker4.getElement().addEventListener('click', function () {
  if (window.location.hash) {
    if (window.location.hash == "#en") {
      document.getElementById('popup-title').innerText = 'Lisa';
      document.getElementById('interview-title').innerText = 'Lisa is a migrant Chinese massage worker who is also a lead organizer for the Red Canary Song Chinese outreach team.'
      document.getElementById('interview-description').innerText = '';
    }
  else if (window.location.hash == "#es") {
    document.getElementById('popup-title').innerText = 'Lisa';
    document.getElementById('interview-title').innerText = 'Lisa es una masajista china migrante que también es organizadora principal del equipo de alcance a personas chinas de Red Canary Song.'
    document.getElementById('interview-description').innerText = 'Cuando llegué por primera vez, busqué trabajo en todas partes. Al final, sentí que era muy difícil empezar en la industria de restaurantes o salones de uñas. Mi espalda estaba demasiado mal para trabajar en un restaurante todo el día parada; y mi vista era demasiado mala para pintar uñas. Para hacer masaje, había un periodo corto para aprender. Pude empezar a trabajar entre las primeras dos o tres semanas. Cuando primero llegas a un lugar, no sabes nada– es como estar en oscuridad total. Si no trabajas, ¿cómo puedes sobrevivir, comer y pagar el arriendo? Al fin hice un turno en la noche. Trabajaba de las 10:30 de la mañana hasta las 10:00 de la noche y de las 11 de la noche hasta las 4 de la mañana en otro sitio de masaje. Trabajaba dos trabajos en ese entonces, y lo pude hacer por como la mitad de un año. Al principio nunca descansaba – no podía parar. Como acaba de llegar de China, tenía mucho estrés y tenía muchas deudas. Quería agotarme en vez de tomar un descanso. Si descansaba, me distraería, y se me distraía, empezaba a llorar. Por cuatro meses, solo descansé por la mitad de un día. Al principio no sabía que había riesgos. Porque mi único deber era venir a trabajar, las otras no me decían todo. Nadie me dijo que era prohibido que trabajara en masajes. No fue hasta un año después que me enteré de los riesgos, porque llegó la policía a arrestarnos. Estábamos sorprendidas, como idiotas. Yo no tenía idea lo que estaba pasando. Llegaron como si fueran comensales normales. El me pidió que le diera un masaje, entonces lo dejé entrar. Solo le había hecho masaje por un minuto – ni siquiera se había quitado la ropa. El me pidió que le apretara el hombro, entonces le apreté el hombro. En ese momento entraron todos los policías. No trajeron interpretador entonces no entendía nada de lo que me decían. Me atraparon. Después, tomaron mi foto. Tenía puesto una camisa manga-corta. Mi ropa era un poco reveladora entonces les pregunté si me podía arreglar un poco. No me dejo ajustar a mi ropa, si no me la jalo para que me vea mas indecente. [...motor de avión sobre Flushing…] Estaba totalmente aturdida. No sabía que estaba pasando. Fui arrestada y pasé la noche en la cárcel.';
  }
  else if (window.location.hash == "#zh") {
    document.getElementById('popup-title').innerText = '丽莎';
    document.getElementById('interview-title').innerText = 'Lisa是一位中国移民按摩女工，也是红莺歌中国外展队的队长和组织者。';
    document.getElementById('interview-description').innerText = '';
  }
}
  document.getElementById('mp4-content').src = 'oralHistories/Ex1.mp4';
  document.getElementById('mp4-content').style.display = 'inline';
  document.getElementById('panel').style.display = 'block';
});

marker5.getElement().addEventListener('click', function () {
  if (window.location.hash) {
    if (window.location.hash == "#en") {
      document.getElementById('popup-title').innerText = 'Ms. Hwang';
      document.getElementById('interview-title').innerText = 'Ms. Hwang is a Korean migrant massage worker living and working in New York.';
      document.getElementById('interview-description').innerText = '';
    }
  else if (window.location.hash == "#es") {
    document.getElementById('popup-title').innerText = 'Sra. Hwang';
    document.getElementById('interview-title').innerText = 'La Sra. Hwang es una masajista migrante coreana que vive y trabaja en Nueva York.';
    document.getElementById('interview-description').innerText = 'En esta profesión, le toca a uno vivir varios accidentes, bastante represión policial, *ruido al fondo* redadas, clientes, robo, y comer y trabajar a la vez. Si si, puede compartir algunas de las situaciones más difíciles que ha vivido? La parte más difícil de este trabajo son las redadas. Yo nunca quisiera que mi familia sepa lo que hago para mi trabajo. Entonces es muy fuerte ser arrestada e interrogada por la policía. Además, los clientes… Hay todo tipo de clientes. Entonces tienes que preparar a tu mente desde el principio. Yo ya estaba preparada mentalmente cuando empecé a trabajar en esto. Yo soy bastante indulgente, tolero a casi todos los clientes. La cosa más importante son las redadas. Cuando viene la policía. Esa es la parte más difícil. Yo pienso, “porque tengo que vivir así? Porque me tratan como si fuera menos que una persona?” En momentos como estos, siento un gran sentimiento de autodestrucción. Después me doy la vuelta y pienso : no, no debería sabotearme así. Debería concentrarme y vivir más fuertemente. Mi mente da vueltas en momentos como estos. ¿Puede compartir algunos accidentes memorables? Cuando te atrapan en una redada, ¿cómo entra la policía a tu lugar de trabajo? ¿Cómo te arrestaron y llevaron a la estación de policía? ¿Cuánto tiempo te detuvieron? Por favor dime si has vivido algo como esto. Para mi, normalmente entra la policía como cliente. ¿En Corea del Sur? Si, pretendiendo ser cliente. Cómo policía encubierto. Si, encubierto, como cliente. Le abrí la puerta a un señor, pensando que era cliente pero era policía. Me agarro la muñeca para que no me mueva de ahí.  Quería huir y dejarle saber a las personas trabajando dentro. Trate de huir y advertirlas, pero me sostuvo la muñeca fuertemente para prevenir que me vaya. Entonces no tuve opción si no gritar. Grite fuertemente para que me escuchen adentro y para que sepan lo que venía. Porque grité tan fuertemente. Todos dentro de la sala, empleados y clientes. Así pasó la redada. Típicamente pasan así. Entonces vienen encubiertos, les abres la puerta, y te agarran la muñeca. Si, tienes razón. Si, pero ahora que lo estamos hablando, me recuerdo que un policía ya estaba adentro pretendiendo ser cliente también. Ya veo. Si, hay casos donde eso pasa. Al entrar, empiezan a buscar. Buscan en los cuartos. Buscan evidencia. A todos les da pánico. Los pequeños se ocupan en vestirse y tratar de escapar, entonces dejan evidencia. Después, la encuentra la policía y nos metemos en problemas. ¿Qué quieres decir con evidencia? Condones.';
  }
  else if (window.location.hash == "#zh") {
    document.getElementById('popup-title').innerText = '黄小姐';
    document.getElementById('interview-title').innerText = '黄小姐是一位韩国移民按摩女工，在纽约工作生活。 ';
    document.getElementById('interview-description').innerText = '';
  }
}
  document.getElementById('mp4-content').src = 'oralHistories/RCS_LA_draft.mp4';
  document.getElementById('mp4-content').style.display = 'inline';
  document.getElementById('panel').style.display = 'block';
});

marker6.getElement().addEventListener('click', function () {
  // Show the panel
  var transcript;
  if (window.location.hash) {
    if (window.location.hash == "#en") {
      document.getElementById('popup-title').innerText = 'Si Si';
      document.getElementById('interview-title').innerText = 'Si Si is a massage worker in her 50s from Chongqing. She arrived in the US in 2017 and has lived in Queens and Long Island ever since.'
      transcript = "<strong>What kind of work did you do when you first came to the US? </strong> <br><br>When I arrived in New York, I knew one person from my hometown who helped me get settled. I always thought I would work in a restaurant, \
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
    }
  else if (window.location.hash == "#es") {
    document.getElementById('popup-title').innerText = 'Si Si';
    document.getElementById('interview-title').innerText = 'Si Si es una masajista de cincuenta y tantos años de Chongqing. Llegó a los Estados Unidos en el año 2017 y desde entonces ha vivido en Queens y Long Island.'
    transcript = "<strong>¿Qué tipo de trabajo hacía usted cuando llegó por primera vez a los Estados Unidos? </strong> <br><br>Cuando llegué a Nueva York, conocía a una persona de mi ciudad natal que me ayudó a instalarme. Siempre pensé que trabajaría en un restaurante, \
entonces trabajé en varios restaurantes y rápidamente me di cuenta que el salario era muy bajo y que no ganaba lo suficiente para pagar mis deudas. Mis amigos me dijeron que si no puedes hablar inglés, el masaje \
es la única forma de ganar suficiente dinero para pagar nuestras deudas. Nosotras que somos mayores enfrentamos mucha presión para pagar nuestras deudas rápidamente.Entonces trabajar en masajes nos ayuda a pagar nuestras deudas y también es menos agotador, pero es emocionalmente agotador porque le tenemos miedo constantemente a la policía. Muchas de nosotras somos indocumentadas o no tenemos licencias de masaje. Inmediatamente después de aprender el masaje, \
trabajé en un spa en Long Island y me arrestaron. <br><br>En ese momento, no sabía mucho. Llevaba apenas unos meses trabajando y un día estábamos siete personas trabajando y la policía se fue a “pescar”. Nos preguntaron si estábamos documentados, y primero pidieron ver nuestros permisos de trabajo, luego pidieron ver nuestras licencias. Cuando no pudimos presentar las licencias, nos arrestaron.Ese día nos arrestaron por dos cargos: prostitución y masajes sin licencia. Nos asignaron un abogado gratuito a nuestro caso y el nos dijo que si uno no tiene licencia de masaje le recomienda que acepte el cargo de prostitución, nos dijo que era un cargo más leve. Nos dijo que si aceptábamos el cargo de prostitución y no nos arrestaban durante el próximo año, no deberíamos tener problemas en el futuro. En ese momento, no había hecho trabajo sexual. Pero aun así me dijo que aceptara el cargo para evitar ir a la cárcel.<br><br><strong>Esta fue la única vez que la arrestaron? </strong><br><br>Me arrestaron en otra ocasión cuando estaba saliendo de un bar donde había tomado con unos amigos.  En la esquina del bar había un grupo grande de mujeres esperando a sus amigos y amigas. Algunas vieron que venía la policía y se fueron a casa. Yo me quedé un rato más y me preguntaron que hacía en la esquina. No podía entender ni hablar inglés y luego supe que nos acusaron de bloquear la vía de transporte. Cuando me presenté a mi cita en la corte, mi abogado asignado por la corte me dijo que si me declaraba culpable, solo me tocaría pagar una multa de $35. Pensé que para mis adentros, esa multa era menor que los costos de transporte para presentarme en la corte y entonces la pagué.<br><br>No puedo hablar inglés. Si pudiera, no estoy segura que me hubiera declarado culpable de estos crímenes si los hubiera entendido en ese entonces.";
  }
  else if (window.location.hash == "#zh") {
    document.getElementById('popup-title').innerText = '西西';
    document.getElementById('interview-title').innerText = '西西是一位50多岁的按摩工人，来自重庆。她在2017年到达美国，从那以后一直生活在皇后区和长岛。';
    transcript = '';
  }
}
transcript = transcript.replace(/\n/g, '</p><p>&nbsp;</p><p>');
  // transcript = '<p>' + transcript + '</p>';

  document.getElementById('interview-description').innerHTML = transcript
  document.getElementById('mp4-content').src = 'oralHistories/Si SI.mp4';
  document.getElementById('mp4-content').style.display = 'inline';
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
  if (window.location.hash) {
    if (window.location.hash == "#es") {
      document.getElementById('zine-popup-title').innerText = 'EL MUNDO DEBE RECONOCER NUESTRO LABOR';
      document.getElementById('zine-popup-description').innerText = 'una historia oral de trabajo sexual migrante';
      document.getElementById('zine-interview-description').innerHTML = 'Esta revista contribuye a una extensa iniciativa de historia oral liderado por Red Canary Song, un colectivo de base organizando masajistas y trabajadores sexuales asiáticos y migrantes en una escala global. El propósito de este proyecto de historia oral consiste en recopilar relatos de trabajadoras sexuales, masajistas y organizadores, dando forma a un archivo de comunidad dentro del contexto de los derechos laborales, la justicia migratoria, y un marco alineado con la abolición del Complejo Industrial Penitenciario (PIC). \n \n Esta revista contribuye a una antología de novelas gráficas, traducida al coreano(, al español,) y al chino, destacando las experiencias compartidas de quienes ejercen el trabajo sexual, el trabajo de masajes, y el activismo. \n \n El contenido de esta revista proviene de un diálogo de historia oral entre Charlotte, una trabajadora social de Red Canary Song, y la Sra. Jang, una migrante coreana. La pieza visualmente representa partes de la historia que la Sra. Jang compartió con nosotros, que abarca aspectos del trabajo de masajes, trabajo sexual, y relaciones familiares.\n \n Esta revista fue visualizada, impresa y encuadernada por Karen Hu. \n \n Los agradecimientos por este trabajo se extienden a quienes participan en la recopilación y organización de estas historias orales, incluidos Yeonhoo Cho y Mona Malone.';
    }}
  document.getElementById('zinepanel').style.display = 'block';
  //document.getElementById('panel').style.display = 'block';
});

marker8.getElement().addEventListener('click', function () {
  // Show the panel
  console.log("Clicked");
  document.getElementById('popup-title').innerText = 'Sally';
  document.getElementById('mp4-content').style.display = 'none';
  if (window.location.hash) {
    if (window.location.hash == "#en") {
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
    }
    else if (window.location.hash == "#es"){
      document.getElementById('interview-title').innerText = 'Sally es una trabajadora sexual migrante de 51 años que fue desplazada en una redada en enero de 2024 en Jackson Heights, Corona y Elmhurst, Queens. \
        Esta redada tuvo como objetivo a las trabajadoras sexuales inmigrantes asiáticas que trabajan en la calle, publicando avisos de infracción del Departamento de Edificios en las empresas y posteriormente arrestando a cualquier trabajador que ingresara a estas empresas.';

      document.getElementById('interview-description').innerText = "Desde que cerraron el salón de masajes, no hay lugar para trabajar. Este Festival de Primavera ha sido muy frío.Tenía miedo de recibir llamadas de mi familia en China. No tenía dinero para pagar el alquiler, comer ni enviárselo a mi familia. Mis hijos necesitan dinero para comer. Me entristeció mucho no poder contestar la llamada telefónica de mi familia a pesar de que era año nuevo. \
      Todos los días voy al supermercado, que abre a las nueve, y compro verduras caducadas por un dólar el manojo.\n \n Lloré en silencio en mi habitación alquilada durante las vacaciones y mi corazón goteaba sangre. \
      Cuando pienso en todas las dificultades que encontré en los Estados Unidos, además de no poder trabajar, no sé cuándo terminará este tipo de sufrimiento.\n \nEn medio de la noche, lloro en secreto, derramo lágrimas y mi corazón gotea sangre. \
      No sé cuándo terminarán estos días. También quiero terminar estos días antes y darnos un trabajo para ganar dinero por nosotros mismos, por el bien de nuestra familia y por nosotros mismos. \
      Espero que tengamos la oportunidad de trabajar.\n\n Se supone que el Año Nuevo es un momento de celebración. Pero este año no hay reunión con amigos. Los miembros de mi comunidad están todos muy tristes y molestos, no hay trabajo, no pueden pagar el alquiler, además compran comida vencida por un dólar. \
      No estoy de humor para festejar juntos. No hay trabajo en Nochevieja y no hay dinero para comida. Debería haber sido feliz en Nochevieja, usando ropa nueva, pero ahora tengo los pantalones rotos. Deberíamos habernos reunido, AA, y cantar. \
      Cada vez que estamos en una habitación alquilada por la noche, derramamos lágrimas solos todos los días, no podemos decirle a nuestra familia que lo estamos pasando mal y tenemos que contar las buenas noticias. Pero estamos realmente muy mal, no podemos dormir todos los días por miedo a las preocupaciones familiares.\n \n \
      Espero que amigos de todos los ámbitos de la vida presten atención a nuestro grupo y no vuelvan a lastimarnos, nuestros corazones también son muy frágiles. Gracias por su atención a nuestra comunidad mientras exigimos cambios.";
    }
    else if (window.location.hash == "#zh"){
      document.getElementById('interview-title').innerText = '莎莉是一名 51 岁的移民性工作者，她在 2024 年 1 月对科罗纳杰克逊高地和皇后区埃尔姆赫斯特的一次突袭中流离失所。 \
        这次突袭针对亚洲移民街头性工作者，在企业上张贴建筑部违规通知，随后逮捕任何进入这些企业的工人。';
      document.getElementById('interview-description').innerText = '自从店关了以后，没有地方干活，这个春节过得很寒心，中国的家里打电话不敢接，没有钱交房租，吃饭，往回寄，孩子吃饭需要钱。非常难过，不敢接电话。每天去超市，九点开门，买过期的菜，一块钱一堆。过节在出租屋默默流泪，心在滴血。想起来美国种种不容易，加上没有工作，不知道这个日子什么时候到头。\
      每到半夜，夜深人静的时候，都自己偷偷在哭，流泪，心在滴血。我也不知道这种日子什么时候到头，我也想早点结束这种日子，给我们一个工作，靠自己挣钱，为了家人，为了自己。希望能给我们一个工作的机会。\n \n 过年本来应该是一个庆祝的时候，过年没有聚，都很消极，没有工作，房租都交不上，买菜都买一块钱的。没有心情一起聚会。过年没有工作，吃饭钱都没有。本来过年应该开开心心的，穿新衣服，但现在我的裤子都是破的。本来应该聚一聚，AA制，唱唱歌。每次我们晚上在出租房，天天自己流泪，还不能和家人说过得不好，还要报喜。但我们确实是非常不好，天天睡不着觉，怕家人担心。\n \n希望社会各界的朋友关注我们群体，不要再来伤害我们，我们的心灵也很脆弱。谢谢大家关注我们这个群体!';
    }
  }
  document.getElementById('panel').style.display = 'block';
  });

var videoElement = document.getElementById('mp4-content');

// Add an event listener to the close button
document.getElementById('markerclose').addEventListener('click', function () {
  // Pause the video when the panel is closed
  videoElement.pause();
});


// Create a function to change
        // the hash value of the page
        function changeLanguage(lang) {
          location.hash = lang;
          location.reload();
      }

      // Check if a hash value exists in the URL
      if (window.location.hash) {

          // Set the content of the webpage
          // depending on the hash value
          if (window.location.hash == "#en") {
              headerText.textContent = "Liberation Atlas";
              headerTwoText.textContent = "Data Justice for Migrant Massage Workers";
              introdescription.textContent = "We invite you to grapple with the policing of migrant Asian massage work throughout New York City and to listen to the voices and lives behind the data. This project offers a critical intervention to the mapping projects undertaken by carceral anti-trafficking organizations that manipulate big data to stroke fears around massage work. These visualizations flatten the lives of workers to one-dimensional points on a map and are used to bolster policies that criminalize racialized and gendered low wage work. We encourage you to engage with the stories (un)told here and share them to amplify the struggle and power of migrant massage worker organizing.";
              explore.textContent = "explore the map";
              viewhist.textContent = "walk through a brief history";
              dropbutton.textContent = "select language";
              consoletitle.textContent = "Prostitution & Unlicensed Massage Arrests";
              updated.textContent = "Updated January 2024";
              cumulabel.textContent = "Cumulative";
              yearlabel.textContent = "By Year";
              arrestcharges.textContent = "Arrest Charges";
              prostitutionlabel.textContent = "Prostitution";
              massagelabel.textContent = "Unlicensed Massage";
              housingviols.textContent = "Housing Code Violations";
              buildinglabel.textContent = "Building Inspections (DOB)";
              reset.textContent = "RESET MAP"

            }
            else if (window.location.hash == '#es'){
              headerText.textContent = "Atlas De Liberación";
              headerTwoText.textContent = "Utilizando Datos Estadísticos Para La Justicia de Trabajadores de Masaje Migrantes.";
              introdescription.textContent = "Nosotros le invitamos a enfrentarse a la vigilancia policial de los trabajadores migrantes en las salas de masaje asiáticas en la Ciudad de Nueva York y le invitamos a ponerle atención a las voces y vidas detrás de estos datos e historias. Este proyecto ofrece una intervención crítica a los proyectos cartográficos dirigidos por organizaciones carcelarias y anti-migrantes que manipulan grandes datos para crear miedo alrededor del masaje profesional. Estas visualizaciones negativas reducen las vidas de estos empleados a solo puntos en un mapa para reforzar las políticas que criminalizan a trabajos radicalizados de bajo pago.  Nosotros le animamos a interactuar con las historias contadas aquí y a compartirlas para amplificar la lucha y el poder del organizamiento de trabajadores de masaje migrantes.";
              explore.textContent = "explorar el mapa";
              viewhist.textContent = "recorrer una breve historia";
              dropbutton.textContent = "seleccione el idioma";
              consoletitle.textContent = "Arrestos por Prostitución y Masaje No Licensiado";
              updated.textContent = "Actualizado Enero 2024";
              cumulabel.textContent = "Cumulativo";
              yearlabel.textContent = "Por Año";
              arrestcharges.textContent = "Cargos";
              prostitutionlabel.textContent = "Prostitucíon";
              massagelabel.textContent = "Masaje No Licenciado";
              housingviols.textContent = "violaciones de vivienda";
              buildinglabel.textContent = "Inspecciones de Edificios";
              reset.textContent = "REINICIAR EL MAPA"
            }
          else if (window.location.hash == "#zh") {
            headerText.textContent = "自由姐妹地图集";
            headerTwoText.textContent = "为移民按摩工人争取数据正义";
            introdescription.textContent = "在这张地图里，我们邀请你探讨纽约市对亚裔移民按摩工作的监控和暴力，倾听数据背后的声音和生活。这张地图致力于干预现有的叙事，例如一些反人口贩卖组织，它们利用大数据来鼓动民众对按摩工作的恐惧，来支持更多刑事监禁。它们制作的地图用视觉效果，将工人丰富立体的生活压缩为地图上扁平的一点，将种族化和性别化的低工资工作视作犯罪，以此来支持加强定罪的政策。与它们不同的是，我们希望你可以聆听这张地图里讲述的故事及无法讲述的沉默，并分享这些故事，来壮大我们移民按摩工人组织的斗争和力量。";
            explore.textContent = "探索地图";
            viewhist.textContent = "回顾一下简史";
            dropbutton.textContent = "选择语言";
            consoletitle.textContent = "卖淫罪&无证按摩逮捕";
            updated.textContent = "2024年1月更新";
            cumulabel.textContent = "全部显示";
            yearlabel.textContent = "按年份显示";
            arrestcharges.textContent = "控罪";
            prostitutionlabel.textContent = "卖淫罪";
            massagelabel.textContent = "无证按摩";
            housingviols.textContent = "违反房屋法";
            buildinglabel.textContent = "楼宇检查（楼宇局";
            reset.textContent = "重置地图"

          }
      }

// // Close the panel when the map is clicked
// map.on('click', function() {
//     document.getElementById('panel').style.display = 'none';
// });