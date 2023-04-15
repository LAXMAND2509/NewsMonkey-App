import React, { Component } from 'react'

export class Newsitems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props;
        let img = `https://picsum.photos/200/300`;
        return (
            <div>
                <div className="card my-3" >
                    <img src={(imageUrl) ? imageUrl : img} className="card-img-top" height="200px" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-primary btn-dark" target="_blank">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
