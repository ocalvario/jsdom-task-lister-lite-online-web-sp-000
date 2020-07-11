document.addEventListener("DOMContentLoaded", () => {
   let form = document.getElementById('create-task-form');
  let tasks = document.getElementById('tasks');
  let sort = document.getElementById('sort');

  form.addEventListener('submit', addTodoTask);
  sort.addEventListener('click', sortList);

  function addTodoTask(e){
    e.preventDefault();
    let task = document.getElementById(e.target[0].value);

    if (e.target[0].value === ""){return}; //dont allow submiting no task

    if (!task){
      addListItem(e);
    }
    e.target[0].value = ""; //resets task-desc input field
  };

  function addListItem(e){
    li = createListItem(e);
    createButton(li);
  };

  function createListItem(e){
    let li = document.createElement('li');
    li.duration = e.target[1].value;
    li.priority = e.target[2].value;
    let durationText

    durationText = printedMins(li);   
    setPriorityColour(li);

    tasks.appendChild(li);
    li.id = e.target[0].value;
    li.innerHTML = e.target[0].value + durationText;
    return li;
  };

  function printedMins(li){
    if (li.duration == ""){
      durationText = " ";
    } else {
      durationText = ` - ${li.duration}mins `;
    }
    return durationText;
  };

  function createButton(taskItem){
    let button = document.createElement('button');
    button.innerHTML = "❌"; 
    taskItem.appendChild(button);
    button.addEventListener('click', deleteTask);
    return button;
  };

  function deleteTask(e){
    e.target.parentElement.remove();
  };

  function setPriorityColour(taskItem){
    if (taskItem.priority == "high"){
      taskItem.style.color = 'red';
      taskItem.priorityValue = 3;
    } else if (taskItem.priority == "medium"){
      taskItem.style.color = 'orange';
      taskItem.priorityValue = 2;
    } else {
      taskItem.style.color = 'green';
      taskItem.priorityValue = 1;
    }
  };

  function sortList(){
    debugger
    let items = tasks.children;
    let sortedItems = [...items];
    sortedItems.sort((a,b) => (a.priorityValue < b.priorityValue) ? 1 : -1);
    for (let i=0; i<sortedItems.length; i++){
      sortedItems[i].parentNode.appendChild(sortedItems[i]);
    }
  };
});
