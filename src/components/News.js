import React, { Component, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

// export default class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 6,
//     category: 'general'
//   }
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   }
//   capitalise = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1)
//   }
//   constructor(props) {
//     super(props)
//     this.state = {
//       // articles: this.articles,
//       articles: [],
//       loading: true,
//       page: 1,
//       totalArticles: 0
//     }
//     document.title = `Newsmonkey: ${this.capitalise(this.props.category)}`
//   }
//   updateNews = async () => {
//     this.props.progress(10)
//     const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`)
//     this.setState({ loading: true })
//     this.props.progress(33)
//     let parsedData = await data.json()
//     this.props.progress(70)
//     this.setState({
//       articles: parsedData.articles,
//       totalArticles: parsedData.totalResults,
//       loading: false
//     })
//     this.props.progress(100)
//   }
//   handlePrev = async () => {
//     // let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
//     // this.setState({ loading: true })
//     // let parsedData = await data.json()
//     // this.setState({
//     //   articles: parsedData.articles,
//     //   page: this.state.page - 1,
//     //   loading: false
//     // })
//     this.setState({ page: this.state.page - 1 })
//     this.updateNews()
//   }
//   handleNext = async () => {
//     // let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
//     // this.setState({ loading: true })
//     // let parsedData = await data.json()
//     // this.setState({
//     //   articles: parsedData.articles,
//     //   page: this.state.page + 1,
//     //   loading: false
//     // })
//     this.setState({ page: this.state.page + 1 })
//     this.updateNews()
//   }
//   fetchMore = async () => {
//     this.setState({ page: this.state.page + 1 })
//     const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`)
//     let parsedData = await data.json()
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalArticles: parsedData.totalResults,
//       loading: false
//     })
//   }
//   componentDidMount = async () => { // this will run after the render method is run
//     this.updateNews()
//   }
//   render() {
//     return (
//       <>
//         <h2>
//           Headlines
//         </h2>
//         {this.state.loading && <Spinner />}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMore}
//           hasMore={this.state.articles.length !== this.state.totalArticles}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row">
//               {/* Below was for next/previous button */}
//               {/* {!this.state.loading && this.state.articles.map((elem) => { */}
//               {this.state.articles.map((elem) => {
//                 const { url, title, description, urlToImage, author, publishedAt, source } = elem
//                 return (
//                   <div key={url} className="col">
//                     <NewsItem title={title ? title.slice(0, 45) : ''} description={description ? description.slice(0, 87) : ''} imgUrl={urlToImage ? urlToImage : ''} newsUrl={url} author={author ? author : 'Unknown'} date={publishedAt} tag={source.name} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">
//           <button disabled={this.state.page === 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
//           <button disabled={this.state.page === Math.ceil(this.state.totalArticles / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
//         </div> */}
//       </>
//     )
//   }
// }

