const messageClose = document.getElementById('message-close');

messageClose.addEventListener('click', () => {
  document.getElementById('alert').style.display = 'none';
});

var ctx = document.getElementById("web-traffic-chart");

var webTrafficWeekly = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
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
      data: [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750]
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
          stepSize: 500
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
  })
})


