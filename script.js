
const questionBank = {

"General Knowledge": [
{q:"What is the capital of India?",o:["Mumbai","New Delhi","Chennai","Kolkata"],a:1},
{q:"Which is the largest ocean?",o:["Atlantic","Indian","Pacific","Arctic"],a:2},
{q:"Who wrote the national anthem of India?",o:["Tagore","Gandhi","Nehru","Premchand"],a:0},
{q:"How many colours are there in a rainbow?",o:["5","6","7","8"],a:2},
{q:"Which planet is known as the Red Planet?",o:["Earth","Mars","Venus","Jupiter"],a:1},
{q:"What is the currency of Japan?",o:["Dollar","Yen","Euro","Rupee"],a:1},
{q:"Which is the largest continent?",o:["Africa","Asia","Europe","Australia"],a:1},
{q:"Who was the first Prime Minister of India?",o:["Nehru","Gandhi","Patel","Bose"],a:0},
{q:"Which animal is known as the King of the Jungle?",o:["Tiger","Lion","Elephant","Leopard"],a:1},
{q:"How many days are there in a leap year?",o:["365","366","364","360"],a:1}
],

"Computer": [
{q:"What does CPU stand for?",o:["Central Processing Unit","Computer Personal Unit","Central Program Utility","Control Processing Unit"],a:0},
{q:"Which language is used to create web pages?",o:["HTML","C","Python","Java"],a:0},
{q:"What is the brain of a computer?",o:["Monitor","Keyboard","CPU","Mouse"],a:2},
{q:"Which is an input device?",o:["Printer","Monitor","Keyboard","Speaker"],a:2},
{q:"What does RAM stand for?",o:["Read Access Memory","Random Access Memory","Run Access Memory","Read And Memory"],a:1},
{q:"Which company developed Windows?",o:["Apple","Google","Microsoft","Intel"],a:2},
{q:"What is the full form of URL?",o:["Uniform Resource Locator","Universal Record Link","Uniform Read Link","User Resource Locator"],a:0},
{q:"Which symbol is used for comments in JavaScript single-line code?",o:["<!--","//","**","##"],a:1},
{q:"Which device is used to print documents?",o:["Scanner","Printer","Mouse","Router"],a:1},
{q:"What does HTML stand for?",o:["Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Language","Home Tool Markup Language"],a:0}
],

"Science": [
{q:"What is the chemical symbol of water?",o:["CO2","H2O","O2","NaCl"],a:1},
{q:"Which planet is closest to the Sun?",o:["Earth","Venus","Mercury","Mars"],a:2},
{q:"Which gas do humans need to breathe?",o:["Nitrogen","Oxygen","Carbon dioxide","Hydrogen"],a:1},
{q:"What is the boiling point of water at sea level?",o:["50°C","80°C","100°C","120°C"],a:2},
{q:"How many bones are in an adult human body?",o:["206","210","201","250"],a:0},
{q:"Which organ pumps blood?",o:["Brain","Lungs","Heart","Kidney"],a:2},
{q:"What is the centre of an atom called?",o:["Electron","Nucleus","Proton","Shell"],a:1},
{q:"Which vitamin is produced with sunlight exposure?",o:["Vitamin A","Vitamin B","Vitamin C","Vitamin D"],a:3},
{q:"What force pulls objects towards Earth?",o:["Friction","Gravity","Magnetism","Pressure"],a:1},
{q:"Which part of a plant absorbs water?",o:["Leaf","Flower","Root","Stem"],a:2}
],

"Sports": [
{q:"How many players are there in a cricket team?",o:["9","10","11","12"],a:2},
{q:"Which sport uses a shuttlecock?",o:["Tennis","Badminton","Football","Hockey"],a:1},
{q:"How many rings are there in the Olympic symbol?",o:["4","5","6","7"],a:1},
{q:"Which country won the FIFA World Cup in 2022?",o:["France","Brazil","Argentina","Germany"],a:2},
{q:"What is the national sport of Japan traditionally?",o:["Sumo","Cricket","Hockey","Football"],a:0},
{q:"How many players are on a football team on the field?",o:["9","10","11","12"],a:2},
{q:"Which sport is associated with Wimbledon?",o:["Cricket","Tennis","Golf","Hockey"],a:1},
{q:"What is the length of a cricket pitch?",o:["20 yards","22 yards","24 yards","25 yards"],a:1},
{q:"Which sport uses a basketball?",o:["Basketball","Volleyball","Tennis","Baseball"],a:0},
{q:"How many points is a goal worth in football?",o:["1","2","3","4"],a:0}
]

};

let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let playerName = "";
let selectedCategory = "";
let selectedAnswers = [];

const $ = id => document.getElementById(id);

const screens = [
"start-screen",
"quiz-screen",
"result-screen",
"review-screen",
"leaderboard-screen"
];

function showScreen(screenId) {
    screens.forEach(id => $(id).classList.add("hidden"));
    $(screenId).classList.remove("hidden");
}

