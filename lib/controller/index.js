"use strict";
const path = require('path');
const Url = require('../orm').Url;

exports.createLink = function (req, res) {
	// TODO: Do validations

  // Save the data
  new Url({'url': req.body.url, 'link': req.body.link}).save();

  // TODO: Return status
  res.send("ok");
};

exports.getLink = function (req, res) {
  let url = req.params.url;
  // Get the link from url
  new Url({'url': url}).fetch().then((url) => {
    // Redirect the user
    let link = url.get("link");
    res.redirect(link);
  });
};
