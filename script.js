const reloadStart = document.getElementById("setupReload");
const timerValue = document.getElementById("refresh_timer");
const stopTimer = document.getElementById("stopApp");
const timerStatus = document.getElementById("status");

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
          [tab[0].url]: { ...tab[0], timerValueMS: timerValue.value },
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