function startQuiz() {
    playerName = $("player-name").value.trim();
    selectedCategory = $("category").value;

    if (!playerName) {
        $("name-error").textContent = "Please enter your name!";
        return;
    }

    $("name-error").textContent = "";

    questions = [...questionBank[selectedCategory]];
    questions.sort(() => Math.random() - 0.5);

    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];

    showScreen("quiz-screen");
    displayQuestion();
}

function displayQuestion() {
    clearInterval(timer);

    const q = questions[currentQuestion];

    $("question-number").textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    $("category-name").textContent = selectedCategory;
    $("question").textContent = q.q;
    $("timer").textContent = 30;

    $("progress-bar").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    $("options-container").innerHTML = "";
    $("next-btn").disabled = true;

    q.o.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "option";

        btn.addEventListener("click", () => selectAnswer(index));

        $("options-container").appendChild(btn);
    });

    timeLeft = 30;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    $("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        selectedAnswers[currentQuestion] = -1;
        revealAnswer();

        setTimeout(nextQuestion, 1000);
    }
}

function selectAnswer(index) {
    if (selectedAnswers[currentQuestion] !== undefined) return;

    clearInterval(timer);

    selectedAnswers[currentQuestion] = index;

    if (index === questions[currentQuestion].a) {
        score++;
    }

    revealAnswer();
}

function revealAnswer() {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option");

    buttons.forEach((btn, index) => {
        btn.disabled = true;

        if (index === q.a) {
            btn.classList.add("correct");
        }

        if (
            index === selectedAnswers[currentQuestion] &&
            index !== q.a
        ) {
            btn.classList.add("wrong");
        }
    });

    $("next-btn").disabled = false;
    $("next-btn").textContent =
        currentQuestion === questions.length - 1
        ? "Finish Quiz"
        : "Next Question";
}

function nextQuestion() {
    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);

    const total = questions.length;
    const wrong = total - score;
    const percentage = (score / total) * 100;

    $("progress-bar").style.width = "100%";

    $("player-result").textContent = `Player: ${playerName}`;
    $("final-score").textContent = `Score: ${score} / ${total}`;
    $("percentage").textContent = `Percentage: ${percentage}%`;
    $("correct-answers").textContent = `Correct Answers: ${score}`;
    $("wrong-answers").textContent = `Wrong Answers: ${wrong}`;

    $("result-message").textContent =
        percentage >= 80 ? "Excellent work!" :
        percentage >= 50 ? "Good effort! Keep practising." :
        "Keep learning and try again!";

    saveLeaderboard();
    showScreen("result-screen");
}

function saveLeaderboard() {
    let records = JSON.parse(
        localStorage.getItem("quizLeaderboard") || "[]"
    );

    records.push({
        name: playerName,
        category: selectedCategory,
        score: score,
        percentage: score * 10
    });

    records.sort((a, b) =>
        b.percentage - a.percentage || b.score - a.score
    );

    records = records.slice(0, 10);

    localStorage.setItem("quizLeaderboard", JSON.stringify(records));
}

function showReview() {
    $("review-container").innerHTML = "";

    questions.forEach((q, index) => {
        const answer = selectedAnswers[index];
        const isCorrect = answer === q.a;

        const item = document.createElement("div");
        item.className = "review-item";

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${q.q}`;

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent = "Your answer: " +
            (answer === -1 || answer === undefined
            ? "Not answered"
            : q.o[answer]);

        yourAnswer.className = isCorrect
            ? "correct-text"
            : "wrong-text";

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = "Correct answer: " + q.o[q.a];

        item.append(title, yourAnswer, correctAnswer);
        $("review-container").appendChild(item);
    });

    showScreen("review-screen");
}

function showLeaderboard() {
    const records = JSON.parse(
        localStorage.getItem("quizLeaderboard") || "[]"
    );

    $("leaderboard-body").innerHTML = "";
    $("empty-leaderboard").classList.toggle("hidden", records.length > 0);

    records.forEach((record, index) => {
        const row = document.createElement("tr");

        [
            index + 1,
            record.name,
            record.category,
            `${record.score}/10`,
            `${record.percentage}%`
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        $("leaderboard-body").appendChild(row);
    });

    showScreen("leaderboard-screen");
}

function clearLeaderboard() {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
        localStorage.removeItem("quizLeaderboard");
        showLeaderboard();
    }
}

$("start-btn").addEventListener("click", startQuiz);
$("next-btn").addEventListener("click", nextQuestion);

$("review-btn").addEventListener("click", showReview);

$("restart-btn").addEventListener("click", () => {
    $("player-name").value = playerName;
    showScreen("start-screen");
});

$("start-leaderboard-btn").addEventListener("click", showLeaderboard);
$("result-leaderboard-btn").addEventListener("click", showLeaderboard);

$("back-btn").addEventListener("click", () => {
    showScreen("start-screen");
});

$("review-back-btn").addEventListener("click", () => {
    showScreen("result-screen");
});

$("clear-leaderboard-btn").addEventListener("click", clearLeaderboard);
