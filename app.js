var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
// var corsOptions = { origin: "http://localhost:8081"};
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var expressValidator = require("express-validator");
var flash = require("express-flash");

var session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const options = {
    connectionLimit: 100,
    host: 'remotemysql.com',
    user: 'dXjq4VkJVU',
    password:'QxXq74efsM',
    database:'dXjq4VkJVU',
    port: PORT,
    createDatabaseTable: false,
    schema: {
        tableName: 'custom_sessions_table_name',
		columnNames: {
			session_id: 'custom_session_id',
			expires: 'custom_expires_column_name',
			data: 'custom_data_column_name',
            email: '',
            name: '',
            photo: '',
            position: '',
            department: '',
            password: '',
        }
    }
};
const sessionStore = new mysqlStore(options);

var PORT = process.env.PORT || 3000;
const THIRTY_MINUTES = 1000 * 60 * 30;

var mysql = require("mysql");
const db = require("./services/db");

var pageRouter = require("./routes/users");
var formRouter = require("./routes/forms");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "")));

app.use(session({
    name: "HMS",
    secret: "whodeybreet",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { 
        maxAge: THIRTY_MINUTES,
        httpOnly: true
    }
}));

app.use(flash());
app.use(expressValidator());

app.use("/", pageRouter);
app.use("/forms", formRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

app.listen(PORT, () => console.log(`HMS Test is running on port ${PORT}`));

module.exports = app;