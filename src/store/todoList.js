import { selector } from "recoil";
import { atom } from "recoil";

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + ' ' + time;

let localKey = "todo"
//state

export const todoList = atom({
  key: "todoList",
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const storedValue = localStorage.getItem(localKey);
      if (storedValue) {
        setSelf(JSON.parse(storedValue));
      }
    },
    ({ onSet }) => {
      onSet(newTodoList => {
        localStorage.setItem(localKey, JSON.stringify(newTodoList));
      });
    },
  ],
});

export const filterOption = atom({
  key: "filterOption",
  default: "Show All",
});

//selector

export const totalTodo = selector({
  key: "totalTodo",
  get: ({ get }) => {
    let _todolist = get(todoList)
    return {
      all: _todolist.length,
      complete: _todolist.filter(todo => todo.isComplete).length,
      unComplete: _todolist.filter(todo => !todo.isComplete).length,
    }
  }
})

export const filterTodoList = selector({
  key: "filterTodoList",
  get: ({ get }) => {
    let _todolist = [...get(todoList)];
    switch (get(filterOption)) {
      case "Show All":
        return _todolist;
      case "Show Complete":
        return _todolist.filter((todo) => todo.isComplete);
      case "Show UnComplete":
        return _todolist.filter((todo) => !todo.isComplete);
      default:
        return _todolist;
    }
  },
});

export const addTodo = selector({
  key: "addTodo",
  get: ({ get }, title) => {
    return get(todoList)
  },
  set: ({ set, get }, title) => {
    let oldState = get(todoList);

    const dateTime = new Date().toDateString();
    const id = Date.now()
    let newTodo = {
      id,
      title,
      time: dateTime,
      isComplete: false,
    }

    set(todoList, [
      ...oldState,
      newTodo
    ]);
  },
});

export const toggleTodoStatus = selector({
  key: "toggleTodoStatus",
  get: ({ get }, title) => {
    return get(todoList)
  },
  set: ({ set, get }, id) => {
    let oldState = JSON.parse(JSON.stringify(get(todoList)));
    set(
      todoList,
      oldState.map((todo) => {
        todo.id === id && (todo.isComplete = !todo.isComplete);
        return todo;
      })
    );
  },
});

export const removeTodo = selector({
  key: "RemoveTodo",
  get: ({ get }, id) => {
    return get(todoList)
  },
  set: ({ set, get }, id) => {
    let oldState = JSON.parse(JSON.stringify(get(todoList)));
    set(
      todoList,
      oldState.filter((todo) => todo.id !== id)
    );
  },
});

