let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
    let text = taskInput.value;
    let date = dateInput.value;
    let priority = priorityInput.value;

    if(text === "") return;

    tasks.push({text, date, priority, completed:false});
    save();
    render(tasks);

    taskInput.value="";
}

function render(list){
    taskList.innerHTML="";
    list.forEach((task, index)=>{
        let li = document.createElement("li");
        if(task.completed) li.classList.add("completed");

        li.innerHTML = `
        <div class="task-info">
            <b>${task.text}</b>
            <br>
            <small>${task.date || "No date"} | ${task.priority}</small>
        </div>
        <div>
            <button onclick="toggle(${index})">✔</button>
            <button onclick="del(${index})">🗑</button>
        </div>
        `;
        taskList.appendChild(li);
    });
}

function toggle(i){
    tasks[i].completed = !tasks[i].completed;
    save();
    render(tasks);
}

function del(i){
    tasks.splice(i,1);
    save();
    render(tasks);
}

function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showAll(){
    render(tasks);
}

function showCompleted(){
    render(tasks.filter(t=>t.completed));
}

function showPending(){
    render(tasks.filter(t=>!t.completed));
}

render(tasks);
