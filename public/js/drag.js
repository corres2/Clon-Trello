//permite arrastrar y soltar
function allowDrop(ev) {
    ev.preventDefault();
}
//arrastra
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
//soltar
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}