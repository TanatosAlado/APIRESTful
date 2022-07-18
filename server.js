const express = require("express");
const { Router } = express;
const app = express();
let misProductos = [];
app.use(express.static("public"));

// const fs = require("fs");
// let auxiliar = fs.readFile(this.archivo, misProductos, "utf-8");
// misProductos = JSON.parse(auxiliar);


const port = process.env.PORT || 3010
const Contenedor = require('./archivosEnJavascript')

app.use(express.json());
app.use (express.urlencoded({ extended: true }));

const myWine = new Contenedor("./baseProductos.json");

//////////////////////////
const routerProducto = Router();

app.use("/api/productos", routerProducto);


routerProducto.get("/", (req,res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    myWine.getAll()
        .then((products)=>res.json(products))
})

routerProducto.get("/:id", (req,res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    myWine.getById(req.params.id)
        .then((product)=>res.json(product))
})

routerProducto.post("/", (req,res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    myWine.save(req.body)
        .then((product)=>res.json(product))
})

routerProducto.put("/:id", (req,res) => {
        myWine.updateProduct(req.params.id, req.body)
            .then((product)=>res.json(product))
})

routerProducto.delete("/:id", (req,res) => {
    myWine.deleteById(req.params.id)
    res.send(`Se eliminó el producto con el ID: ${req.params.id}`)
})


//////////////////////////



const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto: ${server.address().port}`)
})

app.on('error', (err) => {
    console.log(err)
})


app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html; charset=UTF8')
    res.send(`
            Bienvenido al sitio de Prueba de Server Express <br>
            Seleccione la opción a probar: <br>
            <ul>
                <li><a href="/productos">/productos</a></li>
                <li><a href="/productoRandom">/productoRandom</a></li>
            </ul>
            `)
})

// app.use("/api/productos", routerProducto);

let visitas = 0;

// let cadena = "./baseProductos.json"

// app.get('/visitas', (req,res) => {
//     visitas++;
//     res.send(`La cantidad de visitas ${visitas}`)
// })

// app.get('/fyh', (req,res) =>{
//     const fechaYHora = new Date(Date.now()).toLocaleString()
//     res.send({fyh: fechaYHora})
// })

// app.get('/productos', (req, res) => {
//     res.header('Content-Type', 'application/json; charset=UTF8')
//     myWine.getAll()
//         .then((products)=>res.send(products))
// })

// app.get('/productoRandom', (req, res) => {
//     res.header('Content-Type', 'application/json; charset=UTF8')
//     myWine.getRandom()
//         .then((product)=>res.send(product))
// })

server.on("error", error => console.log(`Error: ${error}`))



