let editeMode = true;
const inputField = document.getElementById('input-task');
const addBtn = document.querySelector('.add-btn');
const tasksDiv = document.querySelector('.tasks');
const emptyDiv = CrtElement('div','','empty');
const emptySpan = CrtElement('span','There Is No Tasks','empty-text');

window.onload = () => {
    let arr = JSON.parse(localStorage.getItem('todo-list'));
    if (arr[0] == null) {
        emptyDiv.appendChild(emptySpan);
        tasksDiv.appendChild(emptyDiv);
    }
    showLocalTask(arr);
}

//adding a new task 
addBtn.addEventListener('click', () => {
    if (inputField.value != '') {
        CreateTask(inputField.value);
        if (tasksDiv.children.length == 2) {
            const empty = document.querySelector('.empty');
            empty ? tasksDiv.removeChild(empty) : null ;
        }
        setTolocal(inputField.value);
        inputField.value = '';
        addBtn.style.background = 'var(--secondColor)';
    }else{
        addBtn.style.background = 'var(--delete)';
    }
})


//update event
function UpdateEvent (btn ,taskID) {
    btn.addEventListener('click', () => {
        if(editeMode) {
            inputField.value = document.getElementById(taskID).textContent;
            disableBtns(btn, taskID);
            editeMode = !editeMode;
        }else {
            document.getElementById(taskID).textContent = `${inputField.value}`;
            updateAtLocal(taskID,inputField.value);
            inputField.value = '';
            enableBtns(btn);
            editeMode = !editeMode;
        }
    })
}

//disable buttons in edit mode 
function disableBtns (btn, taskID) {
    btn.textContent = 'Edit';
    btn.classList.remove('update');
    btn.classList.add('edit');
    const mainContainer = btn.parentElement.parentElement;
    mainContainer.style.background = 'var(--mainColor)';
    const allBtns = Array.from(document.querySelectorAll('button'));
    const disabledBtns = allBtns.filter((btn) => {
        return taskID != btn.getAttribute('data-id');
    })
    const deletebtn = allBtns.filter((btn) => {
        return taskID == btn.getAttribute('data-id');
    })[1];
    disabledBtns.push(deletebtn);
    disabledBtns.forEach((btn) => {
        btn.disabled = true;
    })
}
//enable buttons in edit mode 
function enableBtns (Btn) {
    Btn.textContent = 'Update';
    Btn.classList.add('update');
    Btn.classList.remove('edit');
    const mainContainer = Btn.parentElement.parentElement;
    mainContainer.style.background =  'var(--liteMain)';
    const allBtns = Array.from(document.querySelectorAll('button'));
    allBtns.forEach((btn) => {
        btn.disabled = false;
    })
}

//delete event
function DeleteEvent (btn) {
    btn.addEventListener('click', () => {
        deleteFromLocal(btn);
        btn.parentElement.parentElement.remove();
        if (tasksDiv.children.length == 0) {
            emptyDiv.appendChild(emptySpan);
            tasksDiv.appendChild(emptyDiv);
        }
    })
}

function CreateTask (taskName) {
    const RandomId = Math.floor((Math.random()*100000));
    //create and append for name in real DOM
    const taskSpan = CrtElement('span',`${taskName}`,'task-name');
    taskSpan.id = RandomId;
    const branchDiv = document.createElement('div');
    branchDiv.appendChild(taskSpan);
    const taskMainDiv = CrtElement('div','','task');
    taskMainDiv.appendChild(branchDiv);

    //create and append for update button in real DOM
    const branchBtnsDiv = document.createElement('div');
    const updateBtn = CrtElement('button','Update','btn','update');
    updateBtn.setAttribute('data-id', RandomId);
    branchBtnsDiv.appendChild(updateBtn);
    UpdateEvent(updateBtn, RandomId);

    //create and append for delete button in real DOM
    const deleteBtn = CrtElement('button','Delete','btn','delete');
    deleteBtn.setAttribute('data-id', RandomId);
    branchBtnsDiv.appendChild(deleteBtn);
    taskMainDiv.appendChild(branchBtnsDiv);
    DeleteEvent(deleteBtn);

    tasksDiv.appendChild(taskMainDiv);
}
//custome function to create element with class and text content
function CrtElement (tagName, textContent = '', class1 = null, class2 = null) {
    const element = document.createElement(`${tagName}`);
    element.textContent = `${textContent}`;
    element.classList.add(`${class1}`,`${class2}`);
    return element ;
}

//function to set data at localstorage
function setTolocal (item) {
    let oldArr = JSON.parse(localStorage.getItem('todo-list')) || [''];
    oldArr = oldArr.filter((item) => item != '');
    oldArr.push(item);
    localStorage.setItem('todo-list',JSON.stringify(oldArr));
}
//function to get data at localstorage
function deleteFromLocal (btn) {
    const taskID = btn.getAttribute('data-id');
    const task = document.getElementById(taskID).textContent;
    let oldArr = JSON.parse(localStorage.getItem('todo-list'));
    let newArr = oldArr.filter((item) => item != task);
    localStorage.setItem('todo-list',JSON.stringify(newArr));
}
//fuction to get data and show it 
function showLocalTask (arr) {
    arr.forEach((task) => {
        CreateTask(task);
    })
}
//function to update at local
function updateAtLocal (taskID, newValue) {
    const task = document.getElementById(taskID).textContent;
    let arr = JSON.parse(localStorage.getItem('todo-list'));
    let newArr = arr.map((item) => {
        if(item == task) {
            item = newValue;
        }
        return item;
    })
    localStorage.setItem('todo-list',JSON.stringify(newArr));
}
