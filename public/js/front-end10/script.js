function myFunction(){

  if (document.getElementById("menu_icon").classList.contains('fa-bars')){
      document.getElementById("menu_icon").classList.add('closeBars');

      setTimeout(function(){
        document.getElementById("menu_icon").classList.remove('closeBars');
        document.getElementById("menu_icon").classList.remove('fa-bars');
        document.getElementById("menu_icon").classList.add('fa-times');
      },500);

      document.getElementById("menu_responsive").classList.add('open_responsive');
      document.getElementById("body1").classList.add('opened');

  }
  else if (document.getElementById("menu_icon").classList.contains('fa-times')){
    document.getElementById("menu_icon").classList.add('closeTimes');
    document.getElementById("menu_responsive").classList.add('close_responsive');
    
    setTimeout(function(){
      document.getElementById("menu_icon").classList.remove('closeTimes');
      document.getElementById("menu_icon").classList.remove('fa-times');
      document.getElementById("menu_icon").classList.add('fa-bars');
      document.getElementById("menu_responsive").classList.remove('close_responsive');
      document.getElementById("menu_responsive").classList.remove('open_responsive');
      document.getElementById("body1").classList.remove('opened');
    },500);






  }

}

function buttonFunctionOn(){
    document.getElementById("the_only_h2").classList.add('cool');
}

function buttonFunctionOff(){
    document.getElementById("the_only_h2").classList.remove('cool');
}
