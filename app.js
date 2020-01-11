const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
const port = 3000;

Array.prototype.removeIf = function (callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

app.use(express.json());

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//ustawienia sesji
app.use(session({
    //hasło do szyfrowania cookie będącym identyfikatorem sesji
    secret: 'A very very secret password',
    resave: false,
    saveUninitialized: true,
    cookie: {
        //długość sesji w ms
        maxAge: 20 * 60 * 1000 // (20 min)
    }
    //wskazane jest ustawienie magazynu sesji (store) na środowisku produkcyjnym
    //(np baza danych mognodb)
    //domyślny magazyn sesji w pamięci raczej nie będzie zbyt
    //dobrze działał przy większym obiążeniu...

}));

//Ustawienie mechanizmu komunikatów na stronie, wyświetlanych po przekierowaniu
//z kontrolera na inny widok. Komunikaty są krótkotrwale przetrzymywane w sesji
//użytkownika. Należy ustawić to PO konfiguracji sesji
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

//domyślnie nie ma dostępu do obiektu sesji w widokach szablonów stron
//poniższa funkcja ustawia zmienne z sesji tak, aby były dostępne w widoku
//ważne aby ustawić PRZED kontrolerami
const pageParamsHelper = (req, res, next) => {
    res.locals.isUserLoggedIn = req.session.isUserLoggedIn;
    res.locals.loggedUser = req.session.loggedUser;
    res.locals.isAdminLoggedIn = req.session.isAdminLoggedIn;
    res.locals.loggedAdmin = req.session.loggedAdmin;
    next();
};
app.use(pageParamsHelper);

//funkcja sprawdzająca, czy użytkownik jest zalogowany
//bez niej byłoby możliwe wykonanie niedozwolonej akcji przez niezalogowanego użytkownika
//np. wejście na listę użytkowników przez wpisanie odpowiedniego adresu url w przeglądarce
const authCheck = require('./middleware/authCheck');

//kontroler do zarządzania użytkownikami
//wszystkie akcje zabezpieczone są funkcją authCheck w celu sprawdzenia,
//czy użytkownik jest zalogowany
const userController = require('./controller/userController');
app.use('/users', authCheck, userController.route);

const authAdminCheck = require('./middleware/authAdminCheck');

const adminController = require('./controller/adminController');
app.use('/admin', authAdminCheck, adminController.route);



//kontroler do logowania i wylogowywania użytkowników
const authController = require('./controller/authController');
app.use('/auth', authController.route);

const infoController = require('./controller/infoController');
app.use('/info', infoController.route);

const registerController = require('./controller/registerController');
app.use('/register', registerController.route);

const authRedirect = require('./middleware/authRedirect');
const authAdminRedirect = require('./middleware/authAdminRedirect');

app.get('/', authRedirect, authAdminRedirect, (req, res, next) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
