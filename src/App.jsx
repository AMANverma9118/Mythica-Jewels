import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* The bellow router is not going to work because we are using the react-router-dom so we don't use the app.jsx for the routing we are using the main.jsx*/}
     {/* <Header/>
     <Home/>
     <Footer/> */}
    </>
  )
}

export default App
