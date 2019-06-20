import React, {useState} from 'react'
import PageComponent from '../presentational/PageComponent'
import {GridSection} from '../presentational/Grid'
import styled from 'styled-components'

import samples from './samples.js'

import Modal from '../presentational/Modal'


import gql from "graphql-tag";
import { Mutation } from "react-apollo"

const ContactSection = styled(GridSection)`
  font-size: 32px;
  font-weight: bolder;
  text-align: center;
  color: ${props => props.theme.colors.mono.white };
  background-color: transparent;

  & > h4 {
    color: ${props => props.theme.colors.secondary.darkGreen };
  }

`

const ContactForm = styled.form`

  & > * {
    float: left;
    width: 100%;
  }

  padding: 8px;
`

const Group = styled.div.attrs({className:'form-group'})`
  width: 50%;
  padding-right: 8px;
`

const Label = styled.label.attrs({className:''})`
  text-align: left;
  padding-top: 12px;
  padding-bottom: 2px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
`

const Input = styled.input.attrs({className:'form-control'})`
  text-align: left;
`

const TextArea = styled.textarea.attrs({className:'form-control'})`
text-align: left;

`
const Submit = styled.button.attrs({className:'btn btn-primary'})`
width: 25%;
margin: 8px;
float: right;
margin-right: 16px;
border-radius: 4px;
background-color: ${props => props.theme.colors.secondary.darkGreen};
border-color: ${props => props.theme.colors.secondary.darkGreen};
&:hover {
  background-color: ${props => props.theme.colors.secondary.lightGreen};
  border-color: ${props => props.theme.colors.secondary.lightGreen};
}
`

const Prepared = styled.input.attrs({className:'btn btn-primary'})`
float: left;
border-radius: 0px;
width: 128px;
margin-right: 16px;
background-color: ${props => props.theme.colors.secondary.blueGreen};
border-color: ${props => props.theme.colors.secondary.blueGreen};
&:hover {
  background-color: ${props => props.theme.colors.secondary.darkGreen};
  border-color: ${props => props.theme.colors.secondary.darkGreen};
}
`


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Contact extends PageComponent {

  constructor(props) {
    super(props);
    this.state = {
      text:'',
      name:'Some Random Person',
      email:'susetmdemo@gmail.com',
      submitted:false,
      modalIsOpen: false
    }
  }

  setter(name) {
    return (function(event){
      const obj = {}
      obj[name] = event.target.value
      this.setState(obj)
      return false
    }).bind(this)
  }

  handleSubmit() {
    if(this.state.submitted) return
    this.setState({submitted: true, modalIsOpen:true})

    const variables = {form:{
      name: this.state.name,
      email: this.state.email,
      answers: [{
        key:'Feedback',
        value:this.state.text
      }]
    }}

    this.props.submitForm({variables})
  }

  buildContentTemplate() {
    return [
      "form form form"
    ]
  }

  renderContent() {
    return (
      <>
        <ContactSection name="form">

          <h3>
            Please contact us using the form below. 
          </h3>
          <h4>
            We appreciate any and all feedback! 
          </h4>
          {this.renderForm()}
          {this.renderModal()}
        </ContactSection>
      </>
    )
  }

  renderForm() {
    return (
      <ContactForm>
            <Group>
              <Label htmlFor="name">Email</Label>
              <Input type="email" value={this.state.email} 
                onChange={this.setter('email')}
                placeholder="blah@example.com" required />
            </Group>

            <Group>
              <Label htmlFor="name">Name</Label>
              <Input type="text" value={this.state.name} 
                onChange={this.setter('name')}
                placeholder="Name" 
              />
            </Group>

            {this.renderPrepared()}

            <Label htmlFor="comments">Comments</Label>
            <TextArea 
              value={this.state.text} 
              onChange={this.setter('text')}
              placeholder="Your comments here"
              rows={7}
            />
            {this.renderSubmit()}
          </ContactForm>
    )
  }

  renderPrepared() {
    const buttons = samples.map(({value, name}, idx)=>(
      <Prepared type="button"
        onClick={this.setter('text').bind(this, {target:{value}} ) }
        placeholder="Name" 
        value={name}
        key={'prepared'+idx}
      />
    ))


    return (

    <Group>
      <Label htmlFor="name">Prepared:</Label>
      
      {buttons}
    </Group>
    )
  }

  renderSubmit() {
    return (
      <Submit 
        onClick={this.handleSubmit.bind(this)}
        disabled={this.state.submitted}
      >
        Submit
      </Submit>
    )
  }


  closeModal() {
    this.setState({
      modalIsOpen: false, 
      submitted:false,
      email:'',
      name:'',
      text:''
    });
  }

  renderModal() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Feedback Recieved"
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>Thank you for your feedback!</h2>
        <div>
          On submitting this form:
            <ol>
              <li>The first service with an API recieves the data</li>
              <li>The data gets put into a queue with Amazon's Simple Query Service</li>
              <li>A second service accepts the work</li>
              <li>The answers get analyzed with Amazon Comprehend</li>
              <li>The scores generated get added into the data</li>
              <li>The combined data get emailed using Amazon Simple Email Service</li>
            </ol>
            Please check your email now.
        </div>
        <button onClick={this.closeModal.bind(this)}>Done!</button>
      </Modal>
    )
  }
}


const SUBMIT_FORM = gql`
  mutation submitForm($form: FormInput!) {
    submitForm(form: $form)
  }
`;


export default (props)=>(
  <Mutation mutation={SUBMIT_FORM}>
    { (submitForm) => (
      <Contact {...props} submitForm={submitForm}/>
    )}
  </Mutation>
)