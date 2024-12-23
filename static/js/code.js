
function setDefaultSchedule(){
    const table = document.querySelector("table");

    for(i = 6; i < 22; i++){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        let noon = "a. m.";
        if (i > 11) noon = "p. m.";
        td1.appendChild(document.createTextNode((i%12+1).toString()+":00 "+noon));
        td2.appendChild(document.createTextNode("No task set"));
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
}
