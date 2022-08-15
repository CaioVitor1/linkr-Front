import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";
import jwt from "jwt-decode";
import Post from "../../components/Post";

export default function HashtagPosts(){
    const { hashtagName } = useParams();
    const [listHashtagPosts, setListHashtagPosts] = useState([]);
    const localToken = localStorage.getItem("token");
    const userData = jwt(localToken);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getHashtagPosts();
    }, []);


    async function getHashtagPosts(){

        try{
            const hashtagPosts = await (await axios.get(`http://localhost:4000/hashtag/${hashtagName}`)).data;

            if(!hashtagPosts){
                console.log("Problema ao obter trending");
            }

            console.log("resposta getHashtagPosts: " );
            console.log(hashtagPosts);

            setListHashtagPosts([...hashtagPosts]);

        }catch(error){
            console.log(error);
        }

    }

    return(
        <>
        <Header />
        <Container>
        <HashtagName><h1># {hashtagName}</h1></HashtagName>
        <ContainerHashtagPosts>
        {loading === false && listHashtagPosts.length === 0 && (
          <NoPosts>There are no posts Yet</NoPosts>
        )}
        {loading === true && <NoPosts>LOADING...</NoPosts>}
        {loading === false && listHashtagPosts.length !== 0 && listHashtagPosts.length !== 0 && (
          <>
            {listHashtagPosts.map((data) => (
              <Post
                idUser={userData.id}
                likesCount={data.likesCount}
                userId={data.id}
                setPosts={setListHashtagPosts}
                posts={listHashtagPosts}
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
              />
            ))}
          </>
        )}
    </ContainerHashtagPosts>
    </Container>
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



const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
`;

const ContainerHashtagPosts = styled.div`
  width: 70%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
`;




const HashtagName = styled.div`
    width: 40%;
    margin-bottom: 2vh;
    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`