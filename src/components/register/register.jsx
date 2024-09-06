import './Register.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewUser = ({
  registerNewUser,
  userName,
  setUserName,
  password,
  setPassword,
  email,
  setEmail,
  avatarUrl, 
  setAvatarUrl,
  
  })  => {

    // För att hantera visningen av avatarlistan
  const [showAvatars, setShowAvatars] = useState(false);

    
  //För att välja en av de första 10 avatarerna
  const avatars = Array.from({ length: 10 }, (_, index) =>
  `https://i.pravatar.cc/150?img=${index + 1}`
  );
 
  // Funktion som visar eller döljer avatarlistan
  const toggleAvatarList = () => {
    setShowAvatars(!showAvatars);
  };
    return (
        <div id='register-container'>
          <h2>Registrera dig nedan</h2>
          <Form id="registerform">
            <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Ange nytt användarnamn:</Form.Label>
            <Form.Control 
              className="input" 
              type="text" 
              placeholder="Användarnamn" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
            />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ange nytt lösenord:</Form.Label>
            <Form.Control 
              className="input" 
              type="password" 
              placeholder="Lösenord" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-post address:</Form.Label>
            <Form.Control 
              className="input" 
              type="email" 
              placeholder="E-post" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicavatar">
            <Button 
              id="avatarbutton" 
              variant="dark" 
              type="button" 
              onClick={toggleAvatarList} //för att visa/dölja listan
            >
              Välj avatar
            </Button>
        
            {/* Visar avatarlistan om showAvatars är true */}
            {showAvatars && (
           <div style={{ marginTop: '10px' }}>
              {avatars.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Avatar ${index + 1}`}
                style={{ cursor: 'pointer', margin: '5px' }}
                onClick={() => {
                setAvatarUrl(url); // Sätter den valda avatar-URLen
                setShowAvatars(false); // Döljer listan efter valet
                }}
                />
              ))}
            </div>
          )}
            {/* Visar vald avatar eller en plats för feedback */}
            {avatarUrl && (
            <div style={{ marginTop: '10px' }}>
              <p>Vald avatar:</p>
              <img id='vald-avatar' src={avatarUrl} alt="Vald avatar"  />
            </div>
          )}
            </Form.Group>
            <Button id="registerbutton" variant="dark" type="button" onClick={registerNewUser}>
              Spara
            </Button>
          </Form>
          </div>
        );   
      };

export default NewUser;

