# lvl-url-shortner-kt
Um projeto teste de um encurtador de url para aprender mais sobre nodejs com kotlin

## ATENÇÃO
### Após clonar o repositório, siga os passos a seguir
1. **Rodando o projeto no IntelliJ:**
- Para rodar o projeto, basta ter o gradle e o npm instalados na máquina.
  - Primeiro, abra o projeto no IntelliJ e importe normalmente como um projeto gradle convencional.
  - Depois procure o botão "Run" na barra de ferramentas superior e selecione a opção "Edit Configurations".
  - Em seguida, selecione a opção "Gradle" na lista, clicando no botão de adicionar (**+**) que deve aparecer no canto superior esquerdo da popup.
  - Selecione a pasta raiz como sendo seu projeto gradle na tela de configuração que surgirá e informe "build" como a única _task_ a ser executada.
  - Feito isso, clique em "Apply" e novamente no botão de adicionar (**+**) e selecione a opção "npm".
  - Por fim, informe: 
    - package.json como sendo o package.json disponivel na pasta ./node
    - Command: run
    - Scripts: start
    - Arguments: **deixe vazio**
    - Node interpreter: selecione aqui a versão do node de sua preferência (*o projeto foi testado apenas nas versões superiores à 7.0.0*)
  - Pra finalizar, na parte inferior da popup há um campo chamado "Before launch", clique no botão de adicionar (**+**) logo abaixo do campo citado e selecione a opção "Run Another Configuration", em seguida, selecione a configuração anterior (build do gradle) e clique em "Apply".
- Para iniciar o server, basta selecionar a configuração feita por último, ou seja, a do npm. Ela irá rodar o build do gradle antes de iniciar e capturar as mudanças feitas nos arquivos kotlin para o servidor node.  
---
2. **Rodando o projeto na linha de comando/editor de texto (VSCode, por exemplo):**
- Tendo o gradle e o npm devidamente instalados, basta digitar no terminal, na pasta raiz do projeto: 
<pre><code>gradle build</code></pre>
- E, em seguida:
<pre><code>node node/index.js</code></pre>
- Pronto, seu servidor node estará rodando, perfeitamente.
