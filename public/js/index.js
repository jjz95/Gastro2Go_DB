function validatelogin() {
    var x = document.getElementById("flogin").value;
    var y = document.getElementById("fpass").value;
    if (x == "" && y == "") {
        alert("Podaj login i haslo");
        return false;
    } else if (x == "") {
        alert("Podaj login");
        return false;
    } else if (y == "") {
        alert("Podaj haslo");
        return false;
    }
}
