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

### Endpoits Get
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

Essa rota espera  receber o token de autenticação enviado pelo cookie que vai junto com a requisição, como segundo parâmetro temos o csrfProtetion que protege a rota de ataque cross-site mitigando o uso de fake form para obtenção de informações do servidor.
O terceiro parâmetro é um middleware de autenticação do token aonde o token é descriptografado pela função jwt.verify(), se o token for autêntico o next() será chamado e a aplicação seguirá seu fluxo, caso seja rejeitadoo fluxo será redirecionado para a home da aplicação 





