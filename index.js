// Express package import
const express = require("express");
const auth = require("./auth");

// Initialize server app
const app = express();


// now I utilize some middleware to the API.
// Middlewares - When call this API, first it execute the middleware.
// Middleware can process request objects multiple times before the server works for that request.
app.use(express.json()); // used to parse the incoming requests with JSON payloads 

// HTTP METHODS - DOC

// 1st I create a end point to get the current date. 
// So, it will be better for test the API. 
app.get('/status', (req, res) => {
    // status code is 200. It means this is OK. No any error or unauthroize..
    res.status(200).send(new Date())
});

// start server
app.listen(8005, () => { console.log("server up and running on PORT 8005") })

// Now I run the API. 
// Show in browser & postman
// we can send only get req from the browser. We cannot send any other req.
//So I open the postman. It can be use for send the req to API. 
//POSTMAN - open source & user friendly

const arrTask=[];//to store the taks.Global array - bcz I want acces this from all endpoints
app.post('/addTask', auth, (req, res) => {
//create const obj and assign it to req body data
    const objNewTask = req.body;

//check whether req body has a task id
    if(objNewTask.strTaskId === undefined)
        return res.status(400).send("Task ID not found!")

//push the req body data to arrTask
//spread operator - to expand the object. Bcz I want to add 2 new feild to the object
    arrTask.push({ ...objNewTask, strCreateAt: new Date(), strStatus: "NOT STARTED" })

    res.status(200).send("New Task succesfully created!")
});

//get all the task in the array
app.get("/getTask", (req, res) => {
    res.status(200).send(arrTask)
});

//update a specifc task
app.put('/updateTask', (req, res) => {
    const objTask = req.body; 
// js common method -> filter.To filters all the elements in array 
        // and returns the array that matches this condition.
    if(arrTask.filter((task)=> task.strTaskId === objTask.strTaskId).length === 0){
//If return an array, it means there has a record for taskID that pass from req obj
        return res.status(400).send("Task ID not found!")
    }

    //loop array and update the status that pass from req body
    arrTask.map((task)=>{
        if(task.strTaskId === objTask.strTaskId){
            task.strStatus = objTask.strStatus;
        }
    })
    res.status(200).send("Task succesfully updated!");   
});

// delete a specific task
app.delete('/deleteTask', (req, res) => {
    const objTask = req.body;

    //get index that I want to delete
    const index = arrTask.findIndex(object => {
        return object.strTaskId === objTask.strTaskId;
    });
    
//if greater than -1, it means arrTask has a element that match with req body object
    if (index > -1) { 
//using splice method, we can remove a element from arrTask
        arrTask.splice(index, 1);
        res.status(200).send("Task succesfully deleted!");   
    } else{
        return res.status(400).send("Task ID not found!");
    }
});

//Then I want to create a custom middleware.

//Import custom middleware