//express import
const express = require("express");
const path = require("path");
const helpers = require("./utils/helpers");
const routes = require("./controllers");

//sequelize connection import
const sequelize = require("./config/connection");

//express handlerbars imports
const exphbs = require("express-handlebars");

// Importing express-session and connect-session-sequelize
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//initializing app
const app = express();

//initializing port
const PORT = process.env.PORT || 8000;

// Session configuration
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use sessions
app.use(session(sess));

//creating the handle bar instance
const hbs = exphbs.create({
  //registering partials in our hbs instance
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: helpers,
});

// setting up the rendering and viewing engine as handlerbars templeting engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// making sure our server is capable of rexognizing the json files as well as url encoded data
//also serving all the static assets via public folder using express.static() method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//starting the server and also syncing the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening in port: ${PORT}`));
});
