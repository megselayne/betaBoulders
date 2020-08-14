
console.log('main.js is connected!');

//variable declarations
const navLi = document.querySelectorAll('li a');
let activate = null;
//functions



//local storage
const localStorageTab =()=> {
    if(window.location.pathname === '/'){
        localStorage.setItem('activeTab','home');
    }
    else if(window.location.pathname.includes('/routes')){
        localStorage.setItem('activeTab', 'routes');
    }
    else if(window.location.pathname.includes('/user')){
        localStorage.setItem('activeTab', 'profile');
    }
    else if(window.location.pathname.includes('/auth')){
        localStorage.setItem('activeTab', 'log');
    }
    navLi.forEach((element) => {
        if(element.id === localStorage.getItem('activeTab')){
            element.classList.add('active');
        }
    })

}


// //event listeners
window.addEventListener('load', localStorageTab);