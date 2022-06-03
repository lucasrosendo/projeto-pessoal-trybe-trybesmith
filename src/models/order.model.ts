import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(userId: number): Promise<unknown> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { insertId };
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Orders');
    const [rows] = result;
    return rows as Order[];
  }
}