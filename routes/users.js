var express = require("express");
var pageRouter = express.Router();
var db = require("../services/db");

pageRouter.get("/", (req, res, next) => {
    let sess = req.session;
    if (req.session.loggedin) {
        res.render("index", {
            userName: sess.name,
            position: sess.position,
            photo: sess.photo
        })
    } else {
        req.flash("success", "Please login first!");
        res.redirect("/login");
    }
})

pageRouter.get("/login", (req, res, next) => {
    res.render("login", {email: "", password: ""});
})

pageRouter.get("/signup", (req, res, next) => {
    res.render("sign-up", {
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        kimcode: "",
        password: "",
        confirmpassword: "",
    });
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
        db.query('SELECT * FROM users', (err, rows, fields) => {
            if(err) {
                req.flash('error', err);
                res.render("login");
            } else {
                res.render("employees", {
                    userName: sess.name,
                    position: sess.position,
                    photo: sess.photo,
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
    req.flash("success", "Login Again Here");
    res.redirect("/login");
})

module.exports = pageRouter;