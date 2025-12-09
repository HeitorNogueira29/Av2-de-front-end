// Saudação automática (apenas em site.html)
window.onload = () => {
    if (window.location.pathname.includes("site.html") || window.location.pathname.endsWith("/")) {
        const h = new Date().getHours();
        let msg = h < 12 ? "Bom dia!" : h < 18 ? "Boa tarde!" : "Boa noite!";
        alert(msg + " Seja bem-vindo!");
    }
};

// Botão voltar ao topo
const topoBtn = document.getElementById("topoBtn");

window.addEventListener("scroll", () => {
    topoBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

topoBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Tema escuro
function alternarTema() {
    document.body.classList.toggle("dark");
}

// Animação dos cards
const cards = document.querySelectorAll(".card");
window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const pos = card.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            card.classList.add("ativo");
        }
    });
});

// Avisos automáticos (apenas em comunicados.html)
if (window.location.pathname.includes("comunicados.html")) {
    const novos = [
        { titulo: "Reforço Escolar", data: "05/12", texto: "Reforço para alunos do 6º ao 9º." },
        { titulo: "Simulado SAEB", data: "12/12", texto: "Simulado geral para o 9º ano." }
    ];

    const board = document.querySelector(".notice-board");

    novos.forEach(aviso => {
        const div = document.createElement("div");
        div.className = "notice";
        div.innerHTML = `
            <h3>${aviso.titulo}</h3>
            <p>${aviso.texto}</p>
            <div class="notice-date">📅 ${aviso.data}</div>
        `;
        board.appendChild(div);
    });
}

/* Carrossel simples */
(function initCarousel(){
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const slidesWrap = carousel.querySelector('.slides');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const nextBtn = carousel.querySelector('.carousel-next');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let index = 0;
    // build dots
    slides.forEach((s,i)=>{
        const btn = document.createElement('button');
        btn.className = 'carousel-dot' + (i===0? ' active':'');
        btn.setAttribute('aria-label', 'Ir para slide ' + (i+1));
        btn.addEventListener('click', ()=>{ index = i; update(); });
        dotsWrap.appendChild(btn);
    });

    function update(){
        slidesWrap.style.transform = `translateX(-${index*100}%)`;
        const dots = dotsWrap.querySelectorAll('.carousel-dot');
        dots.forEach((d,i)=> d.classList.toggle('active', i===index));
    }

    nextBtn && nextBtn.addEventListener('click', ()=>{ index = (index+1) % slides.length; update(); });
    prevBtn && prevBtn.addEventListener('click', ()=>{ index = (index-1+slides.length) % slides.length; update(); });

    // autoplay
    let autoplay = setInterval(()=>{ index = (index+1) % slides.length; update(); }, 5000);
    carousel.addEventListener('mouseenter', ()=> clearInterval(autoplay));
    carousel.addEventListener('mouseleave', ()=> autoplay = setInterval(()=>{ index = (index+1) % slides.length; update(); }, 5000));
    // initial
    update();
})();
