
import express from "express";
import { validateRequiredSearchParamsFields } from "../middlewares/validate";
import personsController from "../controllers/persons.controller";
const router = express.Router();


router
    .get('/search', validateRequiredSearchParamsFields, personsController.searchPersons);

export default router;