var x = window.matchMedia("(min-width: 768px)")

window.onscroll = function() {scrollFunction(x)};

function scrollFunction(x) {
  if (x.matches) {
    if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-65px";
    }
  }else{
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      document.getElementById("navbar").style.top = "0";
    }else {
      document.getElementById("navbar").style.top = "-65px";
    }
  }

}

$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
