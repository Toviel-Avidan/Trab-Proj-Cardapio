// CARDÁPIO
const cardapio = [
  { id: 1, nome: "Hambúrguer", descricao: "Pão, carne e queijo", preco: 25, categoria: "Lanches", disponivel: true, imagem: "img/hamburguer.jpg",
    extras: [{ nome: "Queijo extra", preco: 3 }, { nome: "Bacon", preco: 5 }]
  },

  { id: 2, nome: "Pizza Calabresa", descricao: "Calabresa com queijo", preco: 40, categoria: "Pratos", disponivel: true, imagem: "img/pizza.jpg",
    extras: [{ nome: "Borda recheada", preco: 8 }]
  },

  { id: 3, nome: "Refrigerante", descricao: "Lata 350ml", preco: 6, categoria: "Bebidas", disponivel: true, imagem: "img/refrigerante.jpg",
    extras: [{ nome: "Gelo", preco: 0 }]
  },

  { id: 4, nome: "Batata Frita", descricao: "Porção crocante", preco: 15, categoria: "Lanches", disponivel: true, imagem: "img/batata.jpg",
    extras: [{ nome: "Cheddar", preco: 4 }]
  },

  { id: 5, nome: "X-Bacon", descricao: "Hambúrguer com bacon", preco: 30, categoria: "Lanches", disponivel: true, imagem: "img/xbacon.jpg",
    extras: [{ nome: "Ovo", preco: 2 }]
  },

  { id: 6, nome: "Suco Natural", descricao: "Laranja ou limão", preco: 8, categoria: "Bebidas", disponivel: true, imagem: "img/suco.jpg",
    extras: []
  },

  { id: 7, nome: "Água Mineral", descricao: "500ml", preco: 4, categoria: "Bebidas", disponivel: true, imagem: "img/agua.jpg",
    extras: []
  },

  { id: 8, nome: "Pizza Marguerita", descricao: "Queijo e tomate", preco: 38, categoria: "Pratos", disponivel: true, imagem: "img/marguerita.jpg",
    extras: []
  },

  { id: 9, nome: "Hot Dog", descricao: "Pão e salsicha", preco: 18, categoria: "Lanches", disponivel: true, imagem: "img/hotdog.jpg",
    extras: []
  },

  { id: 10, nome: "Sorvete", descricao: "2 bolas", preco: 12, categoria: "Sobremesas", disponivel: true, imagem: "img/sorvete.jpg",
    extras: []
  },

  { id: 11, nome: "Pudim", descricao: "Leite condensado", preco: 10, categoria: "Sobremesas", disponivel: true, imagem: "img/pudim.jpg",
    extras: []
  },

  { id: 12, nome: "Hambúrguer Artesanal", descricao: "Carne 180g", preco: 35, categoria: "Lanches", disponivel: true, imagem: "img/artesanal.jpg",
    extras: []
  },

  { id: 13, nome: "X-Salada", descricao: "Hambúrguer com salada", preco: 27, categoria: "Lanches", disponivel: true, imagem: "img/xsalada.jpg",
    extras: []
  },

  { id: 15, nome: "Pizza Portuguesa", descricao: "Presunto e ovo", preco: 42, categoria: "Pratos", disponivel: true, imagem: "img/portuguesa.jpg",
    extras: []
  },

  { id: 16, nome: "Pizza Frango", descricao: "Frango com catupiry", preco: 43, categoria: "Pratos", disponivel: true, imagem: "img/frango.jpg",
    extras: []
  },

  { id: 17, nome: "Milkshake", descricao: "Chocolate ou morango", preco: 14, categoria: "Bebidas", disponivel: true, imagem: "img/milkshake.jpg",
    extras: []
  },

  { id: 20, nome: "Açaí", descricao: "300ml", preco: 15, categoria: "Sobremesas", disponivel: true, imagem: "img/acai.jpg",
    extras: []
  },

  { id: 21, nome: "Brownie", descricao: "Chocolate", preco: 9, categoria: "Sobremesas", disponivel: true, imagem: "img/brownie.jpg",
    extras: []
  }
];

let pedido = [];
let itemAtual = null;

// FORMATAR
function formatarPreco(v) {
  return v.toFixed(2).replace(".", ",");
}

// MOSTRAR ITENS
function mostrarItens(lista) {
  const div = document.getElementById("lista");

  div.innerHTML = lista.map(item => `
    <div class="card">

      <img src="${item.imagem}" alt="${item.nome}" class="item-img">

      <div class="card-info">
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <p><strong>R$ ${formatarPreco(item.preco)}</strong></p>
      </div>

      <button onclick="abrirExtras(${item.id})">
        +
      </button>

    </div>
  `).join("");
}

// EXTRA POPUP
function abrirExtras(id) {
  const item = cardapio.find(i => i.id === id);
  itemAtual = item;

  if (!item.extras || item.extras.length === 0) {
    pedido.push({ ...item, extrasSelecionados: [] });
    atualizarPedido();
    return;
  }

  document.getElementById("tituloExtras").textContent = item.nome;

  const lista = document.getElementById("listaExtras");

  lista.innerHTML = item.extras.map((extra, i) => `
    <label>
      <input type="checkbox" data-index="${i}">
      ${extra.nome} (+R$ ${formatarPreco(extra.preco)})
    </label>
  `).join("");

  document.getElementById("modalExtras").style.display = "block";
}

function fecharExtras() {
  document.getElementById("modalExtras").style.display = "none";
}

function confirmarExtras() {
  const checks = document.querySelectorAll("#listaExtras input:checked");

  const extrasSelecionados = Array.from(checks).map(c => {
    return itemAtual.extras[c.dataset.index];
  });

  pedido.push({
    ...itemAtual,
    extrasSelecionados
  });

  atualizarPedido();
  fecharExtras();
}

// FILTRAR
function filtrar(cat) {
  mostrarItens(cat === "Todos"
    ? cardapio
    : cardapio.filter(i => i.categoria === cat)
  );
}

// REMOVER
function remover(i) {
  pedido.splice(i, 1);
  atualizarPedido();
}

// ATUALIZAR PEDIDO
function atualizarPedido() {
  const lista = document.getElementById("pedido");

  lista.innerHTML = pedido.map((item, i) => `
  <li class="item-pedido">
    <button class="btn-remover" onclick="remover(${i})">❌</button>

    <div class="info-pedido">
      ${item.nome} - R$ ${formatarPreco(item.preco)}

      ${item.extrasSelecionados.map(e =>
        `<br>➕ ${e.nome} (+R$ ${formatarPreco(e.preco)})`
      ).join("")}
    </div>
  </li>
`).join("");

  const total = pedido.reduce((s, item) => {
    const extras = item.extrasSelecionados.reduce((a, e) => a + e.preco, 0);
    return s + item.preco + extras;
  }, 0);

  document.getElementById("total").textContent = formatarPreco(total);
}

// PAGAMENTO
function abrirPagamento() {
  if (pedido.length === 0) {
    alert("Adicione pelo menos um item ao carrinho antes de finalizar o pedido.");
    return;
  }

  document.getElementById("modalPagamento").style.display = "block";
}

function fecharPagamento() {
  document.getElementById("modalPagamento").style.display = "none";
}

function finalizarPedido() {
  alert("✅ Pedido concluído!");
  pedido = [];
  atualizarPedido();
  fecharPagamento();
}

function toggleFiltro() {
  const box = document.getElementById("opcoesFiltro");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function toggleExtras(id) {
  const el = document.getElementById(`extras-${id}`);
  el.style.display = el.style.display === "block" ? "none" : "block";
}

// START
mostrarItens(cardapio);