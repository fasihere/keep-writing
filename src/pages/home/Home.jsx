import './home.scss'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation()
        useEffect(() => {
            const fetchPosts = async () => {
                try {
                    const res = await axios.get("https://my-blog-app-backend.herokuapp.com/api/posts"+search)
                    setPosts(res.data)
                } catch (err) {
                    console.log("Obviously an error: ",err.response)
                }
            }
            fetchPosts()
        },[search])
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </>
    )
}
