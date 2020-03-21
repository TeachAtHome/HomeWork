import React, {Component} from 'react';

export default class Student extends Component {

    render() {
        return (
            <div>
                <p>{this.props.item.id}</p>
                <p>{this.props.item.name}</p>
            </div>
        );
    }
}
