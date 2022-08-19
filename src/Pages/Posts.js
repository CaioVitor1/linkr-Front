
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components"
import Post from '../components/Post.js';


export default function Posts({posts, setPosts, localToken, idUser}) {

    const [loading, setLoading] = useState(false);
    const [anyFollow, setAnyfollow] = useState([]);
    
    const config = {
        headers: {
            Authorization: `Bearer ${localToken}`
        }
    }
  
    useEffect(() => {
        setLoading(true);
        getPosts();
        getFollow();
    }, []);


    async function getPosts(){

      try{
        const posts = await (await axios.get("http://localhost:4000/getposts", config)).data;

        console.log(posts);

        setPosts(posts);
        setLoading(false);
      }catch(error){
        console.log(error);
        alert("An error occured while trying to fetch the posts, please refresh the page")
        setLoading(false);
      }
        
    }
    async function getFollow() {
      try{
        const followers = (await axios.get("http://localhost:4000/getFollow", config)).data;
        console.log("followers: ");
        console.log(followers);
              
        setAnyfollow(followers);
      }catch(error){
        console.log(error);
        alert("An error occured while trying looging for follows");
      }
    }

  return (
    <>
      {(loading === false) && (posts.length === 0) && (anyFollow.length === 0) && (
        <NoPosts>You don't follow anyone yet. Search for new Friends</NoPosts>
      )}
      {(loading === false) && (posts.length === 0) && (anyFollow.length !== 0) && (
        <NoPosts>No posts found from your Friends</NoPosts>
      )}
      {loading === true && <NoPosts>LOADING...</NoPosts>}
      {loading === false && posts.length !== 0 && posts.length !== 0 && (
        <>
          {posts.map((data) => (
            <Post
              idUser={idUser}
              likesCount={data.likesCount}
              userId={data.id}
              setPosts={setPosts}
              posts={posts}
              token={localToken}
              postid={data.postId}
              name={data.name}
              url={data.url}
              image={data.image}
              profile={data.profile}
              comment={data.comment}
              title={data.title}
              likes={data.likes}
              description={data.description}
              commentsCount={data.commentsCount}
              anyFollow={anyFollow}
              repostCount={data.repostCount}
            />
          ))}
        </>
      )}
    </>
  );
}

const NoPosts = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: White;
  margin-bottom: 40px;
`;

