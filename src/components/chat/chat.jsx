import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Chat.css';
import Button from 'react-bootstrap/Button';



const Chat = ({
    storedUserData,
    messages,
    setMessages,
    deleteMessage,
}) => {

    const navigate = useNavigate();

    const toNewMessage = () => {
        navigate("/Message");
    }
    useEffect(() => {
        console.log("Messages in Chat component updated:", messages);
    }, [messages]);

    const handleDelete = async (id) => {
        await deleteMessage(id);
        // Uppdatera UI:t genom att filtrera bort det raderade meddelandet
        setMessages(messages.filter(message => message.id !== id));
    };

    /* useEffect(() => {
        console.log("Messages updated", messages);
    }, [messages]);
 */
    return (
        <>
        <div id='user-box'>
            <div id='avatar-box'><img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/></div> 
            <div id='username-box'><h1> {storedUserData?.user}</h1></div>
        </div>
         {/* hämtade meddelanden */}
         <div id="message-box">
            
         {messages && messages.length > 0 ? (
            messages.map((message, index) => (
            <div className="message-item" key={message.id || `temp-${index}`}>
            <p>{message.text}</p>
            <Button 
            id="erase-btn" 
            variant="secondary"
            onClick={() => handleDelete(message.id)}>
            Radera
          </Button>
        </div>
                ))
            ) : (
                <p>Inga meddelanden finns att visa.</p>
            )}
        </div> 

        <Button variant="dark" onClick={(toNewMessage)}>Skriv ett meddelande</Button>
        
        </>
    );

};

export default Chat;