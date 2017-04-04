'use strict';

var nodemailer = require('nodemailer');

export function contactMail(req, res) {

  var contactEmail = 'bellec.arnaud@webarmature.fr';

  var transporter = nodemailer.createTransport();

  var text = 'Nouveau message via le site: www.webarmature.fr. ' + "\n" +
    "Voici les détails: " + "\n" +
    "Nom: " + req.body.name + "\n" +
    "Email: " + req.body.email + "\n" +
    "Message soumis: " + req.body.text;

  var mailOptions = {
    from: req.body.email,
    to: contactEmail,
    subject: 'Webarmature: ' + req.body.name,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){

    if(error){
      console.log(error);
      res.json({yo: 'error'});
    }
    else{
      console.log('Message sent');
      res.json({yo: info.response});
    }

  });

}
