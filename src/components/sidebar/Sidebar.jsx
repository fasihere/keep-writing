import './sidebar.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Sidebar() {
    const [cats, setCats] = useState([])
    useEffect(() => {
        const getCats = async () => {
          const res = await axios.get("https://my-blog-app-backend.herokuapp.com/api/categories");
          setCats(res.data);
        };
        getCats();
      }, []);
    return (
        <div className="sidebar">
            <div className="item">
                <span className="title">
                    ABOUT ME
                </span>
                <img
                src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                alt=""
                />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, tenet
                    ur. Error, cupiditate. Ab quas 
                </p>
            </div>
            <div className="item">
                <span className="title">
                    CATEGORIES
                </span>
                <ul className="list">
                {cats.map((c) => (
                    <Link to={`/?cat=${c.name}`} className="link">
                        <li className="listItem">{c.name}</li>
                    </Link>
                ))}
                </ul>
            </div>
            <div className="item">
                <span className="title">FOLLOW US</span>
                <div className="social">
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
