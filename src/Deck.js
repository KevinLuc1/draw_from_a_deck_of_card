import React, { Component } from 'react';
import axios from 'axios'
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
		let cardURL = `${base_API_URL}/${deckID}/draw/`;
		let cardReponse = await axios.get(cardURL);
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
	}

	render(){
		return (
			<div>
				<h1> Card Dealer </h1>
				<button onClick={this.getCard}> Get Card! </button>
			</div>
		)
	}




}

export default Deck;