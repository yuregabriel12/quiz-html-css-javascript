/*
  Arquivo: quiz.js
  Responsável: Emanuelly Vieira
  Objetivo: Controlar a lógica do quiz (perguntas, timer, pontuação e resultado final).

  Requisitos atendidos:
  - 10 questões com 5 alternativas
  - temporizador configurável e avanço automático ao expirar
  - imagem de fundo diferente por questão (pasta imagens/)
  - resultado final com lista de questões erradas e resposta correta
*/

// Tempo configurável por pergunta (em segundos)
const tempoPorPergunta = 10;

// Estado do quiz
let indice = 0; // índice da questão atual
let pontuacao = 0; // pontuação total
let tempo; // tempo restante na questão atual
let contador; // referência do temporizador

// Armazena questões erradas para exibir no resultado final
let erros = [];

/*
  Cada questão possui:
  - pergunta: texto da pergunta
  - alternativas: 5 opções de resposta
  - correta: índice da alternativa correta (0 a 4)
  - pontos: pontuação da questão
  - imagem: caminho local da imagem de fundo
*/

const quiz = [ /* Array de questões */
  {
    pergunta: "O que significa a sigla BYD?",
    alternativas: [
      "Bring Your Development",
      "Build Your Dreams",
      "Beyond Your Drive",
      "Build Your Design",
      "Boost Your Dreams"
    ],
    correta: 1, 
    pontos: 10,
    imagem: "../imagens/fundo1.jpg" 
  },
  {
    pergunta: "Em que país a BYD foi fundada?",
    alternativas: ["Japão", "Coreia do Sul", "EUA", "China", "Alemanha"],
    correta: 3,
    pontos: 10,
    imagem: "../imagens/fundo2.jpg"
  },
  {
    pergunta: "Em que ano a BYD foi fundada?",
    alternativas: ["1988", "1995", "2001", "2003", "2010"],
    correta: 1,
    pontos: 10,
    imagem: "../imagens/fundo3.jpg"
  },
  {
    pergunta: "Qual foi o primeiro produto fabricado pela BYD?",
    alternativas: [
      "Carros elétricos",
      "Ônibus elétricos",
      "Baterias para celulares",
      "Painéis solares",
      "Motores elétricos"
    ],
    correta: 2,
    pontos: 10,
    imagem: "../imagens/fundo4.jpg"
  },
  {
    pergunta: "Qual bateria tornou a BYD referência em segurança?",
    alternativas: [
      "Power Cell",
      "Blade Battery",
      "Solid Battery",
      "Ultra Cell",
      "Energy Max"
    ],
    correta: 1,
    pontos: 10,
    imagem: "../imagens/fundo5.jpg"
  },
  {
    pergunta: "Qual tecnologia a Blade Battery utiliza?",
    alternativas: [
      "Íon-lítio comum",
      "Níquel-hidreto",
      "Lítio-ferro-fosfato (LFP)",
      "Estado sólido",
      "Grafeno"
    ],
    correta: 2,
    pontos: 10,
    imagem: "../imagens/fundo6.jpg"
  },
  {
    pergunta: "Qual modelo da BYD é um SUV elétrico?",
    alternativas: [
      "BYD Dolphin",
      "BYD Han",
      "BYD Seal",
      "BYD Atto 3",
      "BYD F3DM"
    ],
    correta: 3,
    pontos: 10,
    imagem: "../imagens/fundo7.jpg"
  },
  {
    pergunta: "Qual fator ajudou a BYD a reduzir custos?",
    alternativas: [
      "Produção terceirizada",
      "Importação de peças",
      "Verticalização da produção",
      "Parcerias europeias",
      "Licenciamento externo"
    ],
    correta: 2,
    pontos: 10,
    imagem: "../imagens/fundo8.jpg"
  },
  {
    pergunta: "Qual investidor famoso possui participação na BYD?",
    alternativas: [
      "Elon Musk",
      "Bill Gates",
      "Warren Buffett",
      "Jeff Bezos",
      "Mark Zuckerberg"
    ],
    correta: 2,
    pontos: 10,
    imagem: "../imagens/fundo9.jpg"
  },
  {
    pergunta: "Um dos desafios da BYD é:",
    alternativas: [
      "Falta de tecnologia",
      "Pouca produção",
      "Dependência do mercado chinês",
      "Ausência de inovação",
      "Preço elevado"
    ],
    correta: 2,
    pontos: 10,
    imagem: "../imagens/fundo10.jpg"
  }
];

