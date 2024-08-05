$(function(){
  
  var audios=["audios/crescendo.mp3","audios/escalas.mp3"
,"audios/monito.mp3"
,"audios/sonido tapas.mp3"
,"audios/tkttktk.mp3"];
var sounds=[];
var n=audios.length;
  var active=false;
 
var sto;



window.playSound=playSound;
function playSound(e){
  if(e)e.preventDefault(); 
if(active)return;
active=true;
clearTimeout(sto);

sto=setTimeout(function(){
  active=false;
}, 1000);


var s=new Audio(audios[parseInt(Math.random()*n)]);
s.addEventListener('canplay', function(event){ 
s.play();
s.volume=Math.random()*0.7+0.3;
})
 
s.addEventListener('ended', function(){
  console.log("ended");
  //active=false;
  });
console.log(s);

}


});
