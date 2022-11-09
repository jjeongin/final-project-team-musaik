import './Albums.css';
import TopArtistList from '../../components/TopArtistList';
import React from 'react';
import axios from 'axios';

export default class FavArtists extends React.Component{
    state = {
        artists: []
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/top_artists_pics`)
          .then(res => {
            const artists = res.data;
            this.setState({ artists });
          })
    }    
render(){
    return(
        <div className='Carousel'>
            <h2 className='Category-Name'>{this.props.text}</h2>
            <div className="item">
                <img src={this.state.artists[0]} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
                <span className="caption">{<TopArtistList number={0}/>} </span>
            </div>
        
            <div className="item">
                <img src={this.state.artists[1]} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
                <span className="caption">{<TopArtistList number={1}/>}</span>
            </div>

            <div className="item">
                <img src={this.state.artists[2]} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
                <span className="caption">{<TopArtistList number={2}/>}</span>
                
            </div>
            
        </div>

    )}
}