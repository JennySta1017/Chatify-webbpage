import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import NewUser from './components/register/Register';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import MessageInput from './components/message/Message';
import { useState, useEffect} from "react";
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
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    //Chat meddelande
    const [messages, setMessages] = useState([]);
    


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
    navigate("/Chat");
  } else {
    alert(data.error || "Ett fel uppstod vid inloggning");
  }

} catch (error) {
  console.error("Error logging in:", error);
  alert("Ett fel uppstod vid inloggning");
}     
  };

// Hämta token userData från localStorage vid första laddningen
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (token && userData) {
      setStoredUserData(userData);
      setIsAuthenticated(true);
      console.log("User data loaded from localStorage:", userData);
    } else {
      setIsAuthenticated(false); // Säkerställa att autentiseringen är falsk om ingen data finns
    }
      setLoading(false); // Markera laddningen som klar
  }, []);  

 
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
    } else {
      console.error('Failed to fetch messages:', response.status);
      
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    
  }
};
//Anropar 'getMessages' när chatten laddas
 useEffect(() => {
  if (isAuthenticated) {
    getMessages();
   } else {
      console.log("User is not authenticated, not fetching messages.");
    }
  
}, [isAuthenticated]); 

const handleNewMessage = (newMessage) => {
  console.log("Adding new message:", newMessage);
  setMessages(prevMessages => [...prevMessages, newMessage]) // Uppdatera med det nya meddelandet
};
  
  //Radera meddelanden
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`https://chatify-api.up.railway.app/messages/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: 'Bearer ' + token, // Lägg till Authorization-headern
            'Content-Type': 'application/json',
        },
    });
      if (response.ok) {
        console.log("Meddelandet har tagits bort.");
      } else {
        console.error("Det uppstod ett problem vid borttagning av meddelandet.", response.status);
      }
    } catch (error) {
      console.error("Ett fel uppstod:", error);
    }
    }
  
   

   // Logga ut
    const handleLogout = () => {
      setStoredUserData(null);
      setCsrfToken('');
      localStorage.removeItem('token'); // Rensa token från localStorage
      localStorage.removeItem('userData'); // Rensa användardata från localStorage
      setIsAuthenticated(false);
      navigate("/login");
    
  };

 // Definiera ProtectedRoute-komponenten
    const ProtectedRoute = ({ isAuthenticated, loading }) => {
     if(loading) {
    return <div>Loading...</div>;
  } 
    return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
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
