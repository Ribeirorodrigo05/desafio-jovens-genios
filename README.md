# desafio-jovens-genios
plataforma de quiz educacional

O projeto tem o objetivo de construir um quiz onde a resposta é enviada em tempo real.

### Criando o projeto

Antes de falar sobre as dependências, a liguangem de programação utilizada para construção foi a JavaScript, tanto para o front-end quanto para back-end(nodejs). 

#### Iniciando o projeto 

no terminal digite o seguinte comando
###### npm i 
para a instalação das dependências 

###### Dependências
  
![depedencia](https://user-images.githubusercontent.com/47647868/136078129-c65d5721-8e11-4a06-859b-ac2ea89c7cdd.png)

Com as dependências instaladas, pode ser criado o arquivo server.js que será o arquivo de entrada da aplicação,
irei falar de cada dependência de acordo com o momento usado na aplicação.
Dentro do server.js farei o require das dependêcias principais, que será o express(framework web), express-handlebars(template engine), path(módulo core do Nodejs), mongoose(adaptador para conexão com o mongoDB). também será feita uma instância do express na variável app. 

![image](https://user-images.githubusercontent.com/47647868/136086614-a2fbeaf7-1f93-4627-894b-1f6239957fc8.png)

após deve ser criada uma variável para armazenar o valor da porta que o servidor irá escutar.

![image](https://user-images.githubusercontent.com/47647868/136087682-51f6b51b-a029-4613-84dd-761fccae8d93.png)

A variável PORT tem como valor process.env.PORT que será usado no ambiente de produção e o 3005 que será usado em ambiente de desenvolvimento.

Agora já pode ser o require de uma dependência chamada socketio que será responsável pela transmissão em tempo real. Será feito também o require do módulo http que assim como path é um módulo core.

![image](https://user-images.githubusercontent.com/47647868/136089246-7d474c54-cfde-4ad1-8afa-fc156d63ac11.png)

deve ser criada uma variável que fará o gerenciamento do serve criado a partir do http.createServe(app) e logo em seguida será crianda outra variável que será uma instância do socketio(server). Com isso a nossa variável server será uma instância da variável app que por sua vez uma instância da dependência express(framework web)

![image](https://user-images.githubusercontent.com/47647868/136093421-437b74e3-2668-42e5-b738-f75215860324.png)

agora já é possível deixar o server online.

![image](https://user-images.githubusercontent.com/47647868/136093907-b11e54cf-f54c-4f19-889e-ffd25745cef1.png)

agora serão criados alguns middlewares para atender as requisições feitas pelo front-end. 

![image](https://user-images.githubusercontent.com/47647868/136094629-edb4b775-8beb-49e8-88ad-a98d044e14e8.png)

O primeiro middleware express.urlencoded() é um método embutido no express para reconhecer o objeto de solicitação recebido como strings ou matrizes.
O segundo middleware express.json()  é um método embutido no express para reconhecer o objeto de solicitação de entrada como um objeto JSON.

agora já conseguimos receber dados da aplicação front-end.

#### Template engine 
Para controlar o front-end será usado o express-handlebars.

![image](https://user-images.githubusercontent.com/47647868/136095859-fe0cbe1c-9283-4e8d-8698-6fb4a92d0e7a.png)

também será cirado= middleware para os arquivos estáticos 

![image](https://user-images.githubusercontent.com/47647868/136096042-ce278cd2-3d2b-4708-a1a7-b2560bf3ef06.png)

#### Conectando com mongoDB
A conexão com o banco de dados é feita usando mongoose e de forma simples 

![image](https://user-images.githubusercontent.com/47647868/136096524-986569e8-5066-4427-b093-7e15d1b54fef.png)

Por ser uma promisse funciona de maneira simples, se a conexão for bem sucedida imprimirá no console 'database is connected', caso seja rejeitada o bloco catch será chamado e o erro será informado no console

Agora será criado a seguinte estrutura de pastas e arquivos

![pastas](https://user-images.githubusercontent.com/47647868/136102185-8ec2af16-f568-4d9b-9c72-394be47c54c4.png)

