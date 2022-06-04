import { React, useContext } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AuthContext from './AuthLoggedIn';
import Signupform from './Signupform';
import Login from './Login';

function Routers() {
  const { loggedIn } = useContext(AuthContext);



  return (
    <div className="app">
     
      <div className="app__body">
         <Router>
            <Switch>
             {loggedIn === false &&(
               <>
               <Route path="/register">
                 <Signupform  />
               </Route>
               <Route exact path="/">
                 <Login />
               </Route>
               </>
             )
             }
             {loggedIn === true && (
               <>
               <Route path="/">
                  <Sidebar />
              </Route>
              <Route path="/users/:userId">
                  <Chat />
              </Route>
               </>
             )
              
             }
               
            </Switch>
         </Router>
      </div>
   </div>
  );
}

export default Routers;
