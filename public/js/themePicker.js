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
        nav.classList.remove('navbar-dark');
        nav.classList.add('navbar-light');
        nav.classList.add('bg-light');
        upVoteIcons.forEach((icon)=> {
            icon.style.color = themeColors.light.text;
        })
       
        themeNum=1;
    }else if(themeNum === 1) {
        const Icons = document.querySelectorAll('.bi');
        const pTags = document.querySelectorAll('p')
        document.body.style.backgroundColor = themeColors.dark.bg;
        document.body.style.color = themeColors.dark.text;
        nav.style.backgroundColor = themeColors.dark.bg;
        icons.forEach((icon)=> {
            icon.style.color = themeColors.dark.text;
        })
        nav.classList.add('navbar-dark');
        nav.classList.remove('navbar-light');
        nav.classList.remove('bg-light');
        themeNum++;
        pTags.forEach((tag)=> {
            tag.style.color = themeColors.dark.text;
        })
        Icons.forEach((icon)=> {
            icon.style.color = themeColors.dark.text;
        })
    } else if(themeNum === 2) {
        const Icons = document.querySelectorAll('.bi');
        const pTags = document.querySelectorAll('p')
        document.body.style.backgroundColor = themeColors.ytdark.bg;
        document.body.style.color = themeColors.ytdark.text;
        nav.style.backgroundColor = themeColors.ytdark.bg;
        themeNum = 0;
        pTags.forEach((tag)=> {
            tag.style.color = themeColors.dark.text;
        })
        Icons.forEach((icon)=> {
            icon.style.color = themeColors.dark.text;
        })
       
    }
})