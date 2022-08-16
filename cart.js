const fs = require("fs");


module.exports = class Cart {
        constructor(archivo){
            this.archivo = archivo;
        }
        crearCarro = async () =>{
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            console.table(carros2)
            let nextId = carros2.length + 1;
            let time = new Date;
            carros2.push({id:nextId, timestamp:time,productos:[]})
            console.table(carros2)
            let newArray = JSON.stringify(carros2, null, 2)
            console.table(newArray)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
        }
    
    //     // getCarroById = async (unId) => {
    
    //     // }
    
        agregarAlCarro = async (elProducto, elId) =>{
            console.log(elProducto)
            // let name = nom;
            // let precio = pre
            let id = elId
            // let date = new Date();
            // let nada = []
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            // nada.push({Nombre: name, Precio: precio, data: date})
            carros2[id].productos.push(elProducto)
            let newArray = JSON.stringify(carros2, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
        }
    
    }    
    