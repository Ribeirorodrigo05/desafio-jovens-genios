### Desafio Jovens gênios 

dependências do projeto 

![image](https://user-images.githubusercontent.com/47647868/136121881-a7428460-9c69-4dc5-853b-4fc546020117.png)

##### Instalação 
npm i 

ou 

npm i --save express express-handlebars bryptjs jsonwebtoken validator mongoose socket.io csurf cookie-parser 

dependência de desenvolvimento 

npm i --save-dev nodemon 

Para o front-end será utilizado a engine express-handlebars informações em https://www.npmjs.com/package/express-handlebars

##### Arquivo server.js 
O server.js é o arquivo principal da aplicação e possui a seguinte estrutura finalizada 

![image](https://user-images.githubusercontent.com/47647868/136122461-894f90f9-16a4-4cd8-919a-99f014b42abd.png)

### Endpoints GET
router.get('/',(request,response)=>{
    response.render('request/home')
})

Rota que responde o template Home da aplicação 


router.get('/teacher',(request, response)=>{
    response.render('request/teacher')
})

Rota que responde com o template de Login do usuário professor 


router.get('/student',(request, response)=>{
    response.render('request/student')
})

Rota que responde template do usuário aluno 


router.get('/dash-Teacher',csrfProtection, authTeacher, (request, response)=>{
    const {userId} = request;

    Teacher.findOne({id: userId}).then(teacher => {
        response.render('request/dashTeacher',{teacher : teacher});
    })

});


router.get('/dash-student',csrfProtection, auth, (request, response)=>{
    const {userId} = request;

    Student.findOne({id: userId}).then(student => {
        response.render('request/dashStudent',{student : student});

    })

});

rota "/dash-Teacher", "/dash-student"

Essa rota espera  receber o token de autenticação pelo cookie que vai junto com a requisição enviada, como segundo parâmetro temos o csrfProtetion que protege a rota de ataque cross-site mitigando o uso de fake form para obtenção de informações do servidor.
O terceiro parâmetro é um middleware de autenticação do token aonde o token é descriptografado pela função jwt.verify(), se o token for autêntico o next() será chamado e a aplicação seguirá seu fluxo, caso seja rejeitadoo fluxo será redirecionado para a home da aplicação.

seguindo o fluxo e serviço, a rota utiliza o modelo de usuário definido para achar o usuário com ID que seja igual ao ID vindo do token e repassado para o request dentro da função auth(), existindo o usuário o obejto é recuperado para o front-end por meio do response.render() que responde o template de dashboard do usuário 


###Endpoints POST

![image](https://user-images.githubusercontent.com/47647868/136124857-da032d37-ef61-4808-baf3-9454edc5336d.png)


Rota "/login-student","/login-teacher"
A rota espera receber dados em forma de objeto pelo corpo da requisição, a validação do valor de cada chave do objeto recebido é feita pelo validator que verifica se os valores correspondem as regras para registro, caso haja algum valor recebido que não seja válido o serviço retorno um erro de validação para o template front-end.
Se todos os dados forem válidos será chamada a função bcrypt.compareO() que fará a comparação entre a senha enviada na requisição com a senha encontrada no banco de dados, se a comparação for válida será criado o payload com as informação necessárias a criação do token pela função response.cookie que contém a função jwt.sign() que criará o token, seguindo o fluxo de serviço a rota irá sofrer um redirecionamento para "/dash-studant" rota a qual já foi vista à cima.


##Socket.io 
Para a utilização da comunicação em tempo real entre o student e o teacher foi utilizado a dependência socket.io que tem o seguinte funcionamento. No server.js temos a sua declaração para começo de funcionamento.
![image](https://user-images.githubusercontent.com/47647868/136126341-78697235-4aca-4604-b650-fbc0224eb77e.png)

![image](https://user-images.githubusercontent.com/47647868/136126413-71ff892d-c3d0-4242-ab26-058eee237ac0.png)

com isso o socket está pronto para receber as informação do front-end e repassá-la.

#### Preparando o socket no front-end
No Arquivo main.handlebars temos a referência para o seguinte script  <script src="/socket.io/socket.io.js"></script> esse arquivo dará acesso as funçoes e configurações do socket, mas é necessário criar alguns métodos para que a comunicação seja possível, temos outro script <script type="text/javascript" src="/js/main.js"></script> que nela conterá as configuração de conexão e resposta do socket o arquivo contém a seguinte estrutura:

![image](https://user-images.githubusercontent.com/47647868/136126853-45caffc8-a03a-49a6-90ad-9888386f95a0.png)


