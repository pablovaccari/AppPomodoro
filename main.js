const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const btnAdd = document.querySelector("#btnAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector('#time #taskName');

form.addEventListener('submit', (e) => {
    e.preventDefault(); //anular funcionamiento nativo
    if(itTask.value !== ''){
        createTask(itTask.value);
        itTask.value = '';
        renderTasks();
    }

})

/* crear nuevo objeto Task y agregarlo al inicio del array */
function createTask(value){
    const newTask = {
        id:(Math.random() * 100).toString(36).slice(3),
        title:value,
        completed:false
    };

    tasks.unshift(newTask);
}

function renderTasks(){
    /*dibujar cada objeto Task y generar un HTML que se inyectara en un contenedor */
    const html = tasks.map((task, index) => {
        return `
         <div class="task">
            <div class="completed">${task.completed ?`<span class="done">Completado</span>` : `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
            <div class="title">${task.title}</div>
         </div>
        `
    })

    //obtener el contenedor (id tasks)
    //setear su contenido HTML, 
    //html es un array, con join() lo convierto en string
    const tasksContainer = document.querySelector("#tasks");
    tasksContainer.innerHTML = html.join("");

    //obtener todos los elementos start-button y asignarle un evento
    const startButtons = document.querySelectorAll('.task .start-button');
    startButtons.forEach((button, index)=>{
        button.addEventListener('click', (e) => {
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = "En progreso..."
            }
        });
    });
}

function startButtonHandler(id){
    time = 25 * 60;  //25 minutos
    current = id; 
    const currentTask = tasks.find(task => task.id === id);
   
    taskName.textContent = tasks[currentTask.title];

    timer = setInterval(() => {
        timerHandler(id);
    }, 1000);
}

function timerHandler(id) {
    time--;
    renderTimer();

    if(time === 0){
        clearInterval(timer);
        MarkAsCompleted(id);
        renderTasks();
    }
}

function renderTimer(){
    const timeDiv = document.querySelector('#time #value');
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;
}

function MarkAsCompleted(id)
{
    const currentTaskIndex = tasks.findIndex(task => task.id === id);
    tasks[currentTaskIndex].completed = true;
}