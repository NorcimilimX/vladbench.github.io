import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = 'https://api.etherscan.io/api?apikey=1ZXJGJFBZ64U8CFFXFGZA7SUUP182FPU3W&address=0xa145ac099e3d2e9781c9c848249e2e6b256b030d&module=account&'
const BALANCE_QUERY ='action=balance&tag=latest'
const TOKENS_QUERY = 'action=tokentx&startblock=0&endblock=999999999&sort=asc'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tokens: [],
        balance: 0,
    };
  }

  componentDidMount() {
    fetch(API + TOKENS_QUERY)
        .then(response => response.json())
        .then(data => this.setState({ tokens: data.result }));

      fetch(API + BALANCE_QUERY)
          .then(response => response.json())
          .then(data => this.setState({ balance: data.result }));
  }

  render() {
       const { tokens, balance } = this.state;
       const data = {
           columns: [
               {
                   label: 'TokenName',
                   field: 'tokenName',
                   sort: 'asc'
               },
               {
                   label: 'tokenSymbol',
                   field: 'tokenSymbol',
                   sort: 'asc'
               },
               {
                   label: 'Value',
                   field: 'value',
                   sort: 'asc'
               }
           ],
           rows: tokens
       }


    return (
        <div className="container-fluid">
            <div>
                <h2 className="mb-4">Ether</h2>
                <p className="mb-4">{(balance / (10**18))}</p>
            </div>
            <MDBDataTable
                striped
                bordered
                small
                data={data}
            />
        </div>
        // <div>
        //   <p>
        //     BALANCE: {(balance / (10**18))}
        //   </p>
        //   <ul>
        //     {tokens.map((token, key) =>
        //         <li key={key}>
        //           {token.tokenName + " : " + (token.value / (10 ** token.tokenDecimal))}
        //         </li>
        //     )}
        //   </ul>
        // </div>
    );
  }

}

export default App;