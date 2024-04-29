$(document).ready(function(){

    $("#textarea").on("keyup", function(){
        let text = $(this).val();
        text = text.toLowerCase();
        let vowels = 0;
        for(i=0 ; i < text.length ; i++){
            let char = text.charAt(i);
            let vow = ["a" , "e", "i", "o", "u"]
            if(vow.includes(char)){
                vowels++;
                $("#vowels").addClass("blink");
            }else{
                $("#vowels").removeClass("blink");
            }
        }

        $("#vowels").html(vowels)
    });

    

})