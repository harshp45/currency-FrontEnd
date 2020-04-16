import React from 'react';

const Stock = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-1"></div>
                <div className="col-md-6 col-sm-6 col-xs-10 borderDiv">
                    <div className="headingContent">Stock Buy / Sell</div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="StockName">Stock Name</label>
                            <select className="form-control" id="StockName" >
                                <option disabled defaultValue>---Please select one---</option>
                                <option defaultValue="AAPL">Apple Inc.</option>
                                <option>Google</option>
                                <option>Alphabet Inc.</option>
                                <option>Microsoft Corporations</option>
                                <option>Amazon</option>
                                <option>Johnson &amp; Johnson</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="StockRate">Stock Rate</label>
                            <input type="text" className="form-control" id="StockRate" placeholder="Stock Rate" readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="AmountSellBuy">Amount Buy / Sell</label>
                            <input type="text" className="form-control" id="AmountSellBuy" placeholder="Please enter sell / buy amount" />
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-success btn-md">Buy</button>
                            <button type="button" className="btn btn-warning btn-md">Sell</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-1"></div>
            </div>
        </div>
    );
}

export default Stock;