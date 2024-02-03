import { productsModel } from "../models/products.model.js";
import BasicManager from "./basicManager.js";

class ProductsManager extends BasicManager {
    constructor(){
        super(productsModel)
    }
    
/* GET http://localhost:8080/api/products?sort=asc&limit=2&page=2 */
    async findAllProducts(options){
        const {limit=10, page=1, sort: sortPrice, ...queryFilter} = options;
        const response = await productsModel.paginate(queryFilter, {
            limit,
            page, 
            sort: { price: sortPrice === "asc" ? 1 : -1 }, 
            lean: true,
        });
        const info = {
            status: response.totalDocs === 0 ? "error" : "success",
            payload: response.docs,    
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage 
                ? `http://localhost:8080/api/products?page=${response.prevPage}`
                : null,
            nextLink: response.hasNextPage 
                ? `http://localhost:8080/api/products?page=${response.nextPage}`
                : null,
        }
        return {info};
    }

    async findAllProductsView(){
        const products = await this.findAll();
        console.log(products);
        return products;        
    } 
}

export const productsManagerMongoDB = new ProductsManager();