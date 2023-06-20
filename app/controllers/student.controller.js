// import the student from models to create student object
const Student = require('../models/student.model');

// create and save a new student
exports.create = (req, res) => {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Student name can not be empty"
        });
    };

    if(!req.body.age) {
        return res.status(400).send({
            message: "Student age can not be empty"
        });
    };

    if(!req.body.major) {
        return res.status(400).send({
            message: "Student major can not be empty"
        });
    }

    // create a student
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        major: req.body.major
    });

    //save student in the database
    //save is the method for mongo db
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating student"
        });
    });
};

// retrieve and return all students from the database
exports.findAll = (req, res) => {
    //find is the mongo db method
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occur while retrueving students."
        });
    });
};

// find a single student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findById(id)
    .then(student => {
        if (!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send(student);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.id
        });
    });
};

//update a student identified by the id in the request
exports.update = (req, res) => {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Student name can not be empty"
        });
    };

    if(!req.body.age) {
        return res.status(400).send({
            message: "Student age can not be empty"
        });
    };

    if(!req.body.major) {
        return res.status(400).send({
            message: "Student major can not be empty"
        });
    }

    // find student and update it with the request body
    Student.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        major: req.body.major
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.is
            });
        }
        res.send(student);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.is
            });
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.id
        });
    });
};

// delete a student with the specified id in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.id)
    .then(student => {
        if (!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send({
            message: "Student deleted successfully!"
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.id
        });
    });
};
