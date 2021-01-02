const { getConn } = require("../../../DB/pool");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const authService = {
    signup: async ({email,name,password})=>{
        let conn;
        let result=false;
        try{
            conn = await getConn();
            const salt = await bcrypt.genSalt(12);
            const hashPw = await bcrypt.hash(password, salt);
            await conn.execute('INSERT INTO user (email, name, password) VALUES(?, ?, ?);',[email, name, hashPw]);
            result = true;
        }catch(e){
            console.error(e);
            result = e;
        }finally{
            if(conn) conn.release();
            return result;
        }
    },

    signIn: async({email, password})=>{
        let conn;
        let result;
        try{
            conn = await getConn();
            const [rows] = await conn.query('SELECT * FROM user WHERE email = ?;',[email]);
            
            if(rows.length == 0 ) result = {success: false, message: '없는 이메일입니다.'};
            else{
                console.log(email, password);
                if(bcrypt.compare(password, rows[0].password)){
                    const token = jwt.sign({id:rows[0].id, email}, "nam");
                    result = {success: true, message: '로그인 성공', token};
                }
                else{ // 비밀번호 틀렸을 때
                    result = {success: false, message: '비밀번호 틀림'}
                }
            }
        }catch(e){
            console.error(e);
            result=e;
        }finally{
            if(conn) conn.release();
            return result;
        }
    },
}

module.exports = authService;