import './chat.css';

const Chat = ({
    storedUserData,
}) => {



    return (
        <div id='user-box'>
        <div id='welcome-box'><h2>Välkommen {storedUserData?.user}!</h2></div>
        <div id='avatar-box'><img src={storedUserData.avatar} alt={`Bild av  ${storedUserData.user}`}/></div> 

        </div>
    );

};

export default Chat;