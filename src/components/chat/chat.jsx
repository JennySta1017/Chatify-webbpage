import './Chat.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Chat = ({
    storedUserData,
}) => {



    return (
        <>
        <div id='user-box'>
            <div id='avatar-box'><img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/></div> 
            <div id='welcome-box'><h1>Välkommen {storedUserData?.user}!</h1></div>
        </div>
        <Form id="chatmessage">
            <Form.Group className="mb-3" controlId="formBasicChat">
            <Form.Label>Skriv ett nytt meddelande:</Form.Label>
            <Form.Control 
            className="input" 
            type="textarea" 
            placeholder="Skriv ett meddelande här..." 
        /* value={chatMessage} 
            onChange={(e) => setNewChatMessage(e.target.value)} */
            />
            </Form.Group>
            <Button id="chatbutton" variant="dark" type="button" >
            Spara
            </Button>
        </Form>
        </>
    );

};

export default Chat;