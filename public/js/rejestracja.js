var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear() - 18;
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("fdate").setAttribute("max", today);


function validreg() {
    var x = document.getElementById("fimie").value;
    if (x == "") {
        fimie.style.borderColor = 'red';
        fimie.focus();
        imie_error.textContent = "Pole imie jest wymagane!";
        imie_error.style.color = 'red';
        return false;
    }
    else {
        imie_error.textContent = "";
        fimie.style.borderColor = '';
        fimie.focus();
    }
    var x = document.getElementById("fnazwisko").value;
    if (x == "") {
        fnazwisko.style.borderColor = 'red';
        fnazwisko.focus();
        nazwisko_error.textContent = "Pole nazwisko jest wymagane!";
        nazwisko_error.style.color = 'red';
        return false;
    }
    else {
        nazwisko_error.textContent = "";
        fnazwisko.style.borderColor = '';
        fnazwisko.focus();
    }
    var x = document.getElementById("femail").value;
    if (x == "") {
        email_error.textContent = "Pole email jest wymagane!";
        email_error.style.color = 'red';
        femail.style.borderColor = 'red';
        femail.focus();
        return false;
    }
    else {
        femail.style.borderColor = '';
        femail.focus();
        email_error.textContent = "";
    }
    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(document.getElementById("femail").value)) {
        email_error.textContent = "Podaj poprawny adres email!";
        email_error.style.color = 'red';
        femail.style.borderColor = 'red';
        femail.focus();
        return false;
    }
    else {
        femail.style.borderColor = '';
        femail.focus();
        email_error.textContent = "";
    }

    var x = document.getElementById("fpass").value;
    if (x == "") {
        pass_error.textContent = "Pole haslo jest wymagane";
        pass_error.style.color = 'red';
        fpass.style.borderColor = 'red';
        fpass.focus();
        return false;
    }
    else {
        fpass.style.borderColor = '';
        fpass.focus();
        pass_error.textContent = "";
    }
    var y = document.getElementById("fpass2").value;
    if (y == "") {
        pass2_error.textContent = "Hasla musza byc takie same!";
        pass2_error.style.color = 'red';
        pass_error.style.color = 'red';
        fpass.style.borderColor = 'red';
        fpass2.style.borderColor = 'red';
        fpass.focus();
        fpass2.focus();
        return false;
    }
    else {
        pass2_error.textContent = "";
        fpass.style.borderColor = '';
        fpass2.style.borderColor = '';
        fpass.focus();
        fpass2.focus();
    }
    if (y != x) {
        pass2_error.textContent = "Hasla musza byc takie same!";
        pass2_error.style.color = 'red';
        fpass.style.borderColor = 'red';
        fpass2.style.borderColor = 'red';
        fpass.focus();
        fpass2.focus();
        return false;
    }
    else {
        fpass.style.borderColor = '';
        fpass2.style.borderColor = '';
        pass2_error.textContent = "";
        fpass.focus();
        fpass2.focus();
    }

    var x = document.getElementById("fdate").value;
    if (x == "") {
        date_error.textContent = "Wybierz datę urodzenia!";
        date_error.style.color = 'red';
        fdate.style.borderColor = 'red';
        fdate.focus();
        return false;
    }
    else {
        fdate.style.borderColor = '';
        fdate.focus();
        date_error.textContent = "";
    }


    var x = document.getElementById("fnumer").value;
    if (x == "") {
        number_error.textContent = "Numer nie moze byc pusty!";
        number_error.style.color = 'red';
        fnumer.style.borderColor = 'red';
        fnumer.focus();
        return false;
    }
    var numerReg = /^-?\d*\.?\d*$/;
    if (!numerReg.test(document.getElementById("fnumer").value)) {
        number_error.textContent = "Pole musi zawierać same cyfry!";
        number_error.style.color = 'red';
        fnumer.style.borderColor = 'red';
        fnumer.focus();
        return false;
    }
    else {
        fnumer.style.borderColor = '';
        fnumer.focus();
        number_error.textContent = "";
    }
    var x = document.getElementById("fdzialalnosc").value;
    if (x == "") {
        dzialalnosc_error.textContent = "Pole jest wymagane!";
        dzialalnosc_error.style.color = 'red';
        fdzialalnosc.style.borderColor = 'red';
        fdzialalnosc.focus();
        return false;
    }
    else {
        fdzialalnosc.style.borderColor = '';
        fdzialalnosc.focus();
        dzialalnosc_error.textContent = "";
    }
    var x = document.getElementById("fadres").value;
    if (x == "") {
        adres_error.textContent = "To pole jest wymagane!";
        adres_error.style.color = 'red';
        fadres.style.borderColor = 'red';
        fadres.focus();
        return false;
    }
    else {
        fadres.style.borderColor = '';
        fadres.focus();
        adres_error.textContent = "";
    }
    var x = document.getElementById("fkod").value;
    if (x == "") {
        kod_error.textContent = "To pole jest wymagane";
        kod_error.style.color = 'red';
        fkod.style.borderColor = 'red';
        fkod.focus();
        return false;
    }
    var numerReg = /^-?\d{2}-\d{3}/;
    if (!numerReg.test(document.getElementById("fkod").value)) {
        kod_error.textContent = "Podaj prawidlowy kod pocztowy w formacie XX-XXX";
        kod_error.style.color = 'red';
        fkod.style.borderColor = 'red';
        fkod.focus();
        return false;
    }
    else {
        fkod.style.borderColor = '';
        fkod.focus();
        kod_error.textContent = "";
    }
    var x = document.getElementById("fkraj").value;
    if (x == "---") {
        kraj_error.textContent = "Wybierz kraj!";
        kraj_error.style.color = 'red';
        fkraj.style.borderColor = 'red';
        fkraj.focus();
        return false;
    }
    else {
        fkraj.style.borderColor = '';
        fkraj.focus();
        kraj_error.textContent = "";
    }
}