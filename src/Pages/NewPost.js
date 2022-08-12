import { useState, useEffect } from 'react';
import { ThreeDots } from  'react-loader-spinner';
import axios from 'axios';

import styled from "styled-components"
import profile from "../assets/profile.png";

export default function NewPost({posts, setPosts}) {
    const [url, setUrl] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    console.log("aqui é o new posts")
    console.log(posts)

    async function addNewPost() {   
        setLoading(true)

        let body = {
            url: url,
            comment: comment
        }
        console.log(body)
        const promise = axios.post("http://localhost:4000/newpost", body);
        promise
        .then(res =>{
            setLoading(false)
            console.log(res.data);
            setUrl("");
            setComment("")
            updatePosts()
        })
        .catch(err => {
            setLoading(false)
            console.log(err);
            alert("Houve erro ao publicar o seu link")
        })
        
    }

    function updatePosts() {
        const config = ""
        const promise = axios.get("http://localhost:4000/getposts", config)
        promise
        .then(res =>{
            console.log(res.data);
            setPosts(res.data)
            setLoading(false);
            console.log(posts)
           
        })
        .catch(err => {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page")
            setLoading(false);
        })
    }

    return (
        <NewPostBody>
            <img src={profile} />
           <InputNewPost>
                <Title>
                    <h2> What are you going to share today?</h2>
                </Title>
                {(loading === false) && (<>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://.." />
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Awesome article about #javascript" />
                    <Hability type='submit' onClick={addNewPost}> Publish</Hability>
                </>)}
                {(loading === true) && (<>
                    <input disabled type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://.." />
                    <input disabled type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Awesome article about #javascript" />
                    <Desability color={'#000000'} opacity={0.7} disabled> Publishing...</Desability>
                </>)}
                
           </InputNewPost> 
           
            
        </NewPostBody>
    )
}

const NewPostBody = styled.div`
padding: 20px;
width: 611px;
height: 209px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
display: flex;
margin-bottom: 30px;
    img{
    width: 50px;
    height: 50px;
    left: 433px;
    border-radius: 26.5px;
}
`

const InputNewPost = styled.div`

margin-left:20px;

    input {
    padding:10px;
    width: 503px;
    height: 30px;
    left: 501px;
    top: 313px;
    background: #EFEFEF;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
}
    input:last-child{
    height: 60px;
}


`
const Title = styled.div` 
margin-bottom: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 20px;
line-height: 24px;
color: #707070;

`

const Hability = styled.button`
        width: 112px;
        height: 31px;
        left: 892px;
        top: 419px;
        background: #1877F2;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 390px;
`
const Desability = styled.button`
        width: 112px;
        height: 31px;
        left: 892px;
        top: 419px;
        background: gray;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 390px;
`