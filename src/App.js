import "./App.css";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import { Link, useLocation } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  console.log(window.location.pathname);

  const location = useLocation();
  return (
    <div className="App">
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>HUNGRY</Logo>
      </Nav>
      {location.pathname === "/" && (
        <HeroText>
          <h1>
            Simple and <br />
            Tasty Recipes
          </h1>
        </HeroText>
      )}

      <Search />
      <Category />
      <Pages />
    </div>
  );
}

const HeroText = styled.div`
  text-align: center;

  h1 {
    font-family: "Abril Fatface", cursive;
    font-size: 4rem;
    font-weight: 400;
    margin-bottom: 5rem;
    color: #222;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 400;
  margin-left: 0.2rem;
  /* font-family: "Lobster", cursive; */
  color: red;
`;

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2.3rem;
    color: white;
    border-radius: 50%;
    background-color: red;
    padding: 5px;
  }
`;

export default App;
