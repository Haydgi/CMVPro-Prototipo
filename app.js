let contadorProduto = 1;

function adicionarProduto() {
    document.getElementById("sem-produtos").style.display = "none";
    document.getElementById("container-produtos").style.display = "grid";

    let container = document.getElementById("container-produtos");

    const produtos = [
        { icone: "bi-egg", nome: "Comida1" },
        { icone: "bi-apple", nome: "Comida2" },
        { icone: "bi-lightning-charge", nome: "Energia" }
    ];

    let produtoAleatorio = produtos[Math.floor(Math.random() * produtos.length)]; //pega um icone aleatorio

    let produto = document.createElement("div");
    produto.classList.add("card-produto");
    produto.innerHTML = `
        <h5><i class="bi ${produtoAleatorio.icone}"></i> Produto ${contadorProduto}</h5>
        <p class="text-muted">9,99 R$/Kg</p>
    `;

    container.appendChild(produto);
    contadorProduto++; 
}
