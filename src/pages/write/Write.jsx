import { useContext, useState } from 'react'
import './write.scss'
import axios from 'axios'
import { Context } from '../../context/Context'

export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try{
                await axios.post('/upload', data);
            } catch(err){
                console.log(err)
            }
        }
        try{
            const res =  await axios.post('/posts', newPost);
            window.location.replace('/post/'+res.data._id)
        } catch(err){ 
            console.log(err)
        }
    };

    return (
        <div className="write">
            {file &&
                (
                    <img src={URL.createObjectURL(file)} alt="" />
                )
            }
            <form className="form" onSubmit={handleSubmit}>
                <div className="group">
                    <label htmlFor="fileinput">
                        <i className="fas fa-plus"></i>
                    </label>
                    <input 
                    type="file" 
                    id="fileinput" 
                    style={{display:"none"}}
                    onChange={e => setFile(e.target.files[0])} 
                    />
                    <input 
                    type="text" 
                    placeholder="Title" 
                    className="input" 
                    autoFocus={true}
                    onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="group">
                    <textarea 
                    placeholder="Put your thoughts ..." 
                    type="text" 
                    className="input text"
                    onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="submit" type="submit">Publish</button>
            </form>
        </div>
    )
}
