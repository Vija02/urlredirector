"use strict";
const path = require('path');
const Url = require('../orm').Url;

exports.createLink = function (req, res) {
	// TODO: Do validations

  let url = req.body.url;
  let link = req.body.link.replace(/.*?:\/\//g, ""); // Remove protocol

  // Save the data
  new Url({'url': url, 'link': link}).save();

  // TODO: Return status
  res.send("ok");
};

exports.getLink = function (req, res) {
  let url = req.params.url;
  // Get the link from url
  new Url({'url': url}).fetch().then((model) => {
    // Redirect the user
    if(model != null){
      let link = model.get("link");
      res.redirect(`http://${link}`);
    }else{
      res.status(404).send('File Not Found')
    }
  });
};
