const express = require("express");
const { Router } = express;
const app = express();
app.use(express.static("public"));
const handlebars = require("express-handlebars");

const port = process.env.PORT || 8080
const Contenedor = require('./archivosEnJavascript')

app.use(express.json());
app.use (express.urlencoded({ extended: true }));


const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/Views/Layout",
});

app.engine("hbs", hbs.engine);
app.set('views', "./Views");
app.set("view engine", "hbs");

const myWine = new Contenedor("./baseProductos.json");


//////// Anexo Carritos
const Cart = require("./cart");
const myCart = new Cart('./public/carritos.json')

////////


const routerProducto = Router();
const routerCarrito = Router();

app.use("/api/productos", routerProducto);
app.use("/api/carrito", routerCarrito);


//Variable a modificar para probar funcionalidades de Administrador
let administrador = true;

const isAdmin = (req,res,next) =>{
    if (administrador){
        return next()
    }  
    else{
        const response = {
            error: -1,
            description: `Ruta ${req.path} y metodo ${req.method} no autorizados` 
        }
        res.status(401).json(response)
    }
}

//Lista todos los productos
routerProducto.get("/", (req,res) => {
    myWine.getAll()
        .then((products) => res.render("productos", { products }))
})

//Lista el producto solicitado
routerProducto.get("/datos", (req,res) => {
    myWine.getById(req.query.id)
        .then((products) => res.render("productos_id",products))
})

//Crea producto
routerProducto.post("/", isAdmin, (req,res) => {
    myWine.save(req.body)
        .then((products) => res.render("productos_id",products))
})

//Crea Carrito
routerCarrito.post("/nuevo", (req,res) => {
    console.log("Ingrese al Post del carrito")
    myCart.crearCarro()
    .then(res.redirect("/carritos.html"))
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
    .then((products) => res.render("productos", { products }))
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
routerProducto.post("/actualizar", isAdmin, (req,res) => {
    myWine.updateProduct(req.body.id, req.body)
    .then((products) => res.render("productos_id",products))
})

//Elimina el producto pasado por parametro.
routerProducto.post("/delete", isAdmin, (req,res) => {
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



