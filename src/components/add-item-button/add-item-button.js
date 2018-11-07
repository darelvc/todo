import React, {Component} from 'react';

import './add-item-button.css';


export default class AddItemButton extends Component {

    render() {
        const { onItemAdded } = this.props;

        return(
            <div className="add-item-button">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => onItemAdded('Hello world') }>
                    Add Item
                </button>
            </div>
        )
    }
};


