import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UserService from '../services/users.service';
import jwtConfig from '../auth/jwtConfig';

export default class UsersController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const newUser = await this.userService.create(req.body);
    if (newUser !== 'error') {
      const token = await sign({ data: { username, password } }, 'secret', jwtConfig);
      res.status(201).send({ token });
    }
  };
}