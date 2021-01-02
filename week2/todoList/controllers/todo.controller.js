const {
  todos
} = require("../database/todo");

module.exports = {
  getTodos: (req, res, next) => {
    const doIt = todos;
    res.status(200).json(doIt);
  },

  addTodo: (req, res, next) => {
    //등록 날짜
    const {
      title
    } = req.body;
    let today = new Date();
    let year = today.getFullYear(); //년도
    let month = today.getMonth() + 1; //월
    let date1 = today.getDate(); //날짜
    const create_at = year + "-" + month + "-" + date1;

    //id 값 구하기
    const id = todos[todos.length - 1].id + 1;
    const it = {
      id,
      title,
      date: create_at,
      completed: false,
    };
    todos.push(it);
    res.status(201).json({
      success: true,
      message: "등록 성공",
    });
  },

  removeTodo: (req, res, next) => {
    const {
      id
    } = req.params;

    let newTodos = todos.filter(element => element.id != id);
    todos = newTodos;
    // for (let i = 0; i < todos.length; i++) {
    //   if (todos[i].id === Number(id)) {
    //     todos.splice(i, 1);
    //   }
    // }
    res.status(200).json({
      success: true,
      message: "삭제 성공"
    });
  },

  toggleTodo: (req, res, next) => {
    const {
      id
    } = req.params;
    todos.forEach(element => {
      if (element.id == id) {
        element.completed = !element.completed
      }
    });
    // for (let i = 0; i < todos.length; i++) {
    //   if (todos[i].id === Number(id)) {
    //     if (todos[i].completed !== false) {
    //       todos[i].completed = false;
    //     } else {
    //       todos[i].completed = true;
    //       console.log(todos[i].completed);
    //     }
    //   }
    // }
    res.status(200).json({
      success: true,
      message: "토글 성공"
    })
  },
};