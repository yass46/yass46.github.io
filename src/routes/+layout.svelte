<script>
  import { getAllItems } from "$lib/index.js";

  let produtos = getAllItems();
  let categoriaSelecionada = "Todos";
  let currentIndex = 0;
  let mensagemCompra = "";

  function filtrarProdutos(categoria) {
    categoriaSelecionada = categoria;
    currentIndex = 0;
  }

  function comprarProduto(nome) {
    mensagemCompra = `Você comprou: ${nome}`;
    setTimeout(() => mensagemCompra = "", 3000);
  }

  $: produtosFiltrados = categoriaSelecionada === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaSelecionada);

  function nextSlide() {
    if (currentIndex < produtosFiltrados.length - 4) currentIndex += 1;
  }

  function prevSlide() {
    if (currentIndex > 0) currentIndex -= 1;
  }
</script>

<nav class="navbar">
  <h1 class="logo">Loja Yasmim</h1>
  <ul>
    <li><button on:click={() => filtrarProdutos("Todos")} class:selected={categoriaSelecionada === "Todos"}>Todos</button></li>
    <li><button on:click={() => filtrarProdutos("Anéis")} class:selected={categoriaSelecionada === "Anéis"}>Anéis</button></li>
    <li><button on:click={() => filtrarProdutos("Colares")} class:selected={categoriaSelecionada === "Colares"}>Colares</button></li>
    <li><button on:click={() => filtrarProdutos("Pulseiras")} class:selected={categoriaSelecionada === "Pulseiras"}>Pulseiras</button></li>
    <li><button on:click={() => filtrarProdutos("Brincos")} class:selected={categoriaSelecionada === "Brincos"}>Brincos</button></li>

  </ul>
</nav>

{#if produtosFiltrados.length > 0}
  <div class="carousel">
    <button class="prev" on:click={prevSlide}>←</button>
    <div class="carousel-container">
      <div class="carousel-track" style="transform: translateX({-currentIndex * 25}%);">
        {#each produtosFiltrados as produto}
          <div class="produto">
            <img src={produto.imagem} alt={produto.nome} />
            <h2>{produto.nome}</h2>
            <p>{produto.material}</p>
            <p class="preco">R$ {produto.preco.toLocaleString("pt-BR")}</p>
            <button class="comprar" on:click={() => comprarProduto(produto.nome)}>Comprar</button>
          </div>
        {/each}
      </div>
    </div>
    <button class="next" on:click={nextSlide}>→</button>
  </div>
{:else}
  <p class="mensagem-vazia">Nenhum produto encontrado.</p>
{/if}

{#if mensagemCompra}
  <div class="aviso-compra">{mensagemCompra}</div>
{/if}

<style>
  body {
    font-family: 'Lora', serif;
    background: #f8f8f8;
    color: #333;
  }

  .navbar {
    background: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid gold;
  }

  .logo {
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .navbar ul {
    display: flex;
    list-style: none;
    gap: 20px;
  }

  .navbar button, .navbar-link {
    background: transparent;
    color: white;
    border: none;
    font-size: 1rem;
    padding: 8px 16px;
    cursor: pointer;
    transition: 0.3s;
    line-height: 1.4;
  }

  .navbar button:hover,
  .navbar button[selected], 
  .navbar-link:hover {
    background: gold;
    border-radius: 20px;
    color: black;
  }

  .navbar-link {
    text-decoration: none;
    padding: 8px 16px;
  }

  .carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    max-width: 100%;
    overflow: hidden;
    margin-top: 30px;
  }

  .carousel-container {
    width: 80%;
    overflow: hidden;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
    gap: 15px;
  }

  .produto {
    flex: 0 0 25%;
    text-align: center;
    padding: 15px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .produto:hover {
    transform: scale(1.05);
  }

  .produto img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }

  .preco {
    color: gold;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .comprar {
    background: black;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background 0.3s;
  }

  .comprar:hover {
    background: gold;
    color: black;
  }

  .prev, .next {
    background: black;
    color: white;
    border: none;
    font-size: 24px;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
  }

  .prev:hover, .next:hover {
    background: gold;
    color: black;
  }

  .mensagem-vazia {
    text-align: center;
    font-size: 1.2rem;
    color: gray;
    margin-top: 20px;
  }

  .aviso-compra {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
</style>
