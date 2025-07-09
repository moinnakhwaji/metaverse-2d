import expres from  "express"
import { router } from "./src/routes/v1/index"
// import { router } from "."


const app = expres()

app.use("/api/v1",router)

app.listen(process.env.PORT || 3000,()=>{
    console.log("moin code is running")
})

