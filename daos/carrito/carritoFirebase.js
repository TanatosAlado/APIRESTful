const Cart = require('../../cart')

class CarritoFirebase extends Cart{
    constructor(){
        super('../../public/carritos.json')
    }
    
    guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritoFirebase