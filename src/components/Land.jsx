import { Component, useState } from 'react';
// import cell from './cell';
import Cell from './Cell';

import '../css/land.css'


// Todo: cell align
class Land extends Component {
    
    static a = ['asd', 'zxc'];
    
    constructor(props) {
        super(props);
        
        // Add modeCategory state
        
        this.state = {
            // count: '20',
            cellsId: [], // Todo: Auto set cells by level
            curGameLevel: 0,
            totalMineCount: 0,
            mineCountCategory: [10,40,99],
            initCell: '',
            isGenerateMine: false,
            landSize: '',
            landSizeCategory: [9*9, 16*16, 30*30],
            lineLengthCategory: [9, 16, 30],
            lineLength:'',
            horizontalLengthCategory: [9, 16, 30],
            horizontalLength:'',
            verticalLengthCategory:[9, 16, 30],
            verticalLength: '',
            cellTypeArray: [],
            defaultCellSize: 20 + 1 + 1,    // 20px + 1px(border) + 1px(border)
            sideWidth: 2,                   // 1px(side px) + 1px(another side px)
        }
    }

    // 게임 시작시 세팅
    f_init_game_setting = () => {

        this.setState((props) => {
            return {
            curGameLevel: props.curGameLevel, //게임 레벨 선택시 레벨 세팅
            totalMineCount: this.state.mineCountCategory[props.curGameLevel], //게임 레벨 세팅시 지뢰 개수 세팅
            landSize: this.state.landSizeCategory[props.curGameLevel], //게임 레벨 세팅시 land 크기 설정
            lineLength: this.state.lineLengthCategory[props.curGameLevel], //게임 레벨 세팅시 land 길이 설정

            horizontalLength: this.state.horizontalLengthCategory[props.curGameLevel], // 게일 레벨에 따라 가로 사이즈 설정
            verticalLength: this.state.verticalLengthCategory[props.curGameLevel], // 게임 레벨에 따라 세로 사이즈 설정
            cellsId: [...Array(this.state.landSizeCategory[props.curGameLevel]).keys()], //게임 레벨에 따라 배열길이 설정 그리고 키 값 설정
            
            };
        })
    }

    f_drawLand = () => { //land 그리기

        var land = document.getElementsByClassName('land')[0]; //land 클래스가 갖고 있는 모든 값들을 가져온다.[0]으로 첫번째만
        const defaultCellSize  = this.state.defaultCellSize;
        const horizontalLength = this.state.horizontalLengthCategory[this.state.curGameLevel]; //가로
        const verticalLength   = this.state.verticalLengthCategory[this.state.curGameLevel]; //세로
        const sideWidth      = this.state.sideWidth;
        
        // During rendering, auto set landsize
        land.style.width  = defaultCellSize * horizontalLength+2 + sideWidth +'px';
        land.style.height = defaultCellSize * verticalLength+2 + sideWidth + 'px';

        // Send data to Board component
        this.props.setLandVerticalLength(land.style.width);
        
    }

    // shouldComponentUpdate = (prevProps, prevState) => {
    //     return this.props.curGameLevel !== prevProps.curGameLevel;
    //     // return true;
    // }



    // Game over
    f_checkGameOver = (e) => {
        console.log(e);
    }


    // Todo: Auto landSize set by game level // Done
    // Todo: Generate entire cell array
    // f_gernerate_mine = (e) => {
    //     if(this.state.isGenerateMine)
    //     return 0; 

    //     const landSize = this.state.landSize;
    //     const totalMineCount = this.state.totalMineCount;
    //     const cells = new Array(landSize);

    //     let leftMineCount = totalMineCount;
    //     let leftCells = landSize;
    //     console.log('Generate : '+landSize);
    //     console.log('Generate : '+landSize);
    //     var random = 0;
    //     var standNum = 0;
    //     var maxSize = 10; // state
    //     var count = 0;
    // }
     

