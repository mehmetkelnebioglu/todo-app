const form=document.querySelector("#todoAddForm");
const addInput=document.querySelector("#todoName");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clearAllTodo=document.querySelector("#clearButton");
const filterInput=document.querySelector("#todoSearch");

let todos=[];

runEvents();

function runEvents(){

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearAllTodo.addEventListener("click",allTodosEveryWhere);
    filterInput.addEventListener("keyup",filter);

}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function filter(e) {
    const filerValue=e.target.value.toLowerCase().trim()
    const todoListss=document.querySelectorAll(".list-group-item");

    if(todoListss.length>0){
        todoListss.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filerValue)){
                todo.setAttribute("style","display : block")
            }else{
                todo.setAttribute("style","display : none !important")
            }
        });
    }else{
        showAlert("warning","the todo list empty");
    }

}

function allTodosEveryWhere(){
    const todoLists=document.querySelectorAll(".list-group-item");
    if(todoLists.length>0){
            todoLists.forEach(function(todo){
                todo.remove();
            });
            todos=[];
            localStorage.setItem("todos", JSON.stringify(todos));
            showAlert("success","the todos list cleared");
    }else{
        showAlert("warning","todo list already empty");
    }
    
}

function removeTodoToUI(e){
    if(e.target.className==="fa fa-remove"){
       const todo=e.target.parentElement.parentElement;
       todo.remove();

        removeTodoToStorage(todo.textContent);
       showAlert("success","the todo deleted successfully")
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
    const inputText=addInput.value.trim();
    if(inputText==null || inputText==""){
       showAlert("warning","please add a todo");
    }else{
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success" ,"the todo added successfully");
    }

   

    e.preventDefault();

}

   function addTodoToUI(newTodo){
   /* <li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li> */

    const li=document.createElement("li")
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    const a=document.createElement("a");
    a.href="#"
    a.className="delete-item";

    const i=document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value="";
   }

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){

   /* <div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div> */

const div=document.createElement("div");
div.className="alert alert-"+type;
div.textContent=message;

firstCardBody.appendChild(div);

setTimeout(function(){
    div.remove();
},2500);
}