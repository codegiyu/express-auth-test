var express = require("express");
var pageRouter = express.Router();
var pool = require("../services/db");
const { body, validationResult }= require('express-validator');
const { ValidatorsImpl } = require("express-validator/src/chain");

pageRouter.get("/", (req, res, next) => {
    let sess = req.session;
    if (req.session.loggedin) {
        res.render("index", {
            userName: sess.name,
            userPosition: sess.position,
            userPhoto: sess.photo
        })
    console.log(userName, userPosition, userPhoto);
    } else {
        req.flash("success", "Please login first!");
        res.redirect("/login");
    }
})

pageRouter.get("/login", (req, res, next) => {
    res.render("login", {email: "", password: ""});
})

pageRouter.post("/login", (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, rows, fields) => {
        if (err) throw err
        
        
        if (rows.length <= 0) {
            req.flash('error', "Please enter correct email and password");
            res.redirect('/login');
        } else {
            req.session.loggedin = true;
            req.session.userid = rows[0].userid;
            req.session.name = rows[0].name;
            req.session.email = rows[0].email;
            req.session.password = rows[0].password;
            req.session.position = rows[0].position;
            req.session.department = rows[0].department;
            req.session.photo = rows[0].photo;
            req.session.status = rows[0].status;
            res.redirect("/");
            // console.log(JSON.parse(rows));
        }
    })
});

pageRouter.get("/signup", (req, res, next) => {
    res.render("sign-up", {
        name: "",
        email: "",
        phone: "",
        position: "",
        kimcode: "",
        password: "",
        confirmpassword: "",
    });
})

pageRouter.post(
    "/signup",
    [
        body('name')
            .isLength({ min: 3 })
            .withMessage("Name must have a minimum length of 3"),

        body('email')
            .isEmail()
            .withMessage("Invalid email address")
            .normalizeEmail(),

        body('phone')
            .matches(/^(\+?234|0)?[789]\d{9}$/)
            .withMessage("Not a valid phone number"),

        body('position')
            .not()
            .isEmpty()
            .withMessage("Position is required"),

        body('kimcode', 'Please enter correct Kimcode')
            .isLength({ min: 10, max: 10})
            .custom((val, {req, loc, path}) => {
                if (val != '1098765432') {
                    throw new Error("Incorrect Kimcode");
                } else {
                    return true;
                }
            }),

        body('password')
            .isLength({ min: 8 })
            .withMessage("Your password should have at least 8 characters")
            .matches(/\d/)
            .withMessage("Your password should have at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("Your password should have at least one special character")
            .matches(/[A-Z]/)
            .withMessage("Your password should contain at least one capital letter"),
        
        body('confirmpassword')
            .custom((val, { req }) => {
                if (val !== req.body.password) {
                    console.log(req.body.password, req.body.confirmpassword);
                    throw new Error("Passwords do not match!");
                } else {
                    return true;
                }
            })
    ],
    (req, res, next) => {
        var errors = validationResult(req).formatWith(({ msg }) => msg);
        const hasError = !errors.isEmpty();

        if (hasError) {
            var error_msg = '';
            console.log(errors);
            console.log(validationResult(req));
            // errors.forEach(error => {
            //     error_msg += error.msg + '<br>'
            // })
        } else {
            let Department = '';
            if (req.body.position == "Guard") {
                Department = "Security";
              } else if (req.body.position == "Receptionist") {
                Department = "Hospitality";
              } else if (req.body.position == "Driver") {
                Department = "Logistics";
              } else if (req.body.position == "Chef") {
                Department = "Services";
              } else if (req.body.position == "Room Attendant") {
                Department = "Hospitality";
              } else if (req.body.position == "Maintenance Technician") {
                Department = "Services";
              } else if (req.body.position == "Janitor") {
                Department = "Services";
              } else if (req.body.position == "Valet") {
                Department = "Hospitality";
              } else if (req.body.position == "Concierge") {
                Department = "Hospitality";
              } else if (req.body.position == "Manager") {
                Department = "Admin";
              }

            var user = {
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                phone: req.body.phone.trim(),
                position: req.body.position.trim(),
                department: Department,
                password: req.body.password.trim()
            }
            console.log(user);
            pool.query('INSERT INTO users SET ?', user, (err, result) => {
                if (err) {
                    req.flash('error', err);
                    res.render("sign-up", {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        position: '',
                        kimcode: user.kimcode,
                        password: user.password,
                        confirmpassword: user.confirmpassword,
                    });
                } else {
                    req.flash('success', "You have signed up successfully! Please login");
                    res.redirect('/login');
                }
            })
        }
    
})

pageRouter.get("/reset-password", (req, res, next) => {
    res.render("reset-password", {email: ""});
})

pageRouter.get("/reset-password-link", (req, res, next) => {
    res.render("reset-password-link");
})

pageRouter.get("/settings", (req, res, next) => {
    let sess = req.session;
    if (req.session.loggedin) {
        res.render("settings", {
            userName: sess.name,
            userPosition: sess.position,
            userPhoto: sess.photo,
            name: sess.name,
            position: sess.position,
            photo: sess.photo,
            phone: sess.phone,
            department: sess.department,
            password: sess.password
        })
    } else {
        req.flash("success", "Please login first!");
        res.redirect("/login");
    }
})

pageRouter.get("/employees", (req, res, next) => {
    let sess = req.session;
    if (req.session.loggedin) {
        pool.query('SELECT * FROM users', (err, rows, fields) => {
            if(err) {
                req.flash('error', err);
                res.render("login");
            } else {
                res.render("employees", {
                    userName: sess.name,
                    userPosition: sess.position,
                    userPhoto: sess.photo,
                    employees: rows
                })
            }
        })
    } else {
        req.flash("success", "Please login first!");
        res.redirect("/login");
    }
})

pageRouter.get("/logout", (req, res) => {
    req.session.destroy();
    // req.flash("success", "Login Again Here");
    res.redirect("/login");
})

module.exports = pageRouter;