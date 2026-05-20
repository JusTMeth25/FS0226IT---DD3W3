const staticList = document.querySelector("#staticList");

staticList.addEventListener("click", (e) => {
  console.log(`E' stato cliccato il button numero ${e.target.id}`);
  staticList.removeChild(e.target.parentElement);
});
