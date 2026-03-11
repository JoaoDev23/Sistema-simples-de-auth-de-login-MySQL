# Sistema Simples de Autenticação de Login

Um sistema simples de **autenticação de utilizadores** desenvolvido com **Node.js**, permitindo **registo e login de utilizadores** com armazenamento de dados numa base de dados **MongoDB**.

Este projeto foi criado como exemplo educativo para demonstrar como implementar um sistema básico de autenticação que pode servir como base para aplicações web maiores.

---

#  Funcionalidades

- Registo de utilizadores
- Login de utilizadores
- Armazenamento de dados em MongoDB
- Backend simples com Node.js
- Estrutura básica para projetos de autenticação
- Fácil de expandir com novas funcionalidades

---

#  Tecnologias Utilizadas

- **MongoDB**
- **HTML**
- **CSS**
- **JavaScript**

---

# Pré-requisitos

Antes de executar o projeto, certifique-se de que tem instalado:

- MongoDB  
https://www.mongodb.com/



---

# Instalação

### Clonar o repositório

```bash
git clone https://github.com/JoaoDev23/Sistema-simples-de-auth-de-login-MySQL
```

---

### 2️ Aceder à pasta do projeto

```bash
cd Sistema-simples-de-auth-de-login-MySQL
```

---

### 3️ Instalar dependências

```bash
npm install
```

---

#  Configuração da Base de Dados

1. Abra o **MongoDB Compass** ou outro cliente MongoDB.
2. Crie uma nova conexão.
3. Copie a **Connection String** da base de dados.

Depois:

1. Abra o ficheiro `server.js`
2. Procure a variável de conexão do MongoDB
3. Substitua pela sua string de conexão.

Exemplo:

```javascript
const url = "mongodb://localhost:27017/login";
```


# Objetivo do Projeto

Este projeto foi criado para demonstrar conceitos básicos de:

- Autenticação de utilizadores
- Integração entre js e MongoDB
- Estrutura básica de um backend


---

