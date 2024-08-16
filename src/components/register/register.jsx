import './register.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState(""); 
    return (
        <>
        <h2>Registrera dig nedan</h2>
         <Form id="registerform">
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ange nytt användarnamn:</Form.Label>
          <Form.Control className="input" type="text" placeholder="Användarnamn" value={userName}/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ange nytt lösenord:</Form.Label>
          <Form.Control className="input" type="password" placeholder="Lösenord" value={password}/>
          </Form.Group>
         
          <Button id="formbutton" variant="dark" type="submit">
            Spara
          </Button>
        </Form>
        </>
    );
    
};

export default Register;