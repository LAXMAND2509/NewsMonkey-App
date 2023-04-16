import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";
const App = (props) => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)
  return (
    <div className='bg'>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar className='navstyle'></Navbar>
        {/* <News pageSize={9} country={"in"} category="science"></News> */}
        {/* using "key" in the route helps you to remount the component with different props which is helpfull when we click the news category in the navbar */}
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="general" country={"in"} category="general"></News>}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="business" country={"in"} category="business"></News>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="entertainment" country={"in"} category="entertainment"></News>}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="science" country={"in"} category="science"></News>}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="health" country={"in"} category="health"></News>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="sports" country={"in"} category="sports"></News>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="technology" country={"in"} category="technology"></News>}></Route>
        </Routes>
      </Router>
    </div>
  )

}
export default App;

