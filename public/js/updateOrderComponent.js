"use strict";
exports.__esModule = true;
//\d+$
var iloscInputs = document.getElementsByClassName('ilosc');
for (var i = 0; i < iloscInputs.length; i++) {
    // let inputId = this.id.replace('ilosc', '')
    iloscInputs[i].addEventListener('input', function (evt) {
        var ilosc = this.value;
        var numId = this.id.toString().replace('ilosc', '');
        var cena = document.getElementById("cena" + numId).innerHTML;
        var numIlosc = parseFloat(ilosc.toString());
        var numCena = parseFloat(cena.toString());
        var waga = document.getElementById("waga" + numId).innerHTML;
        var numWaga = parseFloat(waga.toString());
        document.getElementById("cena-ilosc" + numId).innerHTML = (numCena * numIlosc).toString();
        document.getElementById("waga-ilosc" + numId).innerHTML = (numWaga * numIlosc).toString();
    });
}
function updateProducts() {
    var productsToModify = [];
    var iloscInputs = document.getElementsByClassName('ilosc');
    for (var i = 0; i < iloscInputs.length; i++) {
        var numId = iloscInputs[i].id.toString().replace('ilosc', '');
        productsToModify.push({
            productId: numId,
            ilosc: iloscInputs[i].value
        });
    }
    fetch(window.location.href.replace(/\/\d+(\?)?$/, '') + "/updateproduct", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            productsToModify: productsToModify
        })
    }).then(function (response) {
        // window.location.reload()
        console.log(response);
    })["catch"](function (e) {
        return console.log(e);
    });
}
// function test() {
//     alert("1");
//     console.log('1')
// }
// window.onload = test;
