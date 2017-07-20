browser.runtime.onMessage.addListener(  
  function(request, sender, sendResponse) {
  	if(window.frames.length > 0){
  		for(var i = 0; i < window.frames.length; i++){
  			try{
  				var frame_window = window.frames[i];
		  		var header = frame_window.document.createElement('textarea');
				header.value = request.greeting;
				frame_window.document.body.appendChild(header);
				header.select();
				var res = frame_window.document.execCommand("Copy");
				header.hidden = "hidden";
  			}catch(e){
  				sendResponse({farewell: e});
  			}
  		}
  	}else{
  		var header = document.createElement('textarea');
		header.value = request.greeting;
		document.body.appendChild(header);
		header.select();
		var res = document.execCommand("Copy");
		header.hidden = "hidden";
  	}
	sendResponse({farewell: request.greeting});
});