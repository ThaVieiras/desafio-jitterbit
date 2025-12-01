//Desafio Técnico Jitterbit - API de Pedidos
//Candidata: Thaís Vieira

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Simulação de Banco de Dados em Memória (Array)
let pedidosDB = [];

// Função de mapeamento (transformação) dos dados de entrada para o formato desejado
function transformarPedido(pedidoEntrada) {
    return {
        // Simula geração de ID do MongoDB
        _id: "64dab8a0f6b7183237d307f6",

        // Mapeamento: numeroPedido -> orderId
        orderId: pedidoEntrada.numeroPedido,

        // Mapeamento: valorTotal -> value
        value: pedidoEntrada.valorTotal,

        // Mapeamento: dataCriacao -> creationDate
        creationDate: pedidoEntrada.dataCriacao,

        // Mapeamento do array de items
        items: pedidoEntrada.items.map(item => ({
            productId: parseInt(item.idItem),      // idItem -> productId
            quantity: item.quantidadeItem,         // quantidadeItem -> quantity
            price: item.valorItem,                 // valorItem -> price
            _id: "64daba7d05bcc674899dc5bf"        // ID simulado do subdocumento
        }))
    };
}

// Criar Pedido (POST)
app.post('/order', (req, res) => {
    try {
        const dadosEntrada = req.body;

        // Validação
        if (!dadosEntrada.numeroPedido || !dadosEntrada.items) {
            return res.status(400).json({ error: "Dados inválidos. 'numeroPedido' e 'items' são obrigatórios." });
        }

        // Faz o mapeamento dos dados
        const pedidoTransformado = transformarPedido(dadosEntrada);

        // Salva no "banco"
        pedidosDB.push(pedidoTransformado);

        console.log("Pedido processado:", pedidoTransformado);
        return res.status(201).json({
            message: "Pedido criado com sucesso",
            order: pedidoTransformado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno ao processar o pedido." });
    }
});

// Listar os Pedidos
app.get('/order/list', (req, res) => {
    return res.status(200).json(pedidosDB);
});

// Buscar Pedido por ID
app.get('/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    const pedido = pedidosDB.find(p => p.orderId === orderId);

    if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.status(200).json(pedido);
});

// Atualiza Pedido
app.put('/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    const novosDados = req.body;

    const index = pedidosDB.findIndex(p => p.orderId === orderId);

    if (index === -1) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    // Atualiza os dados mantendo o ID original
    pedidosDB[index] = { ...pedidosDB[index], ...novosDados };

    return res.status(200).json({ message: "Pedido atualizado com sucesso", order: pedidosDB[index] });
});

// Deleta Pedido
app.delete('/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    const index = pedidosDB.findIndex(p => p.orderId === orderId);

    if (index === -1) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    pedidosDB.splice(index, 1);
    return res.status(200).json({ message: "Pedido removido com sucesso" });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor Jitterbit rodando na porta ${PORT}`);
});