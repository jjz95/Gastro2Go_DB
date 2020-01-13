class ConfirmedOrderView {
    constructor(/*nazwa, typ, waga, cena, id,*/order, cenaOgolna, wagaOgolna) {
        this.order = order
        this.cenaOgolna = cenaOgolna;
        this.wagaOgolna = wagaOgolna;
    }
}

module.exports = ConfirmedOrderView;
