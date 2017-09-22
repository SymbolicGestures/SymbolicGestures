import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FeedCard from './FeedCard.jsx';
import Analytics from './../Analytics/Analytics.jsx';
import { parse, getTime, format } from 'date-fns';
import styles from './../../../styles/feedStyles.css';
import stream from 'getstream';

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      orgId: undefined
    };
    this.updateCardData();
  }

  updateCardData() {
    axios.get('/api/feed')
      .then(feed => {
        this.setState({
          cardData: feed.data[0].results,
          orgId: feed.data[1]
        })
        var client = stream.connect('5rmr68hvwwfx', null, '28988');
        var newFeed = client.feed('organization_feed', this.state.orgId, feed.data[2]);
        newFeed
          .subscribe(data => {
            console.log(this.state.cardData);
            this.setState({cardData: [data.new[0]].concat(this.state.cardData)})
          })
          .then(() => {
            //console.log('Full (Notifications): Connected to faye channel, waiting for realtime updates');
          }, (err) => {
               console.error('Full (Notifications): Could not estabilsh faye connection', err);
          });
      });
  }


  render() {
    // let user = client.feed('profile', user.id).getReadOnlyToken();

    let feedCards = this.state.cardData.map((card, i) => {
      return (
        <FeedCard
          key={i}
          style={{ "display": "inline", "width": "50%" }}
          profileImg={card.image_link || "./assets/default_avatar.png"}
          displayName={card.actor}
          message={card.message}
          likes={2}
          date={format(parse(card.time), 'ddd, MMM DD')}
        />
      )
    })
    return (
      <div className={styles.connect}>
        <div className={styles.graph}>
          <Analytics />
        </div>
        <div className={styles.stream} style={{ "maxHeight": window.innerHeight - 90 + 'px' }}>
          {feedCards}
        </div>
      </div>
    )
  }
}

export default Connect;

Connect.propTypes = {
}
