import React from 'react';

class Lamp extends React.Component {

    clickHdl() {
        let styleSheet = document.styleSheets[0];
        let animationName = "han";
        let keyframes =
            `@-webkit-keyframes ${animationName} {
         0%   {background-color:red; left:0px; top:0px;}
        20%  {background-color:yellow; left:100px; top:50px;width:50px;height:50px}
        40%  {background-color:blue; left:50px; top:170px;width:5px;height:5px}
        60%  {background-color:pink; left:-50px; top:170px;width:50px;height:50px}
        80%  {background-color:green; left:-100px; top:50px;width:75px;height:75px}
        100% {background-color:orange; left:0px; top:0px;}
    }`;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

        this.setState({
            animationName: animationName
        });
    }

    componentDidMount (){
        this.clickHdl();
    }

    render() {
        const style={
            width: '100px',
            height: '100px',
            backgroundColor: this.props.color,
            opacity: this.props.lit ? 1 : 0.1,
            borderRadius: '50px',
            animationName: "han",
            animationTimingFunction: 'ease-in-out',
            animationDuration: '10s',
            animationDelay: '0.0s',
            animationIterationCount: 2,
            animationDirection: this.props.lit ? "alternate" : '',
            position: "relative"


        };
        return <div style={style}></div>
    }
}

export default Lamp