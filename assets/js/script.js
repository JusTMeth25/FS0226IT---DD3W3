const messageLog = document.querySelector("#messageLog");
const printH2 = document.querySelector("#printH2");
const sum = document.querySelector("#sum");
const sumResult = document.querySelector("#sumResult");
const otherSum = document.querySelector("#otherSum");

messageLog.addEventListener("click", (e) => {
  console.log("Hai cliccato");
  console.log(e); // in console vedi tutta la descrizione dell'evento
  console.log(e.type);
  console.log(e.target); // chi ha scatenato questa cosa, il button in questo caso
});

printH2.addEventListener("click", (e) => {
  console.log(e.target);
  const empty = document.querySelector("#empty");
  empty.textContent = "Sono generato da JavaScript";
});

sum.addEventListener("click", (e) => {
  sumNumbers(8, 12, e);
  firstLog();
  secondLog();
});

function sumNumbers(num1, num2, event = Event) {
  // ordine in cui la funzione deve ricevere i parametri, mettiamo all'inizio quelli obbligatori e successivamente quelli facoltativi
  let resultSum = num1 + num2;
  if (event.type === "click") {
    sumResult.textContent = `Ho scritto in sumResult questo risultato: ${resultSum}`;
    otherSum.textContent = " ";
  } else {
    otherSum.textContent = `Ho scritto in otherSum questo risultato: ${resultSum}`;
  }
}

sumNumbers(4, 9);

const firstLog = () => {
  console.log("Primo Log");
};

const secondLog = () => {
  console.log("Secondo Log");
};
