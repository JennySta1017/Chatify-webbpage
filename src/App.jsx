import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import './App.css'

function App() {
  

  return (
    <>
     <Header /> 
     <Navbar />
     {/* <Routes>
        <Route
          exact
          path="/"
          element={
            <Home/>
          }
          />
          <Route
          exact
          path="/login"
          element={
            <Login/>
          }
          />
          <Route
          exact
          path="/register"
          element={
            <Register/>
          }
          />
      </Routes> */}
    </>
  )
}

export default App
