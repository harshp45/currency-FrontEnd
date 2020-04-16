import React from 'react';
import axios from 'axios';

class Stock extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeBuyingStock = this.onChangeBuyingStock.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);

        this.state = {
            buyables: [],
            buying_stock: '',
            buying_amount: 0,
            username: '',
            amount: 0,
            storedAmt: 0,
            data: []
        }
    }

    async componentDidMount() {
        await axios.get('https://currency-trade.herokuapp.com/stocks/').then((res) => {
            this.setState({
                buyables: res.data.stocks.map(stoc => stoc.stock),
                username: res.data.username
            })
        })
            .catch((err) => {
                console.error(err);
            })

        await axios.get('https://currency-trade.herokuapp.com/stocks/getall').then((res) => {
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
    async onAmountChange(e) {
        this.setState({
            buying_amount: e.target.value
        })
    }

    async onChangeBuyingStock(e) {
        const code = {
            code: e.target.value
        }
        this.setState({
            buying_stock: e.target.value
        })
        await axios.post('https://currency-trade.herokuapp.com/stocks/getRates', code).then((res) => {
            this.setState({
                amount: res.data.rate,
                storedAmt: res.data.amount
            })
        })

    }
    async onSubmit(e) {
        e.preventDefault();
        const code = {
            buying_stock: this.state.buying_stock,
            buying_amount: this.state.buying_amount,
            username: this.state.username
        }
        await axios.post('https://currency-trade.herokuapp.com/stocks/buyStock', code).then((res) => {
            if (res.data === "Trans complete") {
                alert('Transaction Completed!!\nYou bought ' + this.state.buying_amount + ' ' + this.state.buying_stock);
            }
        })

    }
    renderTableData() {
        return this.state.data.map((data, index) => {
            const { username, stock, amount, status } = data //destructuring
            if (status === 'buy') {
                return (
                    <tr style={{ backgroundColor: "#ffcccb" }} key={username}>
                        <td>{username}</td>
                        <td>{amount}</td>
                        <td>{stock}</td>
                        <td>{status}</td>
                    </tr>
                )
            } else {
                return (
                    <tr style={{ backgroundColor: "lightgreen" }} key={username}>
                        <td>{username}</td>
                        <td>{amount}</td>
                        <td>{stock}</td>
                        <td>{status}</td>
                    </tr>
                )
            }

        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-1"></div>
                    <div className="col-md-6 col-sm-6 col-xs-10 borderDiv">
                        <div className="headingContent">Stock Buy</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="StockName">Stock Name</label>
                                <select className="form-control" id="StockName"
                                    required
                                    onChange={this.onChangeBuyingStock}>
                                    <option disabled defaultValue value="p">---Please select one---</option>
                                    <option value="AAPL">Apple</option>
                                    <option value="GOOGL">Google</option>
                                    <option value="MSFT">Microsoft</option>
                                    <option value="AMZN">Amazon</option>
                                    <option value="FB">Facebook</option>
                                    <option value="WMT">Walmart</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="StockRate">Stock Rate</label>
                                <input type="text" className="form-control" id="StockRate" value={this.state.amount} placeholder="Stock Rate" readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="AmountBuy">Amount Buy</label>
                                <input type="text" className="form-control" id="AmountBuy" onChange={this.onAmountChange} placeholder="Please enter buy amount" />
                            </div>
                            <button type="button" className="btn btn-warning btn-md" onClick={this.onSubmit}>Buy</button>
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
                                <th>Stocks</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <br /><br /><br />
            </div>
        );
    }
}

export default Stock;
