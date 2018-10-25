$(document).ready(function(){

  //slider
  $('.slider-wrapper').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1
  });

  //maskInputs
  $('input[type="tel"]').mask('(000) 000-0000');

  //labelAnimation
  $(".form-input-wrapper").on("focusin", function() {
    $(this).addClass("active");
  });

  $(".form-input-wrapper").on("focusout", function() {
    if ($(this).find('input').val() == "" || $(this).find('textarea').val() == "") {
        $(this).removeClass("active");
    };
  });

  //dropdowm
  $('.header-nav-item_parent, .menu-item-has-children').hover(function(){
    $(this).find('.header-subnav').addClass('header-subnav_active');
    $(this).find('.sub-menu').addClass('header-subnav_active');
  }, function(){
    $(this).find('.header-subnav').removeClass('header-subnav_active');
    $(this).find('.sub-menu').removeClass('header-subnav_active');
  });

  //smoothScroll
  function smoothScrollingTo(target){
    $('html,body').animate({scrollTop:$(target).offset().top}, 500);
  }
  $('a[href*=\\#]').on('click', function(event){
    event.preventDefault();
    smoothScrollingTo(this.hash);
  });

  //smoothScrollOnLoad
  window.onload= function(){
    if(window.location.hash) {
      smoothScrollingTo(location.hash);
    }
  };

  //fastClick
  FastClick.attach(document.body);

  //highlightCurrentPage
  var currentPage = window.location.href.split('#')[0];
  $('a[href$="'+currentPage+'"]').addClass('active');
});
