let express = require('express')
let db =  require('../models')
let Sequelize = require('sequelize')
let Student = db.Student



let router = express.Router()

router.get('/students' , function(req,res,next){
    Student.findAll({order: ['name']}).then(students => {
        return res.json(students)
    })
    .catch(err => next(err))
})

router.post('/students', function(req,res,next) {
    Student.create( req.body).then( data => {
        return res.status(201).send('done')
    }).catch( err => {
        if(err instanceof Sequelize.ValidationError){
            let message = err.errors.map(e=>e.message)
            return res.status(500).json(message)
        }
        return next(err)
    })
})

router.patch('/students/:id', function(req,res,next){
    // request to update where the id paramater is 
    Student.update(req.body, {where:{id: req.params.id}})
        .then(rowModified => {
            if( rowModified[0]){
                return res.status(404).send('notfound')
            }
            return res.send('ok')
        })
}).catch (err =>{
    if(err instanceof Sequelize.ValidationError){
        let message = err.errors.map( (e) => e.message)
        return res.status(400).json(message)
    }
})

router.delete('/students/:id' , function(req,res,next){
    Student.destroy({where: {id: req.params.id}})
        .then(rowModified => {
            return res.send('ok')
        }).catch(err => next(err)) 
})

module.exports = router