const { default: mongoose } = require("mongoose");
let Mongoose = require("mongoose");

let TaskSchema = new mongoose.Schema(
    {
        TaskName:{
            type:String
        },
        Date:{
            type:String
        },
        Status:{
            type:Boolean,
        },
        Desc:{
            type:String
        }

    }
)

let TM = Mongoose.model("Task",TaskSchema)

module.exports = TM;