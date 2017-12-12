import React, { Component } from 'react';
import request from 'superagent';
import BidAsk from './BidAsk';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mid_price: 0,
      bids: [],
      asks: [],
      res: ''
    };
  }

  componentDidMount() {
    request.get('/api/bf/board')
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else if (res.ok) {
        // console.log('res: ', res);
        const body = res.body;
        this.setState({ mid_price: body.mid_price });
        this.setState({ bids: body.bids });
        this.setState({ asks: body.asks });
      }
    });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr><th>bids</th><th>mid-price</th><th>asks</th></tr>
          </thead>
          <tbody>
            <tr><td>&nbsp;</td><td>{ this.state.mid_price}</td><td>&nbsp;</td></tr>
            <tr>
              <td>
                { this.state.bids.map((bid) => {
                  return <BidAsk key={bid.price} price={bid.price} size={bid.size} />;
                }) }
              </td>
              <td>&nbsp;</td>
                <td>
                  { this.state.asks.map((ask) => {
                    return <BidAsk key={ask.price} price={ask.price} size={ask.size} />;
                  }) }
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
