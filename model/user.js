var OrderComponent = require('./orderComponent');

const bcrypt = require('bcryptjs');
const db = require('../db/mysql');


//licznik id
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

        let users = await User.list()
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!users.some(u => u.email.toLowerCase() == user.email.toLowerCase())) {
            let hashedPass = await bcrypt.hash(user.passwordHash, 10)
            user.passwordHash = hashedPass

            await db.execute(
                'insert into client (firstName, lastName, email, passwordHash, dateOfBirth, contactNumber, business, address, zipCode, country) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user.firstName, user.lastName, user.email, user.passwordHash, user.dateOfBirth, user.contactNumber, user.business, user.address, user.zipCode, user.country]
            ).catch(err => console.log(err))
            return true;
        }
        return false;

    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static async list() {
        let DBdata = []
        await db.execute('select * from client')
            .then(([data, metadata]) => {
                DBdata.push(data)
            }).catch(err => {
                console.log('err', err)
            })
        return DBdata[0];
    }
    //edycja obiektu
    static async edit(firstName, lastName, email, passwordHash, dateOfBirth, contactNumber, business, address, zipCode, country, id) {
        // let userToEdit = userExtent.find(u => u.id == id)
        let hashedPass = await bcrypt.hash(passwordHash, 10)
        // userToEdit.firstName = firstName
        // userToEdit.lastName = lastName
        // userToEdit.email = email
        // userToEdit.passwordHash = hashedPass
        // userToEdit.dateOfBirth = dateOfBirth
        // userToEdit.contactNumber = contactNumber
        // userToEdit.business = business
        // userToEdit.address = address
        // userToEdit.zipCode = zipCode
        // userToEdit.country = country
        await db.execute(
            'update client set firstName = (?), lastName = (?), email = (?), passwordHash = (?), dateOfBirth = (?), contactNumber = (?), business = (?), address = (?), zipCode = (?), country = (?) where id = (?)',
            [firstName, lastName, email, hashedPass, dateOfBirth, contactNumber, business, address, zipCode, country, id]
        );
        return true;
    }

    //usuwanie obiektu po id
    static async delete(id) {
        // OrderComponent.deleteUsers(id)
        // return userExtent.splice(userExtent.findIndex(u => u.id == id), 1)
        // // await db.execute(
        // //     'DELETE FROM user_interest WHERE user_id=(?);',
        // //     [id]
        // // );
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', id)
        await db.execute(
            'DELETE FROM client WHERE id=(?);',
            [id]
        );
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów

    static async findByEmail(email) {
        let users = await User.list()
        return users.find(u => u.email == email);
    }

    static hashPassword(plainPassword) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return bcrypt.hash(plainPassword, 12);
    }

    async comparePassword(plainPassword) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return await bcrypt.compare(plainPassword, this.passwordHash);
    }
}


module.exports = User;
