
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components"
import NewPost from "./NewPost.js"
import trash from "../assets/trash.png";
import edit from "../assets/edit.png";
import heart from "../assets/heart.svg";
import heartLiked from "../assets/heartLiked.svg";
import Modal from "react-modal";
import Tippy from '@tippyjs/react';

function RenderPosts({
  likes,
  likesCount,
  posts,
  name,
  userId,
  idUser,
  url,
  image,
  profile,
  description,
  comment,
  title,
  token,
  postid,
  setPosts,
}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [edition, setEdition] = useState(false);
    const [updateComment, setUpdateComment] = useState(comment);
    const [loadingEdit, setLoadingEdit] = useState(false)
   // heart e heartLiked são as imagens dos corações preenchidos ou não.
   //UserId: Id de quem escreveu o post; idUser: Id do usuário logado
    const [imgheart, setImgheart] = useState(heart);
    const [isliked, setIsliked] = useState(false)
  
  function deleteLike() {
    console.log("chegou aqui")
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  let body = {
    idUser: idUser,
    postid: postid
  }
  console.log(body)
 
  const promise = axios.post("http://localhost:4000/deletelikes", body, config)
  promise
  .then(res =>{
      console.log(res.data)
      updatePosts()
     
  })
  .catch(err => {
      console.log(err);
      alert("An error occured while trying to fetch the posts, please refresh the page")
      
  })
  }

  function addLike() {
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  let body = {
    idUser: idUser,
    postid: postid
  }
 
  const promise = axios.post("http://localhost:4000/addlikes", body, config)
  promise
  .then(res =>{
      console.log(res.data)
      updatePosts()
     
  })
  .catch(err => {
      console.log(err);
      alert("An error occured while trying to fetch the posts, please refresh the page")
      
  })
  }

    function toggleLike() {
      
      if(liked === "false") {
        liked = "true"
        console.log("mudei pra true")
        //Acrescenta like
        console.log(idUser)
        console.log(postid)
        addLike()
        return
      } 

      if(liked === "true") {
        liked = "false"
        console.log("mudei pra false")
        //remove like
        deleteLike()
   
      }


     
    }
  
    
    let inputComment = useRef();
    
    Modal.setAppElement('.root');
    function openLink() {
        window.open(url)
    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false)
    }
    function updatePosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get("http://localhost:4000/getposts", config)
        promise
        .then(res =>{
            setPosts(res.data)
            
           
        })
        .catch(err => {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page")
            
        })
    }
    function deletePost() {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.delete(`http://localhost:4000/deletepost/${postid}`, config);
        promise
        .then(res =>{
            updatePosts()
            setIsOpen(false)
        })
        .catch(err => {
            setIsOpen(false)
            console.log(err);
            alert("Houve erro ao deletar seu link")
        })
    }
    
    function editPost(e){
        setEdition(true);
        if(e.key === "Escape") {
            setEdition(false)
        } if(e.key === "Enter" && updateComment !== comment) {
            setLoadingEdit(true)
            console.log("apertaram o Enter");

            let body = {
                updateComment: updateComment,
                url: url
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const promise = axios.put("http://localhost:4000/updateposts", body, config)
            promise
            .then(res =>{
                setLoadingEdit(false)
                updatePosts()
                setEdition(false)
                console.log(res.data)
               
               
            })
            .catch(err => {
                console.log(err);
                setLoadingEdit(false)
                alert("An error occurred while trying to update the comment. Try again!An error occured while trying to fetch the posts, please refresh the page")
               
            })
        } 
        if(e.key === "Enter" && updateComment === comment){
            console.log("O texto não foi alterado")
            setEdition(false)
    }
}
let liked = "false"
function checkLike(likes){

  if(likes.length === 0) {
    return console.log("ninguém deu like")
    
  } 
    for(let i = 0; i < likes.length; i++) {
      console.log(likes.length)
      if(likes[i].userId === idUser){
         //setIsliked(true)
         liked = "true"
       
      }
  }
  
}
let texto = ""
if(likes.length === 0) {
  texto = "Ninguém curtiu esse post"
} else{
  texto = `Curtido por ${likes[0].name} e outras ${likesCount-1} pessoas`
}

    return (
        <PostsBody>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={ModalStyle}
            >
                <ModalStyle>
                    <h2>Are you sure you want to delete this post?</h2>
                    <ButtonsModal>
                        <Back onClick={closeModal}> No, go back</Back>
                        <Confirm onClick={deletePost}> Yes, delete it</Confirm>
                    </ButtonsModal>
                   
                </ModalStyle>
               

            </Modal>
                   <PostInfo>
                      <Profile src={profile} />

                      <Tippy content={<span style={{color: 'orange'}}>{texto}</span>} >
                         <Likess onClick={toggleLike} >

                          {checkLike(likes)}
                       
                          {(liked === "false") && (<img src={heart} />)}
                          {(liked === "true") && (<img src={heartLiked} />)}  
                         
                      
                        </Likess>
                        </Tippy>

                      <p>{likesCount} likes</p>
                    </PostInfo>
                    <PostDescription>
                        <HeaderPost>
                            <Left>
                                <PostUser> {name}</PostUser>
                            </Left>
                            {(idUser === userId) && (<Rigth>
                                <img onClick={editPost} src={edit} />
                                <img onClick={openModal} src={trash} />
                            </Rigth>)}
                            
                        </HeaderPost>
                        {(edition === false) && (<PostSubtitle> {comment}</PostSubtitle>)}
                        {(edition === true) && (loadingEdit === false) && (<PostInput> <input autoFocus type='text' ref={inputComment} onKeyDown={editPost} value={updateComment} onChange={(e) => setUpdateComment(e.target.value)}/> </PostInput>)}
                        {(edition === true) && (loadingEdit === true) && (<PostInput> <input disabled value={updateComment} type='text' /> </PostInput>)}
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

export default function Posts({posts, setPosts, localToken, idUser}) {

    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      
        setLoading(true)
        
        const config = {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        } 
        const promise = axios.get("http://localhost:4000/getposts", config)
        promise
        .then(res =>{
            setPosts(res.data)
            setLoading(false);
          
           
        })
        .catch(err => {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page")
            setLoading(false);
        })
    }, []) 
   console.log(posts)



  return (
    <>
      {loading === false && posts.length === 0 && (
        <NoPosts>There are no posts Yet</NoPosts>
      )}
      {loading === true && <NoPosts>LOADING...</NoPosts>}
      {loading === false && posts.length !== 0 && posts.length !== 0 && (
        <>
          {posts.map((data) => (
            <RenderPosts
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

const PostsBody = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  width: 45%;
  background: #171717;
  border-radius: 16px;
  display: flex;
`;

const PostDescription = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 20px;
`;
const PostUser = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const PostSubtitle = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  margin-bottom: 10px;
  color: #b7b7b7;
`;

const PostLink = styled.div`
  width: 100%;
  height: 100%;
  left: 502px;
  top: 596px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
`;

const PostContent = styled.div`
  width: 60%;
  margin-top: 10px;
  margin-left: 10px;
  word-wrap: break-word;
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-top: 10px;
  }
  h3 {
    margin-top: 10px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
  }
  h4 {
    margin-top: 10px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }
`;

const PostImage = styled.div`
  width: 40%;
  border-radius: 0px 12px 13px 0px;
  img {
    border: solid;
    width: 100%;
    height: 100%;
  }
`;

const HeaderPost = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div``;

const Rigth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
    width: 3vh;
    height: 3vh;
    object-fit: fill;
  }
`;
const ModalStyle = styled.div`
  margin-top: 150px;
  margin-left: 70px;
  width: 597px;
  height: 262px;
  background: #333333;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #ffffff;
  }
`;

const Back = styled.div`
  width: 134px;
  height: 37px;
  background: #ffffff;
  border-radius: 5px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #1877f2;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Confirm = styled.div`
  width: 134px;
  height: 37px;
  background: #1877f2;
  border-radius: 5px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsModal = styled.div`

display: flex;
justify-content: center;
align-items: center;
margin-top: 30px;
`
const PostInput = styled.div`
input {
width: 100%;
margin-bottom: 10px;
background: #FFFFFF;
border-radius: 7px; 
}
`

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    font-family: "Lato";
    color: #fff;
    font-size: 11px;
    font-weight: 400;
  }
`;

const Likess = styled.div`
  margin-top: 19px;
  margin-bottom: 10px;
  img{
    width: 20px;
    height: 18px;
  }
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  left: 433px;
  border-radius: 26.5px;
`;

