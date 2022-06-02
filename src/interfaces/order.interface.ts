interface Order {
  id: number;
  userId: number;
  productsIds?: (number | undefined)[];
  orderId?: number;
}

export default Order; 
