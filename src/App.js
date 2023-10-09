import { Component, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

// export default class App extends Component {
//   pageSize = 6
//   apiKey=process.env.REACT_APP_NEWS_API_KEY
//   state={
//     progress:0
//   }

//   setProgress=(progress)=>{
//     this.setState({progress})
//   }
//   render() {
//     return (
//       <BrowserRouter>
//         <Navbar />
//         <LoadingBar
//           color='#3e8eff'
//           progress={this.state.progress}
//           // onLoaderFinished={()=>{}}
//           height={3}
//           />
//         <Routes>
//           <Route exact path='/' element={<News apiKey={this.apiKey} key='general' progress={this.setProgress} pageSize={this.pageSize} country='in' category='general' />}></Route>
//           <Route exact path='/business' element={<News apiKey={this.apiKey} key='business' progress={this.setProgress} pageSize={this.pageSize} country='in' category='business' />}></Route>
//           <Route exact path='/entertainment' element={<News apiKey={this.apiKey} key='entertainment' progress={this.setProgress} pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
//           <Route exact path='/health' element={<News apiKey={this.apiKey} key='health' progress={this.setProgress} pageSize={this.pageSize} country='in' category='health' />}></Route>
//           <Route exact path='/science' element={<News apiKey={this.apiKey} key='science' progress={this.setProgress} pageSize={this.pageSize} country='in' category='science' />}></Route>
//           <Route exact path='/technology' element={<News apiKey={this.apiKey} key='technology' progress={this.setProgress} pageSize={this.pageSize} country='in' category='technology' />}></Route>
//           <Route exact path='/sports' element={<News apiKey={this.apiKey} key='sports' progress={this.setProgress} pageSize={this.pageSize} country='in' category='sports' />}></Route>
//         </Routes>
//       </BrowserRouter>
//     )
//   }
// }

const App = (p) => {
  const pageSize = 6
  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  const [progress, setProgress] = useState(0)

  const updateProgress = () => {
    setProgress(progress)
  }
  return (
    <Router>
      <Navbar />
      <LoadingBar
        color='#3e8eff'
        progress={progress}
        // onLoaderFinished={()=>{}}
        height={3}
      />
      <Routes>
        <Route exact path='/' element={<News apiKey={apiKey} key='general' progress={updateProgress} pageSize={pageSize} country='in' category='general' />}></Route>
        <Route exact path='/business' element={<News apiKey={apiKey} key='business' progress={updateProgress} pageSize={pageSize} country='in' category='business' />}></Route>
        <Route exact path='/entertainment' element={<News apiKey={apiKey} key='entertainment' progress={updateProgress} pageSize={pageSize} country='in' category='entertainment' />}></Route>
        <Route exact path='/health' element={<News apiKey={apiKey} key='health' progress={updateProgress} pageSize={pageSize} country='in' category='health' />}></Route>
        <Route exact path='/science' element={<News apiKey={apiKey} key='science' progress={updateProgress} pageSize={pageSize} country='in' category='science' />}></Route>
        <Route exact path='/technology' element={<News apiKey={apiKey} key='technology' progress={updateProgress} pageSize={pageSize} country='in' category='technology' />}></Route>
        <Route exact path='/sports' element={<News apiKey={apiKey} key='sports' progress={updateProgress} pageSize={pageSize} country='in' category='sports' />}></Route>
      </Routes>
    </Router>
  )
}
export default App