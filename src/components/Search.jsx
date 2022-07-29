import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const [food, setFood] = useState([]);
  const [timerId, setTimerId] = useState();
  const navigate = useNavigate();

  const inputReference = useRef(null);

  const borderStyle =
    input && food?.length > 0
      ? { borderRadius: "1.5rem 1.5rem 0rem 0rem" }
      : {};

  useEffect(() => {
    inputReference.current.focus();
  }, [input]);

  const searchQuery = async (query) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`
    );
    const data = await res.json();
    setFood(data.results);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    // setFood([]);
    if (e.target.value !== "") {
      if (timerId) {
        clearTimeout(timerId);
      }
      setTimerId(setTimeout(() => searchQuery(e.target.value), 500));
      // searchQuery(e.target.value);
    }
  };

  const setSuggetion = (e) => {
    setInput(e.target.textContent);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
    setInput("");
    setFood([]);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          style={borderStyle}
          ref={inputReference}
          onChange={handleInput}
          type="text"
          value={input}
        />
      </div>

      {food?.length > 0 && input && (
        <Results>
          {food.map((item, index) => (
            <p key={index} onClick={setSuggetion}>
              {item.title}
            </p>
          ))}
        </Results>
      )}
    </FormStyle>
  );
}

const Results = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  /* ::-webkit-scrollbar {
    display: none;
  } */

  p {
    /* border: none; */
    background: #353333;
    font-size: 1.5rem;
    color: white;
    padding: 0.5rem 3rem;
    height: 3rem;
    border: none;
    overflow-y: scroll;
    outline: none;
    width: 100%;

    &:hover {
      background: #454242;
      cursor: pointer;
    }
  }
`;

const FormStyle = styled.form`
  margin: 0rem 15rem;

  div {
    position: relative;
    width: 100%;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 0.5rem 3rem;
    border: none;
    border-radius: 1.5rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
