import './register.css';
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewUser = ({
  registerNewUser,

}) => {
    


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
         
          <Button id="formbutton" variant="dark" type="submit" onClick={registerNewUser}>
            Spara
          </Button>
        </Form>
        </>
    );
    
};

export default NewUser;

