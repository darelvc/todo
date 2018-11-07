import React, { Component } from 'react';

import './todo-list-item.css';


export default class TodoListItem extends Component {

    // state = {
    //   done: false,
    //   important: false
    // };
    //
    // onLabelClick = () => {
    //     this.setState(({ done }) => {
    //         return {
    //             done: !done
    //         }
    //     })
    // };
    //
    // onMarkImportant = () => {
    //     this.setState((state) => {
    //         return {
    //             important: !state.important
    //         }
    //     })
    // };

    render() {

        const { label, onDeleted, onToggleDone, onToggleImportant, done, important } = this.props;
        // const { done, important } = this.state;

        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        // const listStyle = {
        //     color: important ? 'tomato' : 'black'
        // };

        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    // style={listStyle}
                    onClick={ onToggleDone }>
                    { label }
                </span>

                <button
                    type="button"
                    onClick={onToggleImportant}
                    className="btn btn-outline-success btn-sm float-right">
                    <i className="fa fa-exclamation">
                    </i>
                </button>

                <button
                    type="button"
                    onClick={onDeleted}
                    className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o">
                    </i>
                </button>
            </span>
        );
    }

}