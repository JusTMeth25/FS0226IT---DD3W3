const messageLog = document.querySelector("#messageLog");
const printH2 = document.querySelector("#printH2");
const sum = document.querySelector("#sum");
const sumResult = document.querySelector("#sumResult");
const otherSum = document.querySelector("#otherSum");
const userNameInput = document.querySelector("#userNameInput");
const inputNameValue = document.querySelector("#inputNameValue");
const userSurnameInput = document.querySelector("#userSurnameInput");
const inputSurnameValue = document.querySelector("#inputSurnameValue");
const choose = document.querySelector("#choose");
const chooseValue = document.querySelector("#chooseValue");
const myCheck = document.querySelector("#myCheck");
const checkValue = document.querySelector("#checkValue");

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

userNameInput.addEventListener("input", (e) => {
  inputNameValue.textContent = e.target.value;
});

userSurnameInput.addEventListener("change", (e) => {
  inputSurnameValue.textContent = e.target.value;
});

choose.addEventListener("change", (e) => {
  chooseValue.textContent = e.target.value;
});

myCheck.addEventListener("change", (e) => {
  checkValue.textContent = e.target.value;
});

// Validazione form
const myName = document.querySelector("#myName");
const mySurname = document.querySelector("#mySurname");
const myAge = document.querySelector("#myAge");
const myEmail = document.querySelector("#myEmail");
const sendForm = document.querySelector("#sendForm");

let personName;
let personSurname;
let personAge;
let personEmail;

const myPerson = {
  nome: "",
  cognome: "",
  eta: 0,
  email: "",
};

myName.addEventListener("blur", (e) => {
  const errorName = document.querySelector("#errorName");
  if (e.target.value === "") {
    errorName.textContent = "Compilare il campo nome!";
  } else {
    myPerson.nome = e.target.value;
    errorName.textContent = "";
  }
});

mySurname.addEventListener("blur", (e) => {
  const errorSurname = document.querySelector("#errorSurname");
  if (e.target.value === "") {
    errorSurname.textContent = "Compilare il campo cognome!";
  } else {
    myPerson.cognome = e.target.value;
    errorSurname.textContent = "";
  }
});

myAge.addEventListener("blur", (e) => {
  const errorAge = document.querySelector("#errorAge");
  if (e.target.value === "") {
    errorAge.textContent = "Compilare il campo eta'!";
  } else {
    errorAge.textContent = "";
  }
});

myEmail.addEventListener("blur", (e) => {
  const errorEmail = document.querySelector("#errorEmail");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = regex.test(e.target.value); // questo significa che fa il test true o false
  if (e.target.value === "") {
    errorEmail.textContent = "Compilare il campo email!";
  } else if (validEmail === false) {
    errorEmail.textContent = "Inserire una email valida!";
  } else {
    myPerson.email = e.target.value;
    errorEmail.textContent = "";
  }
});

sendForm.addEventListener("click", (e) => {
  e.preventDefault();
  const myAge = document.querySelector("#myAge");
  myPerson.nome = myPerson.nome;
  myPerson.cognome = myPerson.cognome;
  myPerson.email = myPerson.email;
  myPerson.eta = myAge.value;
  console.log(myPerson);
});
