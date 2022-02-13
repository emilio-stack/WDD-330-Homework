/*
-------------------------------------
|  TODO                             |
-------------------------------------
|  + Add Todo                       | 
|  + Edit Todo                      |  
|  + filter Todos                   |     
|  + Delete todo                    |    
|  + list todos                     |   
-------------------------------------
|  - read/write localStorage        |
-------------------------------------
*/

// Just some helper functions to make this class easier. 
import { qs, writeToLS, readFromLS, bindTouch } from "./helpers.js";

// Private
// A variable to hold the tasks data while the webpage is live.
let liveTasks = null;

function renderList(taskList, listElement, todoListObject, hidden) {
    /*****************************************************
    * A function to render the current list of tasks. 
    ****************************************************/ 
    console.log("render was called")
    // Reset the list to prepare it to display the new tasks. 
    listElement.innerHTML = "";
  
    // Iterate through each task object in the task list.
    taskList.forEach(task => {

        // Initialize the variables.
        const li = document.createElement("li");
        const formattedDate = new Date(task.id).toLocaleDateString("en-US");
        let checkbox = null;
        let deleteButton = null;

        // If the completed tasks should be hidden, and the task is completed.
        if(hidden && task.completed){

            // Check the checkbox and strike through the task.
            li.innerHTML = `<label><input type="checkbox" checked><strike> ${task.content}</strike></label><button>X</button>`;
        }
        else {

            // Display the task as regular.
            li.innerHTML = `<label><input type="checkbox"> ${task.content}</label><button>X</button>`;
        }
    
        // Get the completed checkbox.
        checkbox = li.childNodes[0].childNodes[0];
        
        // If there is a checkbox.
        if(checkbox){

            // Listen for a change in the checkbox.
            checkbox.addEventListener("change", () => {

                // If there is a change, toggle the completion of the task.
                todoListObject.toggleTaskComplete(task.id)
            });  
        }

        // Get the delete button.
        deleteButton = li.childNodes[1];

        if (deleteButton) {
            // Listen for a change in the delete button.
            deleteButton.addEventListener("click", () => {

                // If the delete button is clicked, remove the task.
                todoListObject.removeTask(task.id)
            });
        }
        
        // Add the element to the list.
        listElement.appendChild(li);
    });
}

function renderTasksLeft(taskList){

    // Get the destination
    let tasksLeft = qs("#tasks-left");
    let displayList = qs("#display-list")
    let numTasksLeft = displayList.childNodes;

    tasksLeft.innerHTML = "Tasks left: " + numTasksLeft.length;

}

function getTasks(key) {
    /*****************************************************
    * A function to get the current list of tasks. 
    *****************************************************/ 

    // First check if there are no live tasks.
    if (liveTasks === null) {
      // If so, we need to go read the list from the data store
      liveTasks = readFromLS(key) || [];
    }
  
    return liveTasks;
}

// Public
export default class TodoList {
    constructor(listElement, key) {
        /*****************************************************
         * The Constructor for a Todo List. 
         * 
         * An empy list element should be pased in and a key 
         * where the tasks will be stored locally.
         * 
         *****************************************************/ 

        // The list element where the tasks will be displayed.
        this.listElement = listElement;

        // The key used to read and write to L\local storage. 
        this.key = key;

        // Bind add button to the newTask function.
        bindTouch("#add-button", this.newTask.bind(this));

        // Go ahead and list the tasks. 
        this.displayTasks();
    }

    newTask() {
        /*****************************************************
         * A function to add a new task to the todo list.
         * 
         * This function is bound to and automatically called 
         * when the add button is pressed.
         *****************************************************/
        
        // Get the new task.
        const task = document.getElementById("todo-input");

        // Create a new task object.
        const newToDo = {
            id: new Date(),
            content: task.value,
            completed: false
        };
        
        // Add to the task list and save in local storage.
        liveTasks.push(newToDo);
        writeToLS(this.key, liveTasks);

        // Reset the value of the input bar
        task.value = "";

        // Render the updated list. 
        this.displayTasks();
    }

    removeTask(id) {
        /*****************************************************
         *  A function to remove a task by id.
        *****************************************************/

        // Get the corresponding task.
        let task = this.findTask(id);
        
        if (task) {
            liveTasks.pop(task);
            writeToLS(this.key, liveTasks);
            this.displayTasks();
            console.log(id + " removed")
        }        
    }

    findTask(id) {
        /*****************************************************
        * A function to find a task by ID.
        *****************************************************/ 
        let task = liveTasks.find( element => {
          return element.id === id;
        });
      
        return task;
    }

    toggleTaskComplete(id) {
        /*****************************************************
        * A function to toggle the completion of a task. 
        *****************************************************/ 

        // Get the corresponding task.
        let task = this.findTask(id);
      
        if(task){
            // Toggle the completion of the task.
            task.completed = !task.completed;

            // Save the new state of the task
            writeToLS(this.key, liveTasks);

            // Display the updated list.
            this.displayTasks();
            console.log(id + "checked");
        }  

    }

    displayTasks(hidden = true) {
        /*****************************************************
        * A function to display the list of tasks. 
        * 
        * This function should be called in the class 
        * constructor, when a new task is added, when a task 
        * checkbox is toggled, or when a task is deleted.
        *****************************************************/ 
        renderList(getTasks(this.key), this.listElement, this, hidden);
        renderTasksLeft(getTasks(this.key))
    }
}