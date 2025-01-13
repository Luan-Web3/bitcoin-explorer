# Explorador de blocos UI


> Interface inicial 


![alt text](src/assets/block.png)



## Feito com 🔨
- **React (vite)** 
- **TS** 
- **Boxicons**

## Instruções para rodar local

### Pré-requisitos:

É necessário ter **Node.js** instalados para rodar o projeto localmente.

#### Passo 1
No terminal, clone o projeto:
```
git clone https://github.com/dev-araujo/dojo-bitcoin.git
```

#### Passo 2

Em um novo terminal, navegue até a pasta do frontend e instale as dependências:

```
cd frontend-explorador-bitcoin
npm install
```

#### Passo 3
Inicie a aplicação React:

```
npm run dev
```

A aplicação estará disponível em **`http://localhost:5173`**. 🎉✨🥳


## Instruções para rodar com Docker 

Em um novo terminal, navegue até a pasta do frontend e instale as dependências:

#### Passo 1
```
cd frontend-explorador-bitcoin
npm install
```

#### Passo 2
Crie uma imagem com o seguinte comando:

```
docker build -t dojo-bitcoin-app .
```

#### Passo 3
Inicie o contêiner:

```
docker run -d -p 8080:80 --name dojo-bitcoin-container dojo-bitcoin-app
```

A aplicação estará disponível em **`http://localhost:8080`**. 🎉✨🥳