import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import jwtConfig from '../auth/jwtConfig';
import UserService from '../services/users.service';

export default class LoginController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const usersList = await this.userService.getAll();
    const validUser = usersList.find((user) => user.username === username);

    if (!validUser || validUser.password !== password) {
      res.status(401).send({ message: 'Username or password invalid' });
    } else {
      const token = await sign({ data: { username, password } }, 'secret', jwtConfig);
      res.status(200).send({ token });
    }
  };
}