
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components"
import Post from '../components/Post.js';


export default function Posts({posts, setPosts, localToken, idUser}) {

    const [loading, setLoading] = useState(false);
    const config = {
        headers: {
            Authorization: `Bearer ${localToken}`
        }
    }
  
    useEffect(() => {
        setLoading(true);
        getPosts();
    }, []);



    async function getPosts(){

            
        const promise = axios.get("http://localhost:4000/getposts", config)
        promise
        .then(res =>{
           
            setPosts(res.data);
            setLoading(false);         
        })
        .catch(err => {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page")
            setLoading(false);
        });

    }


  return (
    <>
      {loading === false && posts.length === 0 && (
        <NoPosts>There are no posts Yet</NoPosts>
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
  font-size: 30px;
  line-height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: White;
  margin-bottom: 40px;
`;

