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

### Endpoits 
router.get('/',(request,response)=>{
    response.render('request/home')
})

