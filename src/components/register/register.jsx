import './register.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
    const [newUser, setnewUser] = useState([]);
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const HandleSubmit = async (event, userName, password, email) => {
      event.preventDefault();

      const userObj = {
        username: userName,
        password: password,
        email: email,
        
      };

      if(!response.ok) {
        alert("Något gick fel");

      }

      const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      return (
        <>
        setnewUser([...newUser, userObj]);
        navigate("/login");
        </>
      )

    }

    return (
        <>
        <h2>Registrera dig nedan</h2>
         <Form id="registerform">
          <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Ange nytt användarnamn:</Form.Label>
          <Form.Control className="input" type="text" placeholder="Användarnamn" value={userName} onChange={(e) => setuserName(e.target.value)}/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ange nytt lösenord:</Form.Label>
          <Form.Control className="input" type="password" placeholder="Lösenord" value={password} onChange={(e) => setpassword(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-post address:</Form.Label>
        <Form.Control className="input" type="email" placeholder="E-post" value={email} onChange={(e) => setemail(e.target.value)} />
        </Form.Group>
         
          <Button id="formbutton" variant="dark" type="submit">
            Spara
          </Button>
        </Form>
        </>
    );
    
};

export default Register;

