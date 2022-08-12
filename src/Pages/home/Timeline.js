import styled from "styled-components";
import Header from "../../components/Header";
import jwt from "jwt-decode";
import NewPost from "../NewPost";
import Posts from "../Posts";
import { useState, useEffect } from 'react';


export default function Timeline() {
  const localToken = localStorage.getItem("token");
  const userData = jwt(localToken);
  const [posts, setPosts] = useState([]);

  return (
    <>
      <Header />
      <Container>
        <NewPost posts={posts} setPosts={setPosts} localToken={localToken} imageProfile={userData.image}/>
        <Posts posts={posts} setPosts={setPosts} localToken={localToken}/>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
`;