/**
 * Mostra a pergunta atual, cria os botões das alternativas e inicia o temporizador.
 * @returns {void}
*/

function iniciarPergunta() { 
  if (indice >= quiz.length) {
    mostrarResultado();
    return;
  }

  const q = quiz[indice]; 

  // Define a imagem de fundo da questão atual (pasta imagens/)
  document.body.style.backgroundImage = `url('${q.imagem}')`; // Ajuste do caminho
  document.body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem
  document.body.style.backgroundPosition = "center"; // Centraliza a imagem
  document.body.style.backgroundRepeat = "no-repeat"; // Não repete a imagem

  // Atualiza texto da pergunta
  document.getElementById("question-text").textContent = `(${indice + 1}) ${q.pergunta}`;

  // Cria os botões de alternativas
  const opcoesDiv = document.getElementById("options");
  opcoesDiv.innerHTML = "";

  q.alternativas.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.textContent = alt;
    btn.onclick = () => responder(i);
    opcoesDiv.appendChild(btn);
  });

  // Reinicia o tempo da pergunta
  tempo = tempoPorPergunta;
  document.getElementById("time-left").textContent = tempo;

  iniciarTimer();
}

/**
 * Controla o temporizador. Quando chega a 0, avança automaticamente e registra como erro.
 * @returns {void}
*/

function iniciarTimer() { 
  clearInterval(contador);

  contador = setInterval(() => {
    tempo--;
    document.getElementById("time-left").textContent = tempo;

    if (tempo <= 0) {
      clearInterval(contador);

      // Tempo esgotado conta como erro
      const q = quiz[indice];
      erros.push({
        pergunta: q.pergunta,
        respostaCorreta: q.alternativas[q.correta]
      });

      indice++;
      iniciarPergunta();
    }
  }, 1000); // Atualiza a cada segundo
}

/**
 * Processa a resposta do usuário.
 * @param {number} i índice da alternativa escolhida (0 a 4).
 * @returns {void}
*/

function responder(i) {
  clearInterval(contador);

  const q = quiz[indice];

  if (i === q.correta) {
    pontuacao += q.pontos;
  } else {
    erros.push({
      pergunta: q.pergunta,
      respostaCorreta: q.alternativas[q.correta]
    });
  }

  indice++;
  iniciarPergunta();
}

/**
 * Exibe o resultado final (pontuação e lista de erros).
 * @returns {void}
*/

function mostrarResultado() {
  let listaErros = "";

  if (erros.length > 0) {
    listaErros = "<h3>Questões erradas:</h3><ul>";
    erros.forEach((e) => {
      listaErros += `
        <li>
          <strong>${e.pergunta}</strong><br>
          Resposta correta: ${e.respostaCorreta}
        </li><br>
      `;
    });
    listaErros += "</ul>";
  } else {
    listaErros = "<p>Você não errou nenhuma questão.</p>";
  }

  document.getElementById("quiz-container").innerHTML = `
    <h2>Resultado Final</h2>
    <p>Pontuação total: <strong>${pontuacao}</strong></p>
    <p>Total de perguntas: ${quiz.length}</p>
    <p>Total de erros: ${erros.length}</p>
    ${listaErros}
  `;
}

// Inicia o quiz ao abrir a página
iniciarPergunta();
