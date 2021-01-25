
function getProduct(id) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "https://blogg-webshop.herokuapp.com/products/get/" + id, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText
            var product = JSON.parse(response)
            var productPage = document.getElementById("item" + id + "-productPage")
            var itemImg = document.createElement("img")
            itemImg.setAttribute("src", product[0].image)
            itemImg.setAttribute("alt", product[0].imageAlt)
            productPage.appendChild(itemImg);

            var productTextDivEl = document.createElement("div")
            productTextDivEl.className = "productText";
            productTextDivEl.innerHTML =
                "<h2>" + product[0].name + "</h2>" +
                "<p>" + product[0].description + "</p>" +
                "<p>" + product[0].price + " kr</p>"
            var buttonContainerEl = document.createElement("div")
            buttonContainerEl.className= "button-container"
            var buttonEl = document.createElement("button")
            var name = product[0].name
            var price = product[0].price
            var img = product[0].image
            buttonEl.setAttribute("onclick", "addToShoppingcart(this ,'" + name + "'," + price + ",'" + img + "')")

            buttonEl.innerHTML = 'Lägg till i kundvagn'
            buttonContainerEl.appendChild(buttonEl)
            webbshopAEl = document.createElement("a")
            webbshopAEl.href = "./webbshop.html"
            webbshopAEl.innerHTML = '<button>Se fler produkter</button>'
            buttonContainerEl.appendChild(webbshopAEl)
            productPage.appendChild(productTextDivEl)
            var mainEl = document.getElementById("item" + id + "-productPage-main")
            mainEl.className ="item-productPage-main"
            mainEl.appendChild(buttonContainerEl)
        }
    }
    xhttp.send()
}