const News = (p) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const updateNews = async () => {
    p.progress(10)
    const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${p.country}&category=${p.category}&apiKey=${p.apiKey}&pageSize=${p.pageSize}&page=${page}`)
    setLoading(true)
    p.progress(33)
    let parsedData = await data.json()
    p.progress(70)
    setArticles(parsedData.articles)
    setTotalArticles(parsedData.totalResults)
    setLoading(false)
    p.progress(100)
  }
  const handlePrev = async () => {
    setPage(page - 1)
    updateNews()
  }
  const handleNext = async () => {
    setPage(page + 1)
    updateNews()
  }
  const fetchMore = async () => {
    const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${p.country}&category=${p.category}&apiKey=${p.apiKey}&pageSize=${p.pageSize}&page=${page + 1}`)
    setPage(page + 1)
    let parsedData = await data.json()
    setTotalArticles(parsedData.totalResults)
    setLoading(false)
    setArticles(articles.concat(parsedData.articles))
  }
  useEffect(() => {
    updateNews()
    document.title = `Newsmonkey: ${capitalise(p.category)}`
  }, [])
  return (
    <>
      <h2>
        Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMore}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((elem) => {
              const { url, title, description, urlToImage, author, publishedAt, source } = elem
              return (
                <div key={url} className="col">
                  <NewsItem title={title ? title.slice(0, 45) : ''} description={description ? description.slice(0, 87) : ''} imgUrl={urlToImage ? urlToImage : ''} newsUrl={url} author={author ? author : 'Unknown'} date={publishedAt} tag={source.name} />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News

// eslint-disable-next-line no-unused-vars
let articles = [
  {
    "source": {
      "id": null,
      "name": "Pocket-lint"
    },
    "author": "Oliver Haslam",
    "title": "Leaked Samsung Galaxy Z Flip 5 dummy unit photos hint at one vital upgrade - Pocket-lint",
    "description": "These new dummy units hit all the right notes for the upcoming Galaxy Z Flip 5.",
    "url": "https://www.pocket-lint.com/leaked-samsung-galaxy-z-flip-5-dummy-unit-photos-hint-at-one-vital-upgrade/",
    "urlToImage": "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/2023/07/samsung-galaxy-z-fold-5-dummies.jpg",
    "publishedAt": "2023-07-10T16:05:00Z",
    "content": "You don't need to have been following the Samsung Galaxy Z Flip 5 leaks particularly closely to know that we expect it to be announced later in July. The same goes for the fact that it's likely to ha… [+2053 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "ATP Tour"
    },
    "author": "ATP Tour",
    "title": "Novak Djokovic Completes Win Over Hubert Hurkacz To Reach Wimbledon QFs - ATP Tour",
    "description": "Djokovic Tested, Completes Win Over Hurkacz To Reach Wimbledon QFs",
    "url": "https://www.atptour.com/en/news/djokovic-hurkacz-wimbledon-2023-monday",
    "urlToImage": "https://www.atptour.com/-/media/images/news/2023/07/10/14/10/djokovic-wimbledon-2023-monday-forehand.jpg",
    "publishedAt": "2023-07-10T15:45:00Z",
    "content": "Novak Djokovic needed a second day and plenty of hard work to finish the job, but the second seed advanced to the Wimbledon quarter-finals on Monday.\r\nAfter winning the first two sets on Sunday eveni… [+2396 chars]"
  },
  {
    "source": {
      "id": "the-times-of-india",
      "name": "The Times of India"
    },
    "author": "PTI",
    "title": "SBI to sell 2% stake in IPO-bound NSDL - Economic Times",
    "description": "SBI holds 5% stake in NSDL while it intends to divest 2% in the Offer For Sale (OFS) subject to the terms of the proposed IPO, it said.",
    "url": "https://economictimes.indiatimes.com/markets/stocks/news/sbi-to-sell-2-pc-stake-in-ipo-bound-nsdl/articleshow/101645127.cms",
    "urlToImage": "https://img.etimg.com/thumb/msid-101645138,width-1070,height-580,imgsize-48230,overlay-etmarkets/photo.jpg",
    "publishedAt": "2023-07-10T15:12:00Z",
    "content": "Strong Double-digit Earnings Growth Seen for Nifty Cos in Q1The Nifty 50 companies are expected to report robust year-on-year, double-digit earnings growth for the June quarter, helped by the stellar… [+735 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "Gadgets360.com"
    },
    "author": "Ishaan Singh, Roydon Cerejo",
    "title": "Oppo Reno 10 5G First Impressions: Packs the Essentials - Gadgets 360",
    "description": "The Oppo Reno 10 5G feature a MediaTek Dimensity 7050 SoC. Here’s our first impressions of the smartphone.",
    "url": "https://www.gadgets360.com/mobiles/reviews/oppo-reno-10-5g-price-in-india-sale-date-first-look-specs-flipkart-4194449",
    "urlToImage": "https://i.gadgets360cdn.com/large/Oppo_Reno10_5G_Main_1688996051896.jpg",
    "publishedAt": "2023-07-10T14:10:40Z",
    "content": "Oppo's Reno series of smartphones is known for its camera prowess and this year, the company has announced its latest Reno 10 lineup for 2023 in India. Oppo launched the Oppo Reno 10 5G, Oppo Reno 10… [+2894 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "YouTube"
    },
    "author": null,
    "title": "Biden Pleaded Sunak For Support? U.S. Pres. In UK After London Opposes Cluster Bombs To Ukraine - Hindustan Times",
    "description": "Biden's visit to the UK presented an 'awkward' balancing act as he met with close NATO ally, UK Prime Minister Rishi Sunak. The U.S. has recently ruffled fea...",
    "url": "https://www.youtube.com/watch?v=n84ZJcz61kk",
    "urlToImage": "https://i.ytimg.com/vi/n84ZJcz61kk/maxresdefault.jpg",
    "publishedAt": "2023-07-10T14:04:20Z",
    "content": null
  },
  {
    "source": {
      "id": null,
      "name": "Moneycontrol"
    },
    "author": "Moneycontrol News",
    "title": "WhatsApp testing logins using phone numbers on WhatsApp Web - Moneycontrol",
    "description": "The feature is being tested with select testers in Beta and will let users authenticate themselves using a phone number on WhatsApp Web.",
    "url": "https://www.moneycontrol.com/news/technology/whatsapp-testing-logins-using-phone-numbers-on-whatsapp-web-10934441.html",
    "urlToImage": "https://images.moneycontrol.com/static-mcnews/2023/05/Collage-Maker-04-May-2023-06-46-PM-2052-770x433.jpg",
    "publishedAt": "2023-07-10T14:04:16Z",
    "content": "WhatsApp is testing the ability for users to authenticate their accounts using a phone number on WhatsApp Web.\r\nCurrently, users need to scan a QR code using an active WhatsApp account on a smartphon… [+1348 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "XDA Developers"
    },
    "author": "Timi Cantisano",
    "title": "Samsung's M8 smart monitor drops to lowest price ever at 43% off ahead of Prime Day - XDA Developers",
    "description": "A fantastic monitor that can also function as a smart TV, offering up the best of both worlds at a great price.",
    "url": "https://www.xda-developers.com/samsung-m8-monitor-43-off-deal/",
    "urlToImage": "https://static1.xdaimages.com/wordpress/wp-content/uploads/2023/02/xda-2400-x-1600-2.png",
    "publishedAt": "2023-07-10T13:55:00Z",
    "content": "Prime Day\r\n Samsung M8 32-inch 4K Smart Monitor \r\nThe Samsung M8 is one of the best 4K monitors to buy. Not only does this monitor have multiple inputs for connecting up to three devices at once, but… [+2012 chars]"
  },
  {
    "source": {
      "id": "the-times-of-india",
      "name": "The Times of India"
    },
    "author": "etimes.in",
    "title": "Will Deepika Padukone play Shah Rukh Khan's MOTHER in Jawan? Twitterati decode prevue clip - Indiatimes.com",
    "description": "Ever since Shah Rukh Khan released the Jawan prevue this morning, fans have been trying to decode Deepika Padukone's special role in the film. A popul",
    "url": "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/will-deepika-padukone-play-shah-rukh-khans-mother-in-jawan-twitterati-decode-prevue-clip/articleshow/101643016.cms",
    "urlToImage": "https://static.toiimg.com/thumb/msid-101643545,width-1070,height-580,imgsize-23358,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    "publishedAt": "2023-07-10T13:36:00Z",
    "content": "Jawan Prevue: Fans hail Shah Rukh Khan's explosive look; predict a 'tsunami at the box office'Shah Rukh Khan has released a preview of his upcoming film, 'Jawan', sending fans into a frenzy on social… [+192 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "Moneycontrol"
    },
    "author": "Moneycontrol News",
    "title": "‘No impact on India's semiconductor fab goals’ from Foxconn-Vedanta parting: Govt - Moneycontrol",
    "description": "&quot;Both Foxconn and Vedanta are fully committed to India’s Semiconductor Mission and Make in India,&quot; Union Electronics and IT Minister Ashwini Vaishnaw added.",
    "url": "https://www.moneycontrol.com/news/business/foxconn-vedanta-parting-ways-to-hno-impact-on-indias-semiconductor-fab-goals-from-foxconn-vedanta-parting-chandrasekharave-no-impact-on-indias-semiconductor-fab-goals-it-m-10934401.html",
    "urlToImage": "https://images.moneycontrol.com/static-mcnews/2021/08/pjimage-2021-08-01T142911.617-770x433.jpg",
    "publishedAt": "2023-07-10T13:33:48Z",
    "content": "Foxconn's decision to scrap its tie-up with the Anil Agrawal-led Vedanta for the semiconductor business in India will have no adverse impact on the country's plan towards the sector, said Rajeev Chan… [+3075 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "NDTV News"
    },
    "author": "Press Trust of India",
    "title": "PCB Chairman To Push For Pakistan's World Cup Matches At Neutral Venues In ICC Meeting - NDTV Sports",
    "description": "Pakistan Cricket Board acting chairman Zaka Ashraf will push for the country's ODI World Cup matches at neutral venues at the ICC meeting in Durban this week, the Minister for Inter-Provincial Coordination (Sports), Ehsan Mazari, has said.",
    "url": "https://sports.ndtv.com/icc-cricket-world-cup-2023/pcb-chairman-to-push-for-pakistans-world-cup-matches-at-neutral-venues-in-icc-meeting-4194405",
    "urlToImage": "https://c.ndtvimg.com/2023-07/hefm30oo_pakistan-cricket-team_625x300_08_July_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675",
    "publishedAt": "2023-07-10T13:15:00Z",
    "content": "Pakistan Cricket Board (PCB) acting chairman Zaka Ashraf will push for the country's ODI World Cup matches at neutral venues at the ICC meeting in Durban this week, the Minister for Inter-Provincial … [+2878 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "The Tribune India"
    },
    "author": "The Tribune India",
    "title": "Best Eye Vitamins & Supplements For Vision Health —Top 5 Reviewed - The Tribune India",
    "description": "Best Eye Vitamins & Supplements For Vision Health —Top 5 Reviewed - The Tribune India",
    "url": "https://www.tribuneindia.com/news/brand-connect/best-eye-vitamins-supplements-for-vision-health-%E2%80%94top-5-reviewed-524479",
    "urlToImage": null,
    "publishedAt": "2023-07-10T13:05:00Z",
    "content": null
  },
  {
    "source": {
      "id": null,
      "name": "Expatguideturkey.com"
    },
    "author": "Ece Nagihan",
    "title": "Elon Musk's Starlink satellites block surveillance of space » Expat Guide Turkey - Expat Guide Turkey",
    "description": "Radio signals leaking from Starlink satellites continue to disrupt astronomy. The growing number of Starlink satellites raises concerns about the future of astronomy. The fact that the Starlink satell",
    "url": "https://expatguideturkey.com/elon-musks-starlink-satellites-block-surveillance-of-space/",
    "urlToImage": "https://expatguideturkey.com/wp-content/uploads/2023/07/elon-musks-starlink-satellites-block-surveillance-of-space.webp",
    "publishedAt": "2023-07-10T12:40:04Z",
    "content": "Radio signals leaking from Starlink satellites continue to disrupt astronomy. The growing number of Starlink satellites raises concerns about the future of astronomy.\r\nThe fact that the Starlink sate… [+2203 chars]"
  },
  {
    "source": {
      "id": "the-times-of-india",
      "name": "The Times of India"
    },
    "author": "Anand Bodh",
    "title": "Himachal Pradesh rain fury claims 17 lives, damages property worth Rs 4,000 crore - Indiatimes.com",
    "description": "The incessant rainfall in Himachal Pradesh has resulted in the loss of 17 lives and extensive damage to infrastructure, including roads, power transfo",
    "url": "https://timesofindia.indiatimes.com/city/shimla/himachal-pradesh-rain-fury-claims-17-lives-damages-property-worth-rs-4000-crore/articleshow/101642221.cms",
    "urlToImage": "https://static.toiimg.com/thumb/msid-101642356,width-1070,height-580,imgsize-1242773,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    "publishedAt": "2023-07-10T12:37:00Z",
    "content": "10 tips to reduce greying of hair"
  },
  {
    "source": {
      "id": "the-times-of-india",
      "name": "The Times of India"
    },
    "author": "TIMESOFINDIA.COM",
    "title": "Breast cancer: How to do a breast self-examination at home? - Indiatimes.com",
    "description": "Breast cancer cases among young women has been on the rise. This disease can be prevented if one follows a proper self-examination at home.",
    "url": "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/breast-cancer-how-to-do-a-breast-self-examination-at-home/articleshow/101636543.cms",
    "urlToImage": "https://static.toiimg.com/thumb/msid-101637420,width-1070,height-580,imgsize-743213,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    "publishedAt": "2023-07-10T12:30:00Z",
    "content": "Madhuri Dixit shows how to make healthy Onion Bhajia, Masala Chai"
  },
  {
    "source": {
      "id": null,
      "name": "ANI News"
    },
    "author": null,
    "title": "India to buy 26 Rafales, 3 Scorpene submarines from France, deals likely to be announced during PM Modi's visit - ANI News",
    "description": "The proposals have been placed before the Defence Ministry by the defence forces and are likely to be announced during Prime Minister Narendra Modi's visit to France this week, government sources told ANI.",
    "url": "https://www.aninews.in/news/world/asia/india-to-buy-26-rafales-3-scorpene-submarines-from-france-deals-likely-to-be-announced-during-pm-modis-visit20230710175052",
    "urlToImage": "https://d3lzcn6mbbadaf.cloudfront.net/media/details/ANI-20230710121859.jpg",
    "publishedAt": "2023-07-10T12:20:00Z",
    "content": "New Delhi (India), July 10 (ANI): In a major development, India is planning to buy 26 Rafale fighter aircraft and three Scorpene class conventional submarines from France.The proposals have been plac… [+1607 chars]"
  },
  {
    "source": {
      "id": "the-times-of-india",
      "name": "The Times of India"
    },
    "author": "AFP",
    "title": "Putin met with Wagner chief in Moscow after failed mutiny: Kremlin - Times of India",
    "description": "Europe News: The Kremlin said Monday that President Vladimir Putin had met with Wagner chief Yevgeny Prigozhin on June 29 in the Kremlin, days after the mercenary",
    "url": "https://timesofindia.indiatimes.com/world/europe/putin-met-with-wagner-chief-in-moscow-after-failed-mutiny-kremlin/articleshow/101641493.cms",
    "urlToImage": "https://static.toiimg.com/thumb/msid-101641570,width-1070,height-580,imgsize-31136,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    "publishedAt": "2023-07-10T12:14:00Z",
    "content": "10 tips to reduce greying of hair"
  },
  {
    "source": {
      "id": "the-times-of-india",
      "name": "The Times of India"
    },
    "author": "Reena Zachariah",
    "title": "Adani-Hindenburg Case: Sebi defends 2019 rule change affecting offshore investors - Economic Times",
    "description": "“Instead, the issue primarily arose from the existence of thresholds for determination of BOs(beneficial owners) In fact, the thresholds were only lowered (i.e., made tighter) between 2014 and 2019,” Sebi said in its affidavit filed before the Supreme Court.",
    "url": "https://economictimes.indiatimes.com/markets/stocks/news/adani-hindenburg-case-sebi-defends-2019-rule-change-affecting-offshore-investors/articleshow/101640404.cms",
    "urlToImage": "https://img.etimg.com/thumb/msid-101640755,width-1070,height-580,imgsize-742037,overlay-etmarkets/photo.jpg",
    "publishedAt": "2023-07-10T11:48:00Z",
    "content": "The Securities and Exchange Board of India(Sebi) told Supreme Court on Monday that the challenges faced by it for getting the details about the economic interest holders in the Adani Group companies,… [+2278 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "NDTV News"
    },
    "author": null,
    "title": "142 Dead, 5,995 Cases: Manipur's Fresh Report To Supreme Court On Violence - NDTV",
    "description": "NDTV.com: India, Business, Bollywood, Cricket, Video and Breaking News",
    "url": "https://www.ndtv.com/news",
    "urlToImage": "https://cdn.ndtv.com/common/images/ogndtv.png",
    "publishedAt": "2023-07-10T11:44:00Z",
    "content": null
  },
  {
    "source": {
      "id": null,
      "name": "YouTube"
    },
    "author": null,
    "title": "'Why Are Bhajpaiyas Upset?': Congress Asks After Kajol Clarifies 'Uneducated Leaders' Remark - Hindustan Times",
    "description": "Bollywood actor Kajol's 'uneducated leaders' remark has snowballed into a major political controversy. Kajol was heavily criticised on social media and was c...",
    "url": "https://www.youtube.com/watch?v=bva0Tkqh3YQ",
    "urlToImage": "https://i.ytimg.com/vi/bva0Tkqh3YQ/maxresdefault.jpg",
    "publishedAt": "2023-07-10T11:31:28Z",
    "content": null
  }
]