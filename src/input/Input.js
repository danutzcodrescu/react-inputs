import React, { Component } from 'react';
import specialChars, * as utils from '../utils/specialChars';

class Input extends Component {

	constructor (props) {
		super(props);
		const { template } = props;
		let inputValue = "";
		for (let i=0; i<template.length; i++) {
			if (specialChars.includes(template[i])) {
				inputValue += template[i];
			} else {
				inputValue += "_";
			}
		}
		this.state = { value: inputValue };
	}

	changeValue = (e) => {
		if ((e.ctrlKey || e.metaKey) && (e.keyCode===67 || e.keyCode===65)) return;
		if (e.keyCode!==9) {
			e.preventDefault();	
			if (e.target.selectionStart>=e.target.value.length && ![8, 37].includes(e.keyCode)) return;
			
			switch (e.keyCode) {
				case 8 :
					this.backspace(e);
					break;
				case 46 :
					this.delete(e);
					break;
				case 37:
					this.leftArrow(e);
					break;
				case 39:
					this.rightArrow(e);	
					break;	
				default:
					this.changeChar(e);		
			}
		}
		
	}

	changeChar(e) {
		const key = String.fromCharCode(e.keyCode >= 96 && e.keyCode <= 105 ? e.keyCode - 48 : e.keyCode);	
		const cursorPos = e.target.selectionStart;
		if (!utils.validateInput(this.props.template[cursorPos], key)) return;
		const newText = e.target.value.slice(0, cursorPos ) + key + e.target.value.slice(cursorPos+1);
		const elem = e.target;
		const index = this.cursorRight(elem, cursorPos);
		this.setState({
			...this.state,
			value: newText
		}, ()=> {
			elem.setSelectionRange(index, index);
		});
	}

	cursorRight(elem, cursorPos) {
		let index = cursorPos;
		let check = true;
		while (check) {
			if (specialChars.includes(elem.value[index+1])) {
				index++;
			} else {
				index++;
				check = false;
			}
		}

		return index;
	}

	cursorLeft(elem, cursorPos) {
		let index = cursorPos;
		let check = true;
		while (check) {
			if (specialChars.includes(elem.value[index-1])) {
				index--;
			} else {
				index--;
				check = false;
			}
		}
		return index;
	}

	backspace(e) {
		e.preventDefault();
		const cursorPos = e.target.selectionStart;
		const elem = e.target;
		const index = this.cursorLeft(elem, cursorPos);
		const newText = e.target.value.slice(0, index ) + "_" + e.target.value.slice(index+1);
		this.setState({
			...this.state,
			value: newText
		}, ()=> {
			elem.setSelectionRange(index, index);
		});
	}

	delete(e) {
		e.preventDefault();
		const cursorPos = e.target.selectionStart;
		let index = cursorPos;
		let check = true;
		while (check) {
			if (specialChars.includes(e.target.value[index])) {
				index++;
			} else {
				check = false;
			}
		}
		const newText = e.target.value.slice(0, index ) + "_" + e.target.value.slice(index+1);
		const elem = e.target;
		this.setState({
			...this.state,
			value: newText
		}, ()=> {
			elem.setSelectionRange(index, index);
		});
	}

	leftArrow(e) {
		const cursorPos = e.target.selectionStart;
		const index = this.cursorLeft(e.target, cursorPos);
		e.target.setSelectionRange(index, index);
	}

	rightArrow(e) {
		const cursorPos = e.target.selectionStart;
		const index = this.cursorRight(e.target, cursorPos);
		e.target.setSelectionRange(index+1, index+1);
	}

	render() {
		React.Children.forEach(this.props.children, child=>console.log(child.props.children.type ? child.props.children.type : child.type));
		return (
			<div>
				{this.props.children}
				<input value={this.state.value} onKeyDown={(e) => this.changeValue(e)} onChange={(e) => e}/>	
			</div>
		);
	}
}

export default Input;