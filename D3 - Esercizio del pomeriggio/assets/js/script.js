/* Soluzione di riferimento — ToDoList (Versione Base, esercizi 1-5)
   Form + event delegation + filtri. Niente localStorage in questa versione.
*/

let tasks = [];
// Ogni task: { id: number, testo: string, completato: boolean }
let filtro = "tutti"; // "tutti" | "attivi" | "completati"

/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. Listener sul submit di #form-task (preventDefault, validazione, push, render)
   2. Funzione rendiLista() (filtra, crea <li>, aggiorna contatore)
   3. Listener su #lista-task con event delegation (Elimina + checkbox)
   4. Listener sui button .filtri (cambia filtro, classe attivo, render)
   EXTRA: localStorage per persistenza
*/

const form = document.querySelector("#form-task");
const campo = document.querySelector("#campo-task");
const errore = document.querySelector("#errore");
const filtri = document.querySelectorAll(".filtri button");
const contatore = document.querySelector("#contatore");
const lista = document.querySelector("#lista-task");

//funzione rendiLista
function rendiLista() {
  lista.innerHTML = "";

  const visibili = tasks.filter((t) => {
    if (filtro === "attivi") return !t.completato;
    if (filtro === "completati") return t.completato;
    return true;
  });

  visibili.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.id = String(task.id);
    if (task.completato) li.classList.add("completato");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completato;
    li.appendChild(checkbox);

    const testo = document.createElement("span");
    testo.classList.add("testo");
    testo.textContent = task.testo;
    li.appendChild(testo);

    const elimina = document.createElement("button");
    elimina.classList.add("elimina");
    elimina.textContent = "Elimina";
    li.appendChild(elimina);

    lista.appendChild(li);
  });

  const attivi = tasks.filter((t) => !t.completato).length;
  contatore.textContent = String(attivi);
}

// form eventlistener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const testo = campo.value.trim();
  if (!testo) {
    errore.textContent = "Cazzo fai?";
    return;
  }
  errore.textContent = "";
  tasks.push({ id: Date.now(), testo, completato: false });
  campo.value = "";
  rendiLista();
});

//lista eventlistener
lista.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (event.target.classList.contains("elimina")) {
    tasks = tasks.filter((t) => t.id !== id);
    rendiLista();
  }
});

lista.addEventListener("change", (event) => {
  if (event.target.type !== "checkbox") return;
  const li = event.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  const task = tasks.find((t) => t.id === id);
  if (task) task.completato = !task.completato;
  rendiLista();
});

filtri.forEach((bottone) => {
  bottone.addEventListener("click", () => {
    filtro = bottone.dataset.filtro;
    filtri.forEach((b) => b.classList.remove("attivo"));
    bottone.classList.add("attivo");
    rendiLista();
  });
});

tasks = [
  { id: 1, testo: "Studiare JavaScript", completato: true },
  { id: 2, testo: "Scrivere la ToDoList", completato: false },
  { id: 3, testo: "Bere il caffè", completato: true },
  { id: 4, testo: "Ripassare gli eventi DOM", completato: false },
];
rendiLista();
