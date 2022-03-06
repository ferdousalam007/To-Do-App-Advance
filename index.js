window.onload = function () {
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
const deleteBtn =getId('delete');
const checkBtn =getId('check');
const updateBtn =getId('update');
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
                        <td>${index}</td>
                        <td>${name}</td>
                        <td>${priority}</td>
                        <td>${status}</td>
                        <td>${date}</td>
                        <td class="td_button">
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
tbody.addEventListener('click',function(e){
   
    if(e.target.id==='delete'){
        console.log('hh');
    }
    else if(e.target.id==='check'){
        console.log('hh2');
    }
   else if(e.target.id==='update'){
        console.log('hh3');
    }
})

// function deleteTusk() {
//     const getTask = getDataLocalStorage();
    
//     tbody.addEventListener('click', function (e) {
//         const targetElement = e.target.parentElement.parentElement.dataset.id;
//         console.log(targetElement);
//         let index;
//         getTask.forEach((task,i) => {
//             if (task.id===targetElement) {
//                index=i;
//                console.log(index);
                
//             }
//         })

//         getTask.splice(index,1);
       
//         // setDataLocalStorage(getTask);

//     })
// }
