import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components"
import NewPost from "./NewPost.js"
import trash from "../assets/trash.png";
import edit from "../assets/edit.png";
import Modal from 'react-modal';

function RenderPosts({name, url, image, profile, description, comment, title, token, postid, setPosts}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    
console.log(token)
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
            console.log(res.data);
            setPosts(res.data)
            
           
        })
        .catch(err => {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page")
            
        })
    }
    function deletePost() {
        console.log("vamos deletar")
        console.log(postid, token);
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.delete(`http://localhost:4000/deletepost/${postid}`, config);
        promise
        .then(res =>{
            console.log(res.data);
            updatePosts()
            setIsOpen(false)
        })
        .catch(err => {
            setIsOpen(false)
            console.log(err);
            alert("Houve erro ao deletar seu link")
        })
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
                    <img src={profile} />
                    <PostDescription>
                        <HeaderPost>
                            <Left>
                                <PostUser> {name}</PostUser>
                            </Left>
                            <Rigth>
                                <img src={edit} />
                                <img onClick={openModal} src={trash} />
                            </Rigth>
                            
                        </HeaderPost>
                        
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

export default function Posts({posts, setPosts, localToken}) {
    
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
                {posts.map((data) => <RenderPosts setPosts={setPosts} token={localToken} postid={data.postid} name={data.name}  url={data.url} image={data.image} profile={data.profile} comment={data.comment} title={data.title} description={data.description} />)}    
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
color: White;
margin-bottom: 40px;

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

const HeaderPost = styled.div`

display:flex;
justify-content: space-between;
`

const Left = styled.div`

`

const Rigth = styled.div`
display: flex;
justify-content: center;
align-items: center;
img{
    margin-right: 10px;
    width: 14px;
    height:14px;
}
`
const ModalStyle = styled.div`
margin-top:150px;
margin-left: 70px;
width: 597px;
height: 262px;
background: #333333;
border-radius: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h2{
    font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 34px;
line-height: 41px;
text-align: center;
color: #FFFFFF;
}
`

const Back = styled.div`
width: 134px;
height: 37px;
background: #FFFFFF;
border-radius: 5px;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 22px;
color: #1877F2;
margin-right: 20px;
display: flex;
justify-content: center;
align-items: center;
`

const Confirm = styled.div`
width: 134px;
height: 37px;
background: #1877F2;
border-radius: 5px;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 22px;
color: #FFFFFF;
display: flex;
justify-content: center;
align-items: center;
`

const ButtonsModal = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 30px;
`