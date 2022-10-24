
// import Feed from "../../components/feeed";
import Post from "../../components/post";
import NavBar from '../../NavBar';

import { Posts } from "../../components/dummyData";


export default function Radio() {
  return (
    <> 
      <div className="homeContainer">
      {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>

       {/* <div className="Radio">
        <NavBar />
     </div>  */}
    </>
  );
}



