const tasksList = document.querySelectorAll("[data-task-card]");
const tabsList = document.querySelectorAll("[data-tab]");

//function to handle tabs
function handleTabs(currentTab) {
  const notSelectedTabs = Array.from(tabsList).filter((tab) => tab !== currentTab);
  notSelectedTabs.forEach((notSelectedTab) => {
    notSelectedTab.style.color = "hsl(0, 0%, 100%)";
  });

  currentTab.style.color = " hsl(236, 100%, 87%)";
}

//fuction to update the UI with data
function updateData(data, eventObject) {
  handleTabs(eventObject.currentTarget);

  data.forEach((task, index) => {
    const timeFrame = task.timeframes;
    const timeKey = eventObject.currentTarget.innerText.toLowerCase();
    const time = Object.keys(timeFrame).find((key) => key === timeKey);

    const currentData = tasksList[index].querySelector("[data-task-time]");
    const previousData = tasksList[index].querySelector("[data-last-week-data]");

    currentData.textContent = `${timeFrame[time].current}hrs`;
    previousData.textContent = `Previous - ${timeFrame[time].previous}hrs`;
  });
}

// async function to fetch data from json file
async function fetchData() {
  try {
    const response = await fetch("/JSON/data.json");
    const data = response.json();
    return data;
  }
  catch {
    alert("Error loading data");
  }
}

//function to handle data
function handleData() {
  fetchData().then((tasks) => tasks).then((data) => {
    tabsList.forEach((tab) => tab.addEventListener("click", (e) => updateData(data, e)))
  }).
    catch(() => alert("Error loading data"));
}

handleData();

//by default selecting the daily tab on page load and reload
const setDefaultTab = () => document.querySelector("[data-daily-tab]").click();

window.addEventListener("load", setDefaultTab);
window.addEventListener("reload", setDefaultTab);




