import React, { Component } from 'react'

// export default class NewsItem extends Component {
//     render() {
//         let { title, description, imgUrl, newsUrl, author, date, tag } = this.props
//         return (
//             <div>
//                 <div className="card">
//                     <div className="" style={{
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         position: 'absolute',
//                         right: 0
//                     }}>
//                         <span className="badge rounded-pill bg-danger">
//                             {tag}
//                         </span>
//                     </div>
//                     <img src={imgUrl} className="card-img-top" alt="..." />
//                     <div className="card-body">
//                         <h5 className="card-title">
//                             {title}
//                         </h5>
//                         <p className="card-text">{description}...</p>
//                         <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleString()}</small></p>
//                         <a href={newsUrl} className="btn btn-primary btn-sm">Read More</a>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

const NewsItem = (p) => {
    let { title, description, imgUrl, newsUrl, author, date, tag } = p
    return (
        <div>
            <div className="card">
                <div className="" style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: 0
                }}>
                    <span className="badge rounded-pill bg-danger">
                        {tag}
                    </span>
                </div>
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        {title}
                    </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleString()}</small></p>
                    <a href={newsUrl} className="btn btn-primary btn-sm">Read More</a>
                </div>
            </div>
        </div>
    )
}
export default NewsItem