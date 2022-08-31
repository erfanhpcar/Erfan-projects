$(document).ready(()=>{
    $(".overlay").hide();
    $(window).scroll(()=>{
        const scrollHeight = window.scrollY;
        const navHeight = document.querySelector("nav").getBoundingClientRect().height;
        if(scrollHeight > navHeight){
            $("nav").addClass("night");
        }else{
            $("nav").removeClass("night");
        }
        // let bool = false;
        // if(window.scrollY > 704){
        //     bool = true;
        // }
        // if(bool == true){
        //     console.log($(".after-scroll::before"));
        //     rotate();
        // }
        
    });

    $(".service").click((e)=>{
        console.log($(e.currentTarget));
        $(e.currentTarget).toggleClass("off")
                        .find(".p")
                        .slideToggle(500,"swing");

        $(".partition").css({
            "background-color": $(e.currentTarget).data("color")
        });
        console.log($(e.currentTarget).data("color"));
        
                        
    });




    $(".tab-btns button").click((e)=>{
        
        let form = $(e.target).data("class");

        $(".tab-btns button").removeClass("active")

        if(form == ".log-in"){
            $(".log-in").show();
            $(".sign-up").hide();
            

        }else{
            $(".log-in").hide();
            $(".sign-up").show();
        }

        $(e.target).addClass("active")
        
    })

    $("#enroll").click(()=>{
        $(".overlay").fadeIn("slow", "swing");
        $("body").css({
            "overflow": "hidden"
        })
    });

    $(".close i").click(()=>{
        $(".overlay").fadeOut("slow", "swing");
        $("body").css({
            "overflow-x": "hidden",
            "overflow-y": "scroll",
        })
    });


    $(".hamburger").click(()=>{
        $(".menu").slideToggle("slow", "swing")
    });

    $(".our-service").click((e)=>{
        e.preventDefault();
        $("html, body").animate({
            "scrollTop": $(".services").offset().top
        }, "slow", "swing");
    })
    $(".about-us").click((e)=>{
        e.preventDefault();
        $("html, body").animate({
            "scrollTop": $(".snapp-shop").offset().top
        }, "slow", "swing");
    })





    function rotate(){
        
        

        $(".after-scroll::before").animate({
            "transform": "rotate(-22deg)"
        },"slow","swing");

        $(".after-scroll::after").animate({
            "transform": "rotate(20deg)"
        },"slow","swing");
    }



});