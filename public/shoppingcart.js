
window.addEventListener("load", showSmallShoppingcart, false);    /*show small shoppingcart*/
window.addEventListener("load", showCheckout, false);       /* go to checkout*/

function toggleCheckoutForm(id = "checkoutForm", hide = true) {
    var x = document.getElementById(id)
    if (hide) {
        x.style.display = "none"
        if (x.className.includes("show")) {
            x.className = x.className.replace("show", "hidden")
        }
    } else {
        if (x.className.includes("hidden")) {
        x.className = x.className.replace("hidden", "show")
        x.removeAttribute("style")
        }
    }
}

//Hide checkout button
function hideCheckoutButton() {
    const checkoutButtonEl = document.getElementsByClassName("checkout-button"); /*checkout*/
    if (document.getElementsByClassName("checkout-button")) {
        for (var i = 0; i < checkoutButtonEl.length; i++) {
            checkoutButtonEl[i].style.display = "none";
        }
    }
}

//Show checkout button
function showCheckoutButton() {
    const checkoutButtonEl = document.getElementsByClassName("checkout-button"); /*checkout*/
    if (document.getElementsByClassName("checkout-button")) {
        for (var i = 0; i < checkoutButtonEl.length; i++) {
            checkoutButtonEl[i].style.display = "block";
        }
    }
}




/*Small shoppingcart*/
function showSmallShoppingcart() {
    const smallShoppingcartEl = document.getElementById("small-shoppingcart"); /*small cart with only quantity and sum*/
    if (document.getElementById("small-shoppingcart")) {
        var shoppingcartItems = JSON.parse(localStorage.getItem("shoppingcart"));
        if (shoppingcartItems == null) { shoppingcartItems = []; }
        if (shoppingcartItems.length > 0) {
            /*cout total sum*/
            var numOfItems = 0;
            /*Loop through items*/
            for (var i = 0; i < shoppingcartItems.length; i++) {
                /*count cost */
                /*Several items of the same type add cost * quantity*/
                if (shoppingcartItems[i].nums > 1) {
                    var count = parseInt(shoppingcartItems[i].nums);
                    for (var j = 0; j < count; j++) {
                        numOfItems++;
                    }
                } else {
                    numOfItems++;
                }
            }

            smallShoppingcartEl.innerHTML = numOfItems
            smallShoppingcartEl.style.display = "flex";
        } else {
            smallShoppingcartEl.style.display = "none";
            smallShoppingcartEl.innerHTML = "";
        }
    }
}

/*show checkout*/
function showCheckout() {
    const checkoutEl = document.getElementById("checkout"); /*checkout*/
    if (document.getElementById("checkout")) {
        var shoppingcartItems = JSON.parse(localStorage.getItem("shoppingcart"));
        if (shoppingcartItems == null) { shoppingcartItems = []; }

        /*reset*/
        checkoutEl.innerHTML = "";
        if (shoppingcartItems.length > 0) {
            var sum = 0;
            for (var i = 0; i < shoppingcartItems.length; i++) {
                // total
                var itemCost = parseInt(shoppingcartItems[i].itemCost);
                var itemSumCost = 0;
                //Several items of the same type
                if (shoppingcartItems[i].nums > 1) {
                    var count = parseInt(shoppingcartItems[i].nums);
                    for (var j = 0; j < count; j++) {
                        sum += itemCost;
                        itemSumCost += itemCost;
                    }
                } else {
                    sum += itemCost;
                    itemSumCost = itemCost;
                }
                var itemName = shoppingcartItems[i].itemName;
                var numItems = shoppingcartItems[i].nums;
                var itemImage = shoppingcartItems[i].itemImage;
                checkoutEl.innerHTML +=
                    "<img src='" + itemImage + "' alt='Produktbild för " + itemName + "' />" +
                    "<h3>" + itemName + " </h3>" +
                    "<p>Antal: " + numItems + " st.</p>" +
                    "<p> à " + itemSumCost + " kr</p>"
            }
            checkoutEl.innerHTML += '<div class="w-100"><hr></div>'
            checkoutEl.innerHTML += "<p class='checkout-sum'>Tot: " + sum + " kr</p>";
            checkoutEl.innerHTML += '<button onclick="emptyShoppingcart(false)"> Töm varukorgen</button>'
            toggleCheckoutForm("checkoutForm", false)
            showCheckoutButton();
        } else {
            toggleCheckoutForm("checkoutForm", true)
            showCheckoutButton();
            checkoutEl.innerHTML = "<h2>Varukorgen är tom</h2>";
        }
    }
}

/*to checkout*/
function checkoutShoppingcart(firstName, lastName, email, country, state, city, zip, address) {
    var shoppingcartItems = JSON.parse(localStorage.getItem("shoppingcart"));

    if (shoppingcartItems != null) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://blogg-webshop.herokuapp.com/order/place", true)
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //alert(xhttp.responseText);
            }
        }
        let json = JSON.stringify({
            items: shoppingcartItems,
            firstname: firstName,
            lastname: lastName,
            email: email,
            country: country,
            state: state,
            city: city,
            zip: zip,
            address: address
        });
        xhttp.send(json);
        /*empty shopingcart*/
        emptyShoppingcart(false);
        alert("Order mottagen")
    } else {
        alert("Det finns inga varor i din varukorg");
    }

}
/*Add to shoppingcart*/
function addToShoppingcart(el, name, cost, image) {
    /*start at one item*/
    var numOfItems = 1;
    /*Puts class on cal to class*/
    el.classList.add("clicked");
    /*Scan the list*/
    var currentShoppingcart = JSON.parse(localStorage.getItem("shoppingcart"));
    if (currentShoppingcart == null) { currentShoppingcart = []; }
    /*Check if item already exists*/
    for (var i = 0; i < currentShoppingcart.length; i++) {
        if (name == currentShoppingcart[i].itemName) {
            numOfItems = currentShoppingcart[i].nums + 1;
            currentShoppingcart.splice(i, 1);
        }
    }
    /*Add*/
    currentShoppingcart.push({ itemName: name, itemCost: cost, itemImage: image, nums: numOfItems });
    /*Convert to JSON*/
    var jsonStr = JSON.stringify(currentShoppingcart);

    /*Store*/
    localStorage.setItem("shoppingcart", jsonStr);

    /*Update DOM*/
    showSmallShoppingcart();
    //showCheckout();
}



/*empty shopingcart*/
function emptyShoppingcart(conf) {
    if (conf == true) {
        if (confirm("Är du säker att du vill radera alla varor?")) {
            localStorage.removeitem("shoppingcart");;
            howSmallShoppingcart();
            showCheckout();
        } else {
            return;
        }
    } else {
        localStorage.removeItem("shoppingcart");
        showSmallShoppingcart();
        showCheckout();
    }
}