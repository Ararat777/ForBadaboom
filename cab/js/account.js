$(document).ready(function() {

  window.setInterval(countDown, 500);

    function countDown() {
        var now = new Date();
        var future = new Date("08/30/2017 12:00:00");
        var timeLeft = future - now;
        var milli = timeLeft;

        var seconds = milli / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var spareSeconds = seconds % 60;
        var spareMinutes = minutes % 60;
        var spareHours = hours % 24;
        var spareDays = days % 365;

        minutes = parseInt(minutes);
        hours = parseInt(hours);
        days = parseInt(days);
        spareSeconds = parseInt(spareSeconds);
        spareMinutes = parseInt(spareMinutes);
        spareHours = parseInt(spareHours);
        spareDays = parseInt(spareDays);

        days = padNumber(days);
        hours = padNumber(hours);
        minutes = padNumber(minutes);
        spareSeconds = padNumber(spareSeconds);
        spareMinutes = padNumber(spareMinutes);
        spareHours = padNumber(spareHours);
        spareDays = padNumber(spareDays);

        timeLeft = spareDays + ":" + spareHours + ":" + spareMinutes + ":" + spareSeconds;
        var mySpan = document.getElementById("timer");
        mySpan.innerHTML = timeLeft;
        var myFooterSpan = document.getElementById("footer_timer");
        myFooterSpan.innerHTML = timeLeft;

        if (milli <= 0) { //Time's run out! If all values go to zero
          mySpan.innerHTML = "00:00:00";
          myFooterSpan.innerHTML = "00:00:00";
        }
    }

    function padNumber(number) {
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    }

  $(".main .tab").hide(); 
  $(".slidebar li:first").attr("id","active"); 
  $(".main .tab:first").fadeIn(); 

  $('.slidebar a').click(function(e) {
        e.preventDefault();
        if ($(this).closest("li").attr("id") !== "active") {             
            $(".main .tab").hide(); 
            $(".slidebar li").attr("id","");  
            $(this).parent().attr("id","active");     
            $('#' + $(this).attr('name')).fadeIn(); 
        }
    });


    $('.calc button').click(function() {
        $('.key').css({'display':'block'});
    });

  $('.phonefield').mask('+9(999) 999-99-99');

  $('.language-select').click(function(){
    $(this).toggleClass('open');
  });

  $('.language-select li').click(function(){
      var setLang = $('.language-select').data('location'),
      dataLangSelect = $(this).data('lang');
        $('.language-select').data('location', dataLangSelect);
        $('.language-select li').removeClass('active');
        $(this).toggleClass('active');
  });

      $('#tab5 li > .item').click(function(){
        $(this).toggleClass('active');
        $(this).next('div').slideToggle(200);
    });

  // $('.nav_wrap').on('click', function() {
  //   $('.nav').toggleClass('active');
  // });

});