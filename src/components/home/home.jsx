import React from 'react';
import './home.css';

function Home () {

    return (
    <>
    <div id='home-box'>
        <h1>Välkommen till BabbelChatten!</h1>
        <p>Börja chatta genom att logga in. </p>
        <p>Om du inte har ett konto börjar du med att registrera dig.</p>
        <p>Ha så kul!</p>
    </div>
    <div id='home-img-box'><img src="/images/talk.png" alt="" /></div>
    </>
    );
};

export default Home;