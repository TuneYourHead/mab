$( document ).ready(function(){
  //add hidden overlay for future use
  $("body").prepend("<div class='darkOverlay' style='display: none'></div>");
  //all of the buttons to show/hide the modal
  var actionButton = $('.actionButton');

  actionButton.on("click", function(){

    var currentActionButton = $(this);
    var targetModal = $("" + '#' + (currentActionButton.attr("data-modal")) + "");
    var AnimationIn = targetModal.attr("data-modal-animation");
    var AnimationOut = (targetModal.attr("data-modal-animation-out"));

    var targetAnimationIn = function(){
      targetModal.removeClass("animated");
      targetModal.addClass(AnimationIn);
      targetModal.css('display', 'block');
      targetModal.addClass("animated");
      setTimeout(function(){
        targetModal.removeClass(AnimationIn);
      }, 1000);
    };

    var targetAnimationOut = function(){
      targetModal.removeClass("animated");
      targetModal.addClass(AnimationOut);
      targetModal.addClass("animated");
      $(".darkOverlay").fadeOut();
      setTimeout(function(){
        targetModal.removeClass(AnimationOut);
        targetModal.css("display", "none");
      }, 1000);
    };

    if(targetModal.is(':hidden')){

      if(targetModal.hasClass("darkOverlayOn")){
        $(".darkOverlay").fadeIn();
      };

      if(AnimationIn){
        targetAnimationIn();
      }else{
        targetModal.fadeIn();
      };

    }else{

      if(currentActionButton.attr("data-modal-out")){
        if(AnimationOut){
          targetAnimationOut();
        }else{
          targetModal.fadeOut();
        }
      };

    };

    $(".darkOverlay").on("click", function(){
      targetAnimationOut();
    });
  });
})
