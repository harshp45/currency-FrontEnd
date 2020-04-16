import React, { Component } from 'react';
import axios from 'axios';
import alert from 'alert-node';
class Currency extends Component {
    constructor(props) {
        super(props)

        this.onChangeSellingCurrency = this.onChangeSellingCurrency.bind(this);
        this.onChangeBuyingCurrency = this.onChangeBuyingCurrency.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onProcess = this.onProcess.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

        this.state = {
            sellables: [],
            selling_currency: '',
            buying_currency: '',
            rate: 0,
            amount: 0,
            storedAmt: 0,
            username: '',
            buy_amount: 0,
            data: []
        }
    }


    async componentDidMount() {
        await axios.get('https://currency-trade.herokuapp.com/currencies/').then((res) => {
            this.setState({
                sellables: res.data.currencies,
                username: res.data.username
            })
            //console.log(res.data);
            console.log(this.state.sellables)
            console.log(this.state.username);
        })
            .catch((err) => {
                console.error(err);
            })

        await axios.get('https://currency-trade.herokuapp.com/currencies/getall').then((res) => {
            ////console.log(res.data[11].username+" "+res.data[11].currency)
            console.log(res.data.length)
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                //console.log(element)
                arr.push(element)
            }
            this.setState({
                data: arr
            })
            console.log(this.state.data[1])
        })
            .catch((e) => {

            })
    }

    renderTableData() {
        return this.state.data.map((data, index) => {
            const { username, currency, amount, status } = data //destructuring
            if (status==='Bought') {
                return (
                    <tr style={{backgroundColor:"#ffcccb"}} key={username}>
                        <td>{username}</td>
                        <td>{currency}</td>
                        <td>{amount}</td>
                        <td>{status}</td>
                    </tr>
                )
            } else {
                return (
                    <tr style={{backgroundColor:"lightgreen"}} key={username}>
                        <td>{username}</td>
                        <td>{currency}</td>
                        <td>{amount}</td>
                        <td>{status}</td>
                    </tr>
                )
            }
            
        })
    }
    onChangeAmount(e) {
        e.preventDefault();
        this.setState({
            amount: e.target.value
        })
    }


    async onProcess(e) {
        // console.log(this.state.storedAmt)
        if (this.state.amount > this.state.storedAmt) {
            alert('You are trying to sell currency more than you have\nPlease enter less value!!!')
        }
        else {
            const obj = {
                username: this.state.username,
                sell_currency: this.state.selling_currency,
                sell_amount: this.state.amount,
                buy_currency: this.state.buying_currency,
                //buy_amount: this.state.buy_amount
            }
            //console.log(buy_amount);
            await axios.post('https://currency-trade.herokuapp.com/currencies/buy-sell', obj).then((res) => {
                if (res.data === "Trans done") {
                    alert('Transaction Completed!!\nYou exchanged ' + this.state.amount + ' ' + this.state.selling_currency + ' for ' + this.state.buying_currency);
                }
            })
                .catch((e) => {
                    console.error(e);
                })
        }

    }

    onChangeBuyingCurrency(e) {
        this.setState({
            buying_currency: e.target.value
        })

    }

    onChangeSellingCurrency(e) {
        this.setState({
            selling_currency: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const currObj = {
            selling_currency: this.state.selling_currency,
            buying_currency: this.state.buying_currency
        }

        console.log(currObj)

        axios.post('https://currency-trade.herokuapp.com/currencies/calculate', currObj)
            .then((res) => {
                this.setState({
                    rate: res.data.rate,
                    storedAmt: res.data.amount
                    //buy_amount: this.state.rate*this.state.selling_currency
                })

                //console.log(this.state.buy_amount);
                console.log(this.state.rate)
                console.log(this.state.storedAmt)
            })
            .catch(err => {
                console.error(err);
            })

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-1"></div>
                    <div className="col-md-6 col-sm-6 col-xs-10 borderDiv">
                        <div className="headingContent">Currency Buy / Sell</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="CurrencyName">Selling Currency</label>
                                <select className="form-control" id="CurrencyName" required
                                    onChange={this.onChangeSellingCurrency}>
                                    {
                                        this.state.sellables.map(function (curr) {
                                            return <option key={curr}
                                                value={curr}>{curr}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="CurrencyName1">Buying Currency</label>
                                <select className="form-control" id="CurrencyName1" required
                                    onChange={this.onChangeBuyingCurrency}>
                                    <option disabled defaultValue>---Please select one---</option>
                                    <option defaultValue="AAPL">USD</option>
                                    <option>INR</option>
                                    <option>CAD</option>
                                </select>
                            </div>

                            <div className="btn-group">
                                <button type="submit" className="btn btn-success btn-md">Calculate Rates</button>
                            </div>

                            <div className="form-group">
                                <label htmlFor="CurrencyRate">Currency Rate</label>
                                <input type="text" className="form-control" id="CurrencyRate" value={this.state.rate} placeholder="Currency Rate" readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="AmountSellBuy">Amount Sell</label>
                                <input type="text" className="form-control" id="AmountSellBuy" value={this.state.amount} onChange={this.onChangeAmount} placeholder="Please enter sell / buy amount" />
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-success btn-md" onClick={this.onProcess}>Process Transaction</button>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default Currency;