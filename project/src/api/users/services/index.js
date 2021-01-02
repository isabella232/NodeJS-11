const { getConn } = require("../../../DB/pool");
const bcrypt = require('bcrypt');

const userService = {
    findUser: async({id})=>{
        let conn;
        let result;
        try{
            conn = await getConn();
            const [rows] = await conn.query('SELECT * FROM user WHERE id = ? ', [id]);
            const user = rows[0];
            delete user.password;
            result = user;
        }catch(e){
            console.error(e);
            result = e;
        }finally{
            if(conn) conn.release;
            return result;
        }
    },
    updateUser: async({name, id})=>{
        let conn;
        let result;
        try{
            conn = await getConn();
            const [rows] = await conn.execute("UPDATE user SET name = ? WHERE id = ?",[name, id]);
            result = rows;
        }catch(e){
            console.error(e);
            result = e;
        }finally{
            if(conn) conn.release;
            return result;  
        }
    },
    updateUserPw: async({id, password, newPassword})=>{
        let conn;
        let result;
        try{
            conn = await getConn();
            const [rows] = await conn.query("SELECT password FROM user WHERE id = ?",[id]);
            if(rows.length == 0) result = {success: false, message: "없는 사람"};
            else{
                if(await bcrypt.compare(password, rows[0].password)){
                   const hashPw = await bcrypt.hash(newPassword, await bcrypt.getSalt(12));
                    const [recode] = await conn.execute("UPDATE user SET password = ? WHERE id = ?",[hashPw, id]);
                    result = {success: false, message: '비밀 번호 변경 성공', result : recode};
                } else {
                    result = {success: false, message: '비밀 번호 틀림'};
                }
            }
        }catch(e){
            console.error(e);
            result = e;
        }finally{
            if(conn) conn.release;
            return result;  
        }
    }
};

module.exports = userService;