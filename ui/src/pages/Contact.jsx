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
  color: ${props => props.theme.colors.primary.light };
  background-color: ${props => props.theme.colors.primary.dark };

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
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
  text-indent: 16px;
  padding-top: 8px;
  padding-bottom: 2px;
  font-size: smaller;
  font-weight: normal;
  width: 100%;
`

const Input = styled.input.attrs({className:'form-control'})`
text-align: left;

`

const TextArea = styled.textarea.attrs({className:'form-control'})`
text-align: left;

`
const Button = styled.button.attrs({className:'btn btn-primary'})`
width: 25%;
margin: 8px;
margin-left: 16px;
`

const Prepared = styled.input.attrs({className:'btn btn-primary'})`
width: 25%;
margin: 8px;
margin-left: 16px;
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
      name:'Some Rando',
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
      <Button 
        onClick={this.handleSubmit.bind(this)}
        disabled={this.state.submitted}
      >
        Submit
      </Button>
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