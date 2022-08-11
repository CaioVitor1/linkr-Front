import styled from "styled-components";
import profile from "../../assets/profile.png";
import vector from "../../assets/vector.svg";
import vector2 from "../../assets/vector2.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Timeline() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(vector);
  const [classMenu, setClassMenu] = useState("menu");

  const toggleOpen = () => {
    setIsOpen(isOpen === vector ? vector2 : vector);
    setClassMenu(classMenu === "menu" ? "open-menu" : "menu");
  };
  const justClose = () => {
    setIsOpen(vector);
    setClassMenu("menu");
  };

  return (
    <>
      <Header>
        <h1>Linkr</h1>
        <Logout>
          <img
            draggable={false}
            onClick={toggleOpen}
            width={25}
            height={25}
            src={isOpen}
            alt=""
          />
          <img
            draggable={false}
            onClick={toggleOpen}
            width={53}
            height={53}
            src={profile}
            alt=""
          />
          <div className={classMenu}>
            <p onClick={() => navigate("/")}>
              {classMenu === "menu" ? "" : "Logout"}
            </p>
          </div>
        </Logout>
      </Header>
      <Container onClick={justClose}></Container>
    </>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 28px;
  width: 100%;
  height: 72px;
  background-color: #151515;

  h1 {
    font-family: "Passion One", cursive;
    font-size: 49px;
    font-weight: 700;
    color: #fff;
  }
`;
const Logout = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  img {
    cursor: pointer;
  }

  .menu {
    position: absolute;
    top: 60px;
    transition: 0.2s;
    width: 150px;
    height: 0px;
    color: #fff;
    background-color: #171717;
    border-radius: 0px 0px 0px 20px;
  }

  .open-menu {
    position: absolute;
    top: 60px;
    transition: 0.2s;
    width: 150px;
    height: 47px;
    color: #fff;
    background-color: #171717;
    border-radius: 0px 0px 0px 20px;

    p {
      cursor: pointer;
      transition: 0.3s;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      font-size: 17px;

      text-align: center;
      margin-top: 10px;
    }
  }
`;
const Container = styled.div`
  height: 100vh;
  background-color: #333333;
`;
