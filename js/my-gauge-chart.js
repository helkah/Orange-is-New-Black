$(function(){
    
var data = {
    labels: [
        "Low",
        "Moderate",
        "High",
        "Very High",
        "Extreme"
    ],
    datasets: [
        {   
            
            data: [2, 5, 7, 8,13],
            backgroundColor: [
                "#EEEEEE",
                "#DCDCDC",
                "#CAE5FF",
                "#99CCFF",
                "#6699CC",
            ],
            borderColor: [
                "white",
                "white",
                "white",
                "white",
                "white",
            ],
            borderWidth: [
                "4",
                "4",
                "4",
                "4",
                "4",
            ],
            hoverBackgroundColor: [
                "#98FB98",
                "#FFFF99",
                "#FFCE56",
                "#F08080",
                "#DDA0DD",
            ]
        }],
        
    }

var inView = false;
var ctx = document.getElementById("myChart");    

var fired = 0; // animation fire only once
    
$(window).on('scroll',function() {
    
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $("#myChart").offset().top;
    var elemBottom = elemTop + $('#myChart').height();
    
    
    if (fired == 0){
        if ((elemTop <= docViewBottom) && (elemBottom >= docViewTop)){
            
            fired = 1;    

            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
    	           rotation: 1 * Math.PI,
                   circumference: 1 * Math.PI,
                   legend:{
                     position:"top",
                   }
        
                }    
            });
        }
    }
});

    
    
    
    
    
    

});


