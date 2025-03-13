// #!/usr/bin/env node

const { readFileSync, writeFileSync } = require("fs")

// read task from json file
function readTask() {
    try {
        const data = readFileSync("tasks.json", "utf-8")
        return data
    } catch (error) {
        return error
    }
}

// write task to json file using spread operator
function writeTask(task) {
    let file = JSON.parse(readTask())
    let newTaskData = [
        ...file,
        {
            task: task,
            completeState: "not done",
            id: file.length,
            createdAt: fileDateTime,
            lastUpdatedAt: fileDateTime,
        },
    ]
    try {
        writeFileSync("tasks.json", JSON.stringify(newTaskData, null, 4), "utf8")
        console.log("Data successfully appended to JSON file")
    } catch (err) {
        console.error("Error writing to JSON file:", err)
    }
}

// delete task from json file 
function deleteTask(id) {
    let file = JSON.parse(readTask())
    let newData = file.filter((task) => task.id !== id)

    try {
        writeFileSync("tasks.json", JSON.stringify(newData, null, 4), "utf8")
        console.log(`Task with id ${id} successfully deleted`)
    } catch (err) {
        console.error("Error writing to JSON file:", err)
    }
}

// update task, the complete state and the last updated at in json file 
function updateTask(id, completeState, newTask) {
    let file = JSON.parse(readTask());
    let id_task = file.find((task) => task.id === id);

    if (!id_task) {
        console.error(`Task with id ${id} not found.`);
        return;
    }

    id_task.task = newTask === undefined ? id_task.task : newTask;
    id_task.completeState = completeState;
    id_task.lastUpdatedAt = fileDateTime;

    try {
        writeFileSync("tasks.json", JSON.stringify(file, null, 4), "utf8")
        console.log(`Task with id ${id} successfully updated`)
    } catch (err) {
        console.error("Error writing to JSON file:", err)
    }
}

// list task from json file, later
function list(status) {
    const file = JSON.parse(readTask());
    const filteredTasks = file.filter(task => task.completeState === status);
    return filteredTasks;
}

// main function
// get command and params from command line
const args = process.argv.slice(2);
const command = args[0];
const params = args.slice(1);

// get current date and time
const now = new Date();

// format date and time
const fileDateTime = 
`${String(now.getDate())}/` + 
`${String(Number(now.getMonth()) + 1)}/` + 
`${String(now.getFullYear())} ` +
`${String(now.getHours()).padStart(2, '0')}:` +
`${String(now.getMinutes()).padStart(2, '0')}:` +
`${String(now.getSeconds()).padStart(2, '0')}`

// switch case to handle command line arguments
switch (command) {
    case 'add':
        writeTask(params[0]);
        break;
    case 'delete':
        deleteTask(parseInt(params[0], 10));
        break;
    case 'update':
        updateTask(parseInt(params[0], 10), params[1], params[2]);
        break;
    case 'mark-in-progress':
        updateTask(parseInt(params[0], 10), "in progress", "/" );
        break;
    case 'mark-done':
        updateTask(parseInt(params[0], 10), "done", "/");
        break;
    case 'list':
        console.log(list(params[0]));
        break;
    default:
        console.log('Unknown command');
}

