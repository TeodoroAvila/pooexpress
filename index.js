const express = require('express');
const Database = require('./database');
const cors = require('cors');
const port = 3001;

//Iniciamos en app el servidore web
const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

//tabla estudiante
app.get('/estudiante', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM estudiante', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

//tabla calificaciones
app.get('/calificaciones', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM calificaciones', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

//relaciona calificacion con estudiante
app.get('/calificacionesestudiante', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT c.*, e.nombre FROM calificaciones c JOIN estudiante e ON e.id = c.estudianteid', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

// Obtener solo un estudiante
app.get('/estudiante/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM estudiante WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})
// Obtener solo una materia
app.get('/calificaciones/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM calificaciones WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})


 //REquest peticion     response  response estudiante
 app.post('/estudiante', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO ESTUDIANTE     
                (nombre, apellido, edad) VALUES
                 (?,?,?)`;

    cn.execute(
        query, [body.nombre, body.apellido, body.edad],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

 //REquest peticion     response  response calificacion
 app.post('/calificaciones', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO CALIFICACIONES     
                (materia, calificacion, estudianteid) VALUES
                 (?,?,?)`;

    cn.execute(
        query, [body.materia, body.calificacion, body.estudianteid],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//Update estudiante
app.put('/estudiante', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()
    const query = `UPDATE ESTUDIANTE
                SET nombre=?, apellido=?, edad=?   
                WHERE id = ?`;
    cn.execute(
        query, [body.nombre, body.apellido, body.edad, body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//Update calificacion
app.put('/calificaciones', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()
    const query = `UPDATE CALIFICACIONES
                SET materia=?, calificacion=?, estudianteid=?   
                WHERE id = ?`;
    cn.execute(
        query, [body.materia, body.calificacion, body.estudianteid, body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//Habilitamos el servidor en el puerto indicado

app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})