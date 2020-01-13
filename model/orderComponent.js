var Order = require('./order');

//ekstensja klasy (wszystkie obiekty)
const orderComponentExtent = [];

const db = require('../db/mysql');


class OrderComponent {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(idPurchase, idProduct, ilosc) {
        this.idPurchase = idPurchase
        this.idProduct = idProduct
        this.ilosc = ilosc
    }

    //dodawanie obiektu do bazy
    static async add(userId, productId) {
        let orderPending = await Order.findPendingOrderByUserId(userId)
        // let orderPending = orders.find(o => o.userId == userId)
        let orderId;
        if (orderPending) {
            orderId = orderPending.id
        } else {
            orderId = await Order.add(userId)
        }
        await db.execute(
            'insert into purchase_item (idPurchase, idProduct, ilosc) values (?, ?, ?)',
            [orderId, productId, 1]
        );

        // if (!OrderComponent.list().some(u => u.idPurchase == orderComponent.idPurchase && u.idProduct == orderComponent.idProduct)) {
        //     orderComponentExtent.push(orderComponent);
        //     return true;
        // }
        // return false;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static async list() {
        // return orderComponentExtent;
        let DBdata = []
        await db.execute('select * from purchase_item')
            .then(([data, metadata]) => {
                DBdata.push(data)
            }).catch(err => {
                console.log('err', err)
            })
        return DBdata[0];
    }
    //edycja obiektu
    static async edit(idPurchase, idProduct, ilosc) {
        // let orderComponentToEdit = orderComponentExtent.find(u => u.idPurchase == idPurchase && u.idProduct == idProduct)
        // orderComponentToEdit.ilosc = ilosc
        // // return orderComponentToEdit;

        await db.execute(
            'update purchase_item set ilosc = (?) where idPurchase = (?) AND idProduct = (?)',
            [ilosc, idPurchase, idProduct]
        );
            
    }

    //usuwanie obiektu po id
    static async delete(idPurchase, idProduct, userId) {
        await db.execute(
            'DELETE FROM purchase_item WHERE idPurchase=(?) AND idProduct=(?);',
            [idPurchase, idProduct]
        );

        let ordersComponents = await OrderComponent.list()
        if (!ordersComponents.some(oc => oc.idPurchase == idPurchase)) {
            let status = 'pending'
            await db.execute(
                'DELETE FROM purchase WHERE status = (?) AND userId = (?)',
                [status, userId]
            );
        }
        // return orderComponentExtent.splice(orderComponentExtent.findIndex(u => u.idPurchase == idPurchase && u.idProduct == idProduct), 1)
    }

    // static deleteProduct(idProduct) {
    //     orderComponentExtent.removeIf(ui => ui.idProduct == idProduct)
    // }

    // static deleteUsers(idPurchase) {
    //     orderComponentExtent.removeIf(ui => ui.idPurchase == idPurchase)
    // }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    // static async initData() {
    //     //usuwamy zawartość tablicy
    //     orderComponentExtent.splice(0, orderComponentExtent.length);

    //     OrderComponent.add(new OrderComponent(1, 1, 1));
    //     OrderComponent.add(new OrderComponent(1, 2, 2));
    //     OrderComponent.add(new OrderComponent(2, 1, 3));
    // }
}

// OrderComponent.initData();

module.exports = OrderComponent;
