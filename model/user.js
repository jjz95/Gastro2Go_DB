var OrderComponent = require('./orderComponent');

const bcrypt = require('bcryptjs');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const userExtent = [];

class User {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, email, passwordHash, dateOfBirth, contactNumber, business, address, zipCode, country, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.dateOfBirth = dateOfBirth;
        this.contactNumber = contactNumber;
        this.business = business;
        this.address = address;
        this.zipCode = zipCode;
        this.country = country;
    }

    //dodawanie obiektu do bazy
    static async add(user) {
        // user.id = nextId++;
        // userExtent.push(user);
        // return user;
        if (!User.list().some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
            user.id = nextId++;
            let hashedPass = await bcrypt.hash(user.passwordHash, 10)
            user.passwordHash = hashedPass
            userExtent.push(user);
            return true;
        }
        return false;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return userExtent;
    }
    //edycja obiektu
    static async edit(firstName, lastName, email, passwordHash, dateOfBirth, contactNumber, business, address, zipCode, country, id) {
        let userToEdit = userExtent.find(u => u.id == id)
        let hashedPass = await bcrypt.hash(passwordHash, 10)
        userToEdit.firstName = firstName
        userToEdit.lastName = lastName
        userToEdit.email = email
        userToEdit.passwordHash = hashedPass
        userToEdit.dateOfBirth = dateOfBirth
        userToEdit.contactNumber = contactNumber
        userToEdit.business = business
        userToEdit.address = address
        userToEdit.zipCode = zipCode
        userToEdit.country = country
        return userToEdit;
    }

    //usuwanie obiektu po id
    static delete(id) {
        OrderComponent.deleteUsers(id)
        return userExtent.splice(userExtent.findIndex(u => u.id == id), 1)
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static async initData() {
        //usuwamy zawartość tablicy
        userExtent.splice(0, userExtent.length);
        //resetujemy licznik id
        nextId = 1;

        //dla uproszczenia wszyscy użytkowinicy mają takie samo hasło :)
        User.add(new User('Jan', 'Kowalski', 'jk@wp.pl', '1234', new Date("1990-03-25"), 123456789, 'fishing', 'koszykowa', '00-001', 'France'));
        User.add(new User('Anna', 'Wiśniewska', 'aw@onet.pl', '1234', new Date("1991-03-25"), 111111111, 'skiing', 'hitler strasse', '00-003', 'Germany'));
        User.add(new User('Andrzej', 'Nowak', 'an@gmail.com', '1234', new Date("1992-03-25"), 222222222, 'snowboard', 'smith street', '00-002', 'England'));
    }

    static findByEmail(email) {
        return userExtent.find(u => u.email == email);
    }

    static hashPassword(plainPassword) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return bcrypt.hash(plainPassword, 12);
    }

    comparePassword(plainPassword) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return bcrypt.compare(plainPassword, this.passwordHash);
    }
}

User.initData();

module.exports = User;
