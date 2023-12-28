console.log("haii from bg");
var timer = null;
chrome.runtime.onMessage.addListener((data) => {
  const { event, values } = data;

  switch (event) {
    case "onStart":
      startReload(values);
      break;
    case "onStop":
      stopReload();
      break;
    default:
      break;
  }
});

async function handleStop() {
  stopAlarm();
}

async function handleStart(reloadInterval) {
  console.log("hai", reloadInterval.timerValueMS);

  reloadInterval = parseInt(reloadInterval.timerValueMS);

  if (reloadInterval && typeof reloadInterval === "number") {
    reloadInterval = reloadInterval * 1000;
    console.log("hai", reloadInterval);
    createAlarm();
    // setInterval(() => {
    //   chrome.tabs.query(
    //     { active: true, currentWindow: true },
    //     async function (tab) {
    //       console.log("hai", tab);

    //       chrome.tabs.reload(tab[0].id);
    //     }
    //   );
    // }, reloadInterval);
  }
}

const startReload = (values) => {
  console.log("vall", values);
  chrome.storage.local.set(values);  
  ReloadInterval(values, "start");
};
const stopReload = () => {
  console.log("Stop it plz");
  clearInterval(timer);
};
let interval;

const ReloadInterval = (values, event) => {
  timer = setInterval(() => {
 
          chrome.tabs.reload(values.tabId);

        
  }, values.timerValueMS * 1000);
};

const ALARM_JOB_REFRESHER = "CREATE_TIMER";
async function createAlarm() {
  console.log("Calling create alarms....");
  chrome.alarms.get(ALARM_JOB_REFRESHER, (alarmExist) => {
    if (!alarmExist) {
      chrome.alarms.create(ALARM_JOB_REFRESHER, { periodInSeconds: 1.0 });
    }
  });
}

async function stopAlarm() {
  console.log("Calling Stop alarms....");

  chrome.alarms.clearAll();
}

chrome.alarms.onAlarm.addListener(() => {
  console.log("Alarm Job running");
});
