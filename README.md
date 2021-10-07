# Desafio jovens gênios

este projeto tem o ojetivo de criar um quiz com resposta em tempo real 

### principais tecnologias utilizadas

Para a criação do projeto foi utilizado as seguintes tecnologias<br/>
-NodeJs<br/>
-ExpressJS<br/>
-Express-handlebars<br/>
-Mongoose<br/>
-JsonWebtoken<br/>
-bryptjs<br/>
-csurf<br/>
-cookie-parser<br/>
-validator<br/>
-socket.io<br/>

### Autenticação por JWT e validação com validator

Para validação dos dados recebidos pelas requisições foi utilizado validator na estrategia de isEmpty que validade se um campo está com o formato correto dentro do esperado pela API, para garantir a segurança das rotas e autenticidade do usuário foi utilizado JWT, gerando o token e passando para o servidor via cookie

### Comunicação real-time 

O socket.io é o responsável por realizar essa tarefa, essa tecnoligia criará um tunel entre o usuário e o servidor, aonde os dados serão enviado para o outro usuário conectado ao socket, possuindo um ótimo controle de envio e muita simplicidade na configuração, o socket não se prende apenas a  enviar strings, mas pode enviar objetos, arrays etc.


