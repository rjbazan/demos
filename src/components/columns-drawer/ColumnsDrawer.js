import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Drawer } from 's1-ui'
import Card from './Column'


const style = {
	width: 400,
}

class ColumnsDrawer extends Component {
	constructor(props) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
		this.state = {
			cards: [...props.columns]
		}
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state
		const dragCard = cards[dragIndex]

		this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
	}

	render() {
		const { cards } = this.state

		return (
			<Drawer open={ this.props.open }>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						index={i}
						id={card.id}
						text={card.text}
						moveCard={this.moveCard}
					/>
				))}
			</Drawer>
		)
	}
}

export default DragDropContext(HTML5Backend)(ColumnsDrawer);

