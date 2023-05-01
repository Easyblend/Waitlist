
require("dotenv").config()
const sendGridMail = require("@sendgrid/mail")

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

const message ={
    to:"kenzieemma072@gmail.com",
    from:"support@flexicoins.com",
    subject:"Hello Kumah ",
    text:"Building something crazy",
    html:"<h2>FromKeznie<h2/>"
}


sendGridMail.send(message).then(()=>console.log("success")).catch((e)=>console.log(e))

