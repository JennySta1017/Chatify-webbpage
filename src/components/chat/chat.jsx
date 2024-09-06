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
    "text": "Bla bla bla!",
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
        // Filtrera bort det raderade meddelandet
        setMessages(messages.filter(message => message.id !== id));
    };

    //Hämta datum och tid
    const currentDate = new Date();

    // Hämta dagens datum
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Månaderna är 0-indexerade, så man måste lägga till 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Hämta aktuell tid
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // Formatera datum och tid
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;
    
    return (
        <>
        <div id='user-box'>
            <div id='avatar-box'>
                <img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/>
            </div> 
            <div id='username-box'>
                <h2> {storedUserData?.user}</h2>
            </div>
        </div>
        <Button 
            id='tonewmsg' 
            variant="primary" 
            onClick={(toNewMessage)}>
            Skriv ett nytt meddelande
        </Button>
         
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
                        <span id='fake-writer'> {fakeMessage.username} skrev {formattedDate} kl. {formattedTime}:</span>
                        <span id='fake-writer-text'><img src={fakeMessage.avatar} alt={`Bild av ${fakeMessage.username}`} /><p>{fakeMessage.text}</p></span>                        
                        </>
                        )}
                    </div>

                    <div className="my-message-item">
                        <span className='writer'>Du skrev {formattedDate} kl. {formattedTime}:</span>
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
                        <p id='no-msg'>Det finns inga meddelanden att visa.</p>   
                    )}
            </div> 
        </>
        );
    };

export default Chat;