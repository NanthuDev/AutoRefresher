const reloadStart = document.getElementById("setupReload");
const timerValue = document.getElementById("refresh_timer");
const stopTimer = document.getElementById("stopApp");

reloadStart.onclick = () => {
  const values = {
    timerValueMS: timerValue.value,
  };
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tab) {
       if (tab[0].id) {
        values.tabId = tab[0].id;
        chrome.runtime.sendMessage({ event: "onStart", values });
      }
    }
  );
};


chrome.storage.local.get(["timerValueMS"],(values)=>{
    console.log("values",values)
    const {timerValueMS} = values
    timerValue.value = timerValueMS;
}) 
stopTimer.onclick = () => {
  chrome.runtime.sendMessage({ event: "onStop" });
};
