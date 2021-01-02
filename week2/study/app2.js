const express = require("express");
const app = express();
const morgan = require("morgan");

/**
  어플리케이션 레벨에서 미들웨어 등록
  app.use((req, res, next) => {
      console.log('미들웨어 동작');
      next();
  });
 */

/**
  로거 만들기
  클라이언트에서 요청이 왔을 때 응답을 잘 (못)했는지
  로그를 남겨서 수집하는 것

  app.use((req, res, next) => {
      next();
      const date = new Date();
      const method = req.method;
      const uri = req.originalUrl;
      const ip = req.ip;

      console.log(`${date}, ${method}, ${uri}, ${ip}`);
  });
 */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//로거 미들웨어 등록
app.use(morgan("dev"));

// api 구현
app.get("/", (req, res, next) => {
  console.log("api");
  res.send("api");
});

// 라우터 등록
app.use('/user',require('./route'));

//서버연결
app.listen(9001, () => {
  console.log("Connected");
});