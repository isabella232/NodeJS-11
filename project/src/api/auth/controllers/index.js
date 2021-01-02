const { signup, signIn } = require("../services");

const authController ={
    register: async (req,res,next)=>{
        const user = req.body;
        const result = await signup(user);
        if (result instanceof Error) next(result);
        else res.status(201).json({success:true});
    },
    login: async (req,res,next)=>{
        // todo : validator\
        const result = await signIn(req.body);
        if(result instanceof Error) next(result);
        else res.status(201).json({success: true, result});
    },
}

module.exports = authController;