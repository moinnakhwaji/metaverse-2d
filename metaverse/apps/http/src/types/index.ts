import * as z from "zod";

export const SignupSchema = z.object({
     username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  type: z.enum(["Admin", "User"]),

}) 

export const signinSchema = z.object({
    username : z.string(),
    password : z.string().min(8) 
})


export const updateMetadata = z.object ({
    avatarId : z.string()
})

export const createSpace  = z.object({
    name:z.string() ,
dimensions: z.string().regex(/^[0-9]{1,3}\s*[xX ]\s*[0-9]{1,3}$/),

   mapId: z.string()

})


// add an element in map 
export const AddanElementSchema  = z.object({
    elementId : z.string(),
    spaceId : z.string(),
    x : z.string(),
    y : z.string()
})


export const CreateElementSchema   = z.object({
    imageUrl : z.string(),
    width : z.number(),
    height : z.number(),
    static : true   // weather or not the user can sit on top of this element (is it considered as a collission or not)
 })



 export const UpdateElementSchema = z.object({
        imageUrl : z.string(),

 })

 export const CreateAvatrSchema = z.object({
        name : z.string(),
       imageUrl : z.string(),
 })



 export const CreateMapSchema = z.object({
    thumbnail : z.string(),
    dimensions : z.string(),
    name : z.string(),
    defaultElements : z.array(z.object({
        elementId : z.string(),
        x : z.number(),
        y : z.number()

    }))



 }) 

