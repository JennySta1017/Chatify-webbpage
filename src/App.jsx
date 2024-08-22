import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import NewUser from './components/register/register';
import Home from './components/home/home';
import Login from './components/login/login';
import { useState, useEffect} from "react";
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

    //Logga in
    const [jwtToken, setJwtToken] = useState('');
    const [response, setResponse] = useState('');

    const navigate = useNavigate();

  //Hämta csrf token 
  useEffect(() => {
    fetch('https://chatify-api.up.railway.app/csrf', {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, []);


  // Registrera en ny användare
  const registerNewUser = async () => {
    console.log("Attempting to register new user...");
    const newUser = {
      username: userName,
        password: password,
        email: email,
        avatar: avatarUrl,
        csrfToken: csrfToken,
    };

    
    //Lägg till ny användare
    const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
 
    if(response.ok) { 
      alert("Lyckad registrering");
    } else {
      const errorData = await response.json();
      console.error("Error registering user:", errorData);
      alert(errorData.error || "Ett fel uppstod vid registreringen");
    return;
  }
  
  
   setUserName("");
   setPassword("");
   setEmail("");
   setAvatarUrl("");
   setCsrfToken("");
   navigate("/login");

   console.log(newUser);
  };

  //Logga in genom att hämta JWT
  const handleLogin = async () => {
    setResponse('');
    try {
      const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:userName, password:password, csrfToken:csrfToken }),
      });
      
       // Kontrollera responsens status
        console.log('Response status:', response.status);

      const data = await response.json();
      
      // Logga data från servern
      console.log('Response data:', data); 


  if (response.ok) {
    alert("Lyckad inloggning"); 
    // Spara token 
    setJwtToken(data.token);
  } else {
    alert(data.error || "Ett fel uppstod vid inloggning");
  }

} catch (error) {
  console.error("Error logging in:", error);
  alert("Ett fel uppstod vid inloggning");
}
     
      /* 
        När .env producerad till server
      */
      // setResponse(data.message);
  };

  //definiera protected routes
  const ProtectedRoute = () => { 
    const { isAuthenticated } = useAuth();
      if (!isAuthenticated) {
      navigate("/login");
    }    
  }
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
         
        <Route
          exact
          path="/login"
          element={
            <Login
            handleLogin={handleLogin}
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            />
          }
          />
          <Route element={<ProtectedRoute />}>
          
          </Route>
      </Routes> 
    </>
  )
}

export default App;
