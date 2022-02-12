const themeColors = {
    light: {
        text: "#000",
        bg: "#fff"
    },
    dark: {
        text: "#fff",
        bg: "#000",
    },
    ytdark: {
        text: "#fff",
        bg: "#121212",
    }
}

let clickedNum = 0;
switch (localStorage.getItem('color-theme')) {
    case 'light':
      clickedNum = 0;
      break;
    case 'grey':
      clickedNum = 1;
      break;
    case 'dark':
      clickedNum = 2
      break;

    default:
      clickedNum = 0;
  }
 if(localStorage.getItem('color-theme') === null) {
    localStorage.setItem('color-theme', "light");
}
const nav = document.querySelector('nav');
const icons = document.querySelectorAll('.bi');
const modals = document.querySelectorAll('.modal-content')

function lightTheme() {
    const upVoteIcons = document.querySelectorAll('.bi');
    const pTags = document.querySelectorAll('p')
    document.body.style.backgroundColor = themeColors.light.bg;
    document.body.style.color = themeColors.light.text;
    nav.style.backgroundColor = themeColors.light.bg;

    icons.forEach((icon)=> {
        icon.style.color = themeColors.light.text;
    })
    pTags.forEach((tag)=> {
        tag.style.color = themeColors.light.text;
    })
    modals.forEach((modal) => {
        modal.classList.add('bg-light');
        modal.classList.add('text-dark');
        modal.classList.remove('text-dark')
        modal.classList.remove('bg-dark')
    })
    nav.classList.remove('navbar-dark');
    nav.classList.add('navbar-light');
    nav.classList.add('bg-light');
    upVoteIcons.forEach((icon)=> {
        icon.style.color = themeColors.light.text;
    })
}
function ytdarkTheme() {
    const Icons = document.querySelectorAll('.bi');
    const pTags = document.querySelectorAll('p');
    nav.classList.remove('bg-light');
    nav.classList.remove('navbar-light');
    nav.classList.add('navbar-dark');
    document.body.style.backgroundColor = themeColors.ytdark.bg;
    document.body.style.color = themeColors.ytdark.text;
    nav.style.backgroundColor = themeColors.ytdark.bg;
    modals.forEach((modal) => {
        modal.classList.add('bg-dark');
        modal.classList.add('text-light');
        modal.classList.remove('text-light')
        modal.classList.remove('bg-light')
    })
    pTags.forEach((tag)=> {
        tag.style.color = themeColors.dark.text;
    })
    Icons.forEach((icon)=> {
        icon.style.color = themeColors.dark.text;
    })
}
function darkTheme() {
    const Icons = document.querySelectorAll('.bi');
        const pTags = document.querySelectorAll('p')
        document.body.style.backgroundColor = themeColors.dark.bg;
        document.body.style.color = themeColors.dark.text;
        nav.style.backgroundColor = themeColors.dark.bg;
        modals.forEach((modal) => {
            modal.classList.add('bg-dark');
            modal.classList.add('text-light');
            modal.classList.remove('text-light')
            modal.classList.remove('bg-light')
        })
        icons.forEach((icon)=> {
            icon.style.color = themeColors.dark.text;
        })
        nav.classList.remove('navbar-light');
        nav.classList.add('navbar-dark');
        nav.classList.remove('bg-light');
        pTags.forEach((tag)=> {
            tag.style.color = themeColors.dark.text;
        })
        Icons.forEach((icon)=> {
            icon.style.color = themeColors.dark.text;
        });
}

if(localStorage.getItem('color-theme') === 'light'){
    lightTheme();
    console.log('light theming')
}else if(localStorage.getItem('color-theme') === "grey") {
    ytdarkTheme();
} else if(localStorage.getItem('color-theme') === "dark") {
    darkTheme();       
}

console.log(typeof(parseInt(localStorage.getItem('color-theme'))))
document.getElementById('themePicker').addEventListener('click', () => {
    
    clickedNum++;
    if(clickedNum === 3) {
        clickedNum = 0;
    } 

    if(clickedNum === 0){
        localStorage.setItem('color-theme','light')
        lightTheme();
    }else if(clickedNum === 1) {
        ytdarkTheme();
        localStorage.setItem('color-theme','grey')
    } else if(clickedNum === 2) {
        darkTheme();     
        localStorage.setItem('color-theme','dark')
    }
})