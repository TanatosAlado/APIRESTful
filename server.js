const express = require("express");
const { Router } = express;
const app = express();
app.use(express.static("public"));

const port = process.env.PORT || 8080
const Contenedor = require('./archivosEnJavascript')

app.use(express.json());
app.use (express.urlencoded({ extended: true }));

const myWine = new Contenedor("./baseProductos.json");


//////// Anexo Carritos
const Cart = require("./cart");
const myCart = new Cart('./public/carritos.json')

////////


const routerProducto = Router();
const routerCarrito = Router();

app.use("/api/productos", routerProducto);
app.use("/api/carrito", routerCarrito);


routerProducto.get("/", (req,res) => {
    myWine.getAll()
        .then((products)=>res.json(products))
})

routerProducto.get("/datos", (req,res) => {
    myWine.getById(req.query.id)
        .then((product)=>res.json(product))
})

routerProducto.post("/", (req,res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    myWine.save(req.body)
        .then((product)=>res.json(product))
})

//Crea Carrito
routerCarrito.post("/nuevo", (req,res) => {
    console.log("Ingrese al Post del carrito")
    myCart.crearCarro()
})

//Agrega un producto indicado a un carro indicado
routerCarrito.post("/", (req,res) => {
    let producto1 = req.body.idProducto;
    let id1 = req.body.idCarro;
    myWine.getById(producto1)
        .then((object) => myCart.agregarAlCarro(object, id1))
        .then(res.redirect("/carritos.html"))
})

//Lista los productos de un carrito indicado
routerCarrito.get("/productos", (req,res) => {
    myCart.getProdById(req.query.id)
        .then((productos) => res.json(productos))
})

//Elimina el carro indicado
routerCarrito.get("/delete", (req,res) => {
    myCart.deleteById(req.query.id)
        .then(res.redirect("/carritos.html"))
})

//Elimina un producto indicado de un carro indicado
routerCarrito.post("/del", (req,res) => {
    myCart.eliminarProdDeCarro(req.body.idCarro, req.body.idProd)
        .then(res.redirect("/carritos.html"))
})

//Actualiza un producto
routerProducto.post("/actualizar", (req,res) => {
    myWine.updateProduct(req.query.id, req.body)
        .then((product)=>res.json(product))
        .catch(res.json({error: "Error: el producto no fue encontrado"}))
})

//Elimina el producto pasado por parametro.
routerProducto.post("/delete", (req,res) => {
    myWine.deleteById(req.body.idProducto)
        res.send(`Se eliminó el producto con el ID: ${req.body.idProducto}`)
        
})

const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto: ${server.address().port}`)
})

app.on('error', (err) => {
    console.log(err)
})

let visitas = 0;

server.on("error", error => console.log(`Error: ${error}`))



