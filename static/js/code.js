
function setDefaultSchedule(){
    const table = document.querySelector("table");

    for(i = 6; i < 22; i++){
        const tr = document.createElement("tr");
        tr.onclick = modifyTask;
        tr.id = (i-6).toString();
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        let noon = "a. m.";
        if (i > 11) noon = "p. m.";
        td1.appendChild(document.createTextNode((i%12+1).toString()+":00 "+noon));
        const taskIn = document.createElement("input");
        taskIn.placeholder = "No task set";
        taskIn.className = "taskInput";
        td2.appendChild(taskIn);
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
}

function modifyTask(event) {
    console.log(event.target.parentNode.id);
}