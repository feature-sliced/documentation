# Quick start.

Рассмотрим начало нового проекта с помощью Feature-Sliced на примере todo-list с использованием React.

0) Hello world. Подготовка необходимых директорий и файлов для старта приложения. Вся работа будет происходить в
   директории src.
  - pages
  - routes
  - constants
  - ui
  - libs

`npm i react-router-dom history react-router-config`
```
./app.tsx
  import React from 'react'
  import { renderRoutes } from 'react-router-config'
  import { Router } from 'react-router-dom'
  import { history } from './libs/history'
  import { routes } from './routes'
  
  function App() {
    return <Router history={history}>{renderRoutes(routes)}</Router>
  }

  export default App
```
```
./libs/history.ts
  import { createBrowserHistory } from 'history'

  export const history = createBrowserHistory()
```
```
./routes/index.ts
  import { RouteConfig } from 'react-router-config'
  import { paths } from '../constants'
  import { HomePage } from '../pages/home/page'
  
  export const routes: RouteConfig[] = [
    { exact: true, path: paths.home(), component: HomePage },
  ]
```
```
./constants/paths.ts
  export const paths = {
    home: () => '/',
  }
```
```
./pages/home/page.tsx
  export function HomePage() {
    return (
      <div>Hello world!</div>
    )
  }
```

