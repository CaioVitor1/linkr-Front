import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components"
import NewPost from "./NewPost.js"

function RenderPosts({name, url, image, profile, description, comment, title}) {
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

export default function Posts({posts, setPosts}) {
    
    const [loading, setLoading] = useState(false);

  
    useEffect(() => {
      
        setLoading(true)
        const config = ""
       /* const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        } */
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
    }, []) 
   

    return(
        <>
        
        {(loading === false) && (posts.length === 0) && (<NoPosts>There are no posts Yet</NoPosts>)}
        {(loading === true) && (<NoPosts>LOADING...</NoPosts>)}
        {(loading === false) && (posts.length !== 0) && (posts.length !== 0) && (
            <>
                {posts.map((data) => <RenderPosts name={data.name}  url={data.url} image={data.image} profile={data.profile} comment={data.comment} title={data.title} description={data.description} />)}    
            </>
            )}
        </>
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
width: 611px;
height: 276px;
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
width: 503px;
height: 155px;
left: 502px;
top: 596px;
border: 1px solid #4D4D4D;
border-radius: 11px;
display:flex;
`

const PostContent = styled.div`
margin-top: 10px;
margin-left: 10px;
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
width: 153.44px;
height: 155px;
border-radius: 0px 12px 13px 0px;
width: 153.44px;
height: 155px;

img{
    width: 153.44px;
height: 155px;
}
`