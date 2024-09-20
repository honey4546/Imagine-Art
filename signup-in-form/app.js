


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const signUpForm = document.querySelector(".sign-up-form")
const signInForm = document.querySelector(".sign-in-form")


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

signUpForm.addEventListener('submit',(e)=>{
  e.preventDefault()

const username = document.getElementById('username').value
const number = document.getElementById('number').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
const confirm_password = document.getElementById('confirm_password').value

  if(username.length>3 && number.length >=10 && email.includes('@gmail.com') && password.includes('_') || password.includes('$') && confirm_password==password){
    alert('You are successfully registered')
    window.location.href = "../generation-page/generation.html";
  
    
    const objFormat = {
      username: username,
      number: number,
      email: email,
      password: password,
      confirm_password : confirm_password
    }

    //localstorage 
    localStorage.setItem('userData',JSON.stringify(objFormat))
    console.log(objFormat)

  }else{
    alert("Enter Valid Credentials")
    console.log("Invalid credentials")
  }
})

const scriptURL = 'https://script.google.com/macros/s/AKfycbwt8BIpIBShe0kv94EVEnF1s0CrTsPC1244JvlPNOrYqjAgXbQcmj5G2FK0pvw8V4ZZrQ/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})





// sign in

signInForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const name= document.getElementById('signInName').value;
  const password = document.getElementById('signInPass').value;
  
  try {
  const response = await fetch('https://script.google.com/macros/s/AKfycbwt8BIpIBShe0kv94EVEnF1s0CrTsPC1244JvlPNOrYqjAgXbQcmj5G2FK0pvw8V4ZZrQ/exec');
  if (!response.ok) {
  throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  let isValidUser = false;
  
  // Loop through the data to find a matching user
  for (let i = 1; i < data.length; i++) { // Skip header row
  if (data[i][0] === name && data[i][3] === password) {
    console.log(data[i][2]);
    console.log(data[i][3]);
  isValidUser = true;
  break;
  }
  }
  
  if (isValidUser) {
  alert('Sign-in successful');

  window.location.href = "../generation-page/generation.html";
  } else {
  alert('Invalid email or password');
  }
  } catch (error) {
  console.error("Error fetching data:", error);
  alert('An error occurred while trying to sign in. Please try again later.');
  }
  });




