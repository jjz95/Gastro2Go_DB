var OrderComponent = require('./orderComponent');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const productExtent = [];

class Product {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(nazwa, typ, waga, cena, id) {
        this.id = id;
        this.nazwa = nazwa;
        this.typ = typ;
        this.waga = waga;
        this.cena = cena;
    }

    //dodawanie obiektu do bazy
    static async add(product) {
        if (!Product.list().some(u => u.nazwa.toLowerCase() === product.nazwa.toLowerCase())) {
            product.id = nextId++;
            productExtent.push(product);
            return true;
        }
        return false;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return productExtent;
    }
    //edycja obiektu
    static async edit(nazwa, typ, waga, cena, id) {
        let productToEdit = productExtent.find(u => u.id == id)
        productToEdit.nazwa = nazwa
        productToEdit.typ = typ
        productToEdit.waga = waga
        // productToEdit.data_produkcji = data_produkcji
        // productToEdit.data_waznosci = data_waznosci
        productToEdit.cena = cena
        return productToEdit;
    }

    //usuwanie obiektu po id
    static delete(id) {
        OrderComponent.deleteProduct(id)
        return productExtent.splice(productExtent.findIndex(u => u.id == id), 1)
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static async initData() {
        //usuwamy zawartość tablicy
        productExtent.splice(0, productExtent.length);
        //resetujemy licznik id
        nextId = 1;

        Product.add(new Product('pizza', 'food', 2, 20));
        Product.add(new Product('schabowy', 'food', 1, 10));
        Product.add(new Product('patelnia', 'tool', 3, 40));
        Product.add(new Product('pierogi', 'food', 4, 5));
    }
}

Product.initData();

module.exports = Product;
