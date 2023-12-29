const reloadStart = document.getElementById("setupReload");
const timerValue = document.getElementById("refresh_timer");
const stopTimer = document.getElementById("stopApp");
const timerStatus = document.getElementById("status");

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
        timerStatus.style.display ='unset'
      }
    }
  );
};


chrome.storage.local.get(["timerValueMS"],(values)=>{
    console.log("values",values)
    const {timerValueMS} = values
    if(timerValue.value){
      timerValue.value = timerValueMS; 
      timerStatus.style.display ='unset'
    }else{
      timerValue.value = 5; 

    }
}) 
stopTimer.onclick = () => {
  chrome.runtime.sendMessage({ event: "onStop" });
  chrome.storage.local.clear( (result)=>{
    console.log("storage cleared");
    timerStatus.style.display ='none'

  })

};
