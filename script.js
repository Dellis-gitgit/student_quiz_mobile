// ============================
// Quiz data
// ============================

// console.log("JavaScript is running"); // <--- Go to Web -> Inspect -> Console... Hit run and if this text appears in the console without any warnings, then everything is fine

const questions = [
    { question: "Ποιο είναι το αγαπημένο σου μέρος για διάβασμα;", options: { a:"Στη βιβλιοθήκη, με απόλυτη ησυχία", b:"Στην καφετέρια με φίλους και καφέ", c:"Στο σπίτι, με μουσική", d:"Δεν διαβάζω. Λιώνω όλη μέρα βόλτες και παιχνίδια και στην εξεταστική το κάνω freestyle" } },
    { question: "Πρώτη μέρα μαθημάτων... Τι κάνεις;", options: { a:"Κάθομαι μπροστά μπροστά και κρατάω σημειώσεις", b:"Μιλάω με όλους και κάνω παρέες", c:"Παρατηρώ και προσπαθώ να καταλάβω την ατμόσφαιρα (ίσως και τις επιλογές μου στην ζωή)", d:"Είδα φώς και μπήκα. Θα πάω καπάκι για καφέ και ελπίζω να μην έχει απουσία" } },
    { question: "Ποιος είναι ο ιδανικός τρόπος μάθησης;", options: { a:"Οργανωμένα, μεθοδικά και βήμα-βήμα", b:"Με παρέα και συζήτηση (θα φάμε 2 ώρες να λέμε κουτσομπολιά αλλά θα διαβάσουμε)", c:"Με παρακολούθηση και χαλαρή μελέτη", d:"Δεν διαβάζω...Είναι όλα αυτονόητα" } },
    { question: "Τι κάνεις πριν μια μεγάλη εξέταση;", options: { a:"Μελετάω από την αρχή του εξαμήνου, δεν χάνω τον ρυθμό μου και είμαι σίγουρος για τις γνώσεις μου ", b:"Συζητάω με φίλους για να καταλάβουμε όλοι (άν τα έχουμε καταλάβει)", c:"Χαλαρώνω, προσπαθώ να κάνω ανάκληση τι θυμάμαι και ελπίζω να μου έρθουν και τότε", d:"Ποια μεγάλη εξέταση ρε παιδιά;;" } },
    { question: "Πως διαχειρίζεσαι τις ομαδικές εργασίες;", options: { a:"Σχεδιάζω και κατανέμω καθήκοντα (σιγά ρε Ναπολέων)", b:"Επικοινωνώ και συζητάω συνεχώς με την ομάδα (όχι σε εκνευριστικό βαθμό)", c:"Βοηθάω όσο μπορώ χωρίς άγχος", d:"Θα με κουβαλήσουν τα παιδιά μωρέ (Μη το κάνεις αυτό ποτέ please)" } },
    { question: "Ποιό είναι το στυλ σου στις σημειώσεις;", options: { a:"Καθαρά, οργανωμένα, ευδιάκριτα και πλήρη", b:"Με χρωματάκια και doodles (χιχι)", c:"Σύντομα, μόνο τα βασικά", d:"Αδερφέ μου δίνεις ένα στυλό; (Καταλήγει να στον δαγκώνει όσο είναι στο κινητό)" } },
    { question: "Πως προτιμάς να περνάς τον ελεύθερό σου χρόνο στο Πανεπιστήμιο;", options: { a:"Πάω βιβλιοθήκη και διαβάζω", b:"Κοινωνικά, με φίλους", c:"Χαλαρά, μόνος ή με παρέα και ό,τι βγεί", d:"Άν δεν πίνω ήδη καφέ πάω και εγώ βιβλιοθήκη!...Απλώς για να ρίξω έναν υπνάκο (σε νιώθω)" } },
];

const resultDescriptions = {
    a: "Είσαι ο οργανωμένος τύπος! Προγραμματισμένος, προνοητικός και πάντα έτοιμος για την επόμενη πρόκληση.",
    b: "Είσαι ο κοινωνικός τύπος! Λατρεύεις τη συνεργασία και κάνεις κάθε ομαδική εργασία πιο διασκεδαστική.",
    c: "Είσαι ο χαλαρός τύπος! Δεν αγχώνεσαι εύκολα και βρίσκεις ισορροπία ανάμεσα σε σπουδές και ξεκούραση.",
    d: "Είσαι ο αυθόρμητος τύπος! Ζεις τη φοιτητική ζωή στο έπακρο και πάντα βρίσκεις έναν δημιουργικό τρόπο να τα καταφέρνεις."
};

