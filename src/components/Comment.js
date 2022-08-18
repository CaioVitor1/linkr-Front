import styled from "styled-components";

export default function Comment({comment, userName, userImage, postId, userId}){


    return(
        <CommentContainer>
        <CommentData>
            <Left>
                <img src={userImage} alt="" />
            </Left>
            <Right>
            <UserName>{userName}</UserName>
            <CommentDescr>{comment}</CommentDescr>
            
            </Right>
            
            
            
            
        </CommentData>
        <CommentHr />
        </CommentContainer>
    );
}

const CommentContainer = styled.div`
    width: 100%;
    height: 10vh;    
    margin-top: -8px;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    background: #1E1E1E;
`


const CommentHr = styled.div`
        height: 1px;
        width: 100%;
        color: #484848;
        background-color:#353535;
`

const CommentData = styled.div`
    background-color: #1E1E1E;
    display: flex;
    width: 100%;
    height: 100%;
    margin: 10px 0;

`

const Right = styled.div`

`

const Left = styled.div`
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        height: 40px;
        width: 40px;
        border-radius:100%;
        object-fit: fill;
    }
`

const UserName = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3;
`

const CommentDescr = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
`