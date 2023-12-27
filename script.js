

const reloadStart = document.getElementById("setupReload");
const timerValue = document.getElementById("refresh_timer");
const stopTimer = document.getElementById("stopApp");


reloadStart.onclick = ()=>{
  
 
  const values = {
    timerValueMS :timerValue.value
  }
  chrome.runtime.sendMessage({event:"onStart",values});
}

stopTimer.onclick=()=>{ 
  chrome.runtime.sendMessage({event:"onStop"}); 
}