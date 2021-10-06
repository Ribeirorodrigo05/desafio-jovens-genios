const quizMessages = document.querySelector('.dash-teacher-real-time')

const socket = io();

socket.on('message', message =>{
    outputmessage(message)

    //scroll down
    quizMessages.scrollTop = quizMessages.scrollHeight;
})

//enviando os dados pelo socket 
function sendAnwser(){
const chat = document.getElementById('quiz');
chat.addEventListener('submit',(e)=>{
    e.preventDefault();

    //paramos o comportamento padrão da tag e criamos um objeto com as informações
    // que queremos enviar pelo socket 

    const quizObject = {
    question: e.target.question.value,
    title: e.target.title.value,
     name: e.target.name.value,
     anwser: e.target.anwser.value

    }

    //enviando o objeto pelo socket
    socket.emit('answerQuiz', quizObject)

    destroyDiv()
})
}

function destroyDiv(){
    document.getElementById("quiz").remove();
  }


  //recebendo o objeto enviado pelo socket 
  //criando a tag e inserindo no documento html
function outputmessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="meta quiz-anwser animate__animated animate__fadeInUp"> 
                            
                                <span  class="quiz-name">${message.name} respondeu: </span>
                                <div class="quiz-body "> 
                                <span> ${message.question}</span> 
                                <span>${message.title}</span>
                                <span>${message.anwser}</span>
                                </div>
                    </div>`;
    document.querySelector('.quiz-messages').appendChild(div); 
}