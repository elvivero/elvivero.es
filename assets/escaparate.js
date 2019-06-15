function loadImages(imgs, i){
  let src = $(imgs[i]).data("link");
  $(imgs[i]).attr("href",src).on("load",function(){
    if(i < imgs.length - 1){
      loadImages(imgs,i+1);
    }
  })
}

loadImages($("svg image"),0);
