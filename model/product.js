var OrderComponent = require('./orderComponent');

const db = require('../db/mysql');



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
        let productList = await Product.list()
        console.log(product.nazwa.toLowerCase())
        if (!productList.some(u => u.nazwa.toLowerCase() === product.nazwa.toLowerCase())) {
            await db.execute(
                'insert into product (nazwa, cena, typ, waga) values (?, ?, ?, ?)',
                [product.nazwa, product.cena, product.typ, product.waga]
            );
        }
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static async list() {
        // return productExtent;
        let DBdata = []
        await db.execute('select * from product')
            .then(([data, metadata]) => {
                DBdata.push(data)
            }).catch(err => {
                console.log('err', err)
            })
        return DBdata[0];
    }
    //edycja obiektu
    static async edit(nazwa, typ, waga, cena, id) {
        // let productToEdit = productExtent.find(u => u.id == id)
        // productToEdit.nazwa = nazwa
        // productToEdit.typ = typ
        // productToEdit.waga = waga
        // // productToEdit.data_produkcji = data_produkcji
        // // productToEdit.data_waznosci = data_waznosci
        // productToEdit.cena = cena
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', id)
        await db.execute(
            'update product set nazwa = (?), cena = (?), typ = (?), waga = (?) where id = (?)',
            [nazwa, cena, typ, waga, id]
        );
        return true;
    }

    //usuwanie obiektu po id
    static async delete(id) {
        // OrderComponent.deleteProduct(id)
        // return productExtent.splice(productExtent.findIndex(u => u.id == id), 1)

        // // await db.execute(
        // //     'DELETE FROM user_interest WHERE user_id=(?);',
        // //     [id]
        // // );
        console.log('ccccccccccccccccccccccccccccccccccccccccccccccc', id)
        await db.execute(
            'DELETE FROM product WHERE id=(?);',
            [id]
        );
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    // static async initData() {
    //     //usuwamy zawartość tablicy
    //     productExtent.splice(0, productExtent.length);
    //     //resetujemy licznik id
    //     nextId = 1;

    //     // Product.add(new Product('pizza', 'food', 2, 20));
    //     // Product.add(new Product('schabowy', 'food', 1, 10));
    //     // Product.add(new Product('patelnia', 'tool', 3, 40));
    //     // Product.add(new Product('pierogi', 'food', 4, 5));
    // }
}

// Product.initData();

module.exports = Product;
