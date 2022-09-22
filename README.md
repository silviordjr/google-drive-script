# Google Drive Script

Script para mapear pastas do Google Drive e criar arquivo json contendo os dados para a criação de acervo virtual.

Um servidor com essa finalidade também foi criado. Está disponível [aqui](https://github.com/silviordjr/google-drive-server)

### Tecnologias

Projeto construído com Node.js, fazendo uso das bibliotecas: 

- [Google APIs](https://www.npmjs.com/package/googleapis)

### Autor 

Silvio Ribeiro Dias Jr.

-[LinkedIn](https://www.linkedin.com/in/silvio-dias-junior/)

### Inicialização

Instale as dependências da aplicação;

    npm i

Execute as configurações da Google Drive API conforme seção abaixo;

Execute o script 

    node src/main.js

### Configuração Google Drive API

1. No [console do Google](https://console.cloud.google.com) pesquise por Google Drive API e ative.

2. No [console do Google](https://console.cloud.google.com) procure a opção APIs e serviços e selecione Credenciais; Nas configurações da API escolha clientes externos e como conta teste (em caso em app de teste), a conta do Google Drive que servirá como acervo.

<img src="./img/tela-1.PNG" alt="Tela do primeiro passo">

3. Em Credenciais, clique em criar credenciais e em ID do cliente OAuth; 

<img src="./img/tela-2.PNG" alt="Tela do primeiro passo">

4. Na área de criação da ID, escolha a opção App para computador e clique em criar. Então, faça o download da credencial gerada e salve na raiz do servidor como credentials.json;

<img src="./img/tela-3.PNG" alt="Tela do primeiro passo">

5. Instale o projeto e execute conforme as orientações da seção de inicialização. A mensagem abaixo aparecerá no console. Clique no link e faça login na conta convidada;

<img src="./img/tela-4.PNG" alt="Tela do primeiro passo">

6. Copie o codigo gerado conforme imagem abaixo e cole no terminal;

<img src="./img/tela-5.PNG" alt="Tela do primeiro passo">

<img src="./img/tela-6.PNG" alt="Tela do primeiro passo">

7. O token.json será gerado para a automatização da aplicação e o arquivo data.json será criado.