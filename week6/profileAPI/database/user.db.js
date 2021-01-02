/**
 * @user {id: number, email: string, password: string, name: string}
 */
const users = [
    {id: 1, email: "test@test", password: "1234", name: "홍길동"},
    {id: 2, email: "skaxodn97@gmail.com", password: "5678", name: "남태우"},
    {id: 3, email: "test3@test3", password: "98765", name: "임태호"}
]
// 유저하나 조회하기(아이디)
const getUser  = (userId) =>  users.find((user)=>user.id === userId);

//유저 하나 조회하기 (이메일)
const getUserByEmail = (email)=> users.find((user)=>user.email === email);


module.exports={
    users,
    getUser,
    getUserByEmail
};