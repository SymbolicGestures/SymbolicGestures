import React from 'react'
import styles from './../../../styles/jerryStyleBox.css'
import PropTypes from 'prop-types'
import D3Funnel from 'd3-funnel';
import axios from 'axios'

export default class ApplicationsFunnelChart extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      someState: '',
    };
  }

  componentDidMount(){
    const data = [
      { label: 'Applied', value: 300 },
      { label: 'Phone Screen', value: 50 },
      { label: 'Tech Screen', value: 10 },
      { label: 'On Site ', value: 10 },
      { label: 'Offer', value: 2 },
    ];

    axios.get('/api/applications')
      .then((applications) => {
        let stages = []
        applications.data.forEach((application) => stages.push(application.stage));
        return stages
      })
      .then((data) => {
        let storage = {};
        data.forEach((stage) => {
          storage[stage] = storage[stage] + 1 || 1;
        })
        return storage;
      })
      .then((data) => {
        let aggregatedData = {
          'Applied': 0,
          'Phone Screen': 0,
          'Tech Screen': 0,
          'On Site': 0,
          'Offer': 0,
        }
        aggregatedData['Applied'] =
          (data['Applied'] || 0) +
          (data['Phone Screen'] || 0) +
          (data['Tech Screen'] || 0) +
          (data['On Site'] || 0) +
          (data['Offer'] || 0);
        aggregatedData['Phone Screen'] =
          (data['Phone Screen'] || 0) +
          (data['Tech Screen'] || 0) +
          (data['On Site'] || 0) +
          (data['Offer'] || 0);
        aggregatedData['Tech Screen'] =
          (data['Tech Screen'] || 0) +
          (data['On Site'] || 0) +
          (data['Offer'] || 0);
        aggregatedData['On Site'] =
          (data['On Site'] || 0) +
          (data['Offer'] || 0);
        aggregatedData['Offer'] =
          (data['Offer'] || 0);

        let converted = [];
        for(let key in aggregatedData) {
          let temp = [];
          temp.push(key)
          temp.push(aggregatedData[key])
          converted.push(temp);
        }

        converted[0].push('#ffd042');
        converted[1].push('#eb9444');
        converted[2].push('#50abd8');
        converted[3].push('#9256a0');
        converted[4].push('#0da17d');

        return converted
      })
      .then((data) => {
        // console.log(data);

        // const fakeData = [
        //     {
        //         index: 0,
        //         value: 150,
        //         fill: '#c33',
        //         label: {
        //             raw: 'Visitors',
        //             formatted: 'Visitors: 150',
        //             color: '#fff',
        //         },
        //     },
        //     ['Visitors',150,'#c33'],
        //     { label: 'Applicants', value: 2500 },
        //     { label: 'Admits', value: 500 },
        //     { label: 'Deposits', value: 200 },
        // ];;
        const options = {
          block:{
            dynamicHeight: true,
            minHeight: 15,
            highlight: true
          },
          chart:{
            width: 600,
          }
        };
        const chart = new D3Funnel('#funnel');
        chart.draw(data, options);
      })

  }
  render() {
    return (
      <div>
        <div id="funnel">
        </div>
      </div>
    )
  }
}
