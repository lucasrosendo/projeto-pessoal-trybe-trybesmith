import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }

  public async create(user: User): Promise<unknown> {
    const { username, level, password, classe } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, level, password, classe) VALUES (?, ?, ?, ?)',
      [username, level, password, classe],
    );
    return result;
  }
} 