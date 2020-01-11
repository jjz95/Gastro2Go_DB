function validreg() {
    var x = document.getElementById("fimie").value;
    if (x == "") {
        alert("Pole -Imie- jest wymagane!");
        fimie.style.borderColor = 'red';
        fimie.focus();
        return false;
    } else {
        fimie.style.borderColor = '';
        fimie.focus();
    }
    var x = document.getElementById("fnazwisko").value;
    if (x == "") {
        alert("Pole -Nazwisko- jest wymagane!");
        fnazwisko.style.borderColor = 'red';
        fnazwisko.focus();
        return false;
    } else {
        fnazwisko.style.borderColor = '';
        fnazwisko.focus();
    }
    var x = document.getElementById("femail").value;
    if (x == "") {
        alert("Pole -E-mail- jest wymagane!");
        femail.style.borderColor = 'red';
        femail.focus();
        return false;
    }
    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(document.getElementById("femail").value)) {
        alert("Podaj prawidłowy adres E-mail!");
        femail.style.borderColor = 'red';
        femail.focus();
        return false;
    } else {
        femail.style.borderColor = '';
        femail.focus();
    }

    var x = document.getElementById("fpass").value;
    if (x == "") {
        alert("Podaj haslo!");
        fpass.style.borderColor = 'red';
        fpass.focus();
        return false;
    } else {
        fpass.style.borderColor = '';
        fpass.focus();
    }
    var y = document.getElementById("fpass2").value;
    if (y == "") {
        alert("Wpisz ponownie haslo!");
        fpass2.style.borderColor = 'red';
        fpass2.focus();
        return false;
    } else {
        fpass2.style.borderColor = '';
        fpass2.focus();
    }
    if (y != x) {
        alert("Haslo musi być takie same!");
        fpass.style.borderColor = 'red';
        fpass.focus();
        fpass2.style.borderColor = 'red';
        fpass2.focus();
        return false;
    } else {
        fpass.style.borderColor = '';
        fpass.focus();
        fpass2.style.borderColor = '';
        fpass2.focus();
    }
    var x = document.getElementById("fdate").value;
    if (x == "") {
        alert("Pole -Data- jest wymagane!");
        fdate.style.borderColor = 'red';
        fdate.focus();
        return false;
    } else {
        fdate.style.borderColor = '';
        fdate.focus();
    }
    var x = document.getElementById("fnumer").value;
    if (x == "") {
        alert("Pole -Numer kontaktowy- jest wymagane!");
        fnumer.style.borderColor = 'red';
        fnumer.focus();
        return false;
    }
    var numerReg = /^-?\d*\.?\d*$/;
    if (!numerReg.test(document.getElementById("fnumer").value)) {
        alert("Podaj prawidłowy Numer kontaktowy!");
        fnumer.style.borderColor = 'red';
        fnumer.focus();
        return false;
    } else {
        fnumer.style.borderColor = '';
        fnumer.focus();
    }
    var x = document.getElementById("fdzialalnosc").value;
    if (x == "") {
        alert("Pole -Działalność gospodarcza- jest wymagane!");
        fdzialalnosc.style.borderColor = 'red';
        fdzialalnosc.focus();
        return false;
    } else {
        fdzialalnosc.style.borderColor = '';
        fdzialalnosc.focus();
    }
    var x = document.getElementById("fadres").value;
    if (x == "") {
        alert("Pole -Adres- jest wymagane");
        fadres.style.borderColor = 'red';
        fadres.focus();
        return false;
    } else {
        fadres.style.borderColor = '';
        fadres.focus();
    }
    var x = document.getElementById("fkod").value;
    if (x == "") {
        alert("Pole -Kod pocztowy- jest wymagane!");
        fkod.style.borderColor = 'red';
        fkod.focus();
        return false;
    }
    var numerReg = /^-?\d{2}-\d{3}/;
    if (!numerReg.test(document.getElementById("fkod").value)) {
        alert("Podaj prawidłowy Kod pocztowy w formacie xx-xxx!");
        fkod.style.borderColor = 'red';
        fkod.focus();
        return false;
    } else {
        fkod.style.borderColor = '';
        fkod.focus();
    }
    var x = document.getElementById("fkraj").value;
    if (x == "---") {
        alert("Pole -Kraj- jest wymagane");
        fkraj.style.borderColor = 'red';
        fkraj.focus();
        return false;
    } else {
        fkraj.style.borderColor = '';
        fkraj.focus();
    }
}
