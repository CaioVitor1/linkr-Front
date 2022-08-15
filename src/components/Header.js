import styled from "styled-components";
import vector from "../assets/vector.svg";
import vector2 from "../assets/vector2.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import SearchBar from "./SearchBar";

export default function Header() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(vector);
  const [classMenu, setClassMenu] = useState("menu");

  const localToken = localStorage.getItem("token");
  const userData = jwt(localToken);

  const toggleOpen = () => {
    setIsOpen(isOpen === vector ? vector2 : vector);
    setClassMenu(classMenu === "menu" ? "open-menu" : "menu");
  };

  return (
    <HeaderProfile>
      <h1 onClick={() => navigate("/timeline")}>Linkr</h1>
      <SearchBar />
      <Logout>
        <img
          draggable={false}
          onClick={toggleOpen}
          width={25}
          height={25}
          src={isOpen}
          alt=""
        />
        <Profile
          draggable={false}
          onClick={toggleOpen}
          width={53}
          height={53}
          src={userData.image}
          alt=""
        />
        <div className={classMenu}>
          <p
            onClick={() => {
              navigate("/");
              localStorage.removeItem("token");
            }}
          >
            {classMenu === "menu" ? "" : "Logout"}
          </p>
        </div>
      </Logout>
    </HeaderProfile>
  );
}

const HeaderProfile = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 28px;
  width: 100%;
  height: 10%;
  background-color: #151515;

  h1 {
    cursor: pointer;
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
    top: 74px;
    transition: 0.2s;
    width: 150px;
    height: 0px;
    color: #fff;
    background-color: #171717;
    border-radius: 0px 0px 0px 20px;
  }

  .open-menu {
    position: absolute;
    top: 74px;
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

const Profile = styled.img`
  border-radius: 26.5px;
`;
