const Promise = require('bluebird');
const Connection = require('./config/sqlite_connection.js');
const ProjectRepository = require('./repository/project_repository');
const TaskRepository = require('./repository/task_repository.js');

function main() {
    const db = new Connection('./database.sqlite3');
    const blogProjectData = { name: 'Write Node.js - SQLite Tutorial' };
    const projectRepo = new ProjectRepository(db);
    const taskRepo = new TaskRepository(db);
    let projectId;

    projectRepo
        .createTable()
        .then(() => taskRepo.createTable())
        .then(() => projectRepo.create(blogProjectData.name))
        .then(data => {
            console.log(data);
            projectId = data.id;
            console.log(projectId);

            const tasks = [
                {
                    name: 'Outline',
                    description: 'High level overview of sections',
                    isComplete: 1,
                    projectId
                },
                {
                    name: 'Outline',
                    description: 'High level overview of sections',
                    isComplete: 1,
                    projectId
                },
                {
                    name: 'Outline',
                    description: 'High level overview of sections',
                    isComplete: 1,
                    projectId
                },
                {
                    name: 'Outline',
                    description: 'High level overview of sections',
                    isComplete: 1,
                    projectId
                },
                {
                    name: 'Write',
                    description: 'Write article contents and code examples',
                    isComplete: 0,
                    projectId
                }
            ];

            return Promise.all(
                tasks.map(function createTask(task) {
                    const { name, description, isComplete, projectId } = task;
                    return taskRepo.create(
                        name,
                        description,
                        isComplete,
                        projectId
                    );
                })
            );
        })
        .then(() => projectRepo.readById(projectId))
        .then(project => {
            console.log(`\nRetreived project from database here`);
            console.log(`project id = ${project.id}`);
            console.log(`project name = ${project.name}`);
            return projectRepo.readTasks(project.id);
        })
        .then(tasks => {
            console.log('\nRetrieved project tasks from database');
            return new Promise((resolve, reject) => {
                tasks.forEach(task => {
                    console.log(`task id = ${task.id}`);
                    console.log(`task name = ${task.name}`);
                    console.log(`task description = ${task.description}`);
                    console.log(`task isComplete = ${task.isComplete}`);
                    console.log(`task projectId = ${task.projectId}`);
                    console.log(
                        '------------------------------------------------'
                    );
                });
            });
            resolve('success');
        })
        .catch(err => {
            console.log('Error: ');
            console.log(JSON.stringify(err));
        });
}

main();
