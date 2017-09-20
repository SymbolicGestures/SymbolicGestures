import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import FeedCard from './FeedCard.jsx'
import Analytics from './../Analytics/Analytics.jsx';
import { parse, getTime, format } from 'date-fns';
import styles from './../../../styles/feedStyles.css'

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      cardData:[]
    };
    this.updateCardData();
  }

  updateCardData() {
    axios.get('/api/feed')
      .then(feed => {
        this.setState({
          cardData: feed.data.results
        })
      })
  }


  render() {
    let feedCards = this.state.cardData.map((card, i) => {
      return (
        <FeedCard
          key = {i}
          style={{"display": "inline", "width": "50%"}}
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
        <div className={styles.stream} style={{"maxHeight": window.innerHeight - 90 +'px'}}>
          {feedCards}
        </div>
      </div>
    )
  }
}

export default Connect;

Connect.propTypes = {
}
