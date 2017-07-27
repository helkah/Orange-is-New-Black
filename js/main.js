$(function(){
  
  //1//////////VARIABLES/////////////////
    
  var uvIndexElement = $("#uvIndex");
  var latitudeInput = $("#gllpLatitude");
  var longitudeInput = $("#gllpLongitude");
  var clickHereBtnForMobile =  $('#showTrumpBtn');
  var showMapBtnForMobile =  $('#showMapBtn'); 
  var btnForTabletAndDesktop = $(".forTabletAndDesktopBtn");
  var lastScrollTopValue = 0;    
    
  //2//////////FUNCTIONS/////////////////
  function loadLocationKey(){
      
      var latitudeValue = (Math.round((latitudeInput.text())*100))/100;
      var longitudeValue = (Math.round((longitudeInput.text())*100))/100;
      var urlAdress = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
      var apiKey = '?apikey=kiK5mAnIBjvK9fWrJSTDASICEao6KrLT&q=';
      
      
            $.ajax({
            	   url: urlAdress + apiKey + latitudeValue + "%2C" + longitudeValue + "&language=pl&details=false&toplevel=true"
            }).done(function(response){
                    loadUvIndex(response.Key);
                    console.log(response.Key);
    	    }).fail(function(error) {
            console.log(error);
            });
      
  };    
    
  function loadUvIndex(locationKey) {
      
        var urlAdress = 'http://dataservice.accuweather.com/currentconditions/v1/';
        var apiKey = '?apikey=kiK5mAnIBjvK9fWrJSTDASICEao6KrLT&';
      
        $.ajax({
            url: urlAdress + locationKey + apiKey + "language=pl&details=true" 
        }).done(function(response){
                showWhatDonaldSay(response[0].UVIndex);
        }).fail(function(error) {
        console.log(error);
        });
  };
    
  function showWhatDonaldSay(givenUvIndex){
        
        var uVIndexValue = givenUvIndex; 
        var urlAdress = '';
        var speachText = '';
        var protectionRuleClass = '';
        
        $(".protectionRules").css('display','none');
      
     
      
        if (uVIndexValue<=2){
            
            urlAdress = 'url(../images/TrumpSign_mad.png)';
            speachText = 'This place sucks! UV Index is ';
            protectionRuleClass = '.lowProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);          
        };
        
        if (uVIndexValue>2 && uVIndexValue<=5){
            
            urlAdress = 'url(../images/TrumpSign_mad.png)';
            speachText = 'This place sucks! UV Index is ';
            protectionRuleClass = '.moderateProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);
        };
                
        if (uVIndexValue>5 && uVIndexValue<=7){
            
            urlAdress = 'url(../images/TrumpSign_sad.png)';
            speachText = 'Not even close! UV Index is ';
            protectionRuleClass = '.highProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);    
        };
      
        if (uVIndexValue>7 && uVIndexValue<=10){
            
            urlAdress = 'url(../images/TrumpSign_laughing.png)';
            speachText = 'Hell yeah! UV Index is ';
            protectionRuleClass = '.veryHighProtectionRule';
            
            changeDonaldSpeach(urlAdress,speachText,uVIndexValue,protectionRuleClass);           
        };     
      
        if(uVIndexValue>10){
            
            urlAdress = 'url(../images/TrumpSign_laughing.png)';
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
        }).animate({'opacity': 1}, 1000);
    };
        
    
   function spriteAnimation(currentScrollTopValue){
        
       console.log(currentScrollTopValue, $(window).height(), $(document).height())
         
        if (currentScrollTopValue > lastScrollTopValue){ //lastScrollTopValue global declaration    
        
            if(currentScrollTopValue + $(window).height() == $(document).height()){
                $('.movingTrump').css('background-image','url(../images/trump_iddle.png)').css('background-position-y','0')
            }else{
                $('.movingTrump').css('background-image','url(../images/trump_run.png)').css('background-position-y','0')
            };
        
        }else{
        
            if(currentScrollTopValue != 0){
                $('.movingTrump').css('background-image','url(../images/trump_run.png)').css('background-position-y','512px');
            }else{   
                $('.movingTrump').css('background-image','url(../images/trump_iddle.png)').css('background-position-y','0');
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
    
    function hideHamburgerMenu(){
        $(this).animate({opacity:0},300, function(){
            $(this).css('visibility','hidden');
        });
    }
    
    function showDropDownMenuShowCross(){
        $(this).next().next().next().css({ opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
        $('.dropDownMenu').slideDown();
    }
    
    function hideCross(){
        $(this).animate({opacity:0},300, function(){
            $(this).css('visibility','hidden');
        });
    }
    
    function hideDropDownMenuShowHamburgerMenu(){
    
        $(this).prev().prev().prev().css({opacity: 0, visibility: "visible"
            }).animate({opacity: 1}, 300);
        $('.dropDownMenu').slideUp();
    }
    
    function scrollToTargetSection(){  
        
        var scrollPlaceid = $(this).children().attr('href');
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

        loadLocationKey();  
        $('.flipper').toggleClass('rotation');                    
  });
    
  showMapBtnForMobile.on('click',function(){
      
        $('.flipper').toggleClass('rotation');
  });
    
    
  btnForTabletAndDesktop.on('click',function(){
         
      loadLocationKey();
  });
    
//Scroll bar event   
  
    $(window).on('scroll',function(event){
    
        var currentScrollTopValue = $(this).scrollTop();// scrollTop gets current vertical position of the scroll bar
    
        spriteAnimation(currentScrollTopValue);
        makeHeaderSticky(currentScrollTopValue); 
    });
    
//Hamburger menu and cross events

    $('.hamburger').on('click', function(){   
        hideHamburgerMenu();
        showDropDownMenuShowCross();
    });


    $('.cross').on('click', function(){
        hideCross();
        hideDropDownMenuShowHamburgerMenu();
    });

//Event for dropdown Menu elements

    $('li').on('click', function(){
        scrollToTargetSection();
    
    });



//////////////////

/*var desktop = window.matchMedia("(min-width:1024px)");
    if(desktop.matches){
        var nav = document.querySelector('nav');
        nav.classList.remove("dropDownMenu");
    }else{
        nav.classList.add("dropDownMenu");
    }    
    
desktop.addListener(function(desktop){
    if(desktop.matches){
        var nav = document.querySelector('nav');
        nav.classList.remove("dropDownMenu");
    }else{
        nav.classList.add("dropDownMenu");
    }
    });*/
    












});