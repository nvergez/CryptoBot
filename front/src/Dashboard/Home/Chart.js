import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import { get24hBtc } from '../../api/binance';

class Chart extends Component {
  _isMounted = false

  constructor() {
    super()

    this.state = {
      data: []
    }

    this.handleReload = this.handleReload.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
    this.handleReload()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleReload() {
    if (this._isMounted) {
      get24hBtc()
      .then((response) => {
        response = response.map((item) => {
          item.amount *= 0.11
          return item
        })
        this.setState({data: response})
      })
      .catch((error) => {
        this.setState({data: []})
      })
    }
  }

  render() {
    return (
      <React.Fragment>
      <Title>Last 12 hours</Title>
      <ResponsiveContainer>
        <LineChart  
          data={this.state.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" >
          </XAxis>
          <YAxis >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle' }}
            >
              Balance ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
    )
  }
}

export default Chart