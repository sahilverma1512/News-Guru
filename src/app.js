const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser"); // Add this line to parse POST request bodies
const Register = require("./models/register")
const User = require('./models/login');
// Connecting to the database (assuming this is your db/connect file)
require("./db/connect");
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse POST request bodies
app.post("/login", async (req, res) => {
    try {
        const { username, password , captcha, captchaInput } = req.body;

        // Find the user in the database based on the provided username
        const user = await Register.findOne({ username });

        // If the user is not found or the password doesn't match, return an error
        if (!user || user.password !== password ) {
            return res.send('<script>alert("Invalid username or password!!"); window.location.href = "/";</script>');
        }

        if (captcha !== captchaInput) {
            return res.send('<script>alert("Invalid captcha!!"); window.location.href = "/";</script>');
        }

        // If the username and password are correct, redirect to main.html
        res.sendFile(path.join(__dirname, "../public/main.html"));
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});


  
app.post("/register", async (req, res) => {
    try { // Perform signup logic here
        console.log(req.body.username)
        console.log(req.body.password)
        console.log(req.body.email)
        const RegisterDate = new Register({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });

        await RegisterDate.save();
        
        res.sendFile(path.join(__dirname, "../public/main.html"));
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

// Handle requests for the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/Login.html"));
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
