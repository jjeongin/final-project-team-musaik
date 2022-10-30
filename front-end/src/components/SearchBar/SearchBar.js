import "./SearchBar.css"
import back from "../../img/arrow_back.png"
import axios from 'axios';

import { BrowserRouter as Router, Link } from 'react-router-dom';




function SearchBar() {
    
    const search = async (e) => {
        e.preventDefault();
        console.log("searching");
        try {
            const res = await axios.get(`http://localhost:8080/`);
            console.log(res);

        } catch (err) {
            console.log(err);
        }
         
    }


    return(

        <div className="Search-Burger">
            <Link to="/">
                <img src={back} alt="back Icon"/>
            </Link>

            <form onSubmit={search}>
                <input type="text" id="home-search" placeholder="Search" name="search" />
                <button type="submit">Search</button>
            </form>
        </div>
    )

}

export default SearchBar