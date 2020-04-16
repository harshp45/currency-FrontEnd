
import React, { Component } from 'react';
import '../css/App.css';

const Data = props => (
    <div className="mx-auto w-100 row col-sm-12 h-25 mt-5">
        <div className="border mx-5 col-sm card-color h overflow-auto">
            <p><b>Name: </b> {props.new.name}</p>
            <p><b>Title:</b> {props.new.title}</p>
            <p><b>Description:</b> {props.new.description}</p>
            <p><b>Content:</b> {props.new.content}</p>
            <p><b>News Link: </b><a href={props.new.url}><b className="text-primary">{props.new.url}</b></a></p>
            <p><b className="text-danger">To Read Full Article Click on the News Link</b></p>
        </div>
    </div>
)

class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            news: [],
            flag: false
        }
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

        //Updating News in MongoDB
        const uNurl = "https://currency-trade.herokuapp.com/news/update";
        const uNewsResponse = await fetch(uNurl, {
            method: 'PUT',
            headers: {
                'Content-type': "application/json",
                'x-access-token': token
            }
        });

        //Fetching Live News
        const Nurl = "https://currency-trade.herokuapp.com/news/list";
        const NewsResponse = await fetch(Nurl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            }
        });
        const newsdata = await NewsResponse.json();
        const test = newsdata.articles;
        this.setState({ news: test, loading: false })
        console.log(this.state.news);
    }




    newslist() {
        return this.state.news.map(newsdata => {
            return <Data new={newsdata} />
        })
    }


    render() {
        return (
            <div>
                <center><h1>News</h1></center>
                {this.state.loading || !this.state.news ? (
                    <div>Loading...</div>
                ) : (
                        <div>
                            {this.newslist()}
                        </div>
                    )}
            </div>

        )
    }
}

export default News;