var timer = null;
chrome.runtime.onMessage.addListener((data) => {
  const { event, values, key } = data;
  switch (event) {
    case "onStart":
      startReload(values, key);
      break;
    case "onStop":
      stopReload();
      break;
    case "onClearAll":
      clearAll();
    default:
      break;
  }
});

const clearAll = () => {
  chrome.storage.local.set({ tabInfo: [] });
};
const startReload = async (values, key) => {
  console.log("values",values)
  const keyExist =await checkKeyExistence(values, key);
  //  dataProcessor(values,key);
  console.log("checkKeyExistence", keyExist);
  //ReloadInterval(values.tabInfo[key], "start");
  if (!keyExist) {
    console.log("Not exist");
  }

  const addValues = addOrUpdate(keyExist, values, key);
};
const stopReload = () => {
  clearInterval(timer);
  chrome.storage.local.set({ tabInfo: [] }, () => {});
};
let interval;

const checkKeyExistence = (inputs, key) => {
  return new Promise((resolve,reject)=>{
    chrome.storage.local.get({ tabInfo: [] }, (values) => {
      var tabInfo = values.tabInfo;
      console.log("tabInfo", tabInfo, "inputs,key", inputs, key);
      const existKeys = tabInfo
        .map((item, index) => ({ item, index }))
        .filter((item) => {
          console.log("i",item)
          return item.item.key === key})[0];
       if (existKeys) {
        resolve( {
          exist: existKeys,
          tabInfo: tabInfo,
        })
      }
      return resolve(false);
    });
  })
   
 };

const addOrUpdate = (exist, values, key) => {
  console.log("Exist", exist);
  console.log("values", values);
  console.log("key", key);
  if (!exist) {
    chrome.storage.local.set({ tabInfo: [values] }, () => {
      chrome.storage.local.get(["tabInfo"], (values) => {
        console.log("Addeed", values);
      });
    });
  } else {
    console.log("Existr", exist  );
    console.log("Existr", exist.index );

    console.log("Existr", exist.exist );
    console.log("Existr", exist.tabInfo );
    exist.tabInfo[exist.exist.index] = values;
    console.log("Existr", exist.tabInfo );

    chrome.storage.local.set({ tabInfo: exist.tabInfo }, () => {
      chrome.storage.local.get(["tabInfo"], (values) => {
        console.log("UpdaTED", values.tabInfo[0]);
      });
    });
  }
};
const dataProcessor = (inputs, key) => {
  // chrome.storage.local.get({"tabInfo":[]}, (values) => {
  //   var tabInfo = values.tabInfo;
  //   console.log("tabInfo",tabInfo,"inputs,key",inputs,key)
  //   const existKeys = tabInfo.filter(item=>{
  //     console.log("tabInfo item" ,item)
  //     if(item.key === key){
  //       console.log("Got uu")
  //     }
  //   })
  //   if(existKeys){
  //     return existKeys;
  //   }
  //   return false;
  // })
  return "checkKeyExistence";

  chrome.storage.local.get({ tabInfo: [] }, (values) => {
    var tabInfo = values.tabInfo;
    console.log("tabInfo", tabInfo);
    // Zero index issue
    let exists = [...tabInfo.keys()].filter((item) => {
      console.log("teem", tabInfo[item], item, key);
      // console.log(  "final",tabInfo[item][key])
      if (tabInfo[item][key]) {
        return [item];
      }
    });
    console.log("exits", exists[0]);

    if (exists && exists.length > 0) {
      console.log("exits", exists);
      tabInfo[exists[0]] = inputs;
    } else {
      console.log("push");
      tabInfo.push(inputs);
    }

    chrome.storage.local.set({ tabInfo: tabInfo }, () => {
      chrome.storage.local.get(["tabInfo"], (values) => {
        console.log("vaass", values);
      });
    });
  });
};
const ReloadInterval = (values, event) => {
  console.log("haiii", values);
  timer = setInterval(() => {
    chrome.tabs.reload(values.tabId);
  }, values.timerValueMS * 1000);
};
