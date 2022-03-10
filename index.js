window.onload = load;
function load() {
    tbody.innerHTML = '';
    const tasks = getDataLocalStorage();
    tasks.forEach((task, i) => {
        showUi(task, i + 1)
    });

}
//get all id
function getId(id) {
    return document.getElementById(id);
}

const form = getId('form');
const date = getId('date');
const tbody = getId('tableBody');
const deleteBtn = getId('delete');
const checkBtn = getId('check');
const updateBtn = getId('update');
const taskName = getId('task_name');
const filter = getId('filter');
const sort = getId('sort');
let todaytDate = new Date().toISOString().slice(0, 10);
date.value = todaytDate;



//get all task tata convert into object
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = {};

    const allInputs = [...this.elements];
    let isValid = true;

    allInputs.forEach(e => {
        if (e.type != 'submit') {
            if (e.value === '') {
                alert('fill the your task name');
                isValid = false;
                return;
            }
            formData[e.name] = e.value;
        }

    })
    formData.status = 'incomplete';
    formData.id = uuidv4();

    if (isValid) {
        const tasks = getDataLocalStorage();
        tasks.push(formData);
        setDataLocalStorage(tasks);
        showUi(formData, tasks.length);

    }
    this.reset();
    date.value = todaytDate;
})
//get task show on UI
function showUi({ name, priority, status, date, id }, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
                    <tr>
                        <td id ='no'>${index}</td>
                        <td id ='name'>${name}</td>
                        <td id ='priority'>${priority}</td>
                        <td id ='status' data-bg=${status}>${status}</td>
                        <td id ='date'>${date}</td>
                        <td id ='action' class="td_button">
                        <button id='update' class="mr"><i class="fas fa-pen-fancy"></i></button>
                        <button id='check' class="mr"><i class="fas fa-check"></i></button>
                        <button id='delete'><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
`;

    tr.dataset.id = id;
    tbody.appendChild(tr);
}


//get all tasks from local storage
function getDataLocalStorage() {
    let tasks = [];
    const data = localStorage.getItem('tasks');

    if (data) {
        tasks = JSON.parse(data);
    }
    return tasks;
}
//set data local storage
function setDataLocalStorage(tasks) {

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//---------------------action-------------------------//
tbody.addEventListener('click', function (e) {

    if (e.target.id === 'delete') {
        deleteTask(e)
    }
    else if (e.target.id === 'check') {
        check(e)
    }
    else if (e.target.id === 'update') {
        updateTasks(e)
    }
})

//01-action---- delete action
function deleteTask(e) {
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id
    tr.remove();
    const tasks = getDataLocalStorage();
    let deleteId;
    const newID = tasks.filter(task => {
        if (task.id == id) {
            return task;
        }
    })
    tasks.splice(newID, 1);
    setDataLocalStorage(tasks);

    load();

}
//02-action---- status check-button action
function check(e) {
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    const allTd = tr.children;
    let tasks = getDataLocalStorage();
    [...allTd].forEach(td => {

        if (td.id == 'status') {

            tasks.forEach(task => {
                if (task.id === id) {
                    if (task.status === 'incomplete') {
                        task.status = 'complete';
                        td.innerHTML = 'complete';


                        // return task;
                    } else {
                        task.status = 'incomplete';
                        td.innerHTML = 'incomplete';

                        // return task;
                    }
                };
            })

        }
    })

    setDataLocalStorage(tasks);
    load();
}

//03-action---- update-button action
function updateTasks(e) {
    const tr = (e.target.parentElement.parentElement);
    const id = tr.dataset.id;
    const trChil = tr.children;



    // for save button 
    //name
    let nameTd;
    let NameValue;
    //Priority
    let selectTd;
    let selectPriority;
    //date
    let dateTd;
    let dateInput;
    //butoon
    let buttonTd;
    let previousBUtton;



    [...trChil].forEach(td => {
        if (td.id == 'name') {
            nameTd = td;
            const previousName = td.textContent;
            td.textContent = '';
            NameValue = document.createElement('input');
            NameValue.type = 'text';
            NameValue.value = previousName;
            td.appendChild(NameValue);

        }
        else if (td.id == 'priority') {
            selectTd = td;
            const previousPriority = td.textContent;
            td.textContent = '';
            selectPriority = document.createElement('select');
            selectPriority.innerHTML = `
                        <option disabled>Select one</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
            `;
            if (previousPriority == 'high') {
                selectPriority.selectedIndex = 1;
            }
            else if (previousPriority == 'medium') {
                selectPriority.selectedIndex = 2;
            }
            else if (previousPriority == 'low') {
                selectPriority.selectedIndex = 3;
            }
            td.appendChild(selectPriority);
        }
        else if (td.id == 'date') {
            dateTd = td;
            const previousDate = td.textContent;
            td.textContent = '';
            dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = previousDate;
            td.appendChild(dateInput);

        }
        else if (td.id == 'action') {
            buttonTd = td;
            previousBUtton = td.innerHTML;
            td.innerHTML = ''
            const saveBtn = document.createElement('button');
            saveBtn.classList.add('save_task');
            saveBtn.innerHTML = `<i class='fas fa-file-export'></i>Save Task`;
            saveBtn.addEventListener('click', function () {
                //name
                const nameValue = NameValue.value;
                nameTd.innerHTML = nameValue;
                //priority
                const priorityValue = selectPriority.value;
                selectTd.innerHTML = priorityValue;
                //date
                const dateValue = dateInput.value;
                dateTd.innerHTML = dateValue;
                //action button
                buttonTd.innerHTML = previousBUtton;

                //save data local storage
                let tasks = getDataLocalStorage();
                tasks = tasks.filter(task => {
                    if (task.id == id) {
                        task.name = nameValue;
                        task.priority = priorityValue;
                        task.date = dateValue;
                        return task;
                    } else {
                        return task;
                    }
                })
                setDataLocalStorage(tasks);

            })
            td.appendChild(saveBtn)

        }
    })

}


//-----------Filtering--------------//

//01 filtering by task name

taskName.addEventListener('input', function (e) {
    filter.selectedIndex=0;
    const inputNameValue = e.target.value.toLowerCase();
    tbody.innerHTML = '';
    const tasks = getDataLocalStorage();
    let index = 0;
    tasks.forEach(task => {
        if (task.name.toLowerCase().includes(inputNameValue)) {
            ++index;
            showUi(task, index)
        }
    })
})

//02 filtering by filter dropdown
filter.addEventListener('change', function (e) {
    taskName.value='';
    tbody.innerHTML = '';
    const searchFilter = e.target.value;
    const tasks = getDataLocalStorage();
    let index = 0;
    switch (searchFilter) {
        case "all":
            tasks.forEach(task => {
                ++index;
                showUi(task, index)
            })
            break;
        case "complete":
            tasks.forEach(task=>{
                if(task.status=='complete'){
                    ++index;
                    showUi(task,index);
                }
            })
            break;
        case "incomplete":
            tasks.forEach(task=>{
                if(task.status=='incomplete'){
                    ++index;
                    showUi(task,index);
                }
            })
            break;
        case "today":
            tasks.forEach(task=>{
                if(task.date==todaytDate){
                    ++index;
                    showUi(task,index);
                }
            })
            break;
        case "high":
            tasks.forEach(task=>{
                if(task.priority=='high'){
                    ++index;
                    showUi(task,index);
                }
            })
            break;
        case "medium":
            tasks.forEach(task=>{
                if(task.priority=='medium'){
                    ++index;
                    showUi(task,index);
                }
            })
            break;
        case "low":
            tasks.forEach(task=>{
                if(task.priority=='low'){
                    ++index;
                    showUi(task,index);
                }
            })
            break;

    }
})

//03 filtering by sort new to old dropdown
sort.addEventListener('change',function(){
    taskName.value='';
    filter.selectedIndex=0;
    const sortValue =this.value;
    const tasks=getDataLocalStorage();
   
})