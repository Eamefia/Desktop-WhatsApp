import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:9000",
    baseURL: "https://whatsap-mern-clone.herokuapp.com",
});

export default instance;