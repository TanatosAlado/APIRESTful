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
            let newArray = JSON.stringify(carros2, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
        }
    
        getProdById = async (unId) => {
            console.log(unId)
            let losProductos = []
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            let position = carros2.findIndex(element => element.id == unId)
            if (position != -1){
                losProductos = carros2[position].productos;
                return losProductos
            }else{
                console.log("Carrito no encontrado")
            }
            
            
        }

        deleteById = async (unId) => {
            console.log(`ingrese al getProd con ID:  ${unId}`)
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            let newCarros = carros2.filter(carrito => carrito.id != unId)
            let newArray = JSON.stringify(newCarros, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
        }
    
        agregarAlCarro = async (elProducto, elId) =>{
            let id = elId
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            let i =0;
            let position = -1
            for(i=0; i < carros2.length; i++){
                if(carros2[i].id == elId){
                    position = i
                    i = carros2.length;
                }
            }
            if(position === -1){
                console.log("Carrito no encontrado")
            } else{
                carros2[position].productos.push(elProducto)
                let newArray = JSON.stringify(carros2, null, 2)
                await fs.promises.writeFile(this.archivo, newArray, "utf-8")    
            }
        }

        eliminarProdDeCarro = async (elNumeroCarro, elNumeroProd) =>{
            let traerCarros = await fs.promises.readFile(this.archivo, "utf-8")
            let carros2 = JSON.parse(traerCarros)
            let i =0;
            let position = -1
            for(i=0; i < carros2.length; i++){
                if(carros2[i].id == elNumeroCarro){
                    position = i
                    i = carros2.length;
                }
            }
            if(position === -1){
                console.log("Carrito no encontrado")
            } else{
                let auxiliar = carros2[position];
                let auxiliar2 = auxiliar.productos.filter(element => element.id != elNumeroProd)
                carros2[position].productos = auxiliar2;
                let newArray = JSON.stringify(carros2, null, 2)
                await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            }
        }
    }    
    