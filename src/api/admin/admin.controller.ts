import { addGroceries, getGroceries, updateGroceries, removeGroceries} from "./admin.service";
import { Request, Response } from "express";

// Add groceries to the shopping cart
export const addGrocery = async(req: Request, res: Response) => {
    try {
        if(!req.body && !req.body.length){
            return res.status(400).json({ error: "Missing fields" });
        }
        const items = req.body;
        const result = await addGroceries(items);
        return res.status(200).json({ items: result})
    } catch (error) {
        return res.status(500).json({ error: error});
    }
}

export const getGrocery = async(req: Request, res: Response) => {
    try {
        const result = await getGroceries()
        return res.status(200).json({ items: result})
    } catch (error) {
        return res.status(500).json({ error: error});
    }
}

export const updateGrocery = async(req: Request, res: Response) => {
    try {
        if(!req.body && !req.params.id){
            return res.status(400).json({ error: "Missing fields" });
        }
        const items = req.body;
        const result = await updateGroceries(items,req.params.id);
        return res.status(200).json({ items: result})
    } catch (error) {
        return res.status(500).json({ error: error});
    }
}

export const removeGrocery = async(req: Request, res: Response) => {
    try {
        if(!req.params.id){
            return res.status(400).json({ error: "Missing fields" });
        }
        const result = await removeGroceries(req.params.id);
        return res.status(200).json({ items: result})
    } catch (error) {
        return res.status(500).json({ error: error});
    }
}
