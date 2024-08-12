import Route from 'express';
import UserController from '../controller/userController';

const routeUser = Route()
const controller: UserController = new UserController()

routeUser.post('/users', controller.addUser)

export default routeUser