import axios from "axios";

export default {

    googleLogin: (patientData) => {
        return axios.post("/api/user/google", patientData);
    },
    localLogIn: (loginData) => {
        return axios.post("/api/user/locallogin", loginData);  
    },
    getGoogleId: () => {
        return axios.get("/api/googleclientid");
    },
    createAccount: (newUser)=> {
        return axios.post("/api/user/signup", newUser);
    },
    searchByEmail: (email) => {
        return axios.get("/api/user/" + email);
    },
    searchById: (id) => {
        // console.log("api", id)
        return axios.get("/api/user/get/" + id );
    },

    createPhoto: (data) => {
        return axios.post("/api/user/photo",  data);
    },

   
    updateById: (id, object) => {
        return axios.post("/api/user/post/" + id, object);
    },
    addNote: (noteInfo) => {
        return axios.post("/api/note/", noteInfo);
    },

    addRecord:(recordInfo) => {
        return axios.post("/api/records/", recordInfo);
    },

    createPhoto: (photo)=>{
        return axios.post("/api/user/photo", photo)
    }

    // ,
    // setCookie: (userId) => {
    //     return axios.post("/api/cookie", userId);
    // },
    // getCookie: () => {
    //     return axios.get("/api/cookie");
    // }

}