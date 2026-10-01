import express from 'express'
const app = express()
const port = 3000
app.use(express.json())

let personas= [
    {id:1, nombre:"Juan", edad:15},
    {id:2, nombre:"Ana", edad: 12}
]
app.get(`/`, (req, res)=>{
    res.send(`Ejemplo de API rest`)
});
app.get('/personas', (req, res)=>{
    res.json(personas)
})
app.get(`/personas/:id`, (req, res)=>{
    const persona = personas.find(p=>p.id==req.params.id)
    persona ? res.json(persona) : res.status(404).send('persona no existe')
});

app.post(`/personas`, (req, res)=>{
    // console.log(req.body)
    const nuevoid = personas.length + 1
    const nuevaPersona = {
        id: nuevoid,
        nombre : req.body.nombre,
        edad: req.body.edad
    }
    personas.push(nuevaPersona)
    res.status(201).json(nuevaPersona)
});

app.delete(`/personas/:id`, (req, res)=>{
    const indice = personas.findIndex(i=> i.id==req.params.id)
    if(indice == -1) return res.status(404).send('No existe')
        personas.splice(indice,1)
        res.status(204).send()
});

app.put(`/personas`, (req, res)=>{
    console.log(req.query)
    console.log(req.body)
    const persona = personas.find(p=>p.id==req.query.id)
    if(!persona) return res.status(404).send('Persona no encontrada')
        persona.nombre = req.body.nombre,
        persona.edad = req.body.edad
        res.json(persona)
});
//middleware para url erronea o inexistente
app.use((req, res)=>{
    res.status(404).send(`la pagina no existe`)
})

app.listen(port, ()=>{
    console.log(`Servidor en puerto ${port}`);
})


