const textInput = document.querySelector('#todo-form .form-blk input');
var todoForm = document.getElementById('todo-form');
const actionText = document.querySelector('.action button');
filters = document.querySelectorAll(".filter-blk span");
taskBox = document.querySelector(".resultList");
var list = JSON.parse(localStorage.getItem("todo-list"));
var editId;
var isEditedTask = false;

// add data 
todoForm.addEventListener("submit", e => {
    e.preventDefault();
    var todoList = textInput.value.trim();
    if (todoList) {
        if (!isEditedTask) {
            if (!list) {
                list = [];
            }
            var task = { task: todoList, status: "pending" };
            list.push(task);
        } else {
            isEditedTask = false;
            list[editId].task = todoList;
        }

        textInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(list));
        showToDo("all");
        total();
    }
    else {
        
    }
});
// to filt status 
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDo(btn.id);
    });
});
// to show list 
function showToDo(filter) {
    var li = "";
    var list = JSON.parse(localStorage.getItem("todo-list"));
    if (list) {
        list.forEach((todo, id) => {
            var isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="list my-3">
                            <p class="list-blk flex">
                                <input type="checkbox" class="mr-2 my-auto checkbox" value="${todo.task}" id="${id}" ${isCompleted} onclick="updateStatus(this)">
                                <label class="task_name ${isCompleted} ${id} my-auto" ondblclick="editTaskList(${id},'${todo.task}')">${todo.task}</label>
                                <b class="delete ml-auto text-red-500" value="${id}" onclick="deleteTask(${id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </b>
                            </p>
                            <input type="text" class="edit hide w-full border border-inherit ${id}" value="${todo.task}" id="${id}" ${isCompleted} onclick="updateTask(${id})">
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = li;
    total();
}
showToDo("all");
total();
// edit task list 
function editTaskList(taskId) {
    var checkBox = document.getElementsByClassName("checkbox");
    var textBox = document.getElementsByClassName("edit");
    var task_name = document.getElementsByClassName("task_name");
    var closeBtn = document.getElementsByClassName("delete");
    checkBox[taskId].classList.add("hide");
    textBox[taskId].classList.remove('hide');
    textBox[taskId].classList.add("editTextBox");
    task_name[taskId].classList.add('hide');
    closeBtn[taskId].classList.add('hide');
}
function updateTask(taskId) {
    var textBox = document.getElementsByClassName("edit");
    if (textBox) {
        textBox[taskId].addEventListener('blur', e => {
            var oldTask = textBox[taskId].value;
            if (!oldTask.trim().length < 1) {
                list[taskId].task = oldTask;
                localStorage.setItem("todo-list", JSON.stringify(list));
            }
            else {
                
            }
            showToDo("all");
            total();
        })
    }
    else {
        
    }
}
function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    textInput.value = taskName;
}
// delete task 
function deleteTask(taskId) {
    list.splice(taskId, 1);
    localStorage.setItem("todo-list", JSON.stringify(list));
    showToDo("all");
    total();
}
// check all
function checkAll() {
    const checkboxes = document.getElementsByClassName("checkbox");
    const task_list = document.getElementsByClassName("task_name");

    var len = task_list.length;
    if (actionText.innerText == "Check All") {
        if (task_list.length > 0) {
            actionText.innerHTML = "Uncheck All";
        }
       
        for ($i = 0; $i < len; $i++) {
            task_list[$i].classList.add("checked");
            checkboxes[$i].checked = true;
            list[$i].status = "completed";
        }
    }
    else {
        actionText.innerHTML = "Check All";
        for ($i = 0; $i < len; $i++) {
            task_list[$i].classList.remove("checked");
            checkboxes[$i].checked = false;
            list[$i].status = "pending";
        }
    }
    localStorage.setItem("todo-list", JSON.stringify(list));
    showToDo("all");
    total();
}
// delete all complete task 
function deleteAllComplete() {
    list = list.filter(todo => todo.status != "completed");
    localStorage.setItem("todo-list", JSON.stringify(list));
    actionText.innerHTML = "Check All";
    showToDo("all");
    total();
}
// update status 
function updateStatus(selectedTask) {
    var todoTask = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        todoTask.classList.add("checked");
        list[selectedTask.id].status = "completed";
    }
    else {
        todoTask.classList.remove("checked");
        list[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(list));
    showToDo("all");
    total();
}
// to show complete total task list
function total() {
    if (list) {
        var total_active = list.filter(todo => todo.status == "pending");
        var total = total_active.length;
        document.getElementById("total").innerText = total;
    }
}
showToDo("all");
total();
