var isMobile = {
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
};

if (isMobile.Android()) {
  alert('Android');
} else if (isMobile.iOS()) {
  alert('iOS');
} else {
  alert('else');
}

var timer;
var heartbeat;
var lastInterval;
// 
if (isMobile.Android()) {
  var deepLink = "http://fahlo.com/Mobile/Home?deepLinkPath=link";
  var deepLinkFallback = "http://maypp.com/Mobile/Home?deepLinkPath=data";
  var deepLinkTimeout = 1000;
 
  function clearTimers() {
      clearTimeout(timer);
      clearTimeout(heartbeat);
  }
   
  function getTime() {
      return (new Date()).getTime();
  }
   
  // For all other browsers except Safari (which do not support pageshow and pagehide properly)
  function intervalHeartbeat() {
      var now = getTime();
      var diff = now - lastInterval - 200;
      lastInterval = now;
      if (diff > 1000) {
          // don't trigger on small stutters less than 1000ms
          console.log('diff');
          clearTimers();
      }
  }
   
  function tryLaunchNativeApp() {
      lastInterval = getTime();
      heartbeat = setInterval(intervalHeartbeat, 200);
      window.location = deepLink;
      timer = setTimeout(function () {
          window.location.href = deepLinkFallback;
      }, deepLinkTimeout);
  }
   
  window.addEventListener("pageshow", function (evt) {
      clearTimers();
  }, false);
   
  window.addEventListener("pagehide", function (evt) {
      clearTimers();
  }, false);
} else if (isMobile.iOS()) {
  var deepLink = "fahlo://link";
  var deepLinkFallback = "http://myapp.com/Mobile/Home?deepLinkPath=data";
  var deepLinkTimeout = 50;
  document.location = deepLink;
  setTimeout(function(){
    if(confirm('You do not seem to have iThrown installed, do you want to go download it now?')){
      document.location = 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=293049283&mt=8&uo=6';
    }
  }, 300);
}
