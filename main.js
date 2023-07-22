const form = document.querySelector(".create-todo-area");
const todoInput = document.querySelector(".todo-input");
const ulList = document.querySelector(".new-todo-lists");
const doneTodoArea = document.querySelector(".done-todo-area");
const doneArea = document.querySelector(".done-area");
const hideDoneBtn = document.querySelector(".hide-done-btn");
const clearAll = document.querySelector(".clear-all")

// Hide Done Area
removeDone();

form.addEventListener("submit", (e)=> {
    e.preventDefault();

    if(!todoInput.value.trim() == ""){
        // create li 
        const listItem = document.createElement("li");
        listItem.classList.add("new-todo");
        // create Input radio 
        const radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.classList.add("radio-input");
        // create span 
        localStorage.setItem("taskName", todoInput.value)
        const span = document.createElement("span");
        span.textContent = localStorage.getItem("taskName");
        // create div
        const div = document.createElement("div")
        div.classList.add("delete-button-area");
        // create delete button
        const buttonDelete = document.createElement("button")
        buttonDelete.classList.add("delete-btn");
        buttonDelete.textContent = "Delete"
        
        div.append(buttonDelete);
        listItem.append(radioInput,span,div);
        localStorage.setItem("list", listItem);
        ulList.append(listItem);


        todoInput.value = "";
        
        buttonDelete.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove()
            removeDone()
        })

        radioInput.addEventListener("click", (e) => {
            // new list li
            const li = e.target.parentElement
            const doneInput = e.target.parentElement.children[0];
            doneInput.classList.remove("radio-input")
            doneInput.setAttribute("checked","");
            const doneSpan = e.target.parentElement.children[1];
            doneSpan.classList.add("done-task")
            const doneList = document.createElement("li")
            doneList.classList.add("done-todo");
            doneList.append(doneInput,doneSpan);
            // add done list
            doneTodoArea.append(doneList);
            // remove new list
            li.remove();
            showDone();
            clearAll.addEventListener("click", () => {
                doneList.remove()
                removeDone()
            })
        })
    }
})

hideDoneBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (hideDoneBtn.textContent == "Hide") {
        hideDoneBtn.textContent = "Show"
        doneTodoArea.classList.add("hidden")
        clearAll.parentElement.classList.add("hidden")
    }
    else {
        hideDoneBtn.textContent = "Hide"
        doneTodoArea.classList.remove("hidden")
        clearAll.parentElement.classList.remove("hidden")
    }

})

function removeDone() {
    doneArea.classList.add("hidden");
    clearAll.parentElement.classList.add("hidden")
}

function showDone() {
    doneArea.classList.remove("hidden")
    clearAll.parentElement.classList.remove("hidden")
}

