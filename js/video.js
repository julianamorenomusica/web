$(function(){
	
$(".video").each(Video);



function Video(){
var div=$(this);
div.css({"overflow":"hidden"});
var src=div.attr("data-video");
var but=$("<img src='play.svg' class='vplay'>");

if(div.find("img").length==0){
  addVideoImage(div,src);
}
div.append(but);
but.click(playVideo);

function playVideo(){
var str=getVideoIframe(src);
$(".full").remove();
var full=$("<div class='full' style='opacity:0'></div>");
full.append("<div class='fullhit'></div>");
full.append("<div class='fullcont'></div>");
full.append("<div class='closeBut'>&times;</div>");

$("body").append(full);




full.velocity({opacity:1},500,function(){
	full.find(".fullcont").html(str);
});

alignVideo();


$(window).bind("resize",alignVideo);
full.find(".closeBut").click(close);

full.find(".fullhit").click(close);
 


function close(){

	$(window).unbind("resize",alignVideo);
full.fadeOut(500,function(){
full.html("");
full.remove();
full=null;


}
);

}
}
function alignVideo(){
  if($(".full").length<1)return;
  var ratio=551/980;
  var margin=30;
var p=$(".full");
//console.log(p.height());
var h=p.height()-(margin*2);
//if(h>580)h=580;
var w=h/ratio;

if(w>p.width()){
w=p.width()-margin; 
h=w*ratio;
}

var px=(p.width()/2)-(w/2);
var py=(p.height()/2)-(h/2);

p.find(".fullcont").css({"left":(px)+"px","top":(py)+"px","width":w+"px","height":h+"px"});

}




}





 function getVideoAttr(src){
 

var va=src.split("//vimeo.com/");
if(va.length>1){
  src=va.join("//player.vimeo.com/video/");
  console.log(src);
 return src;
}

va=src.split("youtube.com/watch?v=");
if(va.length>1){
  src=va.join("youtube.com/embed/");
 console.log(src);
 return src;
}
console.log(src,"invalid");
return "invalid";

 }



//////////////////////////////////////////////////////////////////////////////////////////

function getVideoIframe(src){
var url=getVideoAttr(src);
var ifr; 
ifr="<iframe allowfullscreen width='100%' height='100%' style='border:none;background:black;' src='"+url+"'></iframe>";	
 return ifr;
}





function showVideo(src,cont){
var url=getVideoAttr(src);
if(url=="invalid")return "<div>El link del video no es válido</div>";

var full;
if(cont){
full="<iframe width='100%' height='100%' style='border:none;background:black;' src='"+url+"'></iframe>";	
return full;
}else{
full=$("<div class='full'><iframe width='100%' height='100%' style='border:none;background:black;' src='"+url+"'></iframe></div>");
$("body").append(full);
var but=$("<div class='closeBut fullClose' >&times</div>");
full.append(but);
but.click(function(e){
full.html("");
full.remove();
full=null;
});
}

}



});


function addVideoImage(div,src){



  getVideoThumb(src, function (img) {
    div.prepend(img)
  });

}




function getVideoThumb(src,fn){
//	http://stackoverflow.com/questions/1361149/get-img-thumbnails-from-vimeo
var asrc=src;
console.log("get vthumb for", src);

var va=src.split("//vimeo.com/");
if(va.length>1){
src=va[va.length-1];//join("//player.vimeo.com/video/");
console.log(src);

$.ajax({
    type:'GET',
    url: 'http://vimeo.com/api/v2/video/' + src + '.json',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function(data){
        var thumbnail_src = data[0].thumbnail_large;
          console.log("vimeo vthumb ", thumbnail_src);

        fn('<img data-src="'+asrc+'" src="' + thumbnail_src + '">');
    }
});
return;
}

va=src.split("youtube.com/watch?v=");
if(va.length>1){

var st=getYTcode(src);


fn("<img  data-src='"+asrc+"' src='http://img.youtube.com/vi/"+st+"/0.jpg'>");
return;
}

fn('<img  data-src="'+asrc+'"  src="thumb.jpg">');
}

function getYTcode(url){
var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
var match = url.match(regExp);
return (match&&match[7].length==11)? match[7] : false;
}


