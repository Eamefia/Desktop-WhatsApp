import { React } from 'react';

import axios from 'axios';
import { AuthContextProvider } from './AuthLoggedIn';
import Routers from './Routers';

axios.defaults.withCredentials = true;



function App() {

  return (
     <AuthContextProvider>
       <Routers />
     </AuthContextProvider>
  );
}

export default App;
