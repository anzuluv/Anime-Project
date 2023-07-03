import React from 'react';

const Input = (props) => (
    <input
    className= "shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
        type="text"
        placeholder={props.placeholder}
        onChange = {props.onChange}
        onClick= {props.onClick}
        data-list = {props.data_list}
        value={props.value}
    />
);

export default Input;