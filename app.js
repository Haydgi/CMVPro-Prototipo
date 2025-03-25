let contadorProduto = 1;

function adicionarProduto() {
    document.getElementById("sem-produtos").style.display = "none";
    document.getElementById("container-produtos").style.display = "grid";

    let container = document.getElementById("container-produtos");
    
    //gera um item aleatorio, no caso um icone aleatorio

    const produtos = [
        { icone: "bi-egg", nome: "Comida1" },
        { icone: "bi-apple", nome: "Comida2" },
        { icone: "bi-lightning-charge", nome: "Energia" }
    ];

    let produtoAleatorio = produtos[Math.floor(Math.random() * produtos.length)]; //pega um icone aleatorio

    // usa o icone aleatorio no card gerado

    let produto = document.createElement("div");
    produto.classList.add("card-produto");
    produto.innerHTML = `
        <h5><i class="bi ${produtoAleatorio.icone}"></i> Produto ${contadorProduto}</h5>
        <p class="text-muted">9,99 R$/Kg</p>
    `;

    container.appendChild(produto);
    contadorProduto++; 
}

let contadorReceita = 1;

function adicionarReceita() {
    document.getElementById("sem-receitas").style.display = "none";
    document.getElementById("container-receitas").style.display = "grid";

    let container = document.getElementById("container-receitas");

    const receitas = [
        { imagem: "midia/receita1.jpg", },
        { imagem: "midia/receita2.png", },
        { imagem: "midia/receita3.webp", }
    ];

    let receitaAleatoria = receitas[Math.floor(Math.random() * receitas.length)];

    let receita = document.createElement("div");
    receita.classList.add("card-receita");
    receita.innerHTML = `
        <img src="${receitaAleatoria.imagem}" alt="Imagem da Receita" class="card-img">
        <h5>Receita ${contadorReceita}</h5>
        <p class="text-muted">R$ 32,02</p>
    `;

    container.appendChild(receita);
    contadorReceita++;
}
