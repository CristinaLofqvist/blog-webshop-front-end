/*** validerar användar input***/

/*funktion som vailderar att input fältet för email är korrekt ifylld*/
function validateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.length < 1) {
        alert("Du har fyllt i en ogiltigt emailadress");
        return false
    }
    if (inputText.match(mailformat)) {
        return true;
    } else {
        alert("Du har fyllt i en ogiltigt emailadress");
        return false;
    }
}

/*funktion som vailderar att input fältet för användarnamn endast innehåller bokstäver*/
function allLetter(text, msg) {
    var letters = /^[A-Öa-ö]+$/;
    if (text.length < 1) {
        alert("Fältet för " + msg + " får inte vara tomt")
        return false
    }
    if (text.match(letters)) {
        return true;
    } else {
        alert("Ogiltigt " + msg)
        return false;
    }
}

/* funktion som validerar att lösen inte får vara tomt eller längd mindre än 7 teken eller mer än 12 tecken. */
function password_validation(password, mx, my) {
    var password_len = password.length;
    if (password_len == 0 || password_len >= my || password_len < mx) {
        alert("Lösenord får inte vara tomt / längden måste vara mellan " + mx + " till " + my);
        return false;
    }
    return true;
}

/* Denna funktion anropar samtliga funktioner som används i validering av användaruppgifter*/
function registrationValidation(firstName, lastName, userName, email, password) {
    let return_val = true
    if (!allLetter(firstName, "Förnamn")) {
        return_val = false;
    }
    if (!allLetter(lastName, "Efternamn")) {
        return_val = false
    }
    if (!allLetter(userName, "Användarnamn")) {
        return_val = false
    }
    if (!validateEmail(email)) {
        return_val = false
    }
    if (!password_validation(password, 8, 20)) {
        return_val = false;
    }
    return return_val
}

//TODO: lägg till validation för country zip osv.
function checkoutValidation(firstName, lastName, email) {
    let return_val = true
    if (!allLetter(firstName, "Förnamn")) {
        return_val = false;
    }
    if (!allLetter(lastName, "Efternamn")) {
        return_val = false
    }
    if (!validateEmail(email)) {
        return_val = false
    }
    return return_val
}