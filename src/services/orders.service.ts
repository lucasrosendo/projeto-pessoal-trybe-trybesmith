import connection from '../models/connection';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
import Order from '../interfaces/order.interface';

export default class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.orderModel.getAll();
    const products = await this.productModel.getAll();
    orders.forEach((order, i) => {
      const productsIds = products
        .filter((product) => product.orderId === order.id)
        .map((product) => product.id);
      orders[i].productsIds = productsIds;
    });
    return orders;
  }
}