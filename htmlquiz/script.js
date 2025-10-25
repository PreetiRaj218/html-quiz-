const quizData = [
    {
    question: "What is the capital of france?",
    option: ["Paris","London","Berline","Rome"],
    correct: 0
    },
    {
        question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3
    },
];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
function loadQuestion() {
  const qData = quizData[currentQuestion];
  questionEl.innerText = qData.question;
  optionsEl.innerHTML = "";  // clear old options

  qData.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectOption(idx);
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function selectOption(selectedIdx) {
  const qData = quizData[currentQuestion];

  // disable all options after selecting
  Array.from(optionsEl.children).forEach(li => {
    li.firstChild.disabled = true;
  });

  if (selectedIdx === qData.correct) {
    score++;

    optionsEl.children[selectedIdx].firstChild.style.background = "#28a745";
  } else {
    
    optionsEl.children[selectedIdx].firstChild.style.background = "#dc3545";

    optionsEl.children[qData.correct].firstChild.style.background = "#28a745";
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.classList.add("hidden");
  optionsEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.innerText = `${score} / ${quizData.length}`;
}

// initial load
loadQuestion();
nextBtn.classList.add("hidden");