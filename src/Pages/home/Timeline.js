import styled from "styled-components";
import Header from "../../components/Header";
import jwt from "jwt-decode";
import NewPost from "../NewPost";
import Posts from "../Posts";
import { useState, useEffect } from 'react';
import Trending from "../../components/Trending";
import axios from "axios";


export default function Timeline() {
  const localToken = localStorage.getItem("token");
  const userData = jwt(localToken);
  const [posts, setPosts] = useState([]);
  const [listTrendingData, setListTrendingData] = useState([]);

  
  async function getTrendingData(){

    const config = {
        headers: {
            Authorization: `Bearer ${localToken}`
        }
    }

    try{
        const trendingData = await (await axios.get('http://localhost:4000/trendingRanking', config)).data;

        if(!trendingData){
            console.log("Problema ao obter trending");
        }

        console.log("resposta trendingData: " );
        console.log(trendingData);

        setListTrendingData([...trendingData]);

    }catch(error){
        console.log(error);
    }
}

  return (
    <>
      <Header />
      <Container>
      <ContainerPosts>
      <TimelineTitle> <h2> Timeline</h2> </TimelineTitle>

          <NewPost posts={posts} setPosts={setPosts} localToken={localToken} imageProfile={userData.image} getTrendingData={getTrendingData} tokenId={userData.id } />

          <Posts posts={posts} setPosts={setPosts} localToken={localToken} idUser={userData.id}/>
        </ContainerPosts>
        <TrendingContainer>
            <Trending listTrendingData={listTrendingData} setListTrendingData={setListTrendingData}/>
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
