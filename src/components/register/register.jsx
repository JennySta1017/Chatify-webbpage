import './register.css';

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
    


    return (
        <>
        <h2>Registrera dig nedan</h2>
         <Form id="registerform">
          <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Ange nytt användarnamn:</Form.Label>
          <Form.Control className="input" type="text" placeholder="Användarnamn" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ange nytt lösenord:</Form.Label>
          <Form.Control className="input" type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-post address:</Form.Label>
        <Form.Control className="input" type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicavatar">
          <Form.Label>Ange nytt användarnamn:</Form.Label>
          <Form.Control className="input" type="text" placeholder="Ange URL till avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}/>
          </Form.Group>
         
          <Button id="registerbutton" variant="dark" type="button" onClick={registerNewUser}>
            Spara
          </Button>
        </Form>
        </>
    );
    
};

export default NewUser;

