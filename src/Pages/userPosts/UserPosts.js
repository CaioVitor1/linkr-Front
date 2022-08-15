import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";
import jwt from "jwt-decode";
import Post from "../../components/Post";


export default function HashtagPosts(){
    const { userId } = useParams();
    const [listUserPosts, setListUserPosts] = useState([]);
    const [userName, setUserName] = useState("");
    const localToken = localStorage.getItem("token");
    const userData = jwt(localToken);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserPosts();
    }, []);


    async function getUserPosts(){

        try{
            const userPosts = await (await axios.get(`http://localhost:4000/user/${userId}`)).data;

            if(!userPosts){
                console.log("Problema ao obter trending");
            }

            console.log("resposta userPosts: " );
            console.log(userPosts);


            setUserName(userPosts[0].name);
            setListUserPosts([...userPosts]);

        }catch(error){
            console.log(error);
        }

    }

    return(
        <>
        <Header />
        <Container>
        <Username><h1>{userName}</h1></Username>
        <ContainerHashtagPosts>
        {loading === false && listUserPosts.length === 0 && (
          <NoPosts>There are no posts Yet</NoPosts>
        )}
        {loading === true && <NoPosts>LOADING...</NoPosts>}
        {loading === false && listUserPosts.length !== 0 && listUserPosts.length !== 0 && (
          <>
            {listUserPosts.map((data) => (
              <Post
                idUser={userData.id}
                likesCount={data.likesCount}
                userId={data.id}
                setPosts={setListUserPosts}
                posts={listUserPosts}
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




const Username = styled.div`
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