const questions = [
    {
        question: "Qual é o Pokémon inicial de fogo da região de Kanto?",
        options: ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"],
        correct: 1
    },
    {
        question: "Qual Pokémon é conhecido como o 'rato elétrico'?",
        options: ["Raichu", "Pichu", "Pikachu", "Electabuzz"],
        correct: 2
    },
    {
        question: "Qual é o tipo principal do Pokémon Bulbasaur?",
        options: ["Planta/Venenoso", "Inseto/Planta", "Planta/Psíquico", "Normal/Planta"],
        correct: 0
    },
    {
        question: "Qual dessas é uma evolução do Eevee?",
        options: ["Arcanine", "Vulpix", "Jolteon", "Growlithe"],
        correct: 2
    },
    {
        question: "Qual lendário é conhecido como guardião dos mares?",
        options: ["Lugia", "Ho-oh", "Kyogre", "Manaphy"],
        correct: 0
    },
    {
        question: "Qual é o Pokémon número 1 da Pokédex?",
        options: ["Charizard", "Bulbasaur", "Mew", "Rattata"],
        correct: 1
    },
    {
        question: "Qual Pokémon é famoso por falar seu próprio nome repetidamente?",
        options: ["Meowth", "Psyduck", "Jigglypuff", "Magikarp"],
        correct: 2
    },
    {
        question: "Qual é a evolução do Pichu?",
        options: ["Pikachu", "Raichu", "Plusle", "Minun"],
        correct: 0
    },
    {
        question: "Qual trio é conhecido como 'Aves Lendárias'?",
        options: ["Suicune, Entei e Raikou", "Articuno, Zapdos e Moltres", "Latios, Latias e Rayquaza", "Uxie, Mesprit e Azelf"],
        correct: 1
    },
    {
        question: "Qual Pokémon é conhecido por sua frase 'Eu escolho você!'?",
        options: ["Pikachu", "Charizard", "Squirtle", "Jigglypuff"],
        correct: 0
    }
];
// variavel de controle
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

// função para carregar a pergunta da tela e desativa o botão next
function loadQuestion() {
    nextBtn.disabled = true;

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
//cria os botões das opçãoes e poe o texto deles e chama a função  selectOption quando clicar
    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary";
        btn.textContent = option;
        btn.onclick = () => selectOption(index);
        optionsEl.appendChild(btn);
    });
}
//funçao para sabe qual opção foi selecionada e se está correta ou não
function selectOption(index) {
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);
//desativa as alternativas se vc escolhe uma opção e destaca a resposta correta ou incorreta
    if (index === questions[currentQuestion].correct) {
        score++;
        buttons[index].classList.remove("btn-outline-primary");
        buttons[index].classList.add("btn-success");
    } else {
        buttons[index].classList.remove("btn-outline-primary");
        buttons[index].classList.add("btn-danger");

        const correctBtn = buttons[questions[currentQuestion].correct];
        correctBtn.classList.remove("btn-outline-primary");
        correctBtn.classList.add("btn-success");
    }

    nextBtn.disabled = false;
}
//quando clicar no botão next carrega a próxima pergunta ou mostra o resultado final
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});
//resultado final do quiz e pontuaçacão 
function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultEl.style.display = "block";
    scoreEl.textContent = `${score} / ${questions.length}`;
}

loadQuestion();
//Querido programador:
//
//Quando escrevi esse código, só Deus e eu sabíamos o que ele funcionava.
//Agora, só Deus sabe!
//
//portanto, se você estiver tentando otimizar este código e falhar (o que é provável)
//por favor, aumente este contador como um aviso a proxima pessoa:
//
// total_horas_perdidas_aqui = 7
