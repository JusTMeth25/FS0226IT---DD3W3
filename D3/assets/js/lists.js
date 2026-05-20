const staticList = document.querySelector("#staticList");

staticList.addEventListener("click", (e) => {
  console.log(`E' stato cliccato il button numero ${e.target.id}`);
  staticList.removeChild(e.target.parentElement);
});

document.getElementById("figlio").addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Hai cliccato su figlio e non succedera' nulla sui parent");
});

document.getElementById("padre").addEventListener("click", () => {
  console.log("Hai cliccato su figlio ma risulta cliccato anche il padre");
});

document.getElementById("nonno").addEventListener("click", () => {
  console.log("Hai cliccato su figlio ma risulta cliccato anche il nonno");
});

console.log(location.href);
