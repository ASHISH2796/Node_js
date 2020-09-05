let newPasswordValue;
let confirmationPasswordValue;
const submitBtn  = document.getElementById('submit-btn');
const newPassword =document.getElementById('new-password');
const confirmationPassword =document.getElementById('password-confirmation');
const validataionMessage =document.getElementById('validate-message');
function validatePasswords(message,add,remove){
  validataionMessage.textContent =message;
  validataionMessage.classList.add(add);
  validataionMessage.classList.remove(remove);
}

confirmationPassword.addEventListener('input',e=>{
    e.preventDefault();
    newPasswordValue=newPassword.value;
    confirmationPasswordValue=confirmationPassword.value;
    if(newPasswordValue !== confirmationPasswordValue)
    {
        validatePasswords('PassWord must match !' ,'color-red','color-green');
        submitBtn.setAttribute('disabled',true);
    }
    else 
    {
        validatePasswords('PassWord matched !' ,'color-green','color-red');
        submitBtn.removeAttribute('disabled');
    }
});