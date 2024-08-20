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
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [avatarUrl, setAvatarUrl] = useState('');

    const navigate = useNavigate();

  

  // Registrera en ny användare
  const registerNewUser = async () => {
    const newUser = {
      username: userName,
        password: password,
        email: email,
        avatar: avatarUrl,
        csrfToken: csrfToken,
    };

    //Hämta csrf token 
    useEffect(() => {
      fetch('https://chatify-api.up.railway.app/csrf', {
        method: 'PATCH',
      })
        .then(res => res.json())
        .then(data => setCsrfToken(data.csrfToken))
    }, []);

    //Lägg till ny användare
    const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
 
    if(response.status === 201) { 
      alert("Lyckad registrering");
    }
  if (!response.ok) {
    res.error.data;
  
  }
   setUserName("");
   setPassword("");
   setEmail("");
   setAvatarUrl("");
   setCsrfToken("");
   navigate("/");

   console.log(newUser);
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
            <NewUser
            registerNewUser={registerNewUser}
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
            avatarUrl={avatarUrl} 
            setAvatarUrl={setAvatarUrl}
            csrfToken={csrfToken}
            setCsrfToken={setCsrfToken}
            />
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
