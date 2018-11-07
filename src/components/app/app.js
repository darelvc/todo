import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import AddItemButton from '../add-item-button';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import './app.css'


export default class App extends Component {

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ]
    };

    maxId = this.state.todoData.length + 1;

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(el => el.id === id);
            // todoData.splice(idx, 1);

            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx +1);

            return {
                todoData: [...before, ...after]
            }
        })
    };

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        console.log(newItem);

        this.setState(({ todoData }) => {
            return {
                todoData: [
                    ...todoData,
                    newItem
                ]
            };
        })

    };

    onToggleImportant = (id) => {
        console.log('Toggle Important: ', id);
    };

    onToggleDone = (id) => {
        console.log('Toggle Done: ', id);
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos={ this.state.todoData }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <AddItemButton onItemAdded={ this.addItem }/>
            </div>
        );
    }
}