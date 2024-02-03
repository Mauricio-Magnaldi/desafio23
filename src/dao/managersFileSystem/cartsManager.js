import fs from 'fs';

class CartsManager{

        constructor(path){
            this.path = path;
        }

        async getCarts(){
            try{
                if(fs.existsSync(this.path)) {
                    const info = await fs.promises.readFile(this.path,"utf-8")                     
                    return JSON.parse(info)
                } else {
                    return [];       
                }
            } catch (error) {
                return error;
            }
        }

        async getCartById(cartId){
            try {   
                const carts = await this.getCarts()
                const cart = carts.find(cart => cart.id === cartId) 
                if(!cart) {
                    //Devuelve null
                    return null
                } else {
                    //Devuelve el carrito con los productos o un array vacio
                    return cart
                } 
            } catch (error) {
                return error;
            }
        }

        async createCart(/*productos*/){
            try {     
                    const carts = await this.getCarts();
                    let cartId
                    if(!carts.length) {
                        cartId = 1
                    } else {
                        cartId = carts[carts.length - 1].id+1

                    }
                    const newCart = {
                        id: cartId,
                        products: /*productos || */[],
                    }
                    carts.push(newCart)
                    await fs.promises.writeFile(this.path, JSON.stringify(carts));
                    return newCart                   
                } catch (error) {
                    return error
                }
            }

//Ruta post /:cid/product/:pid agrega el arreglo de productos al carrito seleccionado.
        async updateCart (cartId, productId, quantity) {
            try {
                const carts = await this.getCarts()
                let cart = await this.getCartById(cartId)
                if (!cart) {
                    //El carrito indicado no existe
                    return null
                } 
                const cartIndex = carts.findIndex(cart => cart.id === cartId)
                const existingProduct = cart.products.find(product => product.id === productId)
                const productIndex = cart.products.findIndex(product => product.id === productId)
                if(productIndex !== -1) {
                    //Si el producto ya existe, se actualiza su cantidad
                    cart.products[productIndex].quantity +=quantity
                } else {
                    //Si el producto no existe, lo agrega con la cantidad especificada
                    cart.products.push({id:productId, quantity})
                }
                //Actualizar el carrito en la lista de carritos
                const newUpdateCart = carts.map((c, index) => {
                    return index === cartIndex ? cart : c 
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newUpdateCart));
                return cart
            } catch (error) {
                return error
            }

        }
}

export const cartsManager = new CartsManager('./src/carrito.json')