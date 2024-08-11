import Route from 'express';
import TechnologieController from '../controller/technologiesController';
import checkExistUserAccount from '../middleware/checkExistsUserAccount';

const routeTechnologie = Route()
const controller: TechnologieController = new TechnologieController()

routeTechnologie.post('/technologies', checkExistUserAccount, controller.addTechnology)
routeTechnologie.put("/technologies/:id", checkExistUserAccount, controller.updateTechnology)
routeTechnologie.patch("/technologies/:id/studied", checkExistUserAccount, controller.updateTechnologyStatus)
routeTechnologie.get("/technologies", checkExistUserAccount, controller.getTechnologies)
routeTechnologie.delete("/technologies/:id", checkExistUserAccount, controller.deleteTechnology)

export default routeTechnologie