module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    // GET /students: Fetch all students
    app.get('/students', students.findAll);

    // GET /students/:id: Fetch a single student by id
    app.get('/students/:id', students.findOne);

    // POST /students: Add a new student
    app.post('/students', students.create);
    
    // PUT /students/:id: Update a student by id
    app.put('/students/:id', students.update);

    // DELETE /students/:id: Delete a student by id
    app.delete('/students/:id', students.delete);
    
}