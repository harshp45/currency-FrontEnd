import React from 'react';
import axios from 'axios';

class Stock extends React.Component{
    constructor(props){
        super(props)

        this.onChangeSellingStock = this.onChangeSellingStock.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);

        this.state={
            sellables: [],
            selling_stock:'',
            selling_amount:0,
            username:'',
            amount:0,
            data: [],
            storedAmt:0
        }
    }

    async componentDidMount(){
        await axios.get('https://currency-trade.herokuapp.com/stocks/').then((res) => {
            this.setState({
                sellables: ['AAPL','WMT','GOOGL','USD','MFST','FB'],
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
    async onAmountChange(e){
        this.setState({
            selling_amount:e.target.value
        })    
    }

    async onChangeSellingStock(e){
        const code = {
            code:e.target.value
        }
        this.setState({
            selling_stock: e.target.value
        })
        await axios.post('https://currency-trade.herokuapp.com/stocks/getRates',code).then((res)=>{
            this.setState({
                amount:res.data.rate,
                storedAmt: res.data.amount
            })
            console.log(this.state.storedAmt)
        })

    }
    async onSubmit(e){
        e.preventDefault();

        if(this.state.selling_amount>this.state.storedAmt){
            alert('You are trying to sell stocks more than you have\nPlease enter less value!!!')
        }
        else{
            const code = {
                selling_stock:this.state.selling_stock,
                selling_amount:this.state.selling_amount,
                username : this.state.username
            }
            await axios.post('https://currency-trade.herokuapp.com/stocks/sellStock',code).then((res)=>{
                if (res.data === "Trans complete") {
                    alert('Transaction Completed!!\nYou sold ' + this.state.selling_amount + ' ' + this.state.selling_stock);
                }
            })
        }      

    }
    renderTableData() {
        return this.state.data.map((data, index) => {
            const { username, stock, amount, status } = data //destructuring
            if (status==='buy') {
                return (
                    <tr style={{backgroundColor:"#ffcccb"}} key={username}>
                        <td>{username}</td>
                        <td>{amount}</td>
                        <td>{stock}</td>
                        <td>{status}</td>
                    </tr>
                )
            } else {
                return (
                    <tr style={{backgroundColor:"lightgreen"}} key={username}>
                        <td>{username}</td>
                        <td>{amount}</td>
                        <td>{stock}</td>
                        <td>{status}</td>
                    </tr>
                )
            }
            
        })
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-1"></div>
                    <div className="col-md-6 col-sm-6 col-xs-10 borderDiv">
                        <div className="headingContent">Stock Sell</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="StockName">Stock Name</label>
                                <select className="form-control" id="StockName"
                                required
                                onChange = {this.onChangeSellingStock}>
                                    <option disabled defaultValue value="p">---Please select one---</option>
                                    {
                                        this.state.sellables.map(function (stoc) {
                                            return <option key={stoc}
                                                value={stoc}>{stoc}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="StockRate">Stock Rate</label>
                                <input type="text" className="form-control" id="StockRate" value={this.state.amount} placeholder="Stock Rate" readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="AmountSellBuy">Amount Sell</label>
                                <input type="text" className="form-control" id="AmountSellBuy" onChange={this.onAmountChange} placeholder="Please enter sell amount" />
                            </div>
                                <button type="button" className="btn btn-warning btn-md" onClick={this.onSubmit}>Sell</button>
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
                <br/><br/><br/>
            </div>
        );
    }
}

export default Stock;