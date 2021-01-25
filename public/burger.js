
var open = 0;
function toggleOpenBurger(burgerId, elementId, displayValue) {
    var htmlElement = document.getElementById(elementId);
    var burgerBun = document.getElementById(burgerId).children;
    htmlElement.removeAttribute("style")
    if (open !== 0) {
        for (let i = 0; i < burgerBun.length; i++) {
            if (i == 0) {
                burgerBun[i].style.transform = "rotate(0)";
            } else if (i == 1) {
                burgerBun[i].style.opacity = "1";
                burgerBun[i].style.transform = "translateX(0)"
            } else {
                burgerBun[i].style.transform = "rotate(0)";
            }
        }
        htmlElement.style.transform = "translateX(-500%)";
        open = 0;
    } else {

        for (let i = 0; i < burgerBun.length; i++) {
            if (i == 0) {
                burgerBun[i].style.transform = "rotate(45deg)";
            } else if (i == 1) {
                burgerBun[i].style.opacity = "0";
                burgerBun[i].style.transform = "translateX(20px)"
            } else {
                burgerBun[i].style.transform = "rotate(-45deg)";
            }
        }
        htmlElement.style.transform = "translateX(0)";
        open = 1;
    }
}

function toggleHidden(id, windowWidth, burgerId, showOnShrink = false, clickToggle = false, ) {
    var x = document.getElementById(id);
    var innerWidth = parseInt(window.innerWidth)
    var windowWidth = parseInt(windowWidth)
    if (clickToggle) {
        if (x.className.includes("hidden")) {
            x.className = x.className.replace("hidden", "show")
        } else {
            x.className = x.className.replace("show", "hidden")
        }
        return
    }
    if (showOnShrink) {
        if (innerWidth < windowWidth) {
            if (x.className.includes("hidden")) {
                x.style.transform = "translateX(0)"
                x.className = x.className.replace("hidden", "show")    
            }
        } else {  
            if (x.className.includes("show")) {
                x.className = x.className.replace("show", "hidden")
                x.style.transform = "translateX(-500%)";
                var burgerBun = document.getElementById(burgerId).children;
                if (burgerBun.length > 0) {
                    open = 0;
                }
                for (let i = 0; i < burgerBun.length; i++) {
                    if (i == 0) {
                        burgerBun[i].style.transform = "rotate(0)";
                    } else if (i == 1) {
                        burgerBun[i].style.opacity = "1";
                        burgerBun[i].style.transform = "translateX(0)"
                    } else {
                        burgerBun[i].style.transform = "rotate(0)";
                    }
                }
            }
        }
    } else {
        if (innerWidth > windowWidth) {
            if (x.className.includes("hidden")) {
                x.style.transform = "translateX(0)"
                x.className = x.className.replace("hidden", "show")
            }
        } else {
            if (x.className.includes("show")) {
                x.className = x.className.replace("show", "hidden")
                x.style.transform = "translateX(-500%)";
                var burgerBun = document.getElementById(burgerId).children;
                if (burgerBun.length > 0) {
                    open = 0;
                }
                for (let i = 0; i < burgerBun.length; i++) {
                    if (i == 0) {
                        burgerBun[i].style.transform = "rotate(0)";
                    } else if (i == 1) {
                        burgerBun[i].style.opacity = "1";
                        burgerBun[i].style.transform = "translateX(0)"
                    } else {
                        burgerBun[i].style.transform = "rotate(0)";
                    }
                }
            }
        }
    }
}

