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
  dataProcessor(values.tabInfo,values.key);
  //  ReloadInterval(values, "start");
};
const stopReload = () => {
  clearInterval(timer);
  chrome.storage.local.set({ tabInfo: [] }, () => {
  
  });
};
let interval;

const dataProcessor = (inputs,key) => {
  chrome.storage.local.get({"tabInfo":[]}, (values) => {
    console.log(values);
    console.log(inputs);
    console.log(key);

    var tabInfo = values.tabInfo;
    console.log("tabInfo",tabInfo)
    //Zero index issue
    let exists = [...tabInfo.keys()].filter(item=>{
      console.log("teem",tabInfo[item],item,key);
      console.log("final",tabInfo[item][key])
      if(tabInfo[item][key]){
        console.log("returned",Number(item).isFinite)
        return [item];
      }
  });
  console.log("exits",exists[0]) 

  if(exists && exists.length>0){
    console.log("exits",exists) 
    tabInfo[exists[0]] = inputs
  }else{
    console.log("push")
    tabInfo.push(inputs);

  }

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
