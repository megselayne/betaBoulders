
console.log('main.js is connected!');

//variable declarations
const home = document.querySelector('#home');
const routes = document.querySelector('#routes');
const profile = document.querySelector('#profile');
const logout = document.querySelector('#logout');
let activate = null;
//functions



//local storage
const localStorageTab =()=> {
    if(localStorage.getItem('activeTab')){
       const now = localStorage.getItem('activeTab');
       document.getElementById(`${now}`).classList.add('active');
    }
    else{
        home.classList.add('active');
    }
}
//removes active class from all, adds it back to clicked target
const activeTab = (event)=>{
    console.log('heard click');
    console.log(event.target.id);
    let id = event.target.id;
    localStorage.setItem('activeTab', id);
}




// //event listeners
home.addEventListener('click', activeTab);
routes.addEventListener('click', activeTab);
profile.addEventListener('click', activeTab);
logout.addEventListener('click', activeTab);
window.addEventListener('load', localStorageTab);