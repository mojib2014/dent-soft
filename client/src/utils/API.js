import axios from "axios";

export default {

    newLogin: (patientData) => {
        return axios.post("/api/newlogin", patientData);
    },
    localLogIn: (loginData) => {
        return axios.get("/api/patient-login/"+loginData.email);  
    },
    getGoogleId: () => {
        return axios.get("/api/googleclientid");
    }
    // ,
    // setCookie: (userId) => {
    //     return axios.post("/api/cookie", userId);
    // },
    // getCookie: () => {
    //     return axios.get("/api/cookie");
    // }

}