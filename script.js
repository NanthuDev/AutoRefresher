const reloadStart = document.getElementById("setupReload");
const timerValue = document.getElementById("refresh_timer");
const stopTimer = document.getElementById("stopApp");
const timerStatus = document.getElementById("status");
//intial default
// get the value
//store based on the url
// start reloader
//close the browser
//start the url again
//initiate the values 
//bsed on the url, start the reloader with proper timeer
//kill switch

chrome.tabs.query({ active: true, currentWindow: true }, async function (tab) {
  console.log(tab);

  if (tab[0].id) {
    console.log(tab[0].id);
  }
});

reloadStart.onclick = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tab) {
      if (tab[0].id) {
        let values = {
          tabInfo:{
            [tab[0].url]: { ...tab[0], timerValueMS: timerValue.value }
          } ,
          key:tab[0].url
        };
        chrome.runtime.sendMessage({ event: "onStart", values });
        timerStatus.style.display = "unset";
      }
    }
  );
};

const starter = () => {
  chrome.storage.local.get(["timerValueMS", "tabId"], (values) => {
    console.log(values);
    const { timerValueMS } = values;

    if (timerValueMS) {
      timerValue.value = timerValueMS;
      chrome.runtime.sendMessage({ event: "onStart", values });
      timerStatus.style.display = "unset";
    } else {
      timerValue.value = 5;
    }
  });
};
starter();
stopTimer.onclick = () => {
  chrome.runtime.sendMessage({ event: "onStop" });
  chrome.storage.local.clear((result) => {
    timerStatus.style.display = "none";
  });
};
