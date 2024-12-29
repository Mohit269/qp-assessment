import { Router } from "express";
import { getGrocery } from "../admin/admin.controller"; // Ensure this import points to the correct file where addGrocery is defined.
import { bookItem } from "../user/user.controller"
const router = Router();


// Use addGrocery as the route handler
router.post('/book-grocery', bookItem);
router.get('/get-grocery', getGrocery);


export default router;
