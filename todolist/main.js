// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true, false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underline = document.getElementById("under-line");

for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
    });
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {addTask();}
});


function addTask() {
    
    if(taskInput.value) {
        let task = {
            id: randomIDGenerate(),
            taskContent : taskInput.value,
            isComplete : false,
        };

        taskList.push(task);
        taskInput.value = "";

        render();

    } else {
        taskInput.placeholder = "할 일을 입력해주세요";
        taskInput.focus();
    }
}

function render() {
    // 1. 내가 선택한 탭에 따라서
    let list = [];
    if(mode === "all") {
        //all taskList
        list = taskList;
    } else if(mode === "ongoing" || mode === "done") {
        // ongoing, done filterList
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다
    let resultHTML = '';
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-rotate-right"></i></button>
                                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>`
        } else {
            resultHTML += `<div class="task">
                                <div>${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-check"></i></button>
                                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>`
        }

        
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    
    filter();
}

function filter(event) {
    if(event) {
        mode = event.target.id;
        underline.style.left = event.currentTarget.offsetLeft + "px";
        underline.style.width = event.currentTarget.offsetWidth + "px";
    }
    filterList = [];

    if(mode === "all") {
        //전체 리스트 보여준다
        render();
    } else if(mode === "ongoing") {
        //진행중 아이템 보여준다
        //task.isComplete == false
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode === "done") {
        //끝나는 케이스
        //task.isComplete == true
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

