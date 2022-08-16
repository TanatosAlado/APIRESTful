let cadena = "./baseProductos.json"
const { Console } = require("console");
const fs = require("fs");
// const { nextTick } = require("process");

    module.exports = class Contenedor {
        constructor(archivo){
            this.archivo = archivo;
        }

    save = async (oneObject) => {
        let nextId = 0;
        try{
            const pruebaIngreso = await fs.promises.readFile(this.archivo, "utf-8");
            if (pruebaIngreso.length == 0){
                let initialArray = [];
                nextId = 1;
                let newObject = {title: oneObject.name, price: oneObject.price, img: oneObject.imagen, id: nextId};
                initialArray.push(newObject);
                let newArray = JSON.stringify(initialArray, null, 2)
                await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            }else{
                let vinos2 = JSON.parse(pruebaIngreso)
                let ultimoID = parseInt(vinos2.length) -1;
                nextId = (vinos2[ultimoID].id) +1
                let newObject = {title: oneObject.name, price: oneObject.price, img: oneObject.imagen, id: nextId};
                vinos2.push(newObject); 
                let newArray = JSON.stringify(vinos2, null, 2)
                await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            }
        } catch(err){
            console.log(err)
        }
        return this.getById(nextId);
    }

    getById = async (oneId) => {
        console.log("porque!!!")
        try{
            let pruebaIngreso = await fs.promises.readFile(this.archivo, "utf-8")
            let vinos2 = JSON.parse(pruebaIngreso)
            let position = vinos2.findIndex(element => element.id == oneId)
            if(position != -1){
                return vinos2[position];
            } else{
                console.log("Elemento no encontrado")
            }            
        }catch(err){
            console.log(err)
        }
    }

    getAll = async () =>{
        let losVinos = await fs.promises.readFile(this.archivo, "utf-8")
        if(losVinos) {
            let vinosFormato = JSON.parse(losVinos)
            return vinosFormato
        }
        else{
            return []
        }
    }

    deleteById = async (oneId) =>{
        console.log("deletebyid")
        try{
            let pruebaIngreso = await fs.promises.readFile(this.archivo, "utf-8");
            let vinos2 = JSON.parse(pruebaIngreso) 
            let position = vinos2.filter(element => element.id != oneId);
            let newArray = JSON.stringify(position, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            console.table(position)
        } catch(err){
            console.log(err)
        }
    }

    deleteAll(){
        let arrayEmpty = "";
        fs.writeFileSync(this.archivo, arrayEmpty, "utf-8")
    }

    getRandom = async () => {
        const bdVinos = await fs.promises.readFile(this.archivo, 'utf-8')
        const productos = JSON.parse(bdVinos)
        const myId = await (Math.floor(Math.random() * productos.length) +1)
        return this.getById(myId);
    }

    updateProduct = async (myId, oneObject) => {
        try{
        const bdVinos = await fs.promises.readFile(this.archivo, 'utf-8')
        const productos = JSON.parse(bdVinos)
        let position = productos.findIndex(element => element.id == myId)
        if(position != -1){
            productos[position].title = oneObject.name;
            productos[position].price = oneObject.price;
            productos[position].img = oneObject.imagen;
            console.table(productos)
            let newArray = JSON.stringify(productos, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            return this.getById(myId)    
        } else{
            console-console.log("Elemento con ID no encontrado");   
        }   
        }catch(err){
            console.log(err)
        }
    }    
}
