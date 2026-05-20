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
