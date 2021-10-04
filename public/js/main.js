const quizMessages = document.querySelector('.dash-teacher-real-time')

const socket = io();


const chat = document.getElementById('quiz');

socket.on('message', message =>{
    outputmessage(message)

    //scroll down
    quizMessages.scrollTop = quizMessages.scrollHeight;
})

chat.addEventListener('submit',(e)=>{
    e.preventDefault();

    const quizObject = {
    question: e.target.question.value,
     name: e.target.name.value,
     
     anwser: e.target.anwser.value
    }

    socket.emit('answerQuiz', quizObject)
})

function outputmessage(message){
    const div = document.createElement('div');
    div.classList.add('message','dispaly');
    div.innerHTML = `<div class="meta quiz-anwser animate__animated animate__fadeInUp"> 
                            
                                <span><b>${message.name}</b> respondeu: </span>
                                <div class="quiz-body "> 
                                <span> ${message.question}</span> 
                                <span>${message.anwser}</span>
                                </div>
                    </div>`;
    document.querySelector('.quiz-messages').appendChild(div)
}