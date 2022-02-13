import React, { Component, useState } from 'react';
import '../css/board.css'
import Land from './Land';

class Board extends Component {
    constructor(props) {
        // Easy: 0, Medium: 1, Hard: 2
        const GameLevel = [0,1,2];
        super(props);
        // this.board = React.createRef();
        this.state = {
            curGameLevel: 0,
            landVerticalLength: 100,
            rerender: 0,
        };
    }

    // Todo: Level set form
    componentDidMount = (e) => {
        var a = document.getElementsByClassName('zxc');
        
        document.oncontextmenu = (e) => {
            return false;
        }
    }

    rightClickRm = (e) => {
        console.log('test');
    }

    setLandVerticalLength = (data) => {

        if(data=='354px')
        data='380px'

        if (data !== this.state.landVerticalLength) 
        {
            console.log('landVerticalLength '+data);
            this.setState({
                landVerticalLength: data,
            })
        } else {
        }

        var wrapperSelect = document.getElementById('wrapperSelect');
        console.log('wrapperSelect '+data);
        wrapperSelect.style.width = data;
       
        var title = document.getElementById('title');
        title.style.width = data;

    }

    gameOptionSet = (data) => {
        
        // } else {
        //     console.log('Not change vertical');
        // }
    }

    

    // onRecv = (data) => {
    //     if (data !== this.state.landVerticalLength) {
    //         console.log('Change vertical');
    //         this.setState({
    //             landVerticalLength: data,
    //         })
    //     }
    // }
    
    render() {
        console.log('Board rendering!');
        const styles = {
            fontSize: '10pt',
        }
        const styles2 = {
            fontSize: 9,
        }
        return (
            <>  
            
            <h1 id='title'>Minesweeper</h1>
                <Land curGameLevel={this.state.curGameLevel} setLandVerticalLength={this.setLandVerticalLength}/>
                {/* <div id="timeBoard">asdasd</div> */}
            </>
        );
    }
}

export default Board;