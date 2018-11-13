import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import AddItemButton from '../add-item-button';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import './app.css';


export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.maxId++
        };
    }

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
        const newItem = this.createTodoItem(text);
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

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex(el => el.id === id);

        const newItem = {
            ...arr[idx],
            [propName]: !arr[idx][propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx +1)
        ];
    }

    onToggleImportant = (id) => {
        console.log('Toggle Important: ', id);

        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {
        console.log('Toggle Done: ', id);

        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onSearchForm = (text) => {
        this.setState({
            term: text
        })
    };

    search(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }

    onFilterButton = (filter) => {
        this.setState({filter})
    };

    statusFilter(items, filter) {

        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter(el => !el.done);
            case 'done':
                return items.filter(el => el.done);
            default:
                return items;
        }

    }

    render() {

        const {todoData, term, filter} = this.state;

        const visibleItems = this.search(todoData, term);

        const todoCount = todoData.filter((el) => el.done).length;
        const doneCount = todoData.length - todoCount;

        const filteredItems = this.statusFilter(visibleItems, filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchForm={this.onSearchForm} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterButton={this.onFilterButton} />
                </div>
                <TodoList
                    todos={ filteredItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <AddItemButton onItemAdded={ this.addItem }/>
            </div>
        );
    }
}