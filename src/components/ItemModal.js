import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemAction';
import { useMutation } from 'urql';

function ItemModal(props) {
  const CreateTodo = /* GraphQL */ `
    mutation($data: TodoInput!) {
      createTodo(data: $data) {
        _id
        name
        completed
      }
    }
  `;

  const [modal, setModal] = useState(false);
  const [, createTodoItem] = useMutation(CreateTodo);

  const [name, setName] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    const newItem = {
      data: {
        name: name,
        completed: false,
      },
    };
    try {
      e.preventDefault();
      createTodoItem(newItem).then((result) => {
        const {
          data: { createTodo },
        } = result;
        props.addItem(createTodo);
      });
      // Close modal
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
  state: state,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
