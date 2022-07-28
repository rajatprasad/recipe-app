import React from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Container>
          {popular.map((recipe) => {
            return (
              <Card key={recipe.id}>
                <Background>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <h6> Helath Score: {recipe.healthScore}</h6>
                    <img src={recipe.image} alt={recipe.title} />
                  </Link>
                </Background>
              </Card>
            );
          })}
        </Container>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 2rem 0rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 25rem;
  overflow-y: hidden;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  margin-right: 2.5rem;

  &:hover {
    transform: scale(1.08);
  }
`;

const Background = styled.div`
  /* background-color: rgba(255, 255, 255, 0.555);
  backdrop-filter: blur(10px); */

  background-color: white;
  border: 2px solid white;
  border-radius: 20px;
  height: 19rem;
  padding-left: 3rem;
  padding-right: 3rem;
  margin-top: 5rem;
  position: relative;

  img {
    width: 10rem;
    height: 10rem;
    margin-top: -4rem;
    border-radius: 50%;
    border: 4px solid #d96e77;
    filter: drop-shadow(0px 16px 10px #b1afaf);
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    padding: 2rem;
    bottom: 20%;
    transform: translate(-50%, 0%);
    color: rgb(56, 56, 56);
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h6 {
    position: absolute;
    z-index: 10;
    left: 50%;
    padding: 2rem;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: rgb(129, 129, 132);
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 0.8rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
