import { Router } from "express";
import { addGrocery, getGrocery, updateGrocery, removeGrocery } from "./admin.controller"; // Ensure this import points to the correct file where addGrocery is defined.
import checkApiKey from "../../middleware/admin.middleware";

const router = Router();

router.use(checkApiKey);

// Use addGrocery as the route handler
router.post('/add-grocery', addGrocery);
router.get('/get-grocery', getGrocery);
router.put('/update-grocery/:id', updateGrocery);
router.delete('/remove-grocery/:id', removeGrocery);

export default router;
