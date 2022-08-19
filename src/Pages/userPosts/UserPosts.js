import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";
import jwt from "jwt-decode";
import Post from "../../components/Post";
import Follow  from "../../components/Follow.js";

export default function HashtagPosts(){
    const { userId } = useParams();
    const [listUserPosts, setListUserPosts] = useState([]);
    const [userName, setUserName] = useState("");
    const localToken = localStorage.getItem("token");
    const userData = jwt(localToken);
    const [loading, setLoading] = useState(false);
    const follower = parseInt(userData.id)
    const profileId = parseInt(userId) 
    const [following, setFollowing] = useState(false) //diz se os usuários já se seguem
    const [loadFollow, setLoadFollow] = useState(false) 

    useEffect(() => {
        getUserPosts();
    }, []);
    
    useEffect(() => {
      getFollowing();
  }, []); 

    async function getUserPosts(){
        const config = {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        }

        try{
            const userPosts = await (await axios.get(`http://localhost:4000/user/${userId}`, config)).data;

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

   function getFollowing() {
     const config = {
        headers: {
            Authorization: `Bearer ${localToken}`
        }
    } 
      const promise = axios.get(`http://localhost:4000/follow/${profileId}`, config)
      promise
    .then(res =>{  
      console.log("tá aqui")
      console.log(profileId) 
      console.log(follower)    
      console.log(res.data)
      setFollowing(res.data)
    })
    .catch(err => {
        console.log(err);
        alert("An error occured while trying looking for following")
    
    });
    }

    return(
        <>
        <Header />
        <Container>
        <Username>
          <h1>{userName}'s posts</h1>

          <Follow 
                profileId={profileId}
                follower={follower}
                loadFollow={loadFollow} 
                setLoadFollow={setLoadFollow} 
                following={following} 
                setFollowing={setFollowing} 
                localToken={localToken} />
        </Username>

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
                commentsCount={data.commentsCount}
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
    width: 70%;
    justify-content: space-between;
    align-items: center;
    margin-left: 300px;
    margin-bottom: 2vh;
    display: flex;
    
    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`

