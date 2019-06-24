import React, {Component} from 'react'

import styled from 'styled-components'

import Modal from '../presentational/Modal'


const Help = styled.div`
  position: absolute;
  right: 15px;
  top: 5px;

`
const customStyles = {
  content : {
    width: '50%',
    height: '50%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class HelpSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text:'',
      name:'',
      email:'',
      submitted:false,
      modalIsOpen: false
    }
  }

  render() {
    return (
      <Help>
        <span onClick={this.openModal.bind(this)}>(Help?)</span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel={this.props.title}
        >
          {this.props.content}
        </Modal>
      </Help>
    )
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
}