import {RequestHandler} from 'express';
import {Todo} from '../models/todo';

const TODOS: Todo[] = [];

// POST request
export const createTodo : RequestHandler = (req, res , next) => {
    const text = (req.body as {text:string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({message: 'Created the todo.', createTodo: newTodo});
};

// GET request
export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS});
};

// PATCH request
export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as {text: string}).text;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Could not find todo!')
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
    res.json({message: 'Updated!', updateTodo: TODOS[todoIndex]});
};

// DELETE request
export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Could not find todo!')
    }

    TODOS.splice(todoIndex, 1);

    res.json({message: 'TODO deleted!'});
}