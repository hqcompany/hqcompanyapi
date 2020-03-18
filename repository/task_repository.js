// package ./repository/task_repository.js
class TaskRepository {
    constructor(connection) {
        this.connection = connection;
    }

    CREATE_TABLE_TASK = `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        isComplete INTEGER DEFAULT 0,
        projectId INTEGER,
        CONSTRAINT task_fk_projectId FOREIGN KEY (projectId)
         REFERENCES project(id)
         ON UPDATE CASCADE
         ON DELETE CASCADE
    )`;
    CREATE_TASK = `INSERT INTO task (name, description, isComplete, projectId) VALUES (?,?,?,?)`;
    READ_ALL = `SELECT * FROM task`;
    READ_BY_ID = `SELECT * FROM task WHERE id = ?`;
    UPDATE_TASK = `UPDATE project SET name = ?, description = ?, isComplete = ?, projectId = ? WHERE id = ?`;
    DELETE_TASK = `DELETE FROM task WHERE id = ?`;

    createTable() {
        return this.connection.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            isComplete INTEGER DEFAULT 0,
            projectId INTEGER,
            CONSTRAINT task_fk_projectId FOREIGN KEY (projectId)
              REFERENCES project(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
        )`);
    }

    create(name, description, isComplete, projectId) {
        return this.connection.run(
            `INSERT INTO tasks (name, description, isComplete, projectId) VALUES (?,?,?,?)`,
            [name, description, isComplete, projectId]
        );
    }

    readAll() {
        return this.connection.all(`SELECT * FROM tasks`);
    }

    readById() {
        return this.connection.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
    }

    update(task) {
        const { id, name, description, isComplete, projectId } = task;
        return this.connection.run(
            `UPDATE tasks SET name = ?, description = ?, isComplete = ?, projectId = ? WHERE id = ?`,
            [name, description, isComplete, projectId, id]
        );
    }

    delete(id) {
        return this.connection.run(`DELETE FROM tasks WHERE id = ?`, [id]);
    }
}

module.exports = TaskRepository;
