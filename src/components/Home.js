
import React, { Component } from 'react';

class Home extends Component {
    state = {
        loading: true,
        currency: null,
        weatherLocation: null,
        weatherTemp: null,
        stocks: null
    }

    


    async componentDidMount() {

        //GetToken
        const uToken = "https://currency-trade.herokuapp.com/logins/token";
        const uTokenResponse = await fetch(uToken, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
        const Tokendata = await uTokenResponse.json();
        const token = Tokendata.token;



        //Updating Currency in MongoDB
        const uCurl = "https://currency-trade.herokuapp.com/currency/update";
        const uCurrResponse = await fetch(uCurl, {
            method: 'PUT',
            headers: {
                'Content-type':"application/json",
                'x-access-token': token
            } 
        });

        //Updating Weather in MongoDB
        const uWurl = "https://currency-trade.herokuapp.com/weather/update";
        const uWeaResponse = await fetch(uWurl, {
            method: 'PUT',
            headers: {
                'Content-type':"application/json",
                'x-access-token': token
            } 
        });

        //Fetching Live Currency
        const Curl = "https://currency-trade.herokuapp.com/currency/list";
        const CurrResponse = await fetch(Curl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            }
        });

        //Fetching Live Weather
        const Wurl = "https://currency-trade.herokuapp.com/weather/list";
        const WeaResponse = await fetch(Wurl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            }
        });

        //Fetching Live Weather
        const Surl = "https://currency-trade.herokuapp.com/stocks/stockrates";
        const StoResponse = await fetch(Surl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });

        const currencydata = await CurrResponse.json();
        const weatherdata = await WeaResponse.json();
        const stockdata = await StoResponse.json();

        this.setState({ currency: currencydata.rates[0], loading: false }); //Setting State for Currency
        this.setState({ weatherLocation: weatherdata.location[0], loading: false }) //Setting State for Weather Location
        this.setState({ weatherTemp: weatherdata.current[0], loading: false })//Setting State for WeatherData
        this.setState({ stocks: stockdata.stocks[0], loading: false})//Setting State for Stocks

    }


    render() {
        return (
            <div className="image">
                {this.state.loading || !this.state.currency || !this.state.weatherLocation || !this.state.weatherTemp || !this.state.stocks ? (
                    <div>Loading...</div>
                ) : (
                        <div className="mx-auto w-100 row col-sm-12 h-25 mt-5">
                            <div className="border mx-5 col-sm card-color currency-card">
                                <center>
                                    <h4>Currency</h4>
                                    
                                </center>
                                <div className="h overflow-auto">
                                    <p>Canadian (CAD): <b>{this.state.currency.CAD}</b></p>
                                    <hr />
                                    <p>United States (USD): <b>{this.state.currency.USD}</b></p>
                                    <hr />
                                    <p>Indian (INR): <b>{this.state.currency.INR}</b></p>
                                    <hr />
                                    <p>United Kingdom (GBP): <b>{this.state.currency.GBP}</b></p>
                                    <hr />
                                    <p>European (EUR): <b>{this.state.currency.EUR}</b></p>
                                    <hr />
                                    <p>Australian (AUD): <b>{this.state.currency.AUD}</b></p>
                                    <hr />
                                    <p>Hong Kong Dollar(HKD): <b>{this.state.currency.HKD}</b></p>
                                    <hr />
                                    <p>Indonesian Rupiah(IDR): <b>{this.state.currency.IDR}</b></p>
                                </div>
                            </div>

                            <div className="border mx-5 col-sm card-color stocks-card ">
                                <center>
                                  <h3>Stocks</h3>
                                </center>
                                <div className="h overflow-auto">
                                    <p>Apple: <b>{this.state.stocks.AAPL}</b></p>
                                    <hr />
                                    <p>TCS: <b>{this.state.stocks.TCS}</b></p>
                                    <hr />
                                    <p>Amazon: <b>{this.state.stocks.AMZN}</b></p>
                                    <hr />
                                    <p>Google: <b>{this.state.stocks.GOOGL}</b></p>
                                    <hr />
                                    <p>Tesla: <b>{this.state.stocks.TSLA}</b></p>
                                    <hr />
                                    <p>Facebook : <b>{this.state.stocks.FB}</b></p>
                                    <hr />
                                    <p>MicroSoft: <b>{this.state.stocks.MSFT}</b></p>
                                </div>
                            </div>

                            <div className="border mx-5 col-sm card-color weather-card">
                                <center>
                                    <h3>Weather</h3>
                                    
                                </center>
                                <div className="h overflow-auto">
                                    <p><b>City: {this.state.weatherLocation.name}</b></p>
                                    <hr />
                                    <p>Temperature (Celsius): {this.state.weatherTemp.temperature}</p>
                                    <hr />
                                    <p>Wind Speed (MPH): {this.state.weatherTemp.wind_speed}</p>
                                    <hr />
                                    <p>Wind Direction: {this.state.weatherTemp.wind_dir}</p>
                                    <hr />
                                    <p>Pressure: {this.state.weatherTemp.pressure}</p>
                                    <hr />
                                    <p>Humidity: {this.state.weatherTemp.humidity}</p>
                                    <hr />
                                    <p>Feels Like: {this.state.weatherTemp.feelslike}</p>
                                    <hr />
                                    <p>isDay: {this.state.weatherTemp.is_day}</p>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default Home;