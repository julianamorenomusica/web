window.createSVG=function(div,vb){
	//console.log("create");
 var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
if(!vb)vb="0,0,1,1";

 svg.setAttribute("viewBox", vb);
 svg.setAttribute("width", vb.split(",")[2]);
 svg.setAttribute("height", vb.split(",")[3]);
 
 
// console.log("svg",svg);
 div.get(0).appendChild(svg);
 return svg;
}


//var el=addSvgElement(svg, 'line', {x1:1, y1:0, x2:0, y2:0, stroke:"red" });

function addSvgElement(svg,type,attrs){
	//	console.log("add svg",type);
var el = document.createElementNS('http://www.w3.org/2000/svg', type);
 var col="#cccccc";//randCol();//"#aaaaff";
 var dw=1;
for(var at in attrs)
{
el.setAttribute(at, attrs[at]);

}
svg.appendChild(el);
return el;
}

function svgElAtts(el,attrs){
	//console.log("svg set attr");
  for(var at in attrs)
{
el.setAttribute(at, attrs[at]);

}

}

$(function(){
var w=70,h=8,st=7;
window.addFrec=function(div){
	var auto=true;
	w=rand(30)+40;h=rand(4)+8;
var frecSvg=window.createSVG(div,"0,0,"+w+","+h);
div.css({opacity:0,"position":"relative","top":0+"px",left:0});
var d="M0,"+h/2+" L"; 
var x=st,y=rand(h);
var index=0;
for(var i=0;x<w-5;i++){
d+=" "+x+","+y+" "
x+=rand(5)+1;
y=rand(h);
}
d+=" "+w+","+(h/2);
var el=addSvgElement(frecSvg,"path",{stroke:"white", d:d,fill:"none"});

run();
div.velocity({opacity:1},400,function(){end()});

function end(){
div.velocity({opacity:0},4000,function(){

auto=false;
});

}

function run(){
if(!div.parent())return;

var d="M0,"+h/2+" L"; 
var x=0,y=rand(h);
for(var i=0;x<w;i++){
d+=" "+x+","+y+" "
x+=rand(st)+1;
y=rand(h);
}


svgElAtts(el,{d:d});
if(auto){
	requestAnimationFrame(run);

} else {

 	frecSvg=null;
	div.html('');
	div.remove();

}
}


}


$(".menu a").mouseover(function(e){
	$(this).find(".frec").remove();
	var dd=$("<div class='frec' style='display:inline;margin-left:5px;'></div>");
$(this).append(dd);
window.addFrec(dd);
window.playSound(e);

});

});


function rand(arr){
if(arr==undefined)return Math.random();
if(isNaN(arr))
return arr[parseInt(Math.random()*arr.length)];
else return parseInt(Math.random()*arr);
}

