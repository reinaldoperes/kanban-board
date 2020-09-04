import React, { useEffect, useState } from 'react';
import data from "./data.json";
import fundo from '../../assets/img/fundo.jpg';
import '../../assets/css/board.css';

import Board from 'react-trello';

export default function Kanban() {
    const [target, setTarget] = useState(false);

    //#region 
        const styleBoard = {
            backgroundImage: "url(" + fundo + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        };
    //#endregion

    //#region Efeito de grab no scroll (ainda incompleto)
    useEffect(() => {
        document.addEventListener('click', function (e) {
            e = e || window.event;
            if (e.target.classList.contains('smooth-dnd-container')){
                setTarget(true);
            }
            else setTarget(false);
          }, false);            
    }, []);

    useEffect(() => {
        const slider = document.querySelector('.react-trello-board');

        slider.classList.add('cursor-grab');
        slider.classList.add('no-scroll');

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            if (target){
                isDown = true;
                slider.classList.add('active');
                slider.classList.remove('cursor-grab');
                slider.classList.add('cursor-grabbing');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            }            
        });
        slider.addEventListener('mouseleave', () => {
            if (target){
                isDown = false;
                slider.classList.remove('active');
            }
        });
        slider.addEventListener('mouseup', () => {
            if (target){
                isDown = false;
                slider.classList.remove('active');
                slider.classList.remove('cursor-grabbing');
                slider.classList.add('cursor-grab');
            }
        });
        slider.addEventListener('mousemove', (e) => {
            if (target){
                if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - slider.offsetLeft;
                    const walk = (x - startX) * 1; //scroll-fast
                    slider.scrollLeft = scrollLeft - walk;
            }
        });
    }, [target]);
    //#endregion

    //#region Métodos do kanban-board
    const onCardDelete = (cardId, laneId) => {
        console.log(cardId)
    };

    const onCardAdd = (cardId, laneId) => {
        console.log(cardId)
    };

    const onCardClick = (cardId, laneId) => {
        console.log(cardId)
    };
    
    const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
        console.log(cardId)
    };

    const onLaneAdd = (params) => {
        console.log(params)
    };
    
    const onLaneDelete = (laneId) => {
        console.log(laneId)
    };

    const onLaneUpdate = (laneId, data) => {
        console.log(laneId)
    };
    //#endregion

    return (
        <div>
            <Board 
                data={data}
                style={styleBoard}
                draggable
                collapsibleLanes
                editable
                editLaneTitle
                canAddLanes
                onCardDelete={onCardDelete}
                onCardAdd={onCardAdd}
                onCardClick={onCardClick}
                onCardMoveAcrossLanes={onCardMoveAcrossLanes}
                onLaneAdd={onLaneAdd}
                onLaneDelete={onLaneDelete}
                onLaneUpdate={onLaneUpdate}
            />
        </div>
    )
}


