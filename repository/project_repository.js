// package ./repository/project_repository.js

class ProjectRepository {
    constructor(connection) {
        this.connection = connection;
    }

    createTable() {
        // const sql = `CREATE TABLE IF NOT EXISTS projects(
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     name TEXT
        // )`;
        return this.connection.run(`CREATE TABLE IF NOT EXISTS projects(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )`);
    }

    create(name) {
        return this.connection.run(`INSERT INTO projects (name) VALUES (?)`, [
            name
        ]);
    }

    readAll() {
        // const sql = `SELECT * FROM project`;
        return this.connection.all(`SELECT * FROM projects`);
    }

    readById(id) {
        return this.connection.get(`SELECT * FROM projects WHERE id = ?`, [id]);
    }

    update(project) {
        const { id, name } = project;
        return this.connection.run(
            `UPDATE projects SET name = ? WHERE id = ?`,
            [name, id]
        );
    }

    delete(id) {
        return this.connection.run(`DELETE FROM projects WHERE id = ?`, [id]);
    }

    readTasks(projectId) {
        // const sql = `SELECT * FROM task WHERE projectId = ?`;
        return this.connection.all(`SELECT * FROM tasks WHERE projectId = ?`, [
            projectId
        ]);
    }
}

module.exports = ProjectRepository;
