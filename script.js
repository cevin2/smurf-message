const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

const openBtn = document.getElementById("openBtn");
const doneBtn = document.getElementById("doneBtn");

const lines = document.querySelectorAll(".line");

const text = [

"الحمد لله على السلامة شرشبيل",

"انا بابا سنفور و وصيت لك :",

"لا تنسى تقفل على القدرات",

"الله يوفقك ويكتب لك أعلى الدرجات",

"يلا باي 👋"

];

let current = 0;

openBtn.onclick = () => {

    envelope.classList.add("open");

    setTimeout(()=>{

        envelope.style.transform="translateY(220px) scale(.9)";
        letter.classList.add("show");

        writeLine();

    },900);

};

function writeLine(){

    if(current >= text.length){

        doneBtn.style.display = "inline-block";

        return;

    }

    let i = 0;

    let sentence = text[current];

    lines[current].innerHTML = "";

    let timer = setInterval(()=>{

        lines[current].innerHTML += sentence.charAt(i);

        i++;

        if(i >= sentence.length){

            clearInterval(timer);

            // عند سطر القدرات شغل الكونفتي
            if(current === 2){

                startConfetti();

            }

            current++;

            setTimeout(writeLine,700);

        }

    },45);

}

/* ===========================
   الكونفتي
=========================== */

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

let particles=[];

function startConfetti(){

    particles=[];

    for(let i=0;i<180;i++){

        particles.push({

            x:Math.random()*canvas.width,

            y:-20,

            r:Math.random()*8+4,

            dx:(Math.random()-0.5)*5,

            dy:Math.random()*4+3,

            color:`hsl(${Math.random()*360},90%,60%)`

        });

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p)=>{

        ctx.fillStyle=p.color;

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fill();

        p.x+=p.dx;
        p.y+=p.dy;

    });

    particles=particles.filter(p=>p.y<canvas.height+20);

    if(particles.length>0){

        requestAnimationFrame(animateConfetti);

    }else{

        ctx.clearRect(0,0,canvas.width,canvas.height);

    }

}

/* ===========================
   زر النهاية
=========================== */

doneBtn.onclick=()=>{

    doneBtn.innerHTML="😂 تم استلام الوصية";

    doneBtn.style.background="#16a34a";

    setTimeout(()=>{

        current=0;

        envelope.classList.remove("open");

        envelope.style.transform="";

        letter.classList.remove("show");

        doneBtn.style.display="none";

        lines.forEach(line=>line.innerHTML="");

    },2500);

}