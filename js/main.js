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
        var uVIndex = givenUvIndex;
        console.log(uVIndex);
        
        var donaldImageElement = $('.donaldSign')
      
        if (uVIndex<=2){
            donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)').text("This place sucks!");
                
            };
        
      
        if (uVIndex>2 && uVIndex<=5){
            
             donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)').text("This place sucks!");
    
            };
                
      
        if (uVIndex>5 && uVIndex<=7){
             
            donaldImageElement.css('background-image','url(../images/TrumpSign_sad.png)').text("Not even close!");
                
            };
      
        if (uVIndex>7 && uVIndex<=10){
            
            donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)').text("Hell yeah!");
            
             };     
      
        if(uVIndex>10){
           
           donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)').text("We`re goona die!")
           
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
});