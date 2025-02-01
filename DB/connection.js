import mongoose from 'mongoose';
import chalk from 'chalk';
export const db_connection=async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/to-do')
        console.log( chalk.bgGreen('Connected to Database'))
    } catch (error) {
        console.log("fail to connect with db "+chalk.bgRed(error.message))
    }
    
}

    