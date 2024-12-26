
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
        td2.appendChild(document.createTextNode("No task set"));
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
}

function add(){
    const table = document.querySelector("table");

    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td1.appendChild(document.createTextNode(document.getElementById("addintime").value));
    td2.appendChild(document.createTextNode(document.getElementById("addintask").value));
    
    tr.id = document.querySelectorAll("tr").length-1;

    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);

    document.getElementById("addintime").value = "";
    document.getElementById("addintask").value = "";

    orderHours();
}

function modifyTask(event) {
    console.log(event.target.parentNode.id);
}

function getTimebyRow(tr) {
    console.log(tr);
    let timestr = tr.cells[0].innerText.replace(" ","").replace(":","");
    try {
        let plus = 0;
        if(timestr.includes("p.m.")){
            plus = 1200;
            timestr = timestr.replace("p.m.","")
        } else {
            timestr = timestr.replace("a.m.","");
        }
        return parseInt(timestr)+plus;
    } catch (e) {
        console.log("ERROR in getTimebyRow");
        return -1;
    }
}

function orderHours(){
    const tasks = document.querySelectorAll("tr");
    const lasttask = tasks[tasks.length-1];
    
    for(i = 1; i < tasks.length; i++){ // O(n^2)? NVM!
        if(getTimebyRow(tasks[i-1]) < getTimebyRow(lasttask)
           && getTimebyRow(tasks[i]) > getTimebyRow(lasttask))
        {
            let hourtoset = lasttask.cells[0].innerText;
            let tasktoset = lasttask.cells[1].innerText;
            for(j = i; j < tasks.length; j++) {
                let hourtoreplace = tasks[j].cells[0].innerText;
                let tasktoreplace = tasks[j].cells[1].innerText;
                tasks[j].cells[0].innerText = hourtoset;
                tasks[j].cells[1].innerText = tasktoset;
                hourtoset = hourtoreplace;
                tasktoset = tasktoreplace;
            }
            break;
        }
    }
}