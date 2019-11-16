import React, { Component } from 'react';
import Card from "./Card"
import axios from 'axios'
import "./Deck.css"
const base_API_URL = 'https://deckofcardsapi.com/api/deck'

class Deck extends Component {
	constructor(props){
		super(props);
		this.state = {
			deck: null,
			drawnCard: []
		}
		this.getCard = this.getCard.bind(this)
	}

	async componentDidMount(){
		let deck = await axios.get(`${base_API_URL}/new/shuffle/`);
		this.setState({ deck:deck.data })
	}

	async getCard(){
		//make request deck api
		let deckID = this.state.deck.deck_id;
		//try block to detect whwn 52 cards are used up
		try {
			let cardURL = `${base_API_URL}/${deckID}/draw/`;
			let cardReponse = await axios.get(cardURL);
			if (!cardReponse.data.success) {
				throw new Error ("No Cards Remaining")
			}
			console.log(cardReponse.data)

			let card = cardReponse.data.cards[0];
			//set state using new card info from api
			this.setState(st => ({
				drawnCard: [
					...st.drawnCard, 
					{
						id:card.code, 
						image:card.image, 
						altAttr: `${card.value} of ${card.suit}`
					}
				]
			}))
		} catch(error) {
			alert(error)
		}

	}

	render(){
		const cards = this.state.drawnCard.map(card => (
			<Card key={card.id} name={card.altAttr} image={card.image}/>
		))
		return (
			<div>
				<h1> Card Dealer </h1>
				<button onClick={this.getCard}> Get Card! </button>
				<div className="Deck-card"> {cards} </div>
			</div>
		)
	}




}

export default Deck;