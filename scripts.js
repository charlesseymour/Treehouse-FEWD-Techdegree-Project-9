// Toggle notification dropdown 

const notificationButton = document.getElementById('notification');
const notificationMarker = document.getElementById('notification-marker');
const notificationDropdown = document.getElementById('notification-dropdown');
let notificationDisplay = false;

notificationButton.addEventListener('click', function() {
  if (!notificationDisplay) {
    notificationDropdown.style.display = 'initial';
    notificationDisplay = true;
  } else {
    notificationDropdown.style.display = 'none';
    notificationDisplay = false;
  }
  notificationMarker.style.visibility = 'hidden';
});

// Close alert box

const messageClose = document.getElementById('message-close');

messageClose.addEventListener('click', function() {
  document.getElementById('alert').style.display = 'none';
});

// Traffic charts

// data for the various charts

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
};

// Weekly traffic chart

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
});

// All web traffic charts are listed in index.html, but only one is displayed at a time.
// Define chartOptions as a NodeList of all these charts.

const chartOptions = document.querySelectorAll(".chart-option");

// explicitly define chartOptions.forEach() for IE 

if (!chartOptions.forEach) {
    chartOptions.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}

// Add event listener to each chart button to display corresponding data on click

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
  });
});

// Add bar chart for daily traffic

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
});

// Add pie chart for traffic by device type

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
});

// User data for message box

var users = [
  "Victoria Chambers",
  "Dale Byrd",
  "Dawn Wood",
  "Dan Oliver",
  "Natsume Soseki",
  "Shusaku Endo",
  "Walker Percy",
  "Evelyn Waugh",
  "John Kennedy Toole",
  "Charles Dickens",
  "J. R. R. Tolkien",
  "C. S. Lewis",
  "Cormac McCarthy",
  "William Faulkner"
];

// Message form

// Autocomplete function for user search box in message form

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("user-search"), users);

// Simulate submitting message form

const sendButton = document.getElementById("send-button");

sendButton.addEventListener('click', function(e) {
  e.preventDefault();
  const messageDiv = document.getElementById('message');
  const messageHeader = document.getElementById('message-header');
  const nameBox = document.getElementById('user-search');
  const nameInput = nameBox.value;
  const autocompleteDiv = document.getElementsByClassName('autocomplete')[0];
  const messageBox = document.getElementById('message-box');
  const messageInput = messageBox.value;
  let alerts = messageDiv.querySelectorAll("p");
  for (i = 0; i < alerts.length; i++) {
    alerts[i].parentNode.removeChild(alerts[i]);
  }
  if (!nameInput) {
    let nameAlert = document.createElement("p");
    nameAlert.style.color = "red";
    nameAlert.style.margin = "0 0 0 20px";
    let nameAlertText = document.createTextNode("Please enter a user name");
    nameAlert.appendChild(nameAlertText);
    messageHeader.parentNode.insertBefore(nameAlert, messageHeader.nextSibling);
  }
  if (!messageInput) {
    let messageAlert = document.createElement("p");
    messageAlert.style.color = "red";
    messageAlert.style.margin = "0 0 0 20px";
    messageAlert.style.alignSelf = "flex-start";
    let messageAlertText = document.createTextNode("Please enter a message");
    messageAlert.appendChild(messageAlertText);
    messageBox.parentNode.insertBefore(messageAlert, autocompleteDiv.nextSibling);
  }
  if (!nameInput || !messageInput) {
    return false;
  }
  document.getElementById("message-form").reset();
  let sentAlert = document.createElement("p");
  sentAlert.style.color = "red";
  sentAlert.style.margin = "0 0 0 20px";
  let sentAlertText = document.createTextNode("Message sent!");
  sentAlert.appendChild(sentAlertText);
  setTimeout(function(){messageDiv.insertBefore(sentAlert, document.getElementById("message-form"));}, 500);
});

// Settings form

const saveSettingsButton = document.getElementById('save-button');
const cancelSettingsButton = document.getElementById('cancel-button');
const notificationSwitch = document.getElementById('notification-switch');
const publicSwitch = document.getElementById('public-switch');
const timezoneMenu = document.getElementById('timezone');

// Check if browser supports local storage

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
    return false;  
  }
}

// Define function to set fields in settings form to values in local storage

function prefillSettings() {
  if (localStorage.notify) {
    notificationSwitch.checked = JSON.parse(localStorage.notify);
  }
  if (localStorage.public) {
    publicSwitch.checked = JSON.parse(localStorage.public);
  }
  if (localStorage.timezone) {
    timezoneMenu.value = localStorage.timezone;
  }
}

// When window loads, prefill the form fields and add
// event listeners to save and cancel buttons

window.onload = function() {
  if (supportsLocalStorage()) {
    prefillSettings(); 
    saveSettingsButton.addEventListener('click', function(e) {
      e.preventDefault();
      let settingsDiv = document.getElementById('settings');
      let alerts = settingsDiv.querySelectorAll("p");
      for (i = 0; i < alerts.length; i++) {
        alerts[i].parentNode.removeChild(alerts[i]);
      }
      localStorage.setItem('notify', notificationSwitch.checked);
      localStorage.setItem('public', publicSwitch.checked);
      localStorage.setItem('timezone', timezoneMenu.value);
      prefillSettings();
      let saveAlert = document.createElement('p');
      saveAlert.style.color = 'red';
      saveAlert.style.margin = "0 0 0 20px";
      let saveMessage = document.createTextNode('Your settings have been saved');
      saveAlert.appendChild(saveMessage);
      let settingsForm = document.getElementById('settings-form');      
      location.hash = '';
      location.hash = '#' + 'send-button';
      setTimeout(function(){settingsDiv.insertBefore(saveAlert, settingsForm);}, 500);
    });
    cancelSettingsButton.addEventListener('click', function(e){
      e.preventDefault();
      let settingsDiv = document.getElementById('settings');
      let alerts = settingsDiv.querySelectorAll("p");
      for (i = 0; i < alerts.length; i++) {
        alerts[i].parentNode.removeChild(alerts[i]);
      }
      prefillSettings();
    });
  }
};



