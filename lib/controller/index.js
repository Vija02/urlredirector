"use strict";
const path = require('path');
const Url = require('../orm').Url;

exports.createLink = function (req, res) {
	// TODO: Do validations
  console.log(req.body);
  // Save the data
  new Url({'url': req.body.url, 'link': req.body.link}).save();

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
      res.redirect(link);
    }else{
      res.status(404).send('File Not Found')
    }
  });
};
