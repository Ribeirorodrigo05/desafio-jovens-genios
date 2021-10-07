function changeMainDisplay(){
    let dashQuestions = document.getElementById('dashQuestions')
    let dashTheme = document.getElementById('dashTheme')
    let dashMain = document.getElementById('dashMain')
    
    dashMain.style.display= 'none'

    dashTheme.style.display = "none"
    
    dashQuestions.style.display = "block"
}

function changeMateryDisplay(){
    
    let dashTheme = document.getElementById('dashTheme')
    let dashQuestions = document.getElementById('dashQuestions')
    dashQuestions.style.display = "none";
    dashTheme.style.display = "block"
}

