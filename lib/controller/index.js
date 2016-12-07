"use strict";
const path = require('path');
const Url = require('../orm').Url;
const validator = require('validator');

exports.createLink = function (req, res) {
  let url = req.body.url;
  let link = req.body.link.replace(/.*?:\/\//g, ""); // Remove protocol
  // If URL is valid
  if(validator.isURL(`https://url.rollingmagnet.com/${url}`, {allow_underscores: true}) && validator.isURL(link, {allow_underscores: true})){
    new Url({'url': url}).fetch().then((model) => {
      // If haven't made before
      if(model == null){
        // Save the data
        new Url({'url': url, 'link': link}).save();
        res.send("ok");
      }else{ // If already made before
        res.send("duplicate");
      }
    });
  }else{
    res.send("not-valid");
  }
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
