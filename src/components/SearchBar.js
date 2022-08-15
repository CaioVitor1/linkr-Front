import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchImg from "../assets/search.svg";
import axios from "axios";

export default function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (search.length < 3) {
      setUsers([]);
      return;
    }

    const promise = axios.get(`http://localhost:4000/users/?search=${search}`);

    promise
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <SearchField>
      <div>
        <DebounceInput
          element={SearchBarInput}
          minLength={3}
          debounceTimeout={300}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={"Search for people"}
          value={search}
        />
        {users.map((user, index) => (
          <span
            onClick={() => {
              navigate(`/user/${user.id}`);
              window.location.reload();
            }}
            key={index}
          >
            <img src={user.image} />
            <p>{user.name}</p>
          </span>
        ))}
      </div>
    </SearchField>
  );
}

const SearchBarInput = styled.input`
  border: none;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  height: 45px;
  padding: 20px;
  width: 100%;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  outline: none;
  :placeholder {
    color: #c6c6c6;
  }
`;

const SearchField = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  width: 40%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  div {
    border-radius: 8px;
    background: #e7e7e7;
    display: flex;
    flex-direction: column;
    span {
      cursor: pointer;
      transition: filter 0.2s ease-in-out;
      display: flex;
      align-items: center;
      margin: 15px;
      background: #e7e7e7;
      border-radius: 8px;
      p {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        cursor: pointer;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 12px;
      }
      :hover {
        filter: brightness(0.9);
      }
    }
  }
`;
