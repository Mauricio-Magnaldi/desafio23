export default class BasicManager {

    constructor(model) {
        this.model = model
    }

    async findAll(){
        //.lean() permite luego de la consulta devolver los resultados como objetos JavaScript simples
        return this.model.find().lean()
    }

    async findById(id){
        return this.model.findById(id)
    }

    async findByIdP(id){
        return this.model
            .findById(id)
            .populate("products")
    }

    async createOne(product) {
        return this.model.create(product)
    }
    
    async updateOne(id, product) {
        return this.model.updateOne(
            {_id:id}, 
            product
            )
    }

    async deleteOne(id) {
        return this.model.findByIdAndDelete({_id:id});
    }
}
