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
  console.log("valuu", values);
  dataProcessor(values);
  //  ReloadInterval(values, "start");
};
const stopReload = () => {
  clearInterval(timer);
  chrome.storage.local.set({ tabInfo: [] }, () => {
  
  });
};
let interval;

const dataProcessor = (inputs) => {
  chrome.storage.local.get({"tabInfo":[]}, (values) => {
    console.log(values);
    var tabInfo = values.tabInfo;
    tabInfo.push(inputs);

    chrome.storage.local.set({ tabInfo: tabInfo }, () => {
      chrome.storage.local.get(["tabInfo"], (values) => {
        console.log("vaass",values)
      })
    });
  });
};
const ReloadInterval = (values, event) => {
  timer = setInterval(() => {
    chrome.tabs.reload(values.tabId);
  }, values.timerValueMS * 1000);
};
