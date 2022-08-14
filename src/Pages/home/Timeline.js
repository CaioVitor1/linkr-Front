import styled from "styled-components";
import Header from "../../components/Header";
import jwt from "jwt-decode";
import NewPost from "../NewPost";
import Posts from "../Posts";
import { useState, useEffect } from 'react';
import Trending from "../../components/Trending";


export default function Timeline() {
  const localToken = localStorage.getItem("token");
  const userData = jwt(localToken);
  const [posts, setPosts] = useState([]);

  return (
    <>
      <Header />
        <Container>
          <ContainerPosts>
          <TimelineTitle> <h2> Timeline</h2> </TimelineTitle>
            <NewPost posts={posts} setPosts={setPosts} localToken={localToken} imageProfile={userData.image}/>
            <Posts posts={posts} setPosts={setPosts} localToken={localToken}/>
          </ContainerPosts>
          <TrendingContainer>
            <Trending />
          </TrendingContainer>
        </Container>
      
    </>
  );
}


const TimelineTitle = styled.div`
width: 100%;
height: 10vh;
display: flex;
justify-content: center;
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 64px;
color: #FFFFFF;
`

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  background-color: #333333;
`;

const ContainerPosts = styled.div`
  width: 60%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #333333;
  margin-right: 2vw;
`;

const TrendingContainer = styled.div`
  width: 40%;
  align-items: flex-start;
  margin-top: 10vh;
`
