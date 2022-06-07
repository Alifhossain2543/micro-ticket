import { Router } from "express";

const router = Router()

router.get('/api/orders', (req, res, next) => {
    res.send('Hello from orders')
})

export { router as indexOrderRoute}