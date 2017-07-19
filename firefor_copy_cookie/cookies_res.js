browser.runtime.onMessage.addListener(  
  function(request, sender, sendResponse) {
	var header = document.createElement('textarea');
	header.value = request.greeting;
	document.body.appendChild(header);
	header.select();
	var res = document.execCommand("Copy");
	header.hidden = "hidden";
    sendResponse({farewell: res});
});