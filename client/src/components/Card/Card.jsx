import React from 'react'
import './Card.css'
import {truncate} from 'lodash'
import { useNavigate } from 'react-router-dom'
import { FaRegCopyright } from "react-icons/fa";
// import Heart from '../Heart'
const Card = ({card}) => {
  const navigate = useNavigate();
  return (
    <div className="flexColStart r-card" onClick={()=>navigate(`../my_estates/${card.id}`)}>
                <img src={card.image} alt="home" />
                
                {/* <Heart id={card?.id}/> */}
                <FaRegCopyright />

                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{truncate(card.title, {length:15})}</span>
                <span className="secondaryText">{truncate(card.description, {length:80})}</span>
              </div>
  )
}

export default Card
