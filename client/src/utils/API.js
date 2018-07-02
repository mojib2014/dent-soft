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
    


}