$(function(){
  
  ////Variables////////
    
  var uvIndexElement = $("#uvIndex");
  var latitudeInput = $("#gllpLatitude");
  var longitudeInput = $("#gllpLongitude");
  console.log(latitudeInput.text(),longitudeInput.text())    
    
  ////FUNCTIONS/////
  function loadLocationKey(){
      
      var latitudeValue = (Math.round((latitudeInput.text())*100))/100;
      var longitudeValue = (Math.round((longitudeInput.text())*100))/100;
      var urlAdress = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
      var apiKey = '?apikey=kiK5mAnIBjvK9fWrJSTDASICEao6KrLT&q=';
      
     // 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=kiK5mAnIBjvK9fWrJSTDASICEao6KrLT&q=51%2C17&language=pl&details=false&toplevel=true'
      
            $.ajax({
            	   url: urlAdress + apiKey + latitudeValue + "%2C" + longitudeValue + "&language=pl&details=false&toplevel=true"
            }).done(function(response){
                    loadUvIndex(response.Key);
                    console.log(response.Key);
    	    }).fail(function(error) {
            console.log(error);
            })
      
  }    
    
    
    
  function loadUvIndex(locationKey) {
      

            var urlAdress = 'http://dataservice.accuweather.com/currentconditions/v1/';
            var apiKey = '?apikey=kiK5mAnIBjvK9fWrJSTDASICEao6KrLT&';
            //http://dataservice.accuweather.com/currentconditions/v1/2694848?apikey=kiK5mAnIBjvK9fWrJSTDASICEao6KrLT&language=pl&details=true
      
            $.ajax({
            	   url: urlAdress + locationKey + apiKey + "language=pl&details=true" 
            }).done(function(response){
                    showWhatDonaldSay(response[0].UVIndex);
    	    }).fail(function(error) {
            console.log(error);
            })
  }
    
  function showWhatDonaldSay(givenUvIndex){
        var uVIndexValue = givenUvIndex;
        console.log(uVIndexValue);
        $("#uvIndex").text(uVIndexValue);
        
        var donaldImageElement = $('.donaldSign')
        $(".protectionRules").css('display','none');
      
        if (uVIndexValue<=2){
            donaldImageElement.animate({'opacity': 0}, 1000, function () {
                donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)');
                donaldImageElement.find("span").text("This place sucks! UV Index is " + uVIndexValue );
                $(".low").css('display','block');
                donaldImageElement.find("button").text("Try again!");
            }).animate({'opacity': 1}, 1000);        
        };
        
      
        if (uVIndexValue>2 && uVIndexValue<=5){
            
            donaldImageElement.animate({'opacity': 0}, 1000, function () {
                donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)');
                donaldImageElement.find("span").text("This place sucks! UV Index is " + uVIndexValue );
                $(".moderate").css('display','block');
                donaldImageElement.find("button").text("Try again!");
            }).animate({'opacity': 1}, 1000);     
    
        };
                
      
        if (uVIndexValue>5 && uVIndexValue<=7){
             
            donaldImageElement.animate({'opacity': 0}, 1200, function () {
                donaldImageElement.css('background-image','url(../images/TrumpSign_sad.png)');
                donaldImageElement.find("span").text("Not even close! UV Index is " + uVIndexValue);
                $(".high").css('display','block');
                donaldImageElement.find("button").text("Try again!");
            }).animate({'opacity': 1}, 1200);     
                
        };
      
        if (uVIndexValue>7 && uVIndexValue<=10){
            
            donaldImageElement.animate({'opacity': 0}, 1000, function () {
                donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)');
                donaldImageElement.find("span").text("Hell yeah! UV Index is " + uVIndexValue);
                $(".veryHigh").css('display','block');
                donaldImageElement.find("button").text("Try again!");
            }).animate({'opacity': 1}, 1000);     
        };     
      
        if(uVIndexValue>10){
           
            donaldImageElement.animate({'opacity': 0}, 1000, function () {
                donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)');
                donaldImageElement.find("span").text("We`re goona die! UV Index is " + uVIndexValue);
                $(".extreme").css('display','block');
            }).animate({'opacity': 1}, 1000);     
           
        };
                  
    };
        
  
////EVENTS///////////    
    
  $('#showTrump').on('click',function(){
      
     loadLocationKey();  
     $('.flipper').toggleClass('rotation');
                    
  });
    
  $('#showMap').on('click',function(){
                 $('.flipper').toggleClass('rotation');
                console.log($('.flipper'))
                 });
  $(".forTabletAndDesktop").on('click',function(){
      loadLocationKey();
  })
    
     
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
        $('header > div').addClass('sticky');
    } else {
        $('header > div').removeClass('sticky'); 
    }
   
    
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
    $('.dropDownMenu').slideUp();
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