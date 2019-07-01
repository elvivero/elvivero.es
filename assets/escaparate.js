function loadImages(imgs, i){
  let src = $(imgs[i]).data("link");
  $(imgs[i]).removeAttr("data-link").attr("href",src).on("load",function(){
    if(i < imgs.length ){
      loadImages(imgs,i+3);
    }
  })
}
$(function(){loadImages($("svg image"),0);});
$(function(){loadImages($("svg image"),1);});
$(function(){loadImages($("svg image"),2);});
