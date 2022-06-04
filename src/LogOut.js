import React, { useContext } from 'react'
import AuthContext from './AuthLoggedIn'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function LogOut() {
    const { getLoggedIn } = useContext(AuthContext);

    const history = useHistory();
    async function Logout(){
        // await axios.get("http://localhost:9000/logout");
         await axios.get("https://whatsap-mern-clone.herokuapp.com/logout");
        await getLoggedIn();
        history.push("/")
    }
    return (
        <button onClick={Logout}>
          Logout
        </button>
    )
}

export default LogOut
