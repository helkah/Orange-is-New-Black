document.addEventListener("DOMContentLoaded", function(event) {

var uvIndex = 2;
    
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
                "8",
                "8",
                "8",
                "8",
                "8",
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

var ctx = document.getElementById("myChart");

// And for a doughnut chart
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
    	rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend:{
            position:"bottom",
        }
        
    }
});

});


