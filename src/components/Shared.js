import { BiRepost } from 'react-icons/bi'
import styled from "styled-components"
import Modal from "react-modal";
import { useState} from 'react';
import axios from 'axios';

export default function Shared({postid, idUser, token, repostCount, setPosts}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement('.root');
    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false)
    }
    
    function addRepost() {
        console.log(postid, idUser)
        let body = {
            userId: idUser,
            postId: postid
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(`http://localhost:4000/repost`, body, config);
          promise
          .then(res =>{
              updatePosts()
              console.log(res.data)
              setIsOpen(false)
          })
          .catch(err => {
              //setIsOpen(false)
              console.log(err);
              alert("An error occured while trying to share that post")
          })
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
            
        });
    }
    return(
        <Share>
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyle}
        >
            <ModalStyle>
                <h2>Do you want to re-post this link?</h2>
                <ButtonsModal>
                <Back onClick={closeModal}> No, cancel</Back>
                    <Confirm onClick={addRepost}> Yes, share!</Confirm>
                      </ButtonsModal>
                  </ModalStyle>
              </Modal>
            <BiRepost onClick={openModal} color='white' size={30}/>
            <h4> {repostCount} re-posts</h4>
        </Share>
    )
}

const Share = styled.div`
margin-top: 15px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;
text-align: center;
color: #FFFFFF;
`

const ModalStyle = styled.div`
  margin-top: 150px;
  margin-left: 150px;
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

const ButtonsModal = styled.div`

display: flex;
justify-content: center;
align-items: center;
margin-top: 30px;
`

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