var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "user.id@gmail.com",
        pass: "passwsord"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ? <bellec.arnaud.mail@gmail.com>", // sender address
    to: "bellec.arnaud.mail@gmail.com", // list of receivers
    subject: "Hello ?", // Subject line
    text: "Hello world ?", // plaintext body
    html: "<b>Hello world ?</b>" // html body
}
"bellec.arnaud.mail@gmail.com"
// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});


































