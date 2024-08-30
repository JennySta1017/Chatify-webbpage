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

    //Chat
    const [newMessage, setNewMessage] = useState("");
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
      return null;
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return null;
  }
};
//Anropar 'getMessages' när chatten laddas
 useEffect(() => {
  console.log("useEffect running, isAuthenticated:", isAuthenticated);
  if (isAuthenticated) {
    console.log("Fetching messages...");
    getMessages();
   } else {
      console.log("User is not authenticated, not fetching messages.");
    }
  
}, [isAuthenticated]);  
  
   //Skapa nytt meddelande
   const createNewMessage = async () => {
     if (!newMessage.trim()) {
        alert("Meddelandet får inte vara tomt.");
        return;
    } 

       const messageData = {
        text: newMessage,
        conversationId: null,
    };

    try {
        const response = await fetch('https://chatify-api.up.railway.app/messages', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Message created successfully:', result);
            setNewMessage(''); // Rensa textfältet efter lyckad skickning
            console.log('New message after sending:', newMessage); // Logga nya meddelandet
        } else {
            console.error('Failed to create message:', response.status);
        }
    } catch (error) {
        console.error('Error creating message:', error);
    }
}; 


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
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          createNewMessage={createNewMessage}
          messages={messages}
          />
          } 
        />
        </Route>
        <Route
          exact path="/Message"
          element={
          <MessageInput 
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          createNewMessage={createNewMessage}
            />
          } 
        />    
      </Routes> 
      </div>
    </>
  );
};

export default App;
