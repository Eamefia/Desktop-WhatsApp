import React, { useState, useContext } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AuthContext from './AuthLoggedIn';
import "./signup.css";
import { useHistory, Link } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();


    async function login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password,
            };
             // await axios.post("http://localhost:9000/login", loginData);
             await axios.post("https://whatsap-mern-clone.herokuapp.com/login", loginData);
            await getLoggedIn();
            // const { data } = await axios.get("http://localhost:9000/getToken");
            const { data } = await axios.get("https://whatsap-mern-clone.herokuapp.com/getToken");
            const token = data.token;
            const decode = jwt_decode(token);
            localStorage.setItem("user_id", decode.user);
            console.log(decode.user);
            history.push("/");
        } catch (err) {
            console.error(err);
            
        }
        
        
    }

    return (
        <div className="wrapper">
         <section className="form signup">
          <form onSubmit={login}>
            <div className="field login input">
              <label>Email address</label>
              <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="example@gmail.com" />
            </div>
            <div className="field login input">
              <label>Password</label>
              <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="password" />
            </div>
            <button type="submit">Login</button>
          </form>
          <Link to="/register">Don't have and account? Register</Link>
        </section>
        </div>
    );
}

export default Login;
