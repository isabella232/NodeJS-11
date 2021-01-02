
// todo: 내가 쓴 글 조회
const userController = {
    getUser: async (req,res,next)=>{
        const {id} = req.user;
        const result = await findUser({id});
        if (result instanceof Error) next(result);
        else res.status(200).json({success: true, user: result});
    },
    modifyUser: async (req,res,next)=>{
        const {id} = req.user;
        const {name} = req.body;
        const result = await updateUser({name, id});
        if(result instanceof Error) next(result);
        // update 성공하면 상태코드가 204인데 json형태로 보낼 수 가없음.
        else res.status(200).json({success: true, result})
    },
    modifyUserPw: async (req,res,next)=>{
        const {id} = req.user;
        const {password, newPassword} = req.body;
        const result = await updateUserPw({password, newPassword, id});
        if(result instanceof Error) next(result);
        else res.status(200).json(result);
    }
};

module.exports=userController;