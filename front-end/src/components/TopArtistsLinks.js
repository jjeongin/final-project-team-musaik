import React from 'react';
import axios from 'axios';

export default class TopArtistsLinks extends React.Component {
  
    state = {
      artists: []
    }

    componentDidMount() {
      axios.get(`http://localhost:8080/top_artists`)
        .then(res => {
          const artists = res.data;
          this.setState({ artists });
        })
    }
  
    render() {
      console.log('I was triggered during render 1')
      return (
        
        <div className="links">
         {this.state.artists.map((artist) => (
           <div className="artist">{artist.external_urls.spotify}</div>
        ))[this.props.number]}

        </div>  
        
      )
    }
  }