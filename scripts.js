const messageClose = document.getElementById('message-close');

messageClose.addEventListener('click', () => {
  document.getElementById('alert').style.display = 'none';
});

var ctx = document.getElementById("web-traffic-chart");

const chartSettings = {
  "hourly": {
    "labels": ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
               "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"],
    "data": [5, 3, 2, 1, 0, 3, 6, 8, 8, 10, 12, 12, 11, 7, 9, 13, 17, 19, 20, 19, 22, 17, 14, 10],
    "stepSize": 3
  },  
  "weekly": {
    "labels": ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    "data": [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750],
    "stepSize": 500
  }
}

var webTrafficChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: chartSettings.weekly.labels,
    datasets: [{
      lineTension: 0,
      backgroundColor: 'rgba(226, 227, 246, 0.5)',
      borderWidth: 1,
      borderColor: 'rgb(178,180,232)',
      pointStyle: 'circle',
      pointRadius: 6,
      pointBackgroundColor: 'white',
      pointBorderWidth: 2,
      pointBorderColor: 'rgb(116, 119, 191)',
      data: chartSettings.weekly.data
    }]
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 15,
        right: 20,
        top: 0,
        bottom: 0
      }
    }, 
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawTicks: false
        },
        ticks: {
          padding: 10
        }
      }],
      yAxes: [{
        gridLines: {
          drawTicks: false
        },
        ticks: {
          padding: 10,
          stepSize: chartSettings.weekly.stepSize
        }
      }]
    }
  }
})

const chartOptions = document.querySelectorAll(".chart-option");

chartOptions.forEach(function(el) {
  el.addEventListener('click', function(){
    for (i=0; i < chartOptions.length; i++) {
      if (this != chartOptions[i]) {
        chartOptions[i].classList.remove("selected");
      }
      this.classList.add("selected");
    }
    let chartInfo = chartSettings[this.dataset.timeFrame];
    webTrafficChart.data.labels = chartInfo.labels;
    webTrafficChart.data.datasets[0].data = chartInfo.data;
    webTrafficChart.options.scales.yAxes[0].ticks.stepSize = chartInfo.stepSize;
    webTrafficChart.update();
  })
})


