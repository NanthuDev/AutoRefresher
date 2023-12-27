console.log("haii from bg");

chrome.runtime.onMessage.addListener((data) => {
  const { event, values } = data;

  switch(event){
    case 'onStart':
        handleStart(values);
        break;
    case 'onStop':
        handleStop();
        break;
    default:
        break;
  }
});


async function handleStop(){
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



const ALARM_JOB_REFRESHER = "CREATE_TIMER";
async function createAlarm() {
    console.log("Calling create alarms....")
  chrome.alarms.create(ALARM_JOB_REFRESHER, { periodInMinutes: 1.0 });
}

async function stopAlarm() {
    console.log("Calling Stop alarms....")

  chrome.alarms.clearAll();
}

chrome.alarms.onAlarm.addListener(() => {
  console.log("Alarm Job running");
});
