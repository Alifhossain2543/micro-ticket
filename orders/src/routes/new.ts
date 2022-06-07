import { Router } from "express"

const router = Router()

router.post("/api/orders", (req, res, next) => {
  res.send("Hello from orders")
})

export { router as newOrderRoute }