1. Создадим элементы, которые нам понадобятся для нашего приложения. Для начала это будет только кнопка и текст филд.
```
./ui/atoms/button/button.tsx
  import React from 'react'
  import classes from './button.module.css'
  
  type ButtonProps = {
    onClick?: (e: React.MouseEvent) => void
    isDisabled?: boolean
  }
  export const Button: React.FC<ButtonProps> = ({ children, isDisabled, onClick }) => (
    <button onClick={onClick} disabled={isDisabled} className={classes.button}>
      {children}
    </button>
  )

./ui/atoms/button/button.module.css
  .button {
    color: white;
    background-color: darkblue;
    font-size: 1.5rem;
  }

./ui/atoms/button/index.ts
  export { Button } from './button'
```
```
./ui/atoms/text-field/text-field.tsx
  import React from 'react'
  import classes from './text-field.module.css'
  
  type TextFieldProps = {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
  }
  export const TextField = ({ onChange, value, label }: TextFieldProps) => {
    return (
      <label className={classes.label}>
        {label}
        <input onChange={onChange} value={value} />
      </label>
    )
  }

./ui/atoms/text-field/text-field.module.css
  .label {
    color: darkblue;
  }


./ui/atoms/text-field/index.ts
export { TextField } from './text-field'
```
```
./ui/atoms/index.ts
  export { Button } from './button'
  export { TextField } from './text-field'
  
./ui/index.ts
  export * from './atoms'
```
Проверка, что всё создалось корректно
```
./pages/home/page.tsx
  import { Button, TextField } from '../../ui'

  export function HomePage() {
    const handleClick = () => {
      console.log('hello')
    }
    return (
      <div>
        <TextField label={'Enter new todo:'} />
        <Button onClick={handleClick}>Create</Button>
      </div>
    )
  }
```
Если видим инпут и кнопку — двигаемся дальше.
2. Рядом со страницей создадим модель, чтобы было с чем работать. В данном примере используется эффектор для упрощения,
чтобы узнать как применить другие стейт-менеджеры, можно перейти в раздел [how-to гайдов](https://google.com).

```npm i effector effector-react```
```
./pages/home/model.ts
  import { createEvent, createStore, restore, sample } from 'effector'
  
  export const newTodoTextChanged = createEvent<string>()
  export const $newTodoText = restore(newTodoTextChanged, '')
  
  export const todoCreated = createEvent()
  
  type Todo = {
    title: string
    isDone: boolean
  }
  export const $todoList = createStore<Todo[]>([])
  
  const todoCreationConfirmed = sample({
    clock: todoCreated,
    source: $newTodoText,
  })
  
  $todoList.on(todoCreationConfirmed, (prev, newTodoTitle) => [
    ...prev,
    { title: newTodoTitle, isDone: false },
  ])
  
  todoCreationConfirmed.watch((newTodoTitle) => {
    alert(`new todo was created with title ${newTodoTitle}`)
  })
```
```
./pages/home/page.tsx
  import { useStore } from 'effector-react'
  import { $newTodoText, newTodoTextChanged, todoCreated } from './model'
  export function HomePage() {
    const value = useStore($newTodoText)
  
    const handleClick = () => {
      todoCreated()
    }
  
    return (
      <div>
        <TextField
          label={'Enter new todo:'}
          value={value}
          onChange={(e) => newTodoTextChanged(e.target.value)}
        />
        <Button onClick={handleClick}>Create</Button>
      </div>
    )
  }
```
Попробуем проверить — ввести что-то в инпуте и нажать "Create". Если появился алерт с этим значением — Вы на верном
пути, и новый элемент создаётся. Выведем его.
```
./pages/home/page.tsx
  const todoList = useStore($todoList)
  ...
  <Button onClick={handleClick}>Create</Button>
  <ul>
    {todoList.map((todo) => (
      <li>{todo.title}</li>
    ))}
  </ul>
```
3. Отлично, todo лист выводится, наведём немного порядок в коде.
```
./features/todo/atoms/todo-item/index.ts
  export { TodoItem } from './todo-item'

./features/todo/atoms/todo-item/todo-item.module.css
  .todoItem {
    background-color: inherit;
  }
  .todoTitle[data-is-done="true"] {
    text-decoration: line-through;
  }


./features/todo/atoms/todo-item/todo-item.tsx
  import { todoCompleted, todoRemoved } from '../../model'
  import { Todo } from '../../types'
  import classes from './todo-item.module.css'
  
  export const TodoItem = ({ todo }: { todo: Todo }) => {
    const handleDone = () => todoCompleted(todo.id)
    const handleRemove = () => todoRemoved(todo.id)
    
    console.log(classes)
    return (
      <li
        data-is-done={todo.isDone}
        className={classes.todoTitle}
      >
        <span>{todo.title}</span>
        <button className={classes.todoItem} onClick={handleDone}>
          {todo.isDone ? 'Undone' : 'Done'}
        </button>
        <button className={classes.todoItem} onClick={handleRemove}>
          Remove
        </button>
      </li>
    )
  }

./features/todo/atoms/index.tsx
  export { TodoItem } from './todo-item'

./features/todo/molecules/create-todo-form.tsx
  import { useStore } from 'effector-react'
  import React from 'react'
  import { Button, TextField } from '../../../ui'
  import { $newTodoText, newTodoTextChanged, todoCreated } from '../model'
  
  export const CreateTodoForm = () => {
    const value = useStore($newTodoText)
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      todoCreated()
    }
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label={'Enter new todo:'}
          value={value}
          onChange={(e) => newTodoTextChanged(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
    )
  }

./features/todo/molecules/index.tsx
  export { CreateTodoForm } from './create-todo-form'
  export { TodoList } from './todo-list'

./features/todo/molecules/todo-list.tsx
  import { useStore } from 'effector-react'
  import { TodoItem } from '../atoms'
  import { $todoList } from '../model'
  
  export const TodoList = () => {
    const todoList = useStore($todoList)
    return (
      <ul>
        {todoList.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    )
  }

./features/todo/model.ts
  import { createEvent, createStore, restore, sample } from 'effector'
  import { Todo } from './types'
  
  export const newTodoTextChanged = createEvent<string>()
  export const $newTodoText = restore(newTodoTextChanged, '')
  
  export const todoCreated = createEvent()
  
  export const $todoList = createStore<Todo[]>([])
  
  const $nextTodoId = createStore(0);
  
  const todoCreationConfirmed = sample({
    clock: todoCreated,
    source: { title: $newTodoText, id: $nextTodoId },
  })
  
  $todoList.on(todoCreationConfirmed, (prev, { title, id }) => [
    ...prev,
    { title, isDone: false, id },
  ])
  $newTodoText.reset(todoCreationConfirmed)
  $nextTodoId.on(todoCreationConfirmed, (prev) => prev + 1)
  
  export const todoCompleted = createEvent<number>()
  $todoList.on(todoCompleted, (prev, id) => prev.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      isDone: !todo.isDone,
    }
  }))
  
  export const todoRemoved = createEvent<number>()
  $todoList.on(todoRemoved, (prev, id) => prev.filter((todo) => todo.id !== id ))

./features/todo/types.ts
  export type Todo = {
    title: string
    isDone: boolean
    id: number
  }

./features/todo/index.ts
  export { CreateTodoForm, TodoList } from './molecules';
```