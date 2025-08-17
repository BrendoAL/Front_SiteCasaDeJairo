document.addEventListener("DOMContentLoaded", () => {
  /* BOTÃO VER MAIS */
  const botaoVerMais = document.getElementById("btn-ver-mais");
  const escondidos = document.querySelectorAll(".evento-card.hidden");

  if (botaoVerMais) {
    botaoVerMais.addEventListener("click", () => {
      escondidos.forEach(n => n.classList.remove("hidden"));
      botaoVerMais.style.display = "none";
    });
  } else {
    console.warn("Botão 'Ver mais' não encontrado na página.");
  }

  /* CALENDÁRIO – Agosto 2025 */
  const eventos = [
    { dia: 3, tipo: "azul", nome: "Oficina 🎨" },
    { dia: 5, tipo: "verde", nome: "Campanha 🥫" },
    { dia: 8, tipo: "amarelo", nome: "Reunião 🤝" },
    { dia: 9, tipo: "vermelho", nome: "Festa 🎉" },
    { dia: 12, tipo: "aniversario", nome: "Maria Clara 🎂", foto: "../imagens/maria-clara.jpg" },
    { dia: 14, tipo: "aniversario", nome: "João Pedro 🎂", foto: "../imagens/joao-pedro.jpg" },
    { dia: 27, tipo: "aniversario", nome: "Gabriel Santos 🎂", foto: "../imagens/gabriel-santos.jpg" },
    { dia: 5,  tipo: "aniversario", nome: "Ana Lima 🎂", foto: "../imagens/ana-lima.jpg" },
    { dia: 18, tipo: "aniversario", nome: "Pedro Souza 🎂", foto: "../imagens/pedro-souza.jpg" },
    { dia: 25, tipo: "aniversario", nome: "Júlia Oliveira 🎂", foto: "../imagens/julia-oliveira.jpg" },
  ];

  const diasMes = document.getElementById("dias-mes");
  if (diasMes) {
    // Espaço antes do 1º dia (offset para começar em quarta, por exemplo)
    for (let i = 0; i < 5; i++) {
      const vazio = document.createElement("div");
      vazio.className = "dia vazio";
      diasMes.appendChild(vazio);
    }
    // Dias do mês
    for (let d = 1; d <= 31; d++) {
      const dia = document.createElement("div");
      dia.className = "dia";
      dia.innerHTML = `<span class="numero">${d}</span>`;
      eventos.filter(ev => ev.dia === d).forEach(ev => {
        dia.classList.add(ev.tipo);
        dia.innerHTML += `<span class="evento">${ev.nome}</span>`;
      });
      diasMes.appendChild(dia);
    }
  } else {
    console.warn("Container de dias do mês não encontrado.");
  }

  /* ANIVERSARIANTES */
  const aniversariantes = eventos.filter(ev => ev.tipo === "aniversario");
  const lista = document.getElementById("lista-aniversariantes");
  const track = document.getElementById("carousel-track");

  if (aniversariantes.length > 0) {
    aniversariantes.forEach(aniv => {
      if (lista) {
        const li = document.createElement("li");
        li.textContent = `${aniv.nome.replace(" 🎂","")} - Dia ${aniv.dia}`;
        lista.appendChild(li);
      }
      if (track) {
        const card = document.createElement("div");
        card.className = "item";
        card.innerHTML = `
          <img src="${aniv.foto}" alt="${aniv.nome.replace(" 🎂","")}">
          <h4>${aniv.nome.replace(" 🎂","")}</h4>
          <small>Dia ${aniv.dia}</small>
        `;
        track.appendChild(card);
      }
    });
  } else {
    console.warn("Nenhum aniversariante encontrado para este mês.");
  }

  /* Carrossel navegação */
  if (track) {
    const btnPrev = document.querySelector(".aniversariantes .prev");
    const btnNext = document.querySelector(".aniversariantes .next");
    const scrollAmount = () => track.clientWidth * 0.9;

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      });
    }
  }
});

