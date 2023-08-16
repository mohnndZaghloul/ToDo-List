let editeMode = true;
const inputField = document.getElementById('input-task');
const addBtn = document.querySelector('.add-btn');
const tasksDiv = document.querySelector('.tasks');
const emptyDiv = CrtElement('div','','empty');
const emptySpan = CrtElement('span','There Is No Tasks','empty-text');

window.onload = () => {
    emptyDiv.appendChild(emptySpan);
    tasksDiv.appendChild(emptyDiv);
    console.log(tasksDiv.children.length);
}

//adding a new task 
addBtn.addEventListener('click', () => {
    if (inputField.value != '') {
        CreateTask(inputField.value);
        inputField.value = '';
        addBtn.style.background = 'var(--secondColor)';
        if (tasksDiv.children.length == 2) {
            const empty = document.querySelector('.empty');
            empty ? tasksDiv.removeChild(empty) : null ;
        }
    }else{
        addBtn.style.background = 'var(--delete)';
    }
})


//update event
function UpdateEvent (btn) {
    btn.addEventListener('click', () => {
        const taskID = btn.getAttribute('data-id');
        if(editeMode) {
            inputField.value = document.getElementById(taskID).textContent;

            disableBtns(btn, taskID);
            editeMode = !editeMode;
        }else {
            document.getElementById(taskID).textContent = `${inputField.value}`;
            inputField.value = '';
            enableBtns(btn);
            editeMode = !editeMode;
        }
    })
}

//disable buttons in edit mode 
function disableBtns (btn, clickedBtnID) {
    btn.textContent = 'Edit';
    btn.classList.remove('update');
    btn.classList.add('edit');
    const mainContainer = btn.parentElement.parentElement;
    mainContainer.style.background = 'var(--mainColor)';
    const allBtns = Array.from(document.querySelectorAll('button'));
    const disabledBtns = allBtns.filter((btn) => {
        return clickedBtnID != btn.getAttribute('data-id');
    })
    disabledBtns.forEach((btn) => {
        btn.disabled = true;
    })
}
//enable buttons in edit mode 
function enableBtns (Btn) {
    Btn.textContent = 'update';
    Btn.classList.add('update');
    Btn.classList.remove('edit');
    const mainContainer = Btn.parentElement.parentElement;
    mainContainer.style.background = '#83347188';
    const allBtns = Array.from(document.querySelectorAll('button'));
    allBtns.forEach((btn) => {
        btn.disabled = false;
    })
}

//delete event
function DeleteEvent (btn) {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.remove();
        if (tasksDiv.children.length == 0) {
            emptyDiv.appendChild(emptySpan);
            tasksDiv.appendChild(emptyDiv);
        }
    })
}

function CreateTask (taskName) {
    const RandomId = (Date.now() % 100000);
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
    UpdateEvent(updateBtn);

    //create and append for delete button in real DOM
    const deleteBtn = CrtElement('button','Delete','btn','delete');
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
