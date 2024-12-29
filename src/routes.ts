import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Admin route
router.use('/admin', async (req: Request, res: Response, next: any) => {
    try {
        const module = await import('./api/admin/admin.index');
        const adminRouter = module.default; // Ensure that the default export is the router
        if (typeof adminRouter === 'function') {
            adminRouter(req, res, next);
        } else {
            console.error("Loaded module is not a valid middleware function");
            res.status(500).send("Invalid module loaded");
        }
    } catch (error) {
        console.error("Error loading admin module:", error);
        res.status(500).send("Internal Server Error");
    }
});

// User route
router.use('/user', async(req: Request, res: Response, next: any) => {
    try{
        const module = await import('./api/user/user.index');
        const adminRouter = module.default; // Ensure that the default export is the router
        if (typeof adminRouter === 'function') {
            adminRouter(req, res, next);
        } else {
            console.error("Loaded module is not a valid middleware function");
            res.status(500).send("Invalid module loaded");
        }
    } catch (error) {
        console.error("Error loading admin module:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Export the router
export default router;
