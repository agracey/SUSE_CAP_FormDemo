import React, {Component} from 'react'

import styled from 'styled-components'

const PictureFrame = styled.div`
  width: min-content;
  border: 2px black inset;
  margin: auto;
  margin-top: 16px;

`

const Image = styled.img`
  height: 288px;
`


export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {current:0, imgList:['/images/sample.png']};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.gotoNext(),
      5000
    )

    fetch('/images/list.json')
      .then((r)=>(r.json()))
      .then(((data)=>{
        this.setState({imgList: data.imageList})
      }).bind(this))
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  gotoNext() {
    this.setState({
      current: ((this.state.current+1) % this.state.imgList.length)
    });
  }

  render() {
    return (
      <PictureFrame>
        {this.renderCurrentPicture()}
      </PictureFrame>)
  }

  renderCurrentPicture() {
    return <Image src={ "/images/"+this.state.imgList[this.state.current].src } />
  }
}