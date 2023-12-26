let reloadInterval = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("setupReload").addEventListener("click", setupReload);
  document.getElementById("stopApp").addEventListener("click", stopAlarm);
});


async function setupReload() {
  reloadInterval = document.getElementById("refresh_timer").value;
  console.log(typeof reloadInterval);
  reloadInterval = parseInt(reloadInterval);
  console.log(typeof reloadInterval);

  if (reloadInterval && typeof reloadInterval === "number") {
    reloadInterval = reloadInterval * 1000;
    console.log("hai", reloadInterval);
    document.getElementById("deathNew").innerHTML = "Done";
    setInterval(() => {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tab) {
          console.log("hai", tab);

          chrome.tabs.reload(tab[0].id);
        }
      );
    }, reloadInterval);
  }
}

const ALARM_JOB_REFRESHER = "CREATE_TIMER";
async function createAlarm() {
  chrome.alarms.create(
    ALARM_JOB_REFRESHER,

    { reload_interval: 1000 },
    () => {}
  );
}

async function stopAlarm() {
    chrome.alarms.clearAll(  )
  }



chrome.alarms.onAlarm.addListener(() => {
  console.log("Alarm Job running");
});
