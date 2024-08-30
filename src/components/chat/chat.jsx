import './Chat.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Chat = ({
    storedUserData,
    newMessage,
    setNewMessage,
    createNewMessage,
    messages,
}) => {

    const navigate = useNavigate();

    const toNewMessage = () => {
        navigate("/Message.jsx")
    };

    return (
        <>
        <div id='user-box'>
            <div id='avatar-box'><img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/></div> 
            <div id='welcome-box'><h1>Välkommen {storedUserData?.user}!</h1></div>
        </div>
         {/* hämtade meddelanden */}
         <div id="message-box">
         {messages && messages.length > 0 ? (
    messages.map((message) => (
        <div key={message.id} className="message-item">
            <p>{message.text}</p>
        </div>
                ))
            ) : (
                <p>Inga meddelanden ännu.</p>
            )}
        </div> 

        <Button variant="dark" onClick={toNewMessage}>Skriv ett meddelande</Button>
        
        
        </>
    );

};

export default Chat;