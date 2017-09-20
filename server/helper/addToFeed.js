const models = require('../../db/models');
const bookshelf = require('../../db');
let client = require('../middleware')['stream'];

module.exports.addToFeed = (feedInfo, user) => {
  let newFeed = client.feed('profile', user.id);
  models.Feed.forge().save({
    message_type: feedInfo.message_type,
    message: feedInfo.message,
    //message_id is for future implementation of comments on messages.
    message_id: feedInfo.message_id,
    organization_id: user.organization_id,
    profile_id: user.id
  })
  .then(feedMessage => {
    return newFeed.addActivity({
      actor: user.display,
      verb: feedMessage.attributes.message_type,
      object: `message:${feedMessage.attributes.id}`,
      foreign_id: `message:${feedMessage.attributes.id}`,
      time: feedMessage.attributes.created_at,
      image_link: user.image_link,
      message_type: feedMessage.attributes.message_type,
      message: feedMessage.attributes.message,
      to: [`organization_feed:${user.organization_id}`],
    })
  })
}
