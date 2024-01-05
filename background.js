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

const startReload = (values) => {
  chrome.storage.local.set(values);
  ReloadInterval(values, "start");
};
const stopReload = () => {
  clearInterval(timer);
};
let interval;

const ReloadInterval = (values, event) => {
  timer = setInterval(() => {
    chrome.tabs.reload(values.tabId);
  }, values.timerValueMS * 1000);
};
