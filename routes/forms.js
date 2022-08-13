var express = require("express");
var formRouter = express.Router();
var db = require("../services/db");
const { body, validationResult }= require('express-validator');

formRouter.post("/form/login", (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, rows, fields) => {
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
        }
    })
});

formRouter.post(
    "/form/signup",
    [
        body('name')
            .isLength({ min: 3 })
            .withMessage("Name must have a minimum length of 3"),

        body('email')
            .isEmail()
            .withMessage("Invalid email address")
            .normalizeEmail(),

        body('phone')
            .isMobilePhone({ strictMode: false})
            .withMessage("Not a valid phone number"),

        body('position')
            .not()
            .isEmpty()
            .withMessage("Position is required"),

        body('department')
            .not()
            .isEmpty()
            .withMessage("Department is required"),

        body('kimcode', 'Please enter correct Kimcode')
            .isLength({ min: 10, max: 10})
            .custom((val, {req, loc, path}) => {
                if (val != '1098765432') {
                    throw new Error("Incorrect Kimcode");
                } else {
                    return value;
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

            errors.forEach((error) => {
                error_msg += error.msg + '<br>'
            })
        } else {
            var user = {
                name: req.body.name.escape().trim(),
                email: req.body.email.escape().trim(),
                phone: req.body.phone.escape().trim(),
                position: req.body.position.escape().trim(),
                department: req.body.department.escape().trim(),
                kimcode: req.body.kimcode.escape().trim(),
                password: req.body.password.escape().trim(),
                confirmpassword: req.body.confirmpassword.escape().trim()
            }

            db.query('INSERT INTO users SET ?', user, (err, result) => {
                if (err) {
                    req.flash('error', err);
                    res.render("sign-up", {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        position: user.position,
                        department: user.department,
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

module.exports = formRouter;