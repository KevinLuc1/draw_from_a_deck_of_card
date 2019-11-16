import React, { Component } from 'react';
import "./Card.css"

class Card extends Component {
	constructor(props){
		super(props);
		// transform: translate(10px, 20px) rotate(20deg);
		// moves the position of x and y pixels over with translate
		// rotates the element by x degrees with rotate
		let angle = Math.random() * 90 - 45;
		let xPosition = Math.random() * 40 - 20;
		let yPosition = Math.random() * 40 - 20;
		this._transform = `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg)`

	}

	render(){

		return(
			<img
				style={{transform: this._transform}}
				className="Card" 
				src={this.props.image} 
				alt={this.props.name}
			/>
		)
	}

}

export default Card