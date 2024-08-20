import './login.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

    return (
    
    <Form id='loginform'>
    <Form.Group className="mb-3" controlId="formBasicUser">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="input" type="email" placeholder="Skriv in användarnamn" />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPass">
        <Form.Label>Password</Form.Label>
        <Form.Control className="input" type="password" placeholder="Skriv in lösenord" />
      </Form.Group>
      
      <Button id= "loginbutton" variant="dark" type="submit">
        Logga in
      </Button>
    </Form>
    
    
    )
};

export default Login;