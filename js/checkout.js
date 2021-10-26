// Get the input fields
var firstName = document.querySelector(".name");
var lastName = document.querySelector(".lastname");
var email = document.querySelector(".email");
var password = document.querySelector(".password");
var address = document.querySelector(".address");
var phone = document.querySelector(".phone");


// Get the error elements
var errorFirstName = document.getElementById('errorFirstName');  
var errorLastName = document.getElementById("errorLastName");
var errorEmail = document.getElementById("errorEmail");
var errorPassword = document.getElementById("errorPassword");
var errorAddress = document.getElementById("errorAddress");
var errorPhone = document.getElementById('errorPhone');


// Exercise 8
function validate() {
    // Validate fields entered by the user: name, phone, password, and email
    let letters = /^[A-Za-z]+$/;
    // let numbers = /^[0-9]+$/;

    if(firstName.value.length < 3){
        firstName.classList.add("invalid");
        errorFirstName.innerHTML = "Name must be at least 3 characters"
        errorFirstName.style.display="inline";
    } else if(!firstName.value.match(letters)) {
        firstName.classList.add("invalid");
        errorFirstName.style.display="inline";
    }

    if(lastName.value.length < 3){
        lastName.classList.add("invalid");
        errorLastName.innerHTML = "Last name must be at least 3 characters"
        errorLastName.style.display="inline";
    } else if(!lastName.value.match(letters)) {
        lastName.classList.add("invalid");
        errorLastName.style.display="inline";
    }

    if(email.value.length < 3){
        email.classList.add("invalid");
        errorEmail.innerHTML = "Email must be at least 3 characters"
        errorEmail.style.display="inline";
    } else if(email.validity.typeMismatch) {
        email.classList.add("invalid");
        errorEmail.style.display="inline";
    }

    if(password.value.length < 3){
        password.classList.add("invalid");
        errorPassword.innerHTML = "Password must be at least 3 characters"
        errorPassword.style.display="inline";
    } else if(!password.value.match(/\d/) || !password.value.match(/[A-Z]/i)) {
        lastName.classList.add("invalid");
        errorPassword.style.display="inline";
    }

    if(address.value.length < 3){
        address.classList.add("invalid");
        errorAddress.innerHTML = "Address must be at least 3 numbers"
        errorAddress.style.display="inline";
    } 

    if(phone.value.length < 3){
        phone.classList.add("invalid");
        errorPhone.innerHTML = "Phone must be at least 3 numbers"
        errorPhone.style.display="inline";
    } 
 /* 
    Not necessary, since input type="number" already covers it:
    else if(!phone.value.match(numbers)) {            
        phone.classList.add("invalid");
        errorPhone.style.display="inline";
    }
 */
}