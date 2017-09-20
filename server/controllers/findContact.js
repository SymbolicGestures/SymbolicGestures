const config = require('config');
var fullcontact = require('fullcontact').createClient(config.fullContact.ApiKey);

module.exports.findLinkedIn = (req, res) => {
  fullcontact.person.email(req.body.email, (err, data) => {
    if(err) {
      res.status(503).send('did not pass fullcontact')
    } else {
      var found = false;
      if(data.socialProfiles) {
        data.socialProfiles.forEach(profiles => {
          if (profiles.type === "linkedin") {
            res.status(200).send(profiles.url)
            found = true;
          }
        });
      }
      if(!found) {
        res.status(200).send('linkedin not available for this user');
      }
    }
  });
}
