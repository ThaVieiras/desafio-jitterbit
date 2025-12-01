# 📦 Desafio Técnico Jitterbit - API de Pedidos

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

API RESTful desenvolvida em Node.js para recebimento, transformação e gerenciamento de pedidos. O projeto simula uma persistência de dados em memória e realiza o mapeamento de campos (De/Para) conforme especificado no desafio técnico.

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework para construção da API.
* **Body-Parser**: Middleware para tratamento de requisições JSON.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão 14 ou superior recomendada)
* Git (opcional, para clonagem)

---

## 📦 Instalação e Execução

1.  **Clone o repositório** (ou baixe os arquivos):
    ```bash
    git clone <url-do-seu-repositorio>
    ```

2.  **Instale as dependências**:
    No terminal, navegue até a pasta do projeto e execute:
    ```bash
    npm install
    ```

3.  **Inicie o servidor**:
    ```bash
    npm start
    ```
    > O servidor rodará em: `http://localhost:3000`

---

## 🔌 Rotas da API

### 1. Criar Pedido (POST)
Recebe o JSON no formato original, transforma os campos e salva.

* **URL:** `/order`
* **Body:**
    ```json
    {
      "numeroPedido": "12345",
      "valorTotal": 150.00,
      "dataCriacao": "2023-11-30",
      "items": [
        {
          "idItem": "10",
          "quantidadeItem": 1,
          "valorItem": 50.00
        }
      ]
    }
    ```

### 2. Listar Pedidos (GET)
Retorna todos os pedidos armazenados.

* **URL:** `/order/list`

### 3. Buscar por ID (GET)
Busca um pedido específico.

* **URL:** `/order/:orderId`
* **Exemplo:** `/order/12345`

---

## 🧪 Como Testar

Você pode validar a API utilizando:

1.  **IntelliJ HTTP Client**:
    * Abra o arquivo `testes.http` incluído no projeto.
    * Clique no ícone ▶️ (Play) ao lado das requisições.

2.  **Terminal (cURL)**:
    ```bash
    curl http://localhost:3000/order/list
    ```

---

## 👩🏽‍💻 Autora

**Thaís Vieira**
