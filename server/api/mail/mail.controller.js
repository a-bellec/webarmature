'use strict';

var nodemailer = require('nodemailer');
var contactEmail = 'bellec.arnaud@webarmature.fr';
var transporter = nodemailer.createTransport();

export function contactMail(req, res) {
  var text = `${'Nouveau message via le site: www.webarmature.fr.\n'
    + 'Voici les détails:\n'
    + 'Nom: '}${req.body.name}\n`
    + `Email: ${req.body.email}\n`
    + `Message soumis: ${req.body.text}`;

  var mailOptions = {
    from: req.body.email,
    to: contactEmail,
    subject: `Webarmature: ${req.body.name}`,
    text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      res.json({yo: 'error'});
    } else {
      res.json({yo: info.response});
    }
  });
}

export function signUpNotifyMail(req, res) {
  var text = `${'Nouvelle demande d\'accès via: www.webarmature.fr.\n'
    + 'Voici les détails:\n'
    + 'Nom: '}${req.body.name}\n`
    + `Occupation: ${req.body.occupation}\n`
    + `Lieu de l'occupation: ${req.body.occupationPlace}\n`
    + `Email: ${req.body.email}\n`
    + 'Allez dans la section administrative de www.webarmature.fr pour accepter ou refuser la demande.';

  var mailOptions = {
    from: 'noreply@webarmature.fr',
    to: contactEmail,
    subject: `Demande d'accès: ${req.body.name}`,
    text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      res.json({yo: 'error'});
    } else {
      res.json({yo: info.response});
    }
  });
}
