alert('kapa')
function startIThrown(){
  document.location = 'fahlo://link';
  setTimeout(function(){
    if(confirm('Install fahlo?')){
      document.location = 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=293049283&mt=8&uo=6';
    }
  }, 300);
}
