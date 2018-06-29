import axios from "axios";

export default {

    saveNewPatient: (PatientData) => {
        return axios.post("/api/new-patient", PatientData);
    },
    localLogIn: (loginData) => {
        return axios.get("/api/patient-login/"+loginData.email);  
    },
    googleLogin:()=>{
        return axios.get("/auth/google")
    }


}