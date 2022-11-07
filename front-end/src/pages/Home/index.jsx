import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Albums from '../../components/Albums/Albums';
import SearchBar from '../../components/SearchBar/SearchBar';
import placeHolder from '../../img/album.jpeg';
import './index.css'
import RadioMatch from '../../components/RadioMatch';

class Home extends Component{
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="Home">
        <SearchBar />
        <div className="home-content">
          <RadioMatch img1={placeHolder} img2={placeHolder} />
          <p className="App-intro">{this.state.data}</p>
          <Albums text={"Recently Played"} image={placeHolder}/>
          <Albums text={"Favorites"} image={placeHolder}/>
        </div>
        <NavBar /> 
      </div>
    );
  }
}

// function Home() {
//   return (
//     <div className="Home">
//       <SearchBar />
//       <div className="home-content">
//         <RadioMatch img1={placeHolder} img2={placeHolder} />
//         <Albums text={"Recently Played"} image={placeHolder}/>
//         <Albums text={"Favorites"} image={placeHolder}/>
//       </div>
//       <NavBar /> 
//     </div>
//   );
// }

export default Home;