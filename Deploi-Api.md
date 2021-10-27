## deploi no Servidor = Engix

  - n ultilizamos o `nodemon`em produçao
  - `sucrase` para importar e export, isso é apenas para desenv
    - corrindo: vms fazer o `sucrase` converte os imports para que o
      `node`endenda
  - para corrigir, vms criar outra script e assim criar um biuld para produc

  - `package.json` -> criando um script `biuld`e colando o codigo do sucrase
  sucrase ./srcDir -d ./outDir --transforms typescript,imports
    --      ./scr   -- ./produc  ou  dist
    - apagar o typescript por n ter utilizado ele
    -
    - mandando o `App.js`e `Server.js` para dentro de `src` e corrigindo os
    caminhos

  - codig completo
   "build": "sucrase ./src -d ./dist --transforms imports",
   "start": "node dist/server.js"

    - para rodar toda as alteraçoes
    - npm run build

    - npm start
    para ver se tudo esta rdando certo

    [O-que-esta-acontecendo?]
    - ele entra em todas as pastas do `src` e manda para `dist` a config
    de estartar** **

    - mudando a porta url para o ip do servidor
    - manda o dominio se tiver tbm: lailtonxavier.tk

    [git-hub]
    - entrar no servidor
      [no-servidor]
        - vms criar um repositorio da api e um projeto da api
        - mkdir api, mkdir repo-api
        - entrando em `repo-api` = para config o repositorio
          - cd repo-api
            - git init --bare
            - e sai da pasta, indo para /home
        - agora vms adicionar o repositorio `repo-api` na pasta do projeot
        `api`
          - cd api
            - git init
            - git config user.name 'Lailton Xavier'
            - git config user.email 'lailtonxavier123@gmail.com'
            - git commit -am `initial`
            criar um repositorio no servidor
            - git remote add origin /home/lailtonxavier/repo-api
      - no prijeto

        - enviar os arqs para repositorio
        - add tudo e commita, eniar para a branch do servidor
            - git remote add origin www.lailtonxavier.tk:repo-api
            - git push origin master    =  enviando tds os arq para servidor
            - git push origin -u    =   so precisa digitar `git push`por causa
            do -u

        - no repositorio do servidor
        - entrar em `api`
          - preciso baixar as coisas no servidor do repositorio para a pagina
          do projeto
          - git pull origin master
          - ls -la  =  para ver as pastas
        - criando o arq `.env`
          - nano .env
            - copia o arq do env e colar
            - deve mudar o DATABASE_HOST=localhost
            pq o banco esta dentro do servidor
            ctr + o salvar
            ctr + x sair

        - baixar as dependecias
        - npm i
        - npm start  =  pra ver se deu alguma coisa

        - vams utilizar o pm2 para colocar pra rodar
        - pm2 start /home/Lailton/api/dist/server --name api
        - pm2 ls

        [OBS]
        - meu pm2 n estava iniviando
        - correção mudar a porta de 3001 para 3002
        e o dominio
        - pm2 startup (copiando o codigo deles e colando)
        - pm2 start api

        corrigiu

    # Nginx
      - vms duplicar o que fizemos antariomente e mudar o nome do
        dominio
        - cd /etc/nginx/sites-enabled/
        - ls    =   para ver o q temos

      - temos que duplicar o arq ja existente
        - sudo cp lailtonxavier.tk nome-do-novo-arq
        - se de um ls  =  vai mostra dois arqs

      - vms alterar o dominio
        - sudo nano apilailton.tk
          - dentro  =  apagar o `default server;`pq so podemos ter um
          - sudo systemctl stop nginx  =  para servidor nginx

        - com servidor parado vms gerar o certificado SSL pra ter HTTPS
          - sudo certbot certonly --standalone -d apilailton.tk
            - tem que aparecer a msg: Congratulations
        - agora iniciar o servidor
          - sudo systemctl restart nginx
          [OBD]
            - havia dado um eroo, que foi corrigido ao tirar os `www` do meu
              arq de config

      *No insomnia duplicar as requisiçoes para Prod*
      E testa todas as rotas

          [OBS]
        - o Nginx n aceita foto muito grande
        - corrigir:
          - sudo nano /etc/nginx/nginx.conf
        - dentro de http
          - client_max_body_size 10M;
        - e restart o servidor
          - sudo systemctl restart nginx

      - Deu erro na imagem, qnd clicado para abrir
        - Cannot GET /images/1635274801402_17223.jpeg
        - voltar para /Home
          - cd ~  -> api  -> src
        - resumo: o erro esta no caminho da imagem

      - para corrigir
        - ir no projeto, alterar no desenvolvimento = testo
          - build e envia para o servidorr

          - depois da correcao da um push e no servidor git pull
            - git pull origin master
            - git pull origin master -u   =  para setar o upstrain
          - atualizar o pm2
            - pm2 restart api

          - corrindo outra vez
            no projeto local
              - npm run build
              - git add .
              - git commit -m 'msg'
              - git push
          - no servidor
            - git pull origin master
            - pn2 restart api
