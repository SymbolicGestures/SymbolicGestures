import React from 'react';
import { Icon, Image, Statistic, Segment } from 'semantic-ui-react';


const FirstDateAppliedForJob = (props) => {
  let segmentStyle = { margin: '1%', marginBottom: '200px' };
  let dateStyle = { paddingTop: '4%' };
  return (
    <Segment style={segmentStyle}>
      <Statistic.Group widths="four">
        <Statistic>
          <Statistic.Value style={dateStyle} text>{props.dateOfFirstApplied}</Statistic.Value>
          <Statistic.Label>First Day You Applied for Job</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            {props.applicationCount}
          </Statistic.Value>
          <Statistic.Label>Total # of Jobs Applied</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            <Icon name="plane" />
            {props.applicationCount / props.diffBtwLastAndFirstDate}
          </Statistic.Value>
          <Statistic.Label>Average # of Job Applied/Day</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value style={dateStyle} text>{props.todaysDate}</Statistic.Value>
          <Statistic.Label>Todays's Date</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
};

export default FirstDateAppliedForJob;