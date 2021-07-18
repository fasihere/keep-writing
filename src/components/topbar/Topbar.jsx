import { Link } from "react-router-dom";
import "./topbar.scss"
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
    const PF = "https://my-blog-app-backend.herokuapp.com/images/"
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }
    return (
        <div className="topbar">
            <div className="left">
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-linkedin"></i>
                <i className="fab fa-instagram-square"></i>
            </div>
            <div className="center">
                <ul className="list">
                    <li className="item">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/contact">CONTACT</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className="item" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="right">
                {  
                    user ? (
                    <Link className="link" to="/settings">
                        <img 
                            className="topImg"
                            src={PF + user.profilePic}
                            alt=""
                        />
                    </Link>
                    ) : (
                        <ul className="list">
                            <li className="item">
                                <Link className="link" to="/login">
                                    LOGIN
                                </Link>
                            </li>
                            <li className="item">
                                <Link className="link" to="/register">
                                    REGISTER
                                </Link>
                            </li>
                        </ul>
                    )}
                <i className="fas fa-search"></i>
            </div>
        </div>
    )
}
