const express = require("express");
const port = 1001

const app = express();

app.set("view engine" , "ejs");
app.use(express.urlencoded());

let student = [
    {id:1 , name:"rahul" , sub:"react"},
    {id:2 , name:"arjun" , sub:"express"},
    {id:3 , name:"vivek" , sub:"node"}
];

app.get("/" , (req,res)=>{
    res.render("index" , {student} )
});

app.post("/addData" , (req,res)=>{
    req.body.id = student.length + 1;
    student.push(req.body);
    res.redirect("/");
})

app.get("/deleteData", (req,res)=>{
    let deleteRecord = student.filter((item) => item.id != req.query.id);
    student = deleteRecord;
    res.redirect("/");
});

app.get("/editData/:id" , (req , res)=>{
    let singleData = student.find((item) => item.id == req.params.id);
    res.render("edit" , {singleData});
});

app.post("/updateData" , (req,res) => {
    student.forEach((students) => {
        if (students.id == req.body.id){
            (students.id = req.body.id),
            (students.name = req.body.name),
            (students.sub = req.body.sub);
        } else {
            students;
        }
    });
    res.redirect("/");
});

app.listen(port , (err)=>{
    err ? console.log(err) : console.log("server sterted on port" + port);
});

