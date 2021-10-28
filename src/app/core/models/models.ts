export type Product = {
    id: number,
    name: string,
    description: string,
    defaultImage: string,
    images: string[],
    price: number,
    discount: number,
};

export type Cart = {
    id: number, // User id
    products: {
          id: number,
          quantity: number,
    }[],
}