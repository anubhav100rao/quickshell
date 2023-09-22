import React from 'react'
import TopCard from './TopCard'
import BottomCard from './BottomCard'
import '../App.css'
const OuterCard = ({title, tickets}) => {
  console.log(title);
  console.log(tickets);
  return (
    <div className='outer_card'>
        <TopCard className='inner'/>
        {tickets.map((ticket) => {
          console.log(ticket);
          return (
            <BottomCard className='inner'/>
          )
        })}
    </div>
  )
}

export default OuterCard