import User from "./models/User.js";
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'


//Admin USer 

const userRegister = async () => {
    await connectToDatabase()
    try{
        const hashPassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashPassword,
            role:"admin"
        })
        await newUser.save();
        console.log("User created successfully");
        process.exit(0);
    }catch(error){
        console.log("Seeding failed ",error);
        process.exit(1);
        
    }
}
userRegister()