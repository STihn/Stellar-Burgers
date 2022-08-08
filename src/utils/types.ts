export interface IData {
    image?: string,
    type?: string, 
    price?: number, 
    name?: string,
    fat?: number;
    proteins?: number;
    carbohydrates?: number;
    calories?: number;
    _id?: string,
    count?: number
}

export interface IIngredients {
    count: number,
    id: string,
    image: string,
    name: string,
    price: number,
    type: string,
    _id: string
}