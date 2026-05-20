/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
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
const campoTask = document.querySelector("#campo-task");
const listaTask = document.querySelector("#lista-task");
const errore = document.querySelector("#errore");
const contatore = document.querySelector("#contatore");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const testo = campoTask.value.trim();

  if (testo === " ") {
    errore.textContent = "Inserisci un task valido!";
    return;
  }
  errore.textContent = "";

  const task = {
    id: Date.now(),
    testo: testo,
    completato: false,
  };
  tasks.push(task);
  campoTask.value = "";
  rendiLista();
});

function rendiLista() {
  listaTask.innerHTML = "";

  let tasksFilter = tasks;

  if (filtro === "attivi") {
    tasksFilter = tasks.filter((tasks) => !tasks.completato);
  } else if (filtro === "completati") {
    tasksFilter = tasks.filter((tasks) => tasks.completato);
  }

  tasksFilter.forEach(function (task) {
    const li = document.createElement("li");
    li.dataset.id = 1;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = listaTask.completato;

    const testo = document.createElement("p");
    testo.textContent = listaTask.testo;

    const testoTask = document.createElement("span");
    testoTask.textContent = listaTask.testo;

    const btnElimina = document.createElement("button");
    btnElimina.textContent = "Elimina";

    li.appendChild(checkbox);
    li.appendChild(testoTask);
    li.appendChild(btnElimina);

    listaTask.appendChild(li);
  });

  const tasksAttive = tasks.filter((tasks) => !tasks.completato).length;
  contatore.textContent = tasksAttive;
}
