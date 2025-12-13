// CONFIGURAÇÃO

const tempoPorPergunta = 10;

let indice = 0;
let pontuacao = 0;
let tempo;
let contador;

// Array para guardar as perguntas erradas

let erros = [];


// QUESTÕES BYD

const quiz = [
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
    imagem: "assets/fundo1.jpg"
  },
  {
    pergunta: "Em que país a BYD foi fundada?",
    alternativas: ["Japão", "Coreia do Sul", "EUA", "China", "Alemanha"],
    correta: 3,
    pontos: 10,
    imagem: "assets/fundo2.jpg"
  },
  {
    pergunta: "Em que ano a BYD foi fundada?",
    alternativas: ["1988", "1995", "2001", "2003", "2010"],
    correta: 1,
    pontos: 10,
    imagem: "assets/fundo3.jpg"
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
    imagem: "assets/fundo4.jpg"
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
    imagem: "assets/fundo5.jpg"
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
    imagem: "assets/fundo6.jpg"
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
    imagem: "assets/fundo7.jpg"
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
    imagem: "assets/fundo8.jpg"
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
    imagem: "assets/fundo9.jpg"
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
    imagem: "assets/fundo10.jpg"
  }
];


// INICIAR PERGUNTA

function iniciarPergunta() {
  if (indice >= quiz.length) {
    mostrarResultado();
    return;
  }

  const q = quiz[indice];

  document.body.style.backgroundImage = `url('${q.imagem}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  document.getElementById("question-text").textContent =
    `(${indice + 1}) ${q.pergunta}`;

  const opcoesDiv = document.getElementById("options");
  opcoesDiv.innerHTML = "";

  q.alternativas.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.textContent = alt;
    btn.onclick = () => responder(i);
    opcoesDiv.appendChild(btn);
  });

  tempo = tempoPorPergunta;
  document.getElementById("time-left").textContent = tempo;
  iniciarTimer();
}


// TIMER (Não avançando a pergunta automaticamente)

function iniciarTimer() {
  clearInterval(contador);
  contador = setInterval(() => {
    tempo--;
    document.getElementById("time-left").textContent = tempo;

    if (tempo <= 0) {
      clearInterval(contador);
      document.getElementById("time-left").textContent = "0";
      // trava a pergunta aguardando resposta
    }
  }, 1000);
}


// RESPONDER

function responder(i) {
  clearInterval(contador);
  const q = quiz[indice];

  if (i === q.correta) {
    pontuacao += q.pontos;
  } else {
    
    // guarda a pergunta errada
    erros.push({
      pergunta: q.pergunta,
      respostaCorreta: q.alternativas[q.correta]
    });
  }

  indice++;
  iniciarPergunta();
}


// RESULTADO FINAL

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
    listaErros = "<p>Parabéns! Você não errou nenhuma questão 🎉</p>";
  }

  document.getElementById("quiz-container").innerHTML = `
    <h2>Resultado Final</h2>
    <p>Pontuação total: <strong>${pontuacao}</strong></p>
    <p>Total de perguntas: ${quiz.length}</p>
    <p>Total de erros: ${erros.length}</p>
    ${listaErros}
  `;
}


iniciarPergunta();
