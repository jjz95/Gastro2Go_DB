const bcrypt = require('bcryptjs');
//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const adminExtent = [];

class Admin {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(passwordHash, email, id) {
        this.id = id;
        this.passwordHash = passwordHash;
        this.email = email;
    }

    //dodawanie obiektu do bazy
    static add(admin) {
        // if (!Admin.list().some(u => u.name.toLowerCase() === admin.name.toLowerCase())) {
        admin.id = nextId++;
        adminExtent.push(admin);
        // return true;
        // }
        // return false;

    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return adminExtent;
    }
    //edycja obiektu
    static edit(admin) {
        return adminExtent[adminExtent.findIndex(u => u.id == admin.id)] = admin
    }
    //usuwanie obiektu po id
    static delete(id) {
        return adminExtent.splice(adminExtent.findIndex(u => u.id == admin.id), 1)
    }
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        return adminExtent[adminExtent.findIndex(u => u.id == admin.id)]
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static async initData() {
        //usuwamy zawartość tablicy
        adminExtent.splice(0, adminExtent.length);
        //resetujemy licznik id
        nextId = 1;
        let hashedPass = await bcrypt.hash('admin', 10)
        Admin.add(new Admin(hashedPass, 'admin@gmail.com'));
    }

    comparePassword(plainPassword) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return bcrypt.compare(plainPassword, this.passwordHash);
    }
}



Admin.initData();

module.exports = Admin;