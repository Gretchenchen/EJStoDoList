


// require two packages
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// const { request, response } = require("express");
// create app constant by using express
const app = express();
// create an array items to store items, start from containing three items
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
app.set("view engine", "ejs");

// set up body-parser, tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// send the browser file when a user tries to access the home route
app.get("/", function(request, response) {

    let day = date.getDate();
    // pass in a single variable that has the name of kindOfDay, the value is the value of the variable day
    response.render("list", { listTitle: day, newListItems: items });
});


// check the new item comes from worklist
app.post("/", function(request, response) {
    // grab the value of user input
    let item = request.body.newItem;

    if (request.body.list === "work") {
    // add the item to items array
        workItems.push(item);
        response.redirect("/work");
    } else{
        items.push(item);
        response.redirect("/");
    }
});


app.get("/work", function(request, response){
    response.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.post("/work", function(request, response){
    let item = request.body.newItem;
    workItems.push(item);
    response.redirect("/work");
});


// listen to port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});
