import React from 'react';
import {move,genrate_random_empty_pos,is_full,matches_available,calc_score} from './move';
function Tile(props){
    if (props.value!==0)
    return (
        <span className="tile">
            {props.value}
        </span>
    );
    else
    return(
        <span className="empty">
            .
        </span>
    );
}

export class Board extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            grid:[
                [2,4,0,2],
                [0,0,2,0],
                [2,0,4,0],
                [2,8,0,0]],
            game_over:false,
            score:0
        }
    }
    
    handleChange =(event)=>{
        event.preventDefault();
        if(this.state.game_over)
            return ;
        let grid=this.state.grid;
        let key=event.keyCode;
        let s="";
        let game_over=false;
        if(key===38||key===40||key===37||key===39){
            switch (key) {
                case 38:
                    s="UP"
                    break;
                case 40:
                    s="DW"
                    break;
                case 37:
                    s="LT"
                    break;
                case 39:
                    s="RT"
                    break;
                    default:
                        break;
                    }
                    let new_grid=move(grid,s);
                    if(is_full(new_grid) && matches_available(new_grid))
                        game_over=true;     
                    if(!game_over && !is_full(new_grid)){
                        let pos=genrate_random_empty_pos(new_grid,s);
                        new_grid[pos.i][pos.j]=2;
                    }
                    let score_arr=[2,4,6,8];
                    let score=this.state.score+score_arr[Math.floor( Math.random()*score_arr.length )];
                    this.setState({grid:new_grid,game_over,score});
        }
    }
    render(){
        if(!this.state.game_over)
        return(
            <div>
                <div className="score">
                <div className="score1"><h2>score<br/>{this.state.score}</h2></div>
                <div className="score2"><h2>highscore <br/>2260</h2></div>
                </div>
                <div className="board" onKeyDown={this.handleChange} tabIndex="0">
                {//box section
                    this.state.grid.map((list, i)=>{
                        return (
                            <div key={i}>
                                { list.map((item,j)=>{
                                    return(<Tile value={this.state.grid[i][j]} key={j}/>)
                                }) }
                            </div>
                        )                                
                        })
                }        
                </div>
            </div>
        );
        else
        return(
            <div>
                <h1>Game Over</h1>
                <h2>score{this.state.score}</h2>
            </div>
        );
    }
}









