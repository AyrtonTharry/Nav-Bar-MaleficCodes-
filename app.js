const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
    if (event.type === "touchstart") event.preventDefault();
    event.stopPropagation();
    nav.classList.toggle("active")
    handClickOutside(menu, () => {
        nav.classList.remove("active");
        setAria();
    });
    //handClickOutside(menu); serve para fechar menu sem clicar no X
    setAria();
}

function handClickOutside(targetElement, callback) {
     const html = document.documentElement;
     function handleHTMLClick(event) {
        if (!targetElement.contains(event.target)) {
           targetElement.removeAttribute("data-target"); 
           html.removeEventListener("click", handleHTMLClick);
           html.removeEventListener("touchstart", handleHTMLClick);
           callback();
        }
     }
     if (!targetElement.hasAttribute("data-target")) {
        html.addEventListener("click", handleHTMLClick);
        html.addEventListener("touchstart", handleHTMLClick);
        targetElement.setAttribute("data-target", "")
     }
}

function setAria() {
    const isActive = nav.classList.contains("active");
    btnMenu.setAttribute("aria-expanded", isActive);
    if (isActive){
        btnMenu.setAttribute("aria-label", "Fechar Menu"); 
    }
    else{
        btnMenu.setAttribute("aria-label", "Abrir Menu")
    }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);