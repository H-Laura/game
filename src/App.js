import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import "./styles.css";
let colors = [
  "chocolate",
  "black",
  "red",
  "yellow",
  "crimson",
  "green",
  "purple",
  "blue",
  "chocolate",
  "black",
  "red",
  "yellow",
  "crimson",
  "green",
  "purple",
  "blue"
];
let checkColor = [];
let victoryMessage = [];
let win;
let timeoutHandler;
function App() {
  const [isTime, setIsTime] = useState(false);
  const [state, setState] = useState([
    {
      id: 1,
      clicked: false,
      color: ""
    },
    {
      id: 2,
      clicked: false,
      color: ""
    },
    {
      id: 3,
      clicked: false,
      color: ""
    },
    {
      id: 4,
      clicked: false,
      color: ""
    },
    {
      id: 5,
      clicked: false,
      color: ""
    },
    {
      id: 6,
      clicked: false,
      color: ""
    },
    {
      id: 7,
      clicked: false,
      color: ""
    },
    {
      id: 8,
      clicked: false,
      color: ""
    },
    {
      id: 9,
      clicked: false,
      color: ""
    },
    {
      id: 10,
      clicked: false,
      color: ""
    },
    {
      id: 11,
      clicked: false,
      color: ""
    },
    {
      id: 12,
      clicked: false,
      color: ""
    },
    {
      id: 13,
      clicked: false,
      color: ""
    },
    {
      id: 14,
      clicked: false,
      color: ""
    },
    {
      id: 15,
      clicked: false,
      color: ""
    },
    {
      id: 16,
      clicked: false,
      color: ""
    }
  ]);
  const [time, setTime] = useState(0);
  useEffect(() => {
    colors.sort(function() {
      return 0.5 - Math.random();
    });
  }, []);
  useEffect(() => {
    if (
      checkColor.length === 4 &&
      checkColor[0].color === checkColor[2].color
    ) {
      victoryMessage.push(checkColor[0], checkColor[2]);
      checkColor.splice(0, 4);
    } else if (
      checkColor.length === 4 &&
      checkColor[0].color !== checkColor[2].color
    ) {
      state[checkColor[1]].clicked = false;
      setState([...state]);
      checkColor.splice(0, 2);
    }
  });
  useEffect(() => {
    if (isTime) {
      timeoutHandler = setTimeout(() => {
        setTime(time + 37);
      }, 37);
    }
    return () => {
      clearTimeout(timeoutHandler);
    };
  });
  useEffect(() => {
    if (victoryMessage.length === 16) {
      win = setTimeout(() => {
        setIsTime(false);
        alert("You win");
      }, 1000);
    }
    return () => {
      clearTimeout(win);
    };
  }, [victoryMessage.length]);
  const convert = ms => {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return minutes + ":" + seconds + ":" + milliseconds;
  };
  return (
    <div className="cards-container">
      {state.map((card, index) => (
        <div className="card" key={card.id}>
          <div
            style={
              state[index].clicked === true
                ? { transform: "rotateY(180deg)" }
                : {}
            }
            onClick={() => {
              state[index].clicked = true;
              state[index].color = colors[index];
              setState([...state]);
              checkColor.push(card, index);
              setIsTime(true);
            }}
            className="front"
          >
            Click me
          </div>
          <div
            style={
              state[index].clicked === true
                ? {
                    transform: "rotateY(0deg)",
                    backgroundColor: `${colors[index]}`
                  }
                : {}
            }
            className="back"
          />
        </div>
      ))}
      <h1 className="clock">{convert(time)}</h1>
    </div>
  );
}

export default App