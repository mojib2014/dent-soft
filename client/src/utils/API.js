import axios from "axios";

export default {

    newLogin: (patientData) => {
        return axios.post("/api/user/google", patientData);
    },
    localLogIn: (loginData) => {
        return axios.get("/api/patient-login/"+loginData.email);  
    },
    getGoogleId: () => {
        return axios.get("/api/googleclientid");
    },
    createAccount: (newUser)=> {
        console.log(newUser)
        return axios.post("/api/user/signup", newUser);
    },
    setCookie: (userId) => {
        return axios.post("/api/cookie", userId);
    }

}