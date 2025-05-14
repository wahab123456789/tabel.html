const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const optionButtons = document.querySelectorAll('.option'); // Mendapatkan semua tombol opsi

let num1;
let num2;
let correctAnswer;
let score = 0;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1; // Angka acak antara 1 dan 10
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;
    questionElement.textContent = `${num1} x ${num2} = ?`;

    // Membuat array pilihan jawaban (satu jawaban benar dan tiga acak lainnya)
    const choices = [correctAnswer];
    while (choices.length < 4) {
        const randomAnswer = Math.floor(Math.random() * 100) + 1; // Jawaban acak
        if (!choices.includes(randomAnswer)) {
            choices.push(randomAnswer);
        }
    }

    // Mengacak urutan pilihan jawaban
    shuffleArray(choices);

    // Menetapkan teks pada tombol opsi dan menandai jawaban yang benar
    optionButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.dataset.answer = (choices[index] === correctAnswer).toString();
        button.classList.remove('correct', 'incorrect'); // Reset styling
    });

    messageElement.textContent = ''; // Kosongkan pesan
}

function checkAnswer(event) {
    const selectedButton = event.target;
    const userAnswer = parseInt(selectedButton.textContent);
    const isCorrect = selectedButton.dataset.answer === 'true';

    // Menonaktifkan semua tombol setelah pemain menjawab
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {
        messageElement.textContent = 'Correct!';
        messageElement.className = 'correct';
        selectedButton.classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        messageElement.textContent = `Incorrect. The answer is ${correctAnswer}.`;
        messageElement.className = 'incorrect';
        selectedButton.classList.add('incorrect');

        // Menandai jawaban yang benar setelah jawaban salah
        optionButtons.forEach(button => {
            if (button.dataset.answer === 'true') {
                button.classList.add('correct');
            }
        });
    }

    // Menunggu sebentar sebelum menampilkan soal berikutnya
    setTimeout(generateQuestion, 1500);
}

// Fungsi untuk mengacak array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Menambahkan event listener ke setiap tombol opsi
optionButtons.forEach(button => {
    button.addEventListener('click', checkAnswer);
});

// Memulai game dengan soal pertama
generateQuestion();