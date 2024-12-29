import { Request, Response, NextFunction } from "express";

const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKeyHeader = req.headers['x-api-key']; // API key header name
    const expectedApiKey = process.env.API_KEY; // API key from environment variables

    // Check if API key is provided
    if (!apiKeyHeader) {
        return res.status(401).json({ error: "API key is missing" });
    }

    // Compare the provided API key with the expected one
    if (apiKeyHeader !== expectedApiKey) {
        return res.status(403).json({ error: "Invalid API key" });
    }

    // API key is valid, proceed to the next middleware or route handler
    next();
};

export default checkApiKey;
