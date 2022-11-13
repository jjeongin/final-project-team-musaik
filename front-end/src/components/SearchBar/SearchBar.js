import "./SearchBar.css"
import back from "../../img/arrow_back.png"
import axios from 'axios';

import { BrowserRouter as Router, Link } from 'react-router-dom';




function SearchBar() {
    

    return(

        <div className="Search-Burger">
            <Link to="/home">
                <img src={back} alt="back Icon"/>
            </Link>

            <form>
                <input type="text" id="home-search" placeholder="Search" name="search" />
            </form>
        </div>
    )

}

export default SearchBar