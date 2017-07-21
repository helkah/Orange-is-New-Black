$(function(){
  
  ////Variables////////
    
  var uvIndexElement = $("#uvIndex");
  var latitudeInput = $("#gllpLatitude");
  var longitudeInput = $("#gllpLongitude");
    
  ////FUNCTIONS/////
    
    
    
    
  function loadUvIndex() {
      
            var latitudeValue = (Math.round((latitudeInput.text())*100))/100;
            var longitudeValue = (Math.round((longitudeInput.text())*100))/100;
            var urlAdress = 'http://api.openweathermap.org/data/2.5/uvi?lat=';
            var apiKey = '&appid=e5a7071f5e0bc6fcbdc4d42771a1cc8f';
      
            $.ajax({
            	   url: urlAdress + latitudeValue + "&lon=" + latitudeValue + apiKey
            }).done(function(response){
                    showWhatDonaldSay(response.value);
    	    }).fail(function(error) {
            console.log(error);
            })
  }
    
  function showWhatDonaldSay(givenUvIndex){
        var uVIndexValue = givenUvIndex;
        console.log(uVIndexValue);
        $("#uvIndex").text(uVIndexValue);
        
        var donaldImageElement = $('.donaldSign')
      
        if (uVIndexValue<=2){
            donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)');
            donaldImageElement.find("p").text("This place sucks! UV Index is " + uVIndexValue );
                
            };
        
      
        if (uVIndexValue>2 && uVIndexValue<=5){
            
             donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)');
             donaldImageElement.find("p").text("This place sucks! UV Index is " + uVIndexValue );
    
            };
                
      
        if (uVIndexValue>5 && uVIndexValue<=7){
             
            donaldImageElement.css('background-image','url(../images/TrumpSign_sad.png)');
                donaldImageElement.find("p").text("Not even close! UV Index is " + uVIndexValue);
                
            };
      
        if (uVIndexValue>7 && uVIndexValue<=10){
            
            donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)');
                donaldImageElement.find("p").text("Hell yeah! UV Index is " + uVIndexValue);
            
             };     
      
        if(uVIndexValue>10){
           
           donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)');
            donaldImageElement.find("p").text("We`re goona die! UV Index is " + uVIndexValue)
           
            };
                  
    };
        
  
////EVENTS///////////    
    
  $('#showTrump').on('click',function(){
      
      
    loadUvIndex();
      
     $('.flipper').toggleClass('hover');
                console.log($('.flipper'))  
        
        
      
  });
    
     
var lastScrollTopValue = 0;
$(window).on('scroll',function(event){
  var currentScrollTopValue = $(this).scrollTop();    
  if (currentScrollTopValue > lastScrollTopValue){
       if(currentScrollTopValue + $(window).height() == $(document).height()){
           $('.movingTrump').css('background-image','url(../images/trump_iddle.png)').css('background-position-y','0')
       }else{
        $('.movingTrump').css('background-image','url(../images/trump_run.png)').css('background-position-y','0')
       }
   }else{
        if(currentScrollTopValue != 0){
            $('.movingTrump').css('background-image','url(../images/trump_run.png)').css('background-position-y','512px');
        }else{   
            $('.movingTrump').css('background-image','url(../images/trump_iddle.png)').css('background-position-y','0');
        }
   }
    
    
   lastScrollTopValue = currentScrollTopValue;
    
    ////////////STICKY MENU/////////////////
    var stickyNavTop = $('header').offset().top;
    if (currentScrollTopValue  > stickyNavTop) { 
        $('header > .container').addClass('sticky');
    } else {
        $('header > .container').removeClass('sticky'); 
    }
   
    
  });
    
    $('#showMap').on('click',function(){
                 $('.flipper').toggleClass('hover');
                console.log($('.flipper'))
                 });    



////////Hamburger menu EVENTS///////

$('.hamburger').on('click', function(){
    console.log("Działa");
    $(this).animate({
        opacity:0
        },300, function(){
        $(this).css('visibility','hidden');
    });
    $(this).next().next().next().css({
        opacity: 0.0, 
        visibility: "visible"
        }).animate({
        opacity: 1
        }, 300);
    $('.dropDownMenu').slideDown();
})

$('.cross').on('click', function(){
    console.log("Działa");
    $(this).animate({
        opacity:0
        },300, function(){
        $(this).css('visibility','hidden');
    });
    $(this).prev().prev().prev().css({
        opacity: 0.0, 
        visibility: "visible"
        }).animate({
        opacity: 1
        }, 300);
    $('.dropDown').slideUp();
})

/////////Event for dropdown Menu/////////////

$('li').on('click', function(){
    var scrollPlaceid = $(this).children().attr('href');
    
    var menuHeight = $('.dropDownMenu').height();
    var headerHeight = $('header').height();
                
   $('html,body').animate({
        scrollTop: ($(scrollPlaceid).offset().top) - menuHeight - headerHeight,
    },1000)
})
















});