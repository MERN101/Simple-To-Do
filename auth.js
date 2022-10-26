//Before run the endpoint, middleware will runs. 

// I create a method call auth. It has 3 parameters 
// Middleware has a special function call next().
// It is used to call the next middleware function 
        //if the response of the current middleware is not terminated.
const auth = (req, res, next) => {
    
// In here I'm going to validate the API request using some api key.

// Assign api key from custom field of the request header
    const strApiKey = req.header("api-key"); 

//check the api key.
    if(strApiKey !== "TEST API KEY")
        return res.status(401).send("Unauthorized !!!");

// If it's validate, then call next middleware function.
    next();
}

//export to everywhere
module.exports = auth;