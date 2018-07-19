# Dent Soft


[👉  Live demo 👈](https://dent-soft.herokuapp.com/)

admin login: momo@yahoo.com  
psw: jjj111

## Description
Dent Soft (DS)
 is a streamlined and standardized electronic system specially designed for multiple users in dental clinics, and it can be used by dentists to maintain daily records of their patients. 
DS provides user-friendly and comprehensive functionalities, covering treatment plan, schedule appointments, record medical exams, and accounts report management with all the facilities to maintain patient history.

## Features
![Local Signup](/client/src/assets/images/dsLocalSignup.gif)

![Local Login](client/src/assets/images/dsLocalLogin.gif)

![Google Login](client/src/assets/images/dsGoogleLogin.gif)

- Login system
- Special Doctor view optimised for usability given that it is to be used on a touch screen for the soul purpose of checking a given day's appointments and adding notes and treatments for an appointment
- Secretary view designed to make everything easily and quickly reached
- Supports patients having health plans
- Payments simulation system
- Different appointment types
- Setup Wizard that runs on the first run of the app or when an error is found with the database tables
- Week-view for appointments in the secretary view
- Day-view for appointments in the Doctor view

### Users of the DS:
#### Administrator.
![Dentist Login](client/src/assets/images/dsDentistLogin.gif)

    Add a new doctor.
    Add a new receptionist.
    Delete a doctor.
    Delete a receptionist.
    Get reports.
#### Doctor.
    Add a medical examination.
    Add a medical detailed plan.
![Dentist File Methods](client/src/assets/images/dsDentistFileMethods.gif)

    Add a treatment.
    Add an external file.
#### Receptionist. 
![Dentist Patient Lookup](client/src/assets/images/dsDentistEmailLookup.gif)

    Add new patient information.   
    Update patient information.
![Dentist Appointment](client/src/assets/images/dsDentistReservation.gif)

    Add a new appointment.
    Update an appointment.
    Delete an appointment.
![Dentist Note Add](client/src/assets/images/dsDentistNote.gif)

    Add notes for specific patients.
    Delete notes.
#### Patient.
![Patient Profile Edit](client/src/assets/images/dsProfileEdit.gif)

    Edit basic profile information.
![Patient Image Upload](client/src/assets/images/dsPatientPage.gif)

    Upload and view profile image.
![Patient Information](client/src/assets/images/dsPatientPage.gif)

    View Notes, Appointments, and Documents given by dentist.


#### Tools:
* MongoDB Server & Mongoose
* Google Authentication
* Dropzone and Cloudinary for File & Image Uploads
* React.js
* Reactstrap (React Bootstrap package)