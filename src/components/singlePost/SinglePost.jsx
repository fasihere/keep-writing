import { useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './singlePost.scss'
 
 export default function SinglePost() {
     const { user } = useContext(Context)
     const PF = "http://localhost:5000/images/"
     const location = useLocation ()
     const path = location.pathname.split("/")[2];
     const [post, setPost] = useState({});
     const [title, setTitle] = useState("")
     const [desc, setDesc] = useState("")
     const [updateMode, setUpdateMode] = useState(false);

     const handleDelete = async () => {
        try{
            const res = await axios.delete("/posts/" + path, {data:{username: user.username}});
            window.location.replace("/");
        } catch(err){
            console.log(err)
        }
     }
     const handleUpdate = async () => {
        try{
            const res = await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc
            });
            setUpdateMode(false)
        } catch(err){
            console.log(err)
        }
     }
     useEffect(() => {
         const getPost = async() => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
         }
         getPost()
     }, [path])
     return (
        <div className="singlePost">
            <div className="wrapper">
                {post.photo && ( 
               <img src={PF + post.photo} alt=""/>)}
                {
                    updateMode ? 
                    <input 
                    type="text" 
                    value={title}
                    className="titleInput"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    /> : (
                    <h1 className="title">
                        {post.title}
                        {post.username == user?.username &&
                            (<div className="edit">
                                <i className="icon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="icon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>)
                        }
                    </h1>
                 )}
                <div className="info">
                    <span>Author: &nbsp;
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? (
                    <textarea value={desc} className="descText" onChange={(e) => setDesc(e.target.value)}></textarea>):(
                    <p className="description">
                        {post.desc}
                    </p>
                )}
                <button className="btn" onClick={handleUpdate}>Update</button>
            </div>

        </div>
     )
 }
 