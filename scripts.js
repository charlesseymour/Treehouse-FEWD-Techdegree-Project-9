const messageClose = document.getElementById('message-close');

messageClose.addEventListener('click', () => {
  document.getElementById('alert').style.display = 'none';
});

//var ctx = document.getElementById("web-traffic-chart");

const chartSettings = {
  "hourly": {
    "labels": ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
               "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"],
    "data": [5, 3, 2, 1, 0, 3, 6, 8, 8, 10, 12, 12, 11, 7, 9, 13, 17, 19, 20, 19, 22, 17, 14, 10],
    "stepSize": 3
  },
  "daily": {
    "labels": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "data": [150, 130, 90, 100, 200, 45, 175],
    "stepSize": 15
  },
  "weekly": {
    "labels": ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    "data": [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750],
    "stepSize": 500
  },
  "monthly": {
    "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "data": [5434, 7234, 1245, 9093, 6574, 1234, 8432, 8823, 4954, 9865, 8556, 4545],
    "stepSize": 1000
  }
}

var webTrafficChart = new Chart(document.getElementById("web-traffic-chart"), {
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
          drawTicks: false,
          drawBorder: false,
        },
        ticks: {
          padding: 10
        }
      }],
      yAxes: [{
        gridLines: {
          drawTicks: false,
          drawBorder: false,
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

var barChart = new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [{
      backgroundColor: 'rgb(115, 119, 191)',
      data: chartSettings.daily.data
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
          drawTicks: false,
          drawBorder: false
        },
        ticks: {
          padding: 10
        }
      }],
      yAxes: [{
        gridLines: {
          drawTicks: false,
          drawBorder: false
        },
        ticks: {
          min: 0,
          max: 220,
          padding: 10,
          stepSize: 20
        }
      }]
    }
  }
})

var pieChart = new Chart(document.getElementById("pie-chart"), {
  type: 'doughnut',
  data: {
    labels: ["Phones", "Tablets", "Desktop"],
    datasets: [{
      backgroundColor: ['rgb(116,177,191)', 'rgb(129,201,143)', 'rgb(115,119,191)'],
      data: [12,18,70]
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      position: "right", 
      labels: {
        boxWidth: 20
      }
    }
  }
})

const sendButton = document.getElementById("send-button");

sendButton.addEventListener('click', () => {
  var messageHeader = document.getElementById('message-header');
  var nameBox = document.getElementById('user-search');
  var nameInput = name.value;
  var messageBox = document.getElementById('message-box');
  var messageInput = messageBox.value;
  if (!nameInput) {
    let nameAlert = document.createElement("p");
    nameAlert.style.color = "red";
    nameAlert.style.margin = "0 0 0 20px";
    let nameAlertMessage = document.createTextNode("Please enter a user name");
    nameAlert.appendChild(nameAlertMessage);
    messageHeader.parentNode.insertBefore(nameAlert, messageHeader.nextSibling);
  }
  
});