    //지뢰생성
    f_generateMine = (e) => {
        console.log('버튼눌림');
        if(this.state.isGenerateMine) //초기에 isGenerateMine = fales
            return;
        // this.props.onClick(); //클릭 이벤트 발생
        const landSize = this.state.landSize; //크기값 저장
        const totalMineCount = this.state.totalMineCount; // 총 지뢰갯수
        const horizontalLength = this.state.horizontalLength; //가로 길이
        const cells = new Array(landSize); //전체 셀 갯수를 배열로 저장
        var leftMineCount = totalMineCount; //총 지뢰 갯수를 전달
        var leftCells = landSize; //총 셀을 전달
        
        console.log('leftMineCount : '+leftMineCount);
        console.log('leftCells : '+leftCells);
        console.log('Generate : '+landSize);

        //const test = ['asd', 'zxc', 'qwe']
        // Probability
        // Todo: Complete array gen
        var random = 0;
        var standNum = 0;
        var maxSize = 10; // state
        var count = 0;

        for (var i = 0; i < landSize; i++) { //총 셀 수만큼 반복

            standNum = leftMineCount/leftCells;
            random = Math.random(99);

            // Print ratio
            // console.log(`index: ${i+1}, left cell: ${leftCells}, left mine: ${leftMineCount}`)
            // console.log('Mine Probability : ' + (standNum*100).toFixed(1) +'%');
            // console.log('');

            // 
            if (standNum === 0) {
                cells.fill(0, i);
                break;
            }

            if (random <= standNum) {   // Mine
                cells[i] = 'mine';
                leftCells--;
                leftMineCount--;
            } else {                    // Not mine
                cells[i] = 0;
                // cells.push('0');
                leftCells--;
            } 
        }
        console.log(cells);


        // this.setState({
        //     cellTypeArray: cells,
        //     isGenerateMine: true,
        // })
    }


    f_generatecells = (e) => {
        const cells = this.state.cellTypeArray;
        const verticalLength = this.state.verticalLength;
        const horizontalLength = this.state.horizontalLength;

        const firstcell = cells[0];
    }

    f_resetGame = () => {
        const selectedLevelOption = document.getElementById('startSelect').options[document.getElementById('startSelect').selectedIndex].value;
        this.setState({
            curGameLevel: selectedLevelOption,
            isGenerateMine: false,
        })
    }
    
    f_btnClickedStart = (e) => {
        this.f_resetGame();
        this.f_init_game_setting();
    }

    componentDidMount = () => {
        this.f_init_game_setting();
    }

    componentWillUnmount = () => {
    }

    componentDidUpdate = () => {
        this.f_drawLand();
    }
    
    render() {
        
        const horizontalLength = this.state.horizontalLength; 
        console.log('horizontalLength '+horizontalLength);
        const landSize = this.state.landSize;
        console.log('landSize '+landSize);
        

        return (
            <>
                <div className='land' id='land'>
                    {this.state.cellsId.map((value, index) => {
                            // console.log('index : '+(landSize - lineLength));
                            return (
                                // <div key={index} className='wcell_jh' id={index} onClick={this.f_generateMine}>
                                    <div className='wcell_jh' id={index}  onClick={this.f_generateMine}>
                                    {/* <Cell id={value} func={this.checkGameOver} onClick={this.f_generateMine} cellType={this.state.cellTypeArray[index]}/> */}
                                    <Cell cellId={index} id={value}/>
                                </div>
                            )
                        }
                    )}
                    
                </div>
                <div className='level_choice'>levelchoice</div>
                

                <div id="wrapperSelect">
                    <select className='select-level' id="startSelect" >
                        <option value="0">Easy</option>
                        <option value="1">Normal</option>
                        <option value="2">Hard</option>
                    </select>
                    <button className='button-start' onClick={this.f_btnClickedStart}>Start game</button>
                    {/* <button onClick={this.gameOptionSet}>Game start</button> */}
                </div>
            </>
        )
        // return (
        // <>
            
        // </ >
        // );
    }
}

export default Land;