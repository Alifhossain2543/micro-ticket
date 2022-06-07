import { Router } from "express"

const router = Router()

router.delete("/api/orders/:orderId", (req, res, next) => {
  res.send("Hello from orders")
})

export { router as deleteOrderRoute }
