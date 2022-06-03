import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import OrderService from '../services/orders.service';
import UserService from '../services/users.service';
import ProductService from '../services/products.service';

export default class OrdersController {
  constructor(
    private orderService = new OrderService(),
    private userService = new UserService(),
    private productService = new ProductService(),
  ) { }

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const token = req.headers.authorization;
    const decoded:any = verify(token!, 'secret');

    const allUsers = await this.userService.getAll();
    const user = allUsers.find((usr) => usr.username === decoded.data.username);
    const userId: any = user!.id;
    const newOrder: any = await this.orderService.create(userId);
    await productsIds.forEach(async (productId: number) => {
      await this.productService.update(productId, newOrder.insertId);
    });
    const result = { userId, productsIds };
    res.status(201).json(result);
  };

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };
}