import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
//在 React 组件的构造方法 constructor 当中，你可以通过 this.state 为该组件设置自身的状态数据。
//constructor(){
//	//constructor必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this 。????
//	super()
//	this.state={
//		value:null
//	}
//}
  
  render() {
    return (
      <button className="square" onClick={()=>this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
	

	
  renderSquare(i) {
  	//加小括号防止react自动在换行处添加分号
  	//console.log(this.props.squares[i])
    return (<Square 
			value={this.props.squares[i]}
			onClick={()=>{this.props.onClick(i)}}/>)
  }


  render() {  
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {/*此处用jsx语法，渲染按钮到border组件*/}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
  	super()
  	//顶层初始化数据
  	this.state = {
  		//history为对象数组，其中每个对象保存着每一步的状态，初始状态为9个null
  		history:[{squares:Array(9).fill(null)}],
  		//判断下一步棋由谁下
  		xIsNext:true,
  		//当前步数
  		stepNumber: 0,
  	}
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
  
  calculateWinner(squares){
	  const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	  ];
	  for(let i = 0 ; i < lines.length ; i++){
	  	//结构赋值，以便判断这三个位置的值是否相同
	  	const [a,b,c] = lines[i]
	  	//判断是否有人胜利
	  	if(squares[b] && squares[a] === squares[b] && squares[b] === squares[c]){
	  		return squares[b]
	  	}
	  }
	  return null
  }
    
  handleClick(val){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    const squares = current.squares.slice();
  	if(this.calculateWinner(squares) || squares[val]){
  		return
  	}
	squares[val] = this.state.xIsNext?'X':'O'
  	this.setState({
  		history: history.concat([{
	        squares: squares
	    }]),
	    stepNumber: history.length,
  		xIsNext:!this.state.xIsNext			
  	})
  } 
  
  
  
  render() {
  	const history = this.state.history.slice()
  	const current = history[this.state.stepNumber]
  	const Winner = this.calculateWinner(current.squares)
  	
  	const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
  	
  	let status
    if(Winner){
    	status = `Winner is ${Winner}`
    }else{
    	status = `Next player: ${this.state.xIsNext?'X':'O'}`
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
