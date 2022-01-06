import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
    console.log(this.state)
    console.log(this)
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      this.setState({ activeItem: { ...this.state.activeItem, [name]: name} });
    }
    this.setState({ activeItem: { ...this.state.activeItem, [name]: value} });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle} className="container">
        <ModalHeader toggle={toggle}>Tool Name</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="tool-name">Tool Name</Label>
              <Input
                type="text"
                id="tool-name"
                name="toolName"
                value={this.state.activeItem.toolName}
                onChange={this.handleChange}
                placeholder="Enter Tool Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="tool-brand">Tool Brand</Label>
              <Input
                type="text"
                id="tool-brand"
                name="toolBrand"
                value={this.state.activeItem.toolBrand}
                onChange={this.handleChange}
                placeholder="Enter Tool Brand"
              />
            </FormGroup>
            <FormGroup>
              <Label for="tool-model">Tool Model</Label>
              <Input
                type="text"
                id="tool-model"
                name="toolModel"
                value={this.state.activeItem.toolModel}
                onChange={this.handleChange}
                placeholder="Enter Tool Model"
              />
            </FormGroup>
            <FormGroup>
              <Label for="tool-description">Description</Label>
              <Input
                type="text"
                id="tool-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Tool description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="toolCondition"
                  checked={this.state.activeItem.toolCondition}
                  onChange={this.handleChange}
                />
                New
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="toolCondition"
                  checked={this.state.activeItem.toolCondition}
                  onChange={this.handleChange}
                />
                Used
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
