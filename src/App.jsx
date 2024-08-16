import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import Register from './components/register/register';
import Home from './components/home/home';
import { Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <>
     <Header /> 
     <Navbar />
     <Routes>
      <Route
          exact
          path="/"
          element={
            <Home/>
          }
          />
        <Route
          exact path="/register"
          element={
            <Register/>
          }
          />
         {/*
        
          
          <Route
          exact
          path="/login"
          element={
            <Login/>
          }
          />
          */}
      </Routes> 
    </>
  )
}

export default App;
