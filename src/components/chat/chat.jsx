import './chat.css';

const Chat = ({
    storedUserData,
}) => {



    return (
        <>
        <h2>Välkommen {storedUserData?.user}</h2>
        </>
    );

};

export default Chat;