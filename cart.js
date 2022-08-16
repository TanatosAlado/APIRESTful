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
    
        getProdById = async (unId) => {
            console.log(`ingrese al getProd con ID:  ${unId}`)
            let losProductos = []
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            console.table(carros2)
            losProductos = carros2[unId].productos;
            return losProductos
        }
    
        agregarAlCarro = async (elProducto, elId) =>{
            console.log(elProducto)
            let id = elId
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            carros2[id].productos.push(elProducto)
            let newArray = JSON.stringify(carros2, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
        }

    
    }    
    