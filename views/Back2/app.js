const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
// const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended: true}));

// udostepnianie innych folderow - tutaj o nazwie "public" (zeby css dzialal i js na przyklad) //
app.use(express.static("public"));

// var items = ["buy food", "cook food", "eat food"];
// var workItems = ["english"];

// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

mongoose.connect("mongodb+srv://admin-kraki:tadam2345@cluster0-kaiei.mongodb.net/todolistDB", {useNewUrlParser: true});

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

////////////////////////////////////////////////////

app.get("/", function(req, res){
  // uproszczone, dlatego odkomentowane
  //
  // var date = new Date();
  //
  // var options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long"
  // };
  //
  // var day = date.toLocaleDateString("en-US", options);

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
    res.redirect("/");
  }else{
    res.render("list", {
      listTitle: "Today",
      newListItem: foundItems
    });
  }
});



  // second version //

  // dayOfWeek = date.getDay();
  // var day = "";

  // switch (dayOfWeek) {
  //   case 0:
  //     day = "Sunday"
  //     break;
  //   case 1:
  //     day = "Monday"
  //     break;
  //   case 2:
  //     day = "Tuesday"
  //     break;
  //   case 3:
  //     day = "Wednesday"
  //     break;
  //   case 4:
  //     day = "Thursday"
  //     break;
  //   case 5:
  //     day = "Friday"
  //     break;
  //   case 6:
  //     day = "Saturday"
  //     break;
  //   default:
  // }

  // first version //

  // if(dayOfWeek === 0 || dayOfWeek === 6)
  // {
  //   res.sendFile(__dirname + "/index.html");
  // }
  // else{
  //   res.sendFile(__dirname + "/index.html");
  // }

});

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName},function(err, foundList){
    if (!err){
      if(!foundList){
        const list = new List({
          name: customListName,
          item: defaultItems
        });

        list.save();
        res.redirect("/" + customListName);
        // console.log("List doesn't exist and saved");
      } else {
        // console.log("List already exists!");
        res.render("list", {
          listTitle: foundList.name,
          newListItem: foundList.item
        });
      }
    }
  });

});

app.post("/",function(req,res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today")
  {
    item.save();
    res.redirect("/");
  }
  else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.item.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

  // if(req.body.list === "Work")
  // {
  //   workItems.push(item);
  //   res.redirect("/work");
  // }
  // else{
  //   items.push(item);
  //   res.redirect("/");
  // }

});

app.get("/work", function(req, res){
  res.render(
    "list", {listTitle:"Work List", newListItem: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/delete",function(req,res){
  // var item = req.body.newItem;
  //
  // if(req.body.list2 === "Work")
  // {
  //   workItems.pop(item);
  //   res.redirect("/work");
  // }
  // else{
  //   items.pop(item);
  //   res.redirect("/");
  // }

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
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {item: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/" + listName);
      }
    });
  }

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("server started... if locally, on port 3000");
});
