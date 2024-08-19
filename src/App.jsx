import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import NewUser from './components/register/register';
import Home from './components/home/home';
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './App.css'

function App() {
  // Skapa ny användare
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const navigate = useNavigate();

  // Registrera en ny användare
  const registerNewUser = async () => {
    const newUser = {
      username: userName,
        password: password,
        email: email,
        avatar:
    };

    const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
 
  if (!response.ok) {
    alert("Det gick inte att registrera användaren");
    return;
  }
   setuserName("");
   setpassword("");
   setemail("");
   navigate("/login");
  };

  return (
    <>
     <Header /> 
     <Navbar />
     <Routes>
      <Route
          exact
          path="/"
          element={
            <Home/>
          }
          />
        <Route
          exact path="/register"
          element={
            <NewUser/>
          }
          />
         {/*
        
          
          <Route
          exact
          path="/login"
          element={
            <Login/>
          }
          />
          */}
      </Routes> 
    </>
  )
}

export default App;
