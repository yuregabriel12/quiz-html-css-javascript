# Quiz Corporativo – BYD

Projeto desenvolvido para a disciplina **Desenvolvimento de Aplicações para Internet**

Curso: **Análise e Desenvolvimento de Sistemas – UNINASSAU**

## Objetivo
Criar um quiz temático sobre a empresa BYD (Build Your Dreams), usando apenas HTML5, CSS3 e JavaScript, funcionando 100% offline.

## Como executar (offline)

1. Baixe o arquivo .zip do projeto.
2. Extraia o conteúdo do arquivo em uma pasta local.
3. Abra o arquivo index.html diretamente pelo navegador (duplo clique).
4. Utilize o botão "Inicie Aqui" para acessar o quiz.

## Navegador testado
- Google Chrome (Windows)

## Funcionalidades
- 10 questões com 5 alternativas (A–E)
- Temporizador configurável por questão
- Troca automática para a próxima questão ao acabar o tempo
- Pontuação final e listagem de questões erradas com resposta correta
- Imagem de fundo diferente em cada questão (pasta imagens/)

## Estrutura de pastas

```
projeto-quiz-byd/
├── index.html
├── quiz.html
├── css/
│ ├── index.css
│ └── quiz.css
├── js/
│ └── quiz.js
├── imagens/
│ ├── icon.png
│ ├── fundo1.jpg
│ ├── fundo2.jpg
│ ├── fundo3.jpg
│ ├── fundo4.jpg
│ ├── fundo5.jpg
│ ├── fundo6.jpg
│ ├── fundo7.jpg
│ ├── fundo8.jpg
│ ├── fundo9.jpg
│ └── fundo10.jpg
└── README.md
```

## Código-base e modificações do grupo
O projeto partiu de um código-base disponibilizado pelo professor.
Modificações realizadas pelo grupo:
- criação/atualização das perguntas para o tema BYD
- separação do JavaScript em arquivo externo
- temporizador configurável e avanço automático ao expirar
- exibição do resultado final com identificação e lista de erros
- organização das pastas (css/, js/, imagens/) e ajustes para funcionar offline

## Integrantes do grupo
- Emanuelly Vieira: Lógica JavaScript do quiz (timer, pontuação, resultado)
- Gabriel Cristovão: Estrutura HTML das páginas
- Yure Gabriel: Estilização CSS