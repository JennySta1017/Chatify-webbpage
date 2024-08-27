import './chat.css';

const Chat = ({
    storedUserData,
}) => {



    return (
        <div id='user-box'>
            <div id='avatar-box'><img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/></div> 
            <div id='welcome-box'><h1>Välkommen {storedUserData?.user}!</h1></div>
        </div>
    );

};

export default Chat;