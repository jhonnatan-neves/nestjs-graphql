# Configuração do projeto:

- Após clonar o projeto é necessário instalar as dependências e realizar as devidas configurações, para isso:
    - Copie o .env.example para .env e faça as configurações necessárias do dotenv: `cp .env.example .env`
    - Rode os comandos: 
        - `docker-compose up -d --build`
        - `yarn`
        - `yarn migration:run`

### Permissões
- Liberar acesso para os seguintes diretórios:
    - ./postgres