// ============================
// DOM elements (Document Object Model)
// ============================
const startBtn = document.getElementById("startBtn");
const home = document.getElementById("home");
const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const resultType = document.getElementById("resultType");
const resultDesc = document.getElementById("resultDesc");
const restartBtn = document.getElementById("restartBtn");
const resultImg = document.getElementById("resultImg");

let currentQuestion = 0;
let answers = [];

// ============================
// Quiz logic
// ============================
startBtn.onclick = () => {
    home.style.display = "none";
    quizDiv.style.display = "block";
    showQuestion();
};

restartBtn.onclick = () => {
    answers = [];
    currentQuestion = 0;
    resultDiv.style.display = "none";
    home.style.display = "block";
};

function showQuestion() {
    const q = questions[currentQuestion];
    questionText.innerText = q.question;
    optionsDiv.innerHTML = "";
    for (const [key, value] of Object.entries(q.options)) {
        const btn = document.createElement("button");
        btn.innerText = `${key.toUpperCase()}. ${value}`;
        btn.onclick = () => selectAnswer(key);
        optionsDiv.appendChild(btn);
    }
}

function selectAnswer(choice) {
    answers.push(choice);
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        showQuestion();
    }
}

function showResult() {
    const counts = {};
    answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
    const most = Object.keys(counts).reduce((a,b) => counts[a]>counts[b]?a:b);
    resultType.innerText = `Έχεις επιλέξει κυρίως απαντήσεις τύπου ${most.toUpperCase()}!`;
    resultDesc.innerText = resultDescriptions[most];

    //Change the image according to the result
    const BASE = "student_quiz_mobile/images/";

    if (most === 'a') resultImg.src = BASE + "resultA.jpg";
    else if (most === 'b') resultImg.src = BASE + "resultB.jpg";
    else if (most === 'c') resultImg.src = BASE + "resultC.jpg";
    else if (most === 'd') resultImg.src = BASE + "resultD.jpg";

    quizDiv.style.display = "none";
    resultDiv.style.display = "block";
}

// ============================
// Glowing Morphing Lava Lamp
// ============================
const canvas = document.getElementById("lavaCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Blob {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.pulse = Math.random() * Math.PI * 2;
        this.angle = Math.random() * Math.PI * 2;
    }
    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.angle = Math.PI - this.angle;
        if (this.y < 0 || this.y > canvas.height) this.angle = -this.angle;
    }
    draw(ctx) {
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius*0.2, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        const pulseRadius = this.radius * (1 + 0.1 * Math.sin(this.pulse));
        ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
        this.pulse += 0.02; // speed of morphing
        ctx.fill();
    }
}


// Determine screen width
let numBlobs = window.innerWidth <= 600 ? 5 : 8;
let minRadius = window.innerWidth <= 600 ? 50 : 80;
let maxRadius = window.innerWidth <= 600 ? 100 : 140;
let minSpeed = window.innerWidth <= 600 ? 0.2 : 0.3;
let maxSpeed = window.innerWidth <= 600 ? 0.5 : 0.7;

const blobs = [];  //blob creation section

for (let i = 0; i < numBlobs; i++) {
    blobs.push(new Blob(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        minRadius + Math.random() * (maxRadius - minRadius),
        `rgba(156,39,176,${0.5 + Math.random() * 0.5})`,
        minSpeed + Math.random() * (maxSpeed - minSpeed)
    ));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Blend softly
    ctx.globalCompositeOperation = "lighter";
    blobs.forEach(blob => {
        blob.move();
        blob.draw(ctx);
    });

    // Reset blending for next frame
    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame(animate);
}
animate(); // <--- this line starts the motion

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recreate blobs on resize
    blobs.length = 0; // clear old blobs

    let numBlobs = window.innerWidth <= 600 ? 5 : 8;
    let minRadius = window.innerWidth <= 600 ? 50 : 80;
    let maxRadius = window.innerWidth <= 600 ? 100 : 140;
    let minSpeed = window.innerWidth <= 600 ? 0.2 : 0.3;
    let maxSpeed = window.innerWidth <= 600 ? 0.5 : 0.7;

    for (let i = 0; i < numBlobs; i++) {
        blobs.push(new Blob(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            minRadius + Math.random() * (maxRadius - minRadius),
            `rgba(156,39,176,${0.5 + Math.random() * 0.5})`,
            minSpeed + Math.random() * (maxSpeed - minSpeed)
        ));
    }
});