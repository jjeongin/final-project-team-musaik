// import { MoreVert } from "@material-ui/icons";
import { Users } from "./dummyData";
import { useState } from "react";
import Player from './Player';
import App from "../App";
import PlayerDetails from "./PlayerDetails";
import image from './images/beyonce.jpeg'




export default function Post({ post }) {
    const [songs, setSongs] = useState([
        {
          title: "CUFF IT",
          artist: "Beyonce",
          img_src: image,
          src: ""
        },
        {
          title: "About Damn Time",
          artist: "Lizzo",
          img_src: "./images/beyonce.jpeg",
          src: ""
        },
        {
          title: "Glimpse of Us",
          artist: "Joji",
          img_src: "./images/beyonce.jpeg",
          src: ""
        },
        {
          title: "As It Was",
          artist: "Harry Styles",
          img_src: "./images/beyonce.jpeg",
          src: ""
        }
      ]);
    
      const [currentSongIndex, setCurrentSongIndex]= useState(0);
      const [nextSongIndex, setNextSongIndex]= useState(currentSongIndex+1);
    
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
          <span className="postCommentText"> Currently listening: {post.comment}</span>
            {/* <MoreVert /> */}
          </div>
        </div>
        
        <div className="postCenter">
        <span className="postText">{post?.desc}</span>
            <Player 
             song={songs[currentSongIndex]}
             nextSong={songs[nextSongIndex]}
             />
    
          {/* <img className="postImg" src={post.photo} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={post.like_img} onClick={likeHandler} alt="" />
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{post.comment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}