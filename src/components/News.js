import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNew = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(60);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewMonkey`;
        updateNew();
    }, [])

    // async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03aa2648a83441888a41f464a04849d8&page=1&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    // })
    // this.updateNew();
    // }
    const handlePreviousClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03aa2648a83441888a41f464a04849d8&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState(
        //     {
        //         articles: parsedData.articles,
        //         page: this.state.page - 1,
        //         loading: false
        //     }
        // )
        setPage(page - 1);
        updateNew();
    }
    const handleNextClick = async () => {
        if (page + 1 > Math.ceil(totalResults / 9)) {

        }
        else {

            //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03aa2648a83441888a41f464a04849d8&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
            //     this.setState({ loading: true });
            //     let data = await fetch(url);
            //     let parsedData = await data.json();
            //     console.log(parsedData);
            //     this.setState(
            //         {
            //             articles: parsedData.articles,
            //             page: this.state.page + 1,
            //             loading: false
            //         }
            //     )
            setPage(page + 1);
            updateNew();
        }
    }
    const fetchMoreData = async () => {
        console.log('output33333:');
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log('output:', parsedData);
        setTimeout(() => {
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setLoading(true);
        }, 500);

    };

    return (
        <div>
            <h2 className='text-center' style={{ margin: '56px 0px 56px' }}>NewMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {/* {this.state.loading && <Spinner></Spinner>} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner></Spinner>}
            >
                <div className='container'>
                    <div className="row">
                        {articles.map((element) => {
                            return (<div className="col-md-4" key={element.url}>
                                <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}></Newsitems>
                            </div>)
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

        </div>
    )

}
News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News