import './Message.css'
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


const MessageInput = ({ onNewMessage }) => { 
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();

     //Skapa nytt meddelande
   const createNewMessage = async () => {
    const token = localStorage.getItem('token');

    // Sanitize message input
    const sanitizedMessage = DOMPurify.sanitize(newMessage);

    if (!sanitizedMessage.trim()) {
       alert("Meddelandet får inte vara tomt.");
       return;
   } 
        const messageData = {
        text: sanitizedMessage,
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
           onNewMessage(result.latestMessage); // Skicka det nya meddelandet till Chat-komponenten
           navigate("/Chat")
       } else if (response.status === 403) {
        // Token är ogiltig eller har gått ut
        handleLogout(); // Logga ut användaren
      } else {
           console.error('Failed to create message:', response.status);
       }
    } catch (error) {
       console.error('Error creating message:', error);
    }
    }; 

    return (
        <Form id="chatmessage" >        
            <Form.Group className="mb-3" controlId="Textarea">
            <Form.Label>Skriv ett nytt meddelande</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={5} 
                className="input" 
                placeholder="Skriv ett meddelande här..." 
                value={newMessage}
                onChange={(e) => setNewMessage(DOMPurify.sanitize(e.target.value)) }/>
            </Form.Group>
            
            <Button 
                id="chatbutton" 
                variant="dark" 
                type="button" 
                onClick={createNewMessage}>
                Skicka
            </Button>
        </Form>
    );
};

export default MessageInput;