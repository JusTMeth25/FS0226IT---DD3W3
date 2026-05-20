/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let tasks = [];
// Ogni task: { id: number, testo: string, completato: boolean }

let filtro = "tutti"; // "tutti" | "attivi" | "completati"

// ============================================================================
// DOM ELEMENTS - Cached references
// ============================================================================

const form = document.querySelector("#form-task");
const campoTask = document.querySelector("#campo-task");
const listaTask = document.querySelector("#lista-task");
const errore = document.querySelector("#errore");
const contatore = document.querySelector("#contatore");

const filterButtons = {
  tutti: document.querySelector('#tutti'),
  attivi: document.querySelector('#attivi'),
  completati: document.querySelector('#completati')
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a unique ID for new tasks
 * @returns {number}
 */
function generateId() {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

/**
 * Get filtered tasks based on current filter
 * @returns {Array}
 */
function getFilteredTasks() {
  switch (filtro) {
    case 'attivi':
      return tasks.filter(task => !task.completato);
    case 'completati':
      return tasks.filter(task => task.completato);
    default:
      return tasks;
  }
}

/**
 * Save tasks to localStorage for persistence
 */
function salvaSuLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 */
function caricaDaLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// ============================================================================
// RENDER FUNCTIONS
// ============================================================================

/**
 * Update the task counter display
 */
function aggiornaContatore() {
  const tasksAttive = tasks.filter(task => !task.completato).length;
  contatore.textContent = tasksAttive;
}

/**
 * Render the task list based on current filter
 */
function rendiLista() {
  listaTask.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    const emptyMessage = tasks.length === 0
      ? 'Nessun task da visualizzare'
      : 'Nessun task corrisponde al filtro selezionato';
    listaTask.textContent = emptyMessage;
    aggiornaContatore();
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    // Checkbox for completion toggle
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completato;
    checkbox.dataset.action = "toggle";

    // Task text span
    const testoTask = document.createElement("span");
    testoTask.textContent = task.testo;
    if (task.completato) {
      testoTask.style.textDecoration = "line-through";
    }

    // Delete button
    const btnElimina = document.createElement("button");
    btnElimina.textContent = "Elimina";
    btnElimina.dataset.action = "delete";

    li.appendChild(checkbox);
    li.appendChild(testoTask);
    li.appendChild(btnElimina);

    fragment.appendChild(li);
  });

  listaTask.appendChild(fragment);
  aggiornaContatore();
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle form submission
 * @param {Event} e
 */
function gestisciSubmit(e) {
  e.preventDefault();

  const taskText = campoTask.value.trim();

  // Validation: check for empty or whitespace-only input
  if (taskText === "") {
    errore.textContent = "Inserisci un task valido!";
    campoTask.focus();
    return;
  }

  // Clear error message
  errore.textContent = "";

  // Create and add new task
  const task = {
    id: generateId(),
    testo: taskText,
    completato: false
  };

  tasks.push(task);

  // Reset form and re-render
  campoTask.value = "";
  rendiLista();
  salvaSuLocalStorage();
}

/**
 * Handle task list interactions (event delegation)
 * @param {Event} e
 */
function gestisciListaTask(e) {
  const target = e.target;
  const li = target.closest('li');

  if (!li) return;

  const taskId = parseInt(li.dataset.id, 10);
  const task = tasks.find(t => t.id === taskId);

  if (!task) return;

  // Handle checkbox toggle
  if (target.dataset.action === "toggle" || target.type === "checkbox") {
    task.completato = target.checked;
    rendiLista();
    salvaSuLocalStorage();
  }

  // Handle delete button
  if (target.dataset.action === "delete") {
    tasks = tasks.filter(t => t.id !== taskId);
    rendiLista();
    salvaSuLocalStorage();
  }
}

/**
 * Handle filter button clicks
 * @param {Event} e
 */
function gestisciFiltro(e) {
  const target = e.target;
  const filterName = target.dataset.filter;

  if (!filterName || !['tutti', 'attivi', 'completati'].includes(filterName)) {
    return;
  }

  // Update active filter
  filtro = filterName;

  // Update active button state
  Object.values(filterButtons).forEach(btn => {
    if (btn) btn.classList.remove('attivo');
  });
  target.classList.add('attivo');

  // Re-render list
  rendiLista();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
  // Load saved tasks from localStorage
  caricaDaLocalStorage();

  // Attach event listeners
  if (form) {
    form.addEventListener("submit", gestisciSubmit);
  }

  if (listaTask) {
    listaTask.addEventListener("click", gestisciListaTask);
  }

  // Attach filter button listeners
  Object.entries(filterButtons).forEach(([filterName, button]) => {
    if (button) {
      button.dataset.filter = filterName;
      button.addEventListener("click", gestisciFiltro);
    }
  });

  // Set initial active filter button
  if (filterButtons[filtro]) {
    filterButtons[filtro].classList.add('attivo');
  }

  // Initial render
  rendiLista();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);