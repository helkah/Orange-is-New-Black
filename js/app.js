$(function(){
  
  ////Variables////////
    
  var uvIndexElement = $("#uvIndex");
  var latitudeInput = $(".gllpLatitude");
  var longitudeInput = $(".gllpLongitude");
    
  ////FUNCTIONS/////
    
    
    
    
  function loadUvIndex() {
      
            var latitudeValue = (Math.round((latitudeInput.val())*100))/100;
            var longitudeValue = (Math.round((longitudeInput.val())*100))/100;
            var urlAdress = 'http://api.openweathermap.org/data/2.5/uvi?lat=';
            var apiKey = '&appid=e5a7071f5e0bc6fcbdc4d42771a1cc8f';
      
            $.ajax({
            	   url: urlAdress + latitudeValue + "&lon=" + latitudeValue + apiKey
            }).done(function(response){
                    showUvIndex(response.value);
    	    }).fail(function(error) {
            console.log(error);
            })
  }
    
  function showUvIndex(givenUvIndex){
        var uVIndex = givenUvIndex;
        console.log(uVIndex);
        var donaldTextElement = $('#donaldSpeech')
        var donaldImageElement = $('.donaldSign')
        donaldImageElement.fadeOut();
      
        if (uVIndex<=2){
            donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)').fadeIn(400,function(){
                donaldTextElement.text("Verpiss dich!!!!")});
        }
      
        if (uVIndex>2 && uVIndex<=5){
            
            donaldImageElement.css('background-image','url(../images/TrumpSign_mad.png)').fadeIn(400,function(){
                donaldTextElement.text("This place sucks!!!")});
        }
      
        if (uVIndex>5 && uVIndex<=7){
             
            donaldImageElement.css('background-image','url(../images/TrumpSign_sad.png)').fadeIn(400,function(){
                donaldTextElement.text("Not even close!")});
        }
      
        if (uVIndex>7 && uVIndex<=10){
            
            donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)').fadeIn(400,function(){
                donaldTextElement.text("Hell yeah!")});
        }
        if(uVIndex>10){
           
           donaldImageElement.css('background-image','url(../images/TrumpSign_laughing.png)').fadeIn(400,function(){
               donaldTextElement.text("We`re goona die!")});    
        }
  }
  
////EVENTS///////////    
    
  $('button').on('click',function(){
      
      
    loadUvIndex();
    showUvIndex();  
        
        
      
  });
    
     

    
  });