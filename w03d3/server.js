const express = require("express");
const PORT = 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

let users = {'nally': "qwerty"};

//
// MIDDLEWARE
//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//
// ROUTES
//

// homepage
app.get("/", (req, res) => {
  res.render("homepage");
});

// register page
app.get("/register", (req, res) => {
  res.render("register");
});

// register submit handler
app.post("/register", (req, res) => {
  users[req.body.username] = req.body.password;
  console.log(JSON.stringify(users));
  res.cookie("user",req.body.username);
  res.redirect('/profile');
});

// login
app.get("/login", (req, res) => {
  res.render("login");
});

// login submit handler
app.post("/login", (req, res) => {
  let testName = req.body.username;
  let testPassword = req.body.password;
  if (users[testName] && users[testName] === testPassword){
    res.cookie("user",testName);
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

// profile page
app.get("/profile", (req, res) => {
  console.log("profile says:" + JSON.stringify(req.cookies));
  username = req.cookies.user;
  if(users[username]){
    const templateVars = {users: users};
    res.render("profile", templateVars);  
  } else {
    res.redirect('/');
  }
});

// logout page
app.get("/logout", (req, res) => {
  res.render("logout");
});

// logout submit handler
app.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

//
// SET THE APP TO LISTENIN' AND EXIT THE MAIN THREAD
//
app.listen(PORT, "localhost", () => {
  console.log(`Server is listening on ${PORT}`);
});
