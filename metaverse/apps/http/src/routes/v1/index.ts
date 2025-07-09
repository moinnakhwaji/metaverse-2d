import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";


 export const router = Router(); 


 router.post("/signup",(req,res)=>{
    res.json({
        message :"the code is runnning on port 3000"
    })
 })

 router.post("/signin",(req,res)=>{

 })


 router.get("/elements",()=>{

 })


  router.get("/avatar",()=>{
    
 })


 router.use("/user",userRouter)
  router.use("/space",spaceRouter)
 router.use("/admin",adminRouter)