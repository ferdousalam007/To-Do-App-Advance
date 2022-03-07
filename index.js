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
    tr.innerHTML =`
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
        console.log('hh3');
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