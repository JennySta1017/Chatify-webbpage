import React from 'react';
import './Message.css'

const MessageInput = ({ newMessage, setNewMessage }) => {
    return (

        <Form id="chatmessage" >
            <Form.Group className="mb-3" controlId="formBasicChat">
            <Form.Label>Skriv ett nytt meddelande:</Form.Label>
            <Form.Control 
            className="input" 
            as="textarea" 
            placeholder="Skriv ett meddelande här..." 
            
            />
            </Form.Group>
            <Button id="chatbutton" variant="dark" type="button" onClick={createNewMessage}>
            Spara
            </Button>
        </Form>


    );

};

export default MessageInput;