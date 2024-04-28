$(document).ready(function(){
    
    $("#camera_wrap").camera({
        height: `${window.innerHeight - 52}px`,
        fx: "simpleFade",
        thumbnails: false,
        time: 1500,
        hover: false,
        navigation: false,
        playPause: false,
        pagination: false,
    });


   
    index = 0;
    $(".next-arr").click(function(){
       
        
        
        
        
        $(".prev-arr").show();
        let movieWidth = $(".movie-train .movie").width() + 5;
        
        index++;

        
        let movieTrain = document.querySelector(".movie-train");
        movieTrain.style.transform = `translateX(+${index * movieWidth}px)`;

        let boxWidth = $(".movie-box").width();
        let trainWidth = $(".movie-train").width();
        
        console.log(trainWidth - ((index + 6) * movieWidth));
        if(trainWidth - ((index + 6) * movieWidth)  == 0){
            $(".next-arr").hide()
        }
        
        
        
        
    });
    $(".prev-arr").click(function(){
        



        $(".next-arr").show();
        let movieWidth = $(".movie-train .movie").width() + 5;
        
        index--;

     
        let movieTrain = document.querySelector(".movie-train");
        movieTrain.style.transform = `translateX(+${index * movieWidth}px)`;

        let movieNum = $(".movie-train .movie").length;
        let trainWidth = $(".movie-train").width();
        
        console.log(trainWidth - ((index + 6) * movieWidth));
        if(trainWidth - ((index + 6) * movieWidth)  == (movieNum - 6) * movieWidth){
            $(".prev-arr").hide()
        }
        
        
        
    });





});