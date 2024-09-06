import './login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({
  handleLogin,
  userName,
  setUserName,
  password,
  setPassword,
    }) => {

    return (
      
      <div id='login-box'>
      <div id='login-text'>
        <h1>Logga in på ditt konto</h1>
      </div>
      <Form id='loginform'>
        <Form.Group className="mb-3" controlId="formBasicUser">
        <Form.Label>Användarnamn</Form.Label>
        <Form.Control 
          className="input" 
          type="text" 
          placeholder="Skriv in användarnamn" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPass">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          className="input"   
          type="password" 
          placeholder="Skriv in lösenord" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      
        <Button id= "loginbutton" variant="dark" type="button" onClick={handleLogin}>
          Logga in
        </Button>
      </Form>
      </div>
      
    
    );
};

export default Login;