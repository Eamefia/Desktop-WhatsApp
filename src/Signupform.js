import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./signup.css";
import AuthContext from './AuthLoggedIn';
import { useHistory } from 'react-router-dom';


function Signupform() {

  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [fileName, setFilename] = useState("");

  const onChangeFile = e => {
    setFilename(e.target.files[0]);
  }
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const sendForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("fname", fname)
      formData.append("lname", lname)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("profileImg", fileName)
      
      //await axios.post("http://localhost:9000/signup/new", formData);
      await axios.post("https://whatsap-mern-clone.herokuapp.com/signup/new", formData);
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }

   
  };


    return (
        <div className="wrapper">
         <section className="form signup">
          <form onSubmit={sendForm} encType="multipart/form-data">
           <div className="name-details">
             <div className="field input">
                <label>First name</label>
                <input name="fname" value={fname} onChange={(e) => setfname(e.target.value)} type="text" placeholder="David" />
             </div>
             <div className="field input">
               <label>Last name</label>
               <input name="lname" value={lname} onChange={(e) => setlname(e.target.value)} type="text" placeholder="Koomson" />
             </div>
           </div>
            <div className="field input">
              <label>Email address</label>
              <input name="email" value={email} onChange={(e) => setemail(e.target.value)} type="text" placeholder="example@gmail.com" />
            </div>
            <div className="field input">
              <label>Password</label>
              <input name="password" value={password} onChange={(e) => setpass(e.target.value)} type="text" placeholder="password" />
            </div>
            <div className="hello">
              <label>choose a profile image</label>
              <input type="file" filename="profileImg" onChange={onChangeFile} />
            </div>
            <button type="submit">Signup</button>
          </form>
        </section>
        </div>
    )
}

export default Signupform;
