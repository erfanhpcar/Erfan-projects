// set date
let year = new Date().getFullYear();
document.getElementById("date").innerHTML = year;
// links
const toggleBtn = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links");
const links = document.querySelector(".links-ul");

toggleBtn.addEventListener("click", function(){
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    console.log(linksHeight);
    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    }else{
        linksContainer.style.height = 0;
    }
});

// fixed navbar

const navbar = document.getElementById("nav");
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navbar.classList.add("fixed-nav");
    }else{
        navbar.classList.remove("fixed-nav");
    }

    if(scrollHeight > 500){
        toTop.classList.add("show-link");
    }else{
        toTop.classList.remove("show-link");
    }
});


const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach( function(link){
    link.addEventListener("click", function(e){
        e.preventDefault();

        const id = e.currentTarget.getAttribute("href").slice(1);
        
        const element = document.getElementById(id);
        const navHeight = navbar.getBoundingClientRect().height;
        let position = element.offsetTop - navHeight;
        const isFixed = navbar.classList.contains("fixed-nav");
        const containerHeight = linksContainer.getBoundingClientRect().height;

        
        // if(!isFixed){
        //     console.log("ok");
        //     position = position - navHeight;
        // }

        // if(navHeight > 90){
        //     position = position + containerHeight;
        // }
        
        window.scrollTo({
            left: 0,
            top: position,
        });

        linksContainer.style.height = 0;

    })
})