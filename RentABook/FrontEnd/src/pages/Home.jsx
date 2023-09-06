import {useContext} from 'react'

import { LibraryContext } from "../context";
import Library from '../components/Library';
import LogIn from '../components/LogIn';

const Home = () => {
   const cachedStatus = localStorage.getItem("loggedInStatus");
  const { loggedInStatus } = useContext(LibraryContext);

  return (
    <>
    {(cachedStatus || loggedInStatus === "logged-in") ? <Library/> : <LogIn/>}
    
    </>
  )
}

export default Home