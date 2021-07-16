import { Link } from 'react-router-dom'
import './post.scss'

export default function Post({post}) {
    const PF = "http://localhost:5000/images/"
    return (
        <div className="post">
            { post.photo &&
                <img src={PF + post.photo} alt=""/>
            }
            <div className="info">
                <div className="cats">
                    {post.categories.map((c) => {
                    <span className="cat">{c.name}</span>
                    })}
                </div>
                <Link className="link" to={`/post/${post._id}`}>
                    <span className="title">
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className="date">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="description">
                {post.desc}
            </p>
        </div>
    )
}
