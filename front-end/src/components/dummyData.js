import image1 from './images/profile_pic.jpeg'
import likeImage from './images/heartt.png'
import headphonesImage from './images/headphone.png'

export const Users = [
    {
      id:1,
      profilePicture: image1,
      username: "Homer Simpson",
    },
    // {
    //   id:2,
    //   profilePicture: "assets/person/2.jpeg",
    //   username: "Janell Shrum",
    // },
  ];
  
  export const Posts = [
    {
      id: 1,
      desc: "Obsessed with these songs lately!",
      date: "5 mins ago",
      userId: 1,
      like: 32,
      like_img: likeImage,
      h_img: headphonesImage,
      comment: 9,
    },
    // {
    //   id: 2,
    //   photo: "assets/post/2.jpeg",
    //   date: "15 mins ago",
    //   userId: 2,
    //   like: 2,
    //   comment: 1,
    // }

  ];