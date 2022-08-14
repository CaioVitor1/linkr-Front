import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components"

export default function Post({name, url, image, profile, description, comment, title}) {
    function openLink() {
        window.open(url)
    }
    return (
        <PostsBody>
                    <img src={profile} />
                    <PostDescription>
                        <PostUser> {name}</PostUser>
                        <PostSubtitle> {comment}</PostSubtitle>
                        
                        <PostLink onClick={openLink}> 
                            <PostContent>
                                <h2>{title}</h2>
                                <h3>{description}</h3>
                                <h4>{url}</h4>
                            </PostContent>
                            <PostImage>
                                <img src={image} />
                            </PostImage>
                        </PostLink>
                    </PostDescription>
        </PostsBody>
    )
}

const NoPosts = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 23px;
display: flex;
justify-content: center;
align-items: center;
color: black;

`

const PostsBody = styled.div`
margin-bottom: 20px;
padding: 20px;
width: 45%;
background: #171717;
border-radius: 16px;
display: flex;
    img{
    width: 50px;
    height: 50px;
    left: 433px;
    border-radius: 26.5px;
}

`

const PostDescription = styled.div`
width: 100%;
height: 100%;
margin-left:20px;
`
const PostUser = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #FFFFFF;
margin-bottom: 10px;
`

const PostSubtitle = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 20px;
margin-bottom: 10px;
color: #B7B7B7;
`

const PostLink = styled.div`
width: 100%;
height: 100%;
left: 502px;
top: 596px;
border: 1px solid #4D4D4D;
border-radius: 11px;
display:flex;
`

const PostContent = styled.div`
width: 60%;
margin-top: 10px;
margin-left: 10px;
word-wrap: break-word;
h2{
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #CECECE;
margin-top: 10px;
}
h3{
margin-top: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;
color: #9B9595;

}
h4{
margin-top: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;
color: #CECECE;
}
`

const PostImage = styled.div`
width: 40%;
border-radius: 0px 12px 13px 0px;

img{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
`