import { useState, useEffect } from 'react';
import { ThreeDots } from  'react-loader-spinner';

import styled from "styled-components"
import profile from "../assets/profile.png"
export default function NewPost() {
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    function addNewPost() {
        setLoading(true)
        let body = {
            url,
            description
        }
        console.log(body)
        //if sucesso:
        setUrl("");
        setDescription("")
        setLoading(false)
    }

    return (
        <NewPostBody>
            <img src={profile} />
           <InputNewPost>
                <Title>
                    <h2> What are you going to share today?</h2>
                </Title>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://.." />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Awesome article about #javascript" />
               {(loading === false) && (<button type='submit' onClick={addNewPost}> Publish</button>)} 
               {(loading === true) && (<button disabled opacity={0.7} type='submit'>{<ThreeDots  width={51} color={"#ffffff"} />} Publishing... </button>)} 
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
    button{
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

