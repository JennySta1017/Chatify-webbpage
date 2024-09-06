import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import NewUser from './components/register/register';
import Home from './components/home/home';
import Login from './components/login/login';
import Chat from './components/chat/chat';
import MessageInput from './components/message/Message';
import { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import './App.css'

function App() {
  // Skapa ny användare
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [avatarUrl, setAvatarUrl] = useState('');

    //Inloggning
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [storedUserData, setStoredUserData] = useState(null);
    
    const [loading, setLoading] = useState(true);
    
    const [isNavOpen, setIsNavOpen] = useState(false);

    //Chat meddelande
    const [messages, setMessages] = useState([]);

    const logoutTimerRef = useRef(null);
    const navigate = useNavigate();


  //Hämta csrf token 
    useEffect(() => {
      fetch('https://chatify-api.up.railway.app/csrf', {
        method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, []);


  // Kontrollera om användaren är inloggad och hantera automatisk utloggning
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const tokenExpiration = localStorage.getItem('tokenExpiration');
  
    const checkTokenExpiration = () => {
    const isTokenExpired = tokenExpiration && new Date().getTime() > tokenExpiration;
    if (isTokenExpired) {
      handleLogout();
    } else {
      setStoredUserData(userData);
      setIsAuthenticated(true);
      setLoading(false);

      // Ställ in timeout för automatisk utloggning när tokenen går ut
      const timeUntilLogout = tokenExpiration - new Date().getTime();
      if (timeUntilLogout > 0) {
        logoutTimerRef.current = setTimeout(handleLogout, timeUntilLogout);
    }
  }
  };
      //Om token och användardata finns, kontrollera om token är giltig
      if (token && userData) {
      checkTokenExpiration();
      // Kontrollera tokenens giltighet var 60:e sekund
      const intervalId = setInterval(checkTokenExpiration, 60000);
      return () => clearInterval(intervalId); // Rensa intervallet när komponenten avmonteras
    } else if (token){
      handleLogout();
    } else {
      //om ingen token finns, har användaren inte loggat in än
      setLoading(false);
    }
  }, []);

      // Logga ut
      const handleLogout = () => {
      setStoredUserData(null);
      setCsrfToken('');
      localStorage.removeItem('token'); // Rensa token från localStorage
      localStorage.removeItem('userData'); // Rensa användardata från localStorage
      localStorage.removeItem('tokenExpiration'); // Rensa token expiration
      setIsAuthenticated(false);
      navigate("/login");
 
      if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current); // Rensa timeout om den finns
      logoutTimerRef.current = null;
    }
  };

  //Anropar 'getMessages' när chatten laddas sätt timer för att loggas ut efter en timme när token gått ut
  useEffect(() => {
    if (isAuthenticated) {
    getMessages();
    const logoutTimer = setTimeout(handleLogout, 3600000); // 3600000 ms = 1 timme
    return () => clearTimeout(logoutTimer); // Rensa timeout om användaren loggar ut tidigare
   } else {
      console.log("User is not authenticated, not fetching messages.");
    }  
  }, [isAuthenticated]); 

    // Hämta alla meddelanden för inloggad användare
    const getMessages = async () => {
    const token = localStorage.getItem('token'); // Hämta token från localStorage

    if (!token) {
      console.error('Token not found!');
    return;
  }
    try {
      const response = await fetch('https://chatify-api.up.railway.app/messages?', {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const messages = await response.json();
      console.log('Fetched messages:', messages);
      setMessages(messages);
    } else if (response.status === 403) {
      // Token är ogiltig eller har gått ut
      handleLogout(); // Logga ut användaren
    } else {
      console.error('Failed to fetch messages:', response.status);  
    }
  } catch (error) {
    console.error('Error fetching messages:', error);  
  }
};

  const handleNewMessage = (newMessage) => {
    console.log("Adding new message:", newMessage);
    setMessages([...messages, newMessage]) // Uppdatera med det nya meddelandet
  };

    //Radera meddelanden
  const deleteMessage = async (id) => {
    try {
    const response = await fetch(`https://chatify-api.up.railway.app/messages/${id}`, {
      method: "DELETE",
      headers: {
      Authorization: 'Bearer ' + token, 
      'Content-Type': 'application/json',
    },
  });
    if (response.ok) {
      console.log("Meddelandet har tagits bort.");
      // Uppdatera fakemeddelandena i localStorage
      const storedFakeMessages = JSON.parse(localStorage.getItem('fakeMessages')) || [];
      const updatedFakeMessages = storedFakeMessages.filter(fakeMessage => fakeMessage.messageId !== id);
      localStorage.setItem('fakeMessages', JSON.stringify(updatedFakeMessages));
      } else if (response.status === 403) {
        // Token är ogiltig eller har gått ut
        handleLogout(); // Logga ut användaren
      } else {
        console.error("Det uppstod ett problem vid borttagning av meddelandet.", response.status);
      }
      } catch (error) {
        console.error("Ett fel uppstod:", error);
      }
    };

    // Definiera ProtectedRoute-komponenten
    const ProtectedRoute = ({ isAuthenticated, loading }) => {
      if(loading) {
     return <div>Loading...</div>;
    } 
     return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
  };

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
      navigate("/Login");
      console.log(newUser);
  };

    //Logga in genom att hämta JWT
    const handleLogin = async () => {  
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
        console.log('Response data:', data); // Logga data från servern


    if (response.ok) {
      alert("Lyckad inloggning"); 
    
      // Dekoda JWT och spara token och användardata i localStorage
    const decodedJwt = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem('token', data.token); //Sparar token
      localStorage.setItem('userData', JSON.stringify(decodedJwt)); // Spara dekodad användardata
    //Uppdatera state
      setToken(data.token);
      setStoredUserData(decodedJwt);
      setIsAuthenticated(true);
    // rensa input-fälten
      setUserName("");
      setPassword("");
      getMessages();
      navigate("/Chat");
    } else {
      alert(data.error || "Ett fel uppstod vid inloggning");
    }

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Ett fel uppstod vid inloggning");
    }     
  };
  
  return (
    <>
      <Header /> 
      <Navbar 
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen}
        isAuthenticated={isAuthenticated} 
        handleLogout={handleLogout}
      />
     <div id="main-content" className={`main-content ${isNavOpen ? 'nav-open' : ''}`}>
     <Routes>
      <Route
          exact
          path="/"
          element={
          <Home/>
          }
      />
      <Route
          exact path="/Register"
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
          path="/Login"
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
          {/* Skyddad route för /chat */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}/>}>
        <Route 
          exact path="/Chat" 
          element={
          <Chat 
          storedUserData={storedUserData} 
          messages={messages}
          setMessages={setMessages}  
          deleteMessage={deleteMessage}
        />
          } 
        />
        <Route
          exact path="/Message"
          element={
          <MessageInput
          onNewMessage={handleNewMessage} 
        />
          } 
        />  
        </Route>  
      </Routes> 
      </div>
    </>
  );
};

export default App;
