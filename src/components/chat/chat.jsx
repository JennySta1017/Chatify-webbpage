import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Chat.css';
import Button from 'react-bootstrap/Button';

const fakeMessages = [{
    "text": "Hej! Bla bla bla bla bla bla bla.",
    "avatar": "https://i.pravatar.cc/150?img=11",
    "username": "Kompis",
    "conversationId": null
    },
    {  
    "text": "Bla bla bla bla bla bla bla. Bla bla bla bla bla bla.",
    "avatar": "https://i.pravatar.cc/150?img=11",
    "username": "Kompis",
    "conversationId": null
    },
    {
    "text": "Bla!",
    "avatar": "https://i.pravatar.cc/150?img=11",
    "username": "Kompis",
    "conversationId": null
    }
];
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

    
    return (
        <>
        <div id='user-box'>
            <div id='avatar-box'><img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/></div> 
            <div id='username-box'><h1> {storedUserData?.user}</h1></div>
        </div>
        <Button id='tonewmsg' variant="outline-primary" onClick={(toNewMessage)}>Skriv ett nytt meddelande</Button>
         
         <div id="message-box">
         {messages && messages.length > 0 ? (
                messages.map((message, index) => {
                 // Kombinera med fakemeddelandet
                    const fakeMessage = fakeMessages[index % fakeMessages.length];
                        
                    return (
                        <div className="message-pair" key={message.id || `temp-${index}`}>
                            <div className="fake-message-item">
                                {fakeMessage && (
                                <>
                                <span id='fake-writer'> {fakeMessage.username} skriver:</span>
                                <span id='fake-writer-text'><img src={fakeMessage.avatar} alt={`Bild av ${fakeMessage.username}`} /><p>{fakeMessage.text}</p></span>
                                            
                                </>
                                )}
                                </div>

                            <div className="my-message-item">
                                <span className='writer'>Du skriver:</span>
                                <p>{message.text}</p>  
            
                        <Button 
                            id="erase-btn" 
                            variant="outline-danger"
                            onClick={() => handleDelete(message.id)}>
                            Radera
                        </Button>
                            </div>
                        </div>
                    );
                    })
                    ) : (
                        <p id='no-msg'>Inga meddelanden finns att visa.</p>
                    )}
            </div> 

       
        
        </>
    );

};

export default Chat;