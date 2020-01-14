
const db = require('../db/mysql');

class Order {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(userId, created_at, status, cost, wage, id) {
        this.id = id;
        this.userId = userId;
        this.created_at = created_at;
        this.status = status;
        this.cost = cost;
        this.wage = wage;
    }

    //dodawanie obiektu do bazy
    static async add(userId) {
        let insertId;

        // await db.execute(
        //     'insert into purchase (userId, created_at, status) values (?, null , ?)',
        //     [userId, 'pending'],
        //     function (err, result, fields) {
        //         if(err){
        //             console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', err)
        //         }
        //         console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', result);
        //         console.log('cccccccccccccccccccccccccccccccccccc', fields)
        //     }
        // );

        await db.execute(
            'insert into purchase (userId, created_at, status, cost, wage) values (?, null , ?, null, null)',
            [userId, 'pending'],
            function (err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available

                // If you execute same statement again, it will be picked from a LRU cache
                // which will save query preparation time and give better performance
            }
        ).then(([data, metadata]) => {
            insertId = data.insertId
        }).catch(err => {
            console.log('err', err)
        });
        return insertId
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static async list() {
        // return productExtent;
        let DBdata = []
        await db.execute('select * from purchase')
            .then(([data, metadata]) => {
                DBdata.push(data)
            }).catch(err => {
                console.log('err', err)
            })
        return DBdata[0];
    }

    static async findPendingOrderByUserId(userId){
        let orders = await Order.list()
        return orders.find(o => o.userId == userId && o.status == 'pending')
    }

    static async updateStatusToConfirmed(id, cost, wage){
        let status = 'confirmed'
        await db.execute(
            'update purchase set `status` = (?), created_at = CURRENT_DATE(), cost = (?), wage = (?) where id = (?)',
            [status, cost, wage, id]
        );
    }

    static async updateStatusToCanceled(id){
        let status = 'canceled'
        await db.execute(
            'update purchase set `status` = (?) where id = (?)',
            [status, id]
        );
    }

    static async getOrderedOrdersByUserId(userId){
        let orders = await Order.list()
        return orders.filter(o => o.userId == userId && o.status != 'pending')
    }

    //edycja obiektu
    // static async edit(nazwa, typ, waga, cena, id) {
    //     // let productToEdit = productExtent.find(u => u.id == id)
    //     // productToEdit.nazwa = nazwa
    //     // productToEdit.typ = typ
    //     // productToEdit.waga = waga
    //     // // productToEdit.data_produkcji = data_produkcji
    //     // // productToEdit.data_waznosci = data_waznosci
    //     // productToEdit.cena = cena
    //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', id)
    //     await db.execute(
    //         'update product set nazwa = (?), cena = (?), typ = (?), waga = (?) where id = (?)',
    //         [nazwa, cena, typ, waga, id]
    //     );
    //     return true;
    // }

    static async delete(id) {
        // OrderComponent.deleteProduct(id)
        // return productExtent.splice(productExtent.findIndex(u => u.id == id), 1)

        // // await db.execute(
        // //     'DELETE FROM user_interest WHERE user_id=(?);',
        // //     [id]
        // // );
        await db.execute(
            'DELETE FROM purchase_item WHERE idPurchase=(?);',
            [id]
        );
        await db.execute(
            'DELETE FROM purchase WHERE id=(?);',
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

module.exports = Order;
