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
let themeNum = 0;
const nav = document.querySelector('nav');
const icons = document.querySelectorAll('.bi');
document.getElementById('themePicker').addEventListener('click', () => {
    if(themeNum === 0){
        document.body.style.backgroundColor = themeColors.light.bg;
        document.body.style.color = themeColors.light.text;
        nav.style.backgroundColor = themeColors.light.bg;
        icons.forEach((icon)=> {
            icon.style.color = themeColors.light.text;
            console.log(icon)
        })

        nav.classList.remove('navbar-dark');
        nav.classList.add('navbar-light');
        nav.classList.add('bg-light');
       
        themeNum++;
    }else if(themeNum === 1) {
        document.body.style.backgroundColor = themeColors.dark.bg;
        document.body.style.color = themeColors.dark.text;
        nav.style.backgroundColor = themeColors.dark.bg;
        icons.forEach((icon)=> {
            icon.style.color = themeColors.dark.text;
            console.log(icon)
        })

        nav.classList.add('navbar-dark');
        nav.classList.remove('navbar-light');
        nav.classList.remove('bg-light');
        themeNum++;
    } else if(themeNum === 2) {
        document.body.style.backgroundColor = themeColors.ytdark.bg;
        document.body.style.color = themeColors.ytdark.text;
        nav.style.backgroundColor = themeColors.ytdark.bg;
        themeNum = 0;
    }
})