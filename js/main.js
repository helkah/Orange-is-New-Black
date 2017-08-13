$(function(){
  
  ////////////VARIABLES/////////////////
    
  var uvIndexElement = $("#uvIndex");
  var latitudeInput = $("#gllpLatitude");
  var longitudeInput = $("#gllpLongitude");
  var clickHereBtnForMobile =  $('#showTrumpBtn');
  var showMapBtnForMobile =  $('#showMapBtn'); 
  var btnForTabletAndDesktop = $(".forTabletAndDesktopBtn");
  var lastScrollTopValue = 0;
     
    
  ////////////FUNCTIONS/////////////////
  function loadLocationKey(){
      
      var latitudeValue = (Math.round((latitudeInput.text())*100))/100;
      var longitudeValue = (Math.round((longitudeInput.text())*100))/100;
      var urlAdress = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='
      var apiKey = config.MY_KEY_ACCUWEATHER;
      
      
            $.ajax({
            	   url: urlAdress + apiKey + "&q=" + latitudeValue + "%2C" + longitudeValue + "&language=pl&details=false&toplevel=true"
            }).done(function(response){
                    loadUvIndexFromAccuweather(response.Key);
                    console.log(response.Key);
    	    }).fail(function(error) {
            console.log(error);
            });
      
  };    
    
  function loadUvIndexFromAccuweather(locationKey) {
      
        var urlAdress = 'http://dataservice.accuweather.com/currentconditions/v1/';
        var apiKey = config.MY_KEY_ACCUWEATHER;
      
        $.ajax({
            url: urlAdress + locationKey + "?apikey=" + apiKey + "&language=pl&details=true" 
        }).done(function(response){
                showWhatDonaldSay(response[0].UVIndex);
        }).fail(function(error) {
        console.log(error);
        });
  };
    
  
    
function loadUvIndexFromOpenweather() {
        
             var latitudeValue = (Math.round((latitudeInput.text())*100))/100;
             var longitudeValue = (Math.round((longitudeInput.text())*100))/100;
             var apiKey = '&appid=e5a7071f5e0bc6fcbdc4d42771a1cc8f';
 
             var urlAdress = 'http://api.openweathermap.org/data/2.5/uvi?lat=';
             var apiKey = config.MY_KEY_OPENWEATHERMAP;
        
              $.ajax({
             	   url: urlAdress + latitudeValue + "&lon=" + longitudeValue + "&appid=" + apiKey 
              }).done(function(response){
                     showWhatDonaldSay(response.value);
      	    }).fail(function(error) {
              console.log(error);
              })
};
    
  function showWhatDonaldSay(givenUvIndex){
        
        var uVIndexValue = givenUvIndex; 
        var urlAdress = '';
        var speachText = '';
        var protectionRuleClass = '';
        
        $(".protectionRules").css('display','none');
      
     
      
        if (uVIndexValue<=2){
            
            urlAdress = 'url(../images/TrumpSignMad.png)';
            speachText = 'This place sucks! UV Index is ';
            protectionRuleClass = '.lowProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);          
        };
        
        if (uVIndexValue>2 && uVIndexValue<=5){
            
            urlAdress = 'url(../images/TrumpSignMad.png)';
            speachText = 'This place sucks! UV Index is ';
            protectionRuleClass = '.moderateProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);
        };
                
        if (uVIndexValue>5 && uVIndexValue<=7){
            
            urlAdress = 'url(../images/TrumpSignSad.png)';
            speachText = 'Not even close! UV Index is ';
            protectionRuleClass = '.highProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);    
        };
      
        if (uVIndexValue>7 && uVIndexValue<=10){
            
            urlAdress = 'url(../images/TrumpSignLaughing.png)';
            speachText = 'Hell yeah! UV Index is ';
            protectionRuleClass = '.veryHighProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);           
        };     
      
        if(uVIndexValue>10){
            
            urlAdress = 'url(../images/TrumpSignLaughing.png)';
            speachText = 'We`re goona die! UV Index is ';
            protectionRuleClass = '.extremeProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);    
        };                  
    };
    
    function changeDonaldSpeach(url,speach,uV,selector){
        
        var donaldImageElement = $('.donaldSign');
        
        donaldImageElement.animate({'opacity': 0}, 1000, function () {
                donaldImageElement.css('background-image',url);
                donaldImageElement.find("span").text(speach + uV);
                $(selector).slideDown();
                donaldImageElement.find("button").text("Try again!");
        }).delay(500).animate({'opacity': 1}, 1000);
    };
        
    
   function spriteAnimation(currentScrollTopValue){
        
       //console.log(currentScrollTopValue, $(window).height(), $(document).height())
         
        if (currentScrollTopValue > lastScrollTopValue){ //lastScrollTopValue global declaration    
        
            if(Math.ceil(currentScrollTopValue) + $(window).height() >= $(document).height()){
                $('.movingTrump').css('background-image','url(../images/TrumpIddle.png)').css('background-position-y','0')
            }else{
                $('.movingTrump').css('background-image','url(../images/TrumpRun.png)').css('background-position-y','0')
            };
        
        }else{
        
            if(currentScrollTopValue != 0){
                $('.movingTrump').css('background-image','url(../images/TrumpRun.png)').css('background-position-y','512px');
            }else{   
                $('.movingTrump').css('background-image','url(../images/TrumpIddle.png)').css('background-position-y','0');
            };
        }
       
        lastScrollTopValue = currentScrollTopValue; //remember where scroll bar was
    };
    
    function makeHeaderSticky(currentScrollTopValue){ 
        
        var stickyNavTop = $('header').offset().top;// offset gets current coordinates relative to document (top,left)
        
        if (currentScrollTopValue  > stickyNavTop) { 
            $('header > div').addClass('sticky');
        } else {
            $('header > div').removeClass('sticky'); 
        }
    };
    
    function hideHamburgerMenu($element){
        $element.animate({opacity:0},300, function(){
            $element.css('visibility','hidden');
        });
    }
    
    function showDropDownMenuShowCross($element){
        $element.next().next().next().css({ opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
        $('.dropDownMenu').slideDown();
    }
    
    function hideCross($element){
        $element.animate({opacity:0},300, function(){
            $element.css('visibility','hidden');
        });
    }
    
    function hideDropDownMenuShowHamburgerMenu($element){
    
        $element.prev().prev().prev().css({opacity: 0, visibility: "visible"
            }).animate({opacity: 1}, 300);
        $('.dropDownMenu').slideUp();
    }
    
    function scrollToTargetSection($element){  
        
        var scrollPlaceid = $element.children().attr('href');
        var menuHeight = $('.dropDownMenu').height();
        var headerHeight = $('header').height();

    
        if (headerHeight<menuHeight){ //for mobile and tablet
            $('html,body').animate({
                scrollTop: ($(scrollPlaceid).offset().top) - menuHeight - headerHeight,
            },1000)
        }else{ // for desktop
            $('html,body').animate({
                scrollTop: ($(scrollPlaceid).offset().top) - headerHeight,
            },1000)
    }
};
    
//////////////EVENTS///////////////////// 
    
//Btn events    
    
  clickHereBtnForMobile.on('click',function(){

        //loadLocationKey(); 
        loadUvIndexFromOpenweather();
        $('.flipper').toggleClass('rotation');                    
  });
    
  showMapBtnForMobile.on('click',function(){
      
        $('.flipper').toggleClass('rotation');
  });
    
    
  btnForTabletAndDesktop.on('click',function(){
       
      loadUvIndexFromOpenweather();
      //loadLocationKey();
  });
    
//Scroll bar event   
  
    $(window).on('scroll',function(event){
    
        var currentScrollTopValue = $(this).scrollTop();// scrollTop gets current vertical position of the scroll bar
    
        spriteAnimation(currentScrollTopValue);
        makeHeaderSticky(currentScrollTopValue); 
    });
    
//Hamburger menu and cross events

    $('.hamburger').on('click', function(){   
        hideHamburgerMenu($(this));
        showDropDownMenuShowCross($(this));
    });


    $('.cross').on('click', function(){
        hideCross($(this));
        hideDropDownMenuShowHamburgerMenu($(this));
    });

//Event for dropdown Menu elements

    $('li').on('click', function(e){
        e.preventDefault();
        scrollToTargetSection($(this));
    
    });



//////////////////

    
});