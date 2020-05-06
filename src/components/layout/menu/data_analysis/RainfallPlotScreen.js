import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ContainerStyle } from '../../../../styles/container_style'
import { LabelStyle } from '../../../../styles/label_style';
import AppConfig from '../../../../reducers/AppConfig';
import SpinnerLoader from '../../../../reducers/Spinner';

import HighchartsReactNative from '@highcharts/highcharts-react-native';
import moment from 'moment';

function RainfallPlotScreen() {
  const [rainfallData, setRainfallData] = useState();
  const [openSpinner, setOpenSpinner] = useState(true);
  const [latestTs, setLatestTS] = useState(moment(new Date).format("LLLL"));
  const [display, setDisplay] = useState(false);
  const [graphContainer, setGraphContainer] = useState([]);

  useEffect(() => {
    initRainfallPlot();
  }, []);

  const initRainfallPlot = (site_code = 'mar') => {
    fetch(`${AppConfig.HOSTNAME}/api/data_analysis/rainfall/plot/data/${site_code}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            let rainfall_data = responseJson[0];
            setRainfallData(rainfall_data)
            prepRainPlot(rainfall_data.plot, rainfall_data.ts_start, rainfall_data.ts_end)
        })
        .catch((error) => {
            console.log(error);
        }
    );
  }

  const prepRainPlot = (rainfall, ts_start, ts_end) => {
    let processed_data = [];
    rainfall.forEach(set => {
        const data = prepareRainfallData(set, ts_start, ts_end);
        processed_data.push(data);
    });
    let temp = renderGraph(processed_data, ts_start, ts_end);
    let temp_container = [];
    temp.map((option, i) => {
      temp_container.push(
        <View key={i} style={{padding: 10}}>
          <HighchartsReactNative
            styles={{
              backgroundColor: '#fff',
              justifyContent: 'center',
              height: 350,
              width: '100%'
            }}
            options={option.cumulative}
          />
        </View>
      )
    });
    setGraphContainer(temp_container);
    setDisplay(true)
    setOpenSpinner(false);
  }

  const renderGraph = (processed_data, start, end) => {
    const temp = [];
    const input = { ts_end: end, ts_start: start, site_code: "MAR" }
    processed_data.forEach(data => {
      const cumulative = prepareCumulativeRainfallChartOption(data, input);
      temp.push({ cumulative });
    });
    return temp
  }

  return (
    <ScrollView>
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Rainfall data as of {latestTs}</Text>
        { display ? 
            graphContainer
          :
          <View>
          </View>
        }
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Pinch graph to zoom in/out.</Text>
        <SpinnerLoader display={openSpinner} />
      </View>
    </ScrollView>
  );
}

const rainfall_colors = {
  "24h": "rgba(73, 105, 252, 0.9)",
  "72h": "rgba(239, 69, 50, 0.9)",
  rain: "rgba(0, 0, 0, 0.9)"
};

function prepareRainfallData(set) {
  const series_data = [];
  const max_rval_data = [];
  const hr_24 = [];
  const hr_72 = [];
  const rain = [];
  const max_72h = 0;

  set.data.forEach((hr24) => {
    hr_24.push([moment(hr24.ts).unix(), hr24['24hr cumulative rainfall']])
  })

  set.data.forEach((hr72) => {
    hr_72.push([moment(hr72.ts).unix(), hr72['72hr cumulative rainfall']])
  })

  set.data.forEach((data) => {
    rain.push([moment(data.ts).unix(), data['rain']])
  })

  delete set['data']

  set['24h'] = hr_24;
  set['72h'] = hr_72;
  set['rain'] = rain;
  let null_ranges = [{ from: moment(set['ts_start']).unix(), to: moment(set['ts_end']).unix() }]
  set['null_ranges'] = null_ranges;
  Object.keys(rainfall_colors).forEach((name) => {
    set[name].forEach(element => {
      if (element[1] == undefined) {
        element[1] = 0;
      }
    });
    const color = rainfall_colors[name];
    const entry = {
      name,
      step: true,
      data: set[name],
      color,
      id: name,
      fillOpacity: 1,
      lineWidth: 1
    };

    if (name !== "rain") series_data.push(entry);
    else max_rval_data.push(entry);
  });

  const null_processed = null_ranges.map(({ from, to }) => ({ from, to, color: "rgba(68, 170, 213, 0.3)" }));
  return { set, series_data, max_rval_data, null_processed };
}

function prepareCumulativeRainfallChartOption(row, input) {
  const { set, series_data } = row;
  const {
    distance,
    threshold_value: max_rain_2year, gauge_name
  } = set;
  const max_72h = 0;

  const { ts_start, ts_end, site_code } = input;

  return {
    series: series_data,
    chart: {
      type: "line",
      zoomType: "x",
      panning: true,
      panKey: "shift",
      resetZoomButton: {
        position: {
          x: 0,
          y: -30
        }
      },
      spacingTop: 16,
      spacingRight: 24
    },
    title: {
      text: `<b>Cumulative Rainfall Chart of ${site_code.toUpperCase()}</b>`,
      style: { fontSize: "1rem" },
      margin: 20,
      y: 20
    },
    subtitle: {
      text: `Source: <b>${createRainPlotSubtitle(distance, gauge_name)}</b><br/>As of: <b>${moment(ts_end).format("D MMM YYYY, HH:mm")}</b>`,
      style: { fontSize: "0.80rem" }
    },
    xAxis: {
      min: Date.parse(ts_start),
      max: Date.parse(ts_end),
      type: "datetime",
      dateTimeLabelFormats: {
        month: "%e %b %Y",
        year: "%Y"
      },
      title: {
        text: "<b>Date</b>"
      },
      events: {
        setExtremes: syncExtremes
      }
    },
    yAxis: {
      title: {
        text: "<b>Value (mm)</b>"
      },
      max: Math.max(0, (max_72h - parseFloat(max_rain_2year))) + parseFloat(max_rain_2year),
      min: 0,
      plotBands: [{
        value: Math.round(parseFloat(max_rain_2year / 2) * 10) / 10,
        color: rainfall_colors["24h"],
        dashStyle: "shortdash",
        width: 2,
        zIndex: 0,
        label: {
          text: `24-hr threshold (${max_rain_2year / 2})`

        }
      }, {
        value: max_rain_2year,
        color: rainfall_colors["72h"],
        dashStyle: "shortdash",
        width: 2,
        zIndex: 0,
        label: {
          text: `72-hr threshold (${max_rain_2year})`
        }
      }]
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    plotOptions: {
      series: {
        marker: {
          radius: 3
        },
        cursor: "pointer"
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    exporting: { enabled: true },
    time: { timezoneOffset: -8 * 60 }
  };
}

function createRainPlotSubtitle(distance, gauge_name) {
  const source = gauge_name.toUpperCase();
  const subtitle = distance === null ? source : `${source} (${distance} KM)`;
  return subtitle;
}

function syncExtremes(e) {
  const this_chart = this.chart;
  const { charts } = Highcharts;

  if (e.trigger !== "syncExtremes") { // Prevent feedback loop
    Highcharts.each(charts, (chart) => {
      if (chart !== this_chart) {
        if (chart.xAxis[0].setExtremes) { // It is null while updating
          chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: "syncExtremes" });
        }
      }
    });
  }
}

export default RainfallPlotScreen