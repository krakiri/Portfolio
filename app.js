require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const request = require("request");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

///////////////////////// BLOG ///////////////////////////
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//////////////////////// SECRETS /////////////////////////
app.use(session({
  secret: "Our little secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////

// mongoose.connect("mongodb://localhost:27017/portfolioDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://admin-kraki:tadam2345@cluster0-kaiei.mongodb.net/portfolioDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

///////////////////////// BLOG ///////////////////////////
const postSchema = {
 title: String,
 content: String
};
const Post = mongoose.model("Post", postSchema);
//////////////////////////////////////////////////////////



/////////////////////// SECRETS //////////////////////////
const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  secret: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
//////////////////////////////////////////////////////////



app.get("/", function(req, res){
       res.render("index");
});

app.get("/front-end1", function(req, res){
       res.render("PROJEKTzaliczenieTEST/index");
});
app.get("/front-end2", function(req, res){
       res.render("Strona2/index");
});
app.get("/front-end3", function(req, res){
       res.render("Strona3/index");
});
app.get("/front-end4", function(req, res){
       res.render("Strona4/dicee");
});
app.get("/front-end5", function(req, res){
       res.render("Strona5/index");
});
app.get("/front-end6", function(req, res){
       res.render("Strona6/index");
});
app.get("/front-end7", function(req, res){
       res.render("Strona7/index");
});
app.get("/front-end8", function(req, res){
       res.render("Strona8/index");
});
app.get("/front-end9", function(req, res){
       res.render("Strona9/index");
});
app.get("/front-end10", function(req, res){
       res.render("Strona10/index");
});
app.get("/front-end11", function(req, res){
       res.render("Strona11/index");
});

///////////////////////// BLOG ///////////////////////////
app.get("/back-end1", function(req, res){
  Post.find({}, function(err, posts){
     res.render("Back1/views/home", {
       startingContent: homeStartingContent,
       posts: posts
       });
   })
});

app.get("/about", function(req, res){
  res.render("Back1/views/about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("Back1/views/contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("Back1/views/compose");
});

app.post("/compose", function(req, res){
    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
      res.redirect("/back-end1");
    }
  });
});

app.get("/posts/:postId", function(req, res){
const requestedPostId = req.params.postId;
Post.findOne({_id: requestedPostId}, function(err, post){
   res.render("Back1/views/post", {
     title: post.title,
     content: post.content
   });
 });
});
//////////////////////////////////////////////////////////



/////////////////////// TODOLIST /////////////////////////
// tworzenie schematu //
const itemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, "Error. No name specified!"]
  },
});

// tworzenie modelu //
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
  name: "Welcome to your todolist"
});
const item2 = new Item({
  name: "Hello there"
});
const item3 = new Item({
  name: "Yo, what's your next item?"
});
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  item: [itemSchema]
};
const List = mongoose.model("List", listSchema);

// ----- //
app.get("/back-end2", function(req, res){
    Item.find({}, function(err, foundItems)
  {
    if (foundItems.length === 0)
    {
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else {
          console.log ("Succcesfully saved all the items to 'items'.");
        }
      });
      res.redirect("/back-end2");
    }else{
      res.render("Back2/views/list", {
        listTitle: "Today",
        newListItem: foundItems
      });
    }
  });
});

app.get("/back-end2/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName},function(err, foundList){
    if (!err){
      if(!foundList){
        const list = new List({
          name: customListName,
          item: defaultItems
        });

        list.save();
        res.redirect("/back-end2" + customListName);
      } else {
        res.render("Back2/views/list", {
          listTitle: foundList.name,
          newListItem: foundList.item
        });
      }
    }
  });
});
// ----- //

app.post("/back-end2",function(req,res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today")
  {
    item.save();
    res.redirect("/back-end2");
  }
  else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.item.push(item);
      foundList.save();
      res.redirect("/back-end2/" + listName);
    });
  }
});

app.post("/back-end2/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findOneAndDelete({_id: checkedItemId},function(err){
      if (err)
      {
        console.log(err);
      }else{
        console.log("clean and clear");
      }
    });
    res.redirect("/back-end2");
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {item: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/back-end2/" + listName);
      }
    });
  }
});

app.post("/back-end2/back-end2/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findOneAndDelete({_id: checkedItemId},function(err){
      if (err)
      {
        console.log(err);
      }else{
        console.log("clean and clear");
      }
    });
    res.redirect("/back-end2");
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {item: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/back-end2/" + listName);
      }
    });
  }
});
//////////////////////////////////////////////////////////



////////////////////// NEWSLETTER ////////////////////////

app.get("/back-end3", function(req, res){
  res.render("Back3/signup");
});

// zwroty formularzy z htmla (i juz pozniej nie tylko) //
app.post("/back-end3", function(req, res){

  var firstName = req.body.fName;
  var secondName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/3690a60b32",
    method: "POST",
    headers: {
      "Authorization": "piter1 0ae1ffe6eaa5ab5d762e674ce0a7482f-us20"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if(error)
    {
      res.render("Back3/failure");
    } else{
      if(response.statusCode === 200)
      {
        res.render("Back3/success");
      }else{
        res.render("Back3/failure");
      }
    }

  });

});

app.post("/failure", function(req, res){
  res.redirect("/back-end3");
});
//////////////////////////////////////////////////////////




/////////////////////// SECRETS //////////////////////////
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 	"http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// ---------------------- //

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:3000/auth/facebook/secrets",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// ----------------- //

app.get("/back-end4", function(req, res){
  res.render("Back4/views/home");
});

// ----------------- //

app.get("/auth/google",
  passport.authenticate('google', {scope: ["profile"]})
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/back-end4/login" }),
  function(req, res) {
    res.redirect("/back-end4/secrets");
  });

// ----------------- //

app.get("/auth/facebook",
  passport.authenticate('facebook', {scope: ['user_friends', 'manage_pages']})
);

app.get("/auth/facebook/secrets",
  passport.authenticate('facebook', { failureRedirect: "/back-end4/login" }),
  function(req, res) {
    res.redirect("/back-end4/secrets");
  });

  // --------------- //

app.get("/back-end4/login", function(req, res){
  res.render("Back4/views/login");
});

app.get("/back-end4/register", function(req, res){
  res.render("Back4/views/register");
});

app.get("/back-end4/secrets", function(req, res){
  User.find({"secret": {$ne: null}}, function(err, foundUsers){
    if (err){
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("Back4/views/secrets", {usersWithSecrets: foundUsers});
      }
    }
  });
});

app.get("/back-end4/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("Back4/views/submit");
  } else {
    res.redirect("/back-end4/login");
  }
});

// ----------------------- //

app.post("/back-end4/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err){
        console.log(err);
        res.redirect("/back-end4/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/back-end4/secrets");
        });
      }
    });
  });



app.post("/back-end4/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if(err){
      console.log(err);
    } else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/back-end4/secrets");
      });
    }
  });

});

app.post("/back-end4/submit", function(req, res){
  const submittedSecret = req.body.secret;

  User.findById(req.user.id, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function(){
          res.redirect("/back-end4/secrets");
        });
      }
    }
  });
});

// ------------------ //

app.get("/back-end4/logout", function(req, res){
  req.logout();
  res.redirect("/back-end4");
});

//////////////////////////////////////////////////////////

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("server started, if locally, on port 3000");
});
