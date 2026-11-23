let input = document.getElementById("taskInput");
let btn = document.getElementById("addBtn");
let todoList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(){
    todoList.textContent = "";
    tasks.forEach((task,index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.appendChild(span);

        const divBtn = document.createElement("div");
        divBtn.className = "buttons";

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "edit-btn";

        const del = document.createElement("button");
        del.className = "delete-btn";
        del.textContent = "Delete";

        divBtn.appendChild(edit);
        divBtn.appendChild(del);

        li.appendChild(divBtn);

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        edit.addEventListener("click", (e) => {
            e.stopPropagation();
            let updatedText = prompt("Enter updated task:", task.text);
            if (updatedText !== null && updatedText.trim().length > 0) {
                task.text = updatedText.trim();
                saveTasks();
                displayTasks();
            }
        });

        del.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        todoList.appendChild(li);
    });
}

btn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text.length === 0) {
        alert("Add a Task");
        input.value = "";
        return;
    }
    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();
    input.value = "";
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

displayTasks();
