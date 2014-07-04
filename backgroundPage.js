chrome.runtime.onMessage.addListener(function(msg, _, sendResponse){
  if(msg){
    sendResponse(copyTextToClipboard(msg));
  } else {
    sendResponse(msg);
  }
});

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  var wasCopied = document.execCommand('copy');
  body.removeChild(copyFrom);
  return wasCopied;
}
