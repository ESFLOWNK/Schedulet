
function setDefaultSchedule(){
    document.getElementById("selected").value = "-1";

    document.getElementById("addintime").value = "";
    document.getElementById("addintask").value = "";
    document.getElementById("modifyintime").value = "";
    document.getElementById("modifyintask").value = "";

    const table = document.querySelector("table");

    for(i = 6; i < 22; i++){
        const tr = document.createElement("tr");
        tr.onclick = selectTask;
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
    tr.onclick = selectTask;
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    
    table.appendChild(tr);
    
    document.getElementById("addintime").value = "";
    document.getElementById("addintask").value = "";
    
    assignIdentifiers();
    
    orderHours();
}

function deleteTask(){
    const selection = document.getElementById("selected").value;
    if(selection === "-1") return;
    document.getElementById(selection).remove();
    document.getElementById("selected").value = "-1";
    assignIdentifiers();
}

function deleteAllTasks(){
    for(task of document.querySelectorAll("tr")){
        document.getElementById(task.id).remove();
    }
}

function selectTask(event) {
    let selected = document.getElementById("selected").value;
    if(selected == event.target.parentNode.id){
        document.getElementById(selected).className = "";
        document.getElementById("selected").value = "-1";
        return;
    }
    if(selected != "-1") document.getElementById(selected).className = "";
    document.getElementById("selected").value = event.target.parentNode.id;
    selected = document.getElementById("selected").value;
    document.getElementById(selected).className = "selectedTask";
}

function modifyTask() {
    /* document.getElementById(
        document.getElementById("selected").value
    ).cells[0].innerText = document.getElementById("modifyintime").value;
    document.getElementById(
        document.getElementById("selected").value
    ).cells[1].innerText = document.getElementById("modifyintask").value;

    document.getElementById("modifyintime").value = "";
    document.getElementById("modifyintask").value = ""; */

    const selection = document.getElementById("selected").value;

    if(selection == "-1") return;

    document.getElementById(selection).remove()

    const table = document.querySelector("table");

    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td1.appendChild(document.createTextNode(document.getElementById("modifyintime").value));
    td2.appendChild(document.createTextNode(document.getElementById("modifyintask").value));
    
    tr.onclick = selectTask;
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    
    table.appendChild(tr);
    
    assignIdentifiers();
    orderHours();

    document.getElementById("selected").value = "-1";
    for(task of document.querySelectorAll("tr")){
        if(task.cells[0].innerText == document.getElementById("modifyintime").value &&
           task.cells[1].innerText == document.getElementById("modifyintask").value)
        {
            document.getElementById("selected").value = task.id;
            document.getElementById( 
                document.getElementById("selected").value
            ).className = "selectedTask";
            break;
        }
    }

    document.getElementById("modifyintime").value = "";
    document.getElementById("modifyintask").value = "";
}

function getTimebyRow(tr) {
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

function assignIdentifiers() {
    const tasks = document.querySelectorAll("tr");
    
    for(i = 0; i < tasks.length; i++){
        tasks[i].id = (i).toString();
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
        } else if(getTimebyRow(tasks[i-1]) > getTimebyRow(lasttask)){
            let hourtoset = lasttask.cells[0].innerText;
            let tasktoset = lasttask.cells[1].innerText;
            lasttask.cells[0].innerText = tasks[i-1].cells[0].innerText;
            lasttask.cells[1].innerText = tasks[i-1].cells[1].innerText;
            tasks[i-1].cells[0].innerText = hourtoset;
            tasks[i-1].cells[1].innerText = tasktoset;
        }
    }
}