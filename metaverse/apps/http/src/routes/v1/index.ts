import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { signinSchema, SignupSchema } from "src/types";
import client from "@repo/db"
import {hash, compare} from "../../scrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";

 export const router = Router(); 

router.post("/signup", async (req, res) => {
  console.log("inside signup");

  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("parsed data incorrect");
    return res.status(400).json({ message: "Validation failed", error: parsedData.error.format() });
  }

  const { username, password, type } = parsedData.data;

  try {
    const hashedPassword = await hash(password);

    const user = await client.user.create({
      data: {
        username,
        password: hashedPassword,
        role: type === "Admin" ? "Admin" : "User",
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (e: any) {
    console.error("Error during signup:", e);

    if (e.code === "P2002") {
      // Prisma duplicate key error
      return res.status(400).json({ message: "Username already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = signinSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed", error: parsedData.error.format() });
  }

  const { username, password } = parsedData.data;

  try {
    const user = await client.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Signin successful",
      token,
    });
  } catch (e) {
    console.error("Error during signin:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});


 router.get("/elements",()=>{

 })


  router.get("/avatar",()=>{
    
 })


 router.use("/user",userRouter)
  router.use("/space",spaceRouter)
 router.use("/admin",adminRouter)

 