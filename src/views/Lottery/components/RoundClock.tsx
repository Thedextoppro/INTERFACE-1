import React, {useState, useEffect} from 'react';
import styled from "styled-components";

const ClockContainer = styled.div`
    .clock {
        position: relative;
    }
    
    .clock::after {
        content: '';
        background-image: url('/images/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        width: 11%;
        height: 11%;
        position: absolute;
        left: 48%;
        top: 45%;
        border-radius: 50%;
        filter: drop-shadow(0px 0px 6px #000);
    }
    
    .first-hand {
        background-image: url('/images/lottery/clock_key_head.png?v=5');
        background-size: contain;
        background-repeat: no-repeat;
        width: 11%;
        height: 100%;
        position: absolute;
        left: 45%;
        top: 50%;
        transform-origin: top center;
    }
    
    .second-hand {
        background-image: url('/images/lottery/clock_key_body.png?v=5');
        background-size: contain;
        background-repeat: no-repeat;
        width: 11%;
        height: 100%;
        position: absolute;
        left: 45%;
        top: 50%;
        transform-origin: top center;
    }
`;

const RoundClock = ({nextEventTime}) => {
    const [hoursLeft, setHoursLeft] = useState(0);
     
    // Calculate hours left until the next event and update state every second.
    useEffect(() => {
      let interval; 
      
      if (typeof nextEventTime === 'number'){
        const calculateAndSetRemainingHours = () => {
          const currentUnixTimestampInSeconds = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds.
          let remainingSecondsUntilNextEvent =  nextEventTime - currentUnixTimestampInSeconds;  
          if (remainingSecondsUntilNextEvent > 0) {
            const hoursLeft = remainingSecondsUntilNextEvent / 3600; // Convert the seconds to hours.
            setHoursLeft(hoursLeft);
          }
          else {
            clearInterval(interval);
          }
        };
          
        calculateAndSetRemainingHours();
        interval = setInterval(() => { 
          calculateAndSetRemainingHours() 
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [nextEventTime]);

  const position = -hoursLeft * 15;
  const first = position;
  const second = position + 180;
     
  return(
    <>
      <ClockContainer>
        <div className="play-details">
          <div className="analong-clock-container">
            <div className="clock">
              <img src="/images/lottery/clock_background.png?v=5" alt=""/>
              <div 
                className="first-hand" 
                style = {{transform: 'rotate('+ first +'deg)'}}/> 
              <div 
                className="second-hand" 
                style = {{transform: 'rotate('+ second +'deg)'}}/> 
            </div>
          </div>
        </div>  
      </ClockContainer>       
    </>
  );
};

export default RoundClock;
