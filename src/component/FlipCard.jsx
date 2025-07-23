import styled, { keyframes } from "styled-components"
import { useState } from "react"


const FlipImageContainer = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transition: 0.5s;
  transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`

const FrontImage = styled.img`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
`

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`

export default function FlipCard({ front, back }){
  const [flipped, setFlipped] = useState(false)
  return(
    <div className="flex flex-col justify-center items-center ml-[20px]">
      <button onClick={() => setFlipped(prev => !prev)}
        className="w-1/3 flex justify-center items-center py-[5px] px-[10px] bg-white/90 rounded-[8px] shadow-[0_-2px_5px_rgba(0,0,0,0.05)]">
        뒤집기</button> 
      <FlipImageContainer flipped={flipped ? 'flip' : ''}>
        <FrontImage src={front}/>
        <BackImage src={back}/>
      </FlipImageContainer>
    </div> 
  )
}