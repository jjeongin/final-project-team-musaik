import './Albums.css';
import TopArtistList from '../../components/TopArtistList';
import React from 'react';
import axios from 'axios';

import TopArtistsLinks from '../TopArtistsLinks';
// import { timeStamp } from 'console';

export default class FavArtists extends React.Component{
    state = {
        artists: [],
        artistsLinks: []
    }
    // componentDidMount() {
    //     axios.get(`http://localhost:8080/top_artists_pics`)
    //       .then(res => {
    //         const artists = res.data;
    //         this.setState({ artists });
    //       })
    // }    


    componentDidMount() {
        Promise.all([
            axios.get(`http://localhost:8080/top_artists_pics`),
            axios.get(`http://localhost:8080/top_artists_links`)
            
          ]).then(([res1, res2]) => {
            const artists = res1.data;
            const artistsLinks = res2.data;

            this.setState({ artists, artistsLinks });
          })
    } 
        
render(){ 
    return(
        <div className='Carousel'>
            <h2 className='Category-Name'>{this.props.text}</h2>
            <div className="item">
                <a href={this.state.artistsLinks[0]}>
                <img src={this.state.artists[0]} alt="Album PlaceHolder" className='Album-PlaceHolder'/> 
                </a> 
                <a href={this.state.artistsLinks[0]}> 
                <span className="caption">{<TopArtistList number={0}/>} </span>          
                </a>
            
            </div>
        
            <div className="item">
            <a href={this.state.artistsLinks[1]}>
                <img src={this.state.artists[1]} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
            </a>
            <a href={this.state.artistsLinks[1]}>  
            <span className="caption">{<TopArtistList number={1}/>}</span></a>
                
            </div>

            <div className="item">
            <a href={this.state.artistsLinks[2]}>
                <img src={this.state.artists[2]} alt="Album PlaceHolder" className='Album-PlaceHolder'/>
            </a>
            <a href={this.state.artistsLinks[2]}>  
            <span className="caption">{<TopArtistList number={2}/>}</span>
            </a>
               
                
            </div>
            
        </div>

    );
}
    }