//ekstensja klasy (wszystkie obiekty)
const orderComponentExtent = [];

const db = require('../db/mysql');


class OrderComponent {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(idUser, idProduct, ilosc) {
        this.idUser = idUser
        this.idProduct = idProduct
        this.ilosc = ilosc
    }

    //dodawanie obiektu do bazy
    static async add(orderComponent) {
        if (!OrderComponent.list().some(u => u.idUser == orderComponent.idUser && u.idProduct == orderComponent.idProduct)) {
            orderComponentExtent.push(orderComponent);
            return true;
        }
        return false;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return orderComponentExtent;
    }
    //edycja obiektu
    static async edit(idUser, idProduct, ilosc) {
        let orderComponentToEdit = orderComponentExtent.find(u => u.idUser == idUser && u.idProduct == idProduct)
        orderComponentToEdit.ilosc = ilosc
        return orderComponentToEdit;
    }

    //usuwanie obiektu po id
    static delete(idUser, idProduct) {
        return orderComponentExtent.splice(orderComponentExtent.findIndex(u => u.idUser == idUser && u.idProduct == idProduct), 1)
    }

    static deleteProduct(idProduct) {
        orderComponentExtent.removeIf(ui => ui.idProduct == idProduct)
    }

    static deleteUsers(idUser) {
        orderComponentExtent.removeIf(ui => ui.idUser == idUser)
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static async initData() {
        //usuwamy zawartość tablicy
        orderComponentExtent.splice(0, orderComponentExtent.length);

        OrderComponent.add(new OrderComponent(1, 1, 1));
        OrderComponent.add(new OrderComponent(1, 2, 2));
        OrderComponent.add(new OrderComponent(2, 1, 3));
    }
}

OrderComponent.initData();

module.exports = OrderComponent;
