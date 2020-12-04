import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/itemAction';
import { useMutation } from 'urql';
const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
      name
    }
  }
`;

function DeleteButton({ id, deleteItem }) {
  const [, deleteTask] = useMutation(deleteTodo);
  async function onDeleteClick(id) {
    try {
      // const data = await API.graphql(
      //   graphqlOperation(deleteTodo, { input: { id } })
      // );
      // console.log(data);
      // const {
      //   data: {
      //     deleteTodo: { id: deletedDataId },
      //   },
      // } = data;
      const data = { id };
      deleteTask(data).then((result) => {
        const {
          data: {
            deleteTodo: { _id: deletedDataId },
          },
        } = result;
        deleteItem(deletedDataId);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button
      className="remove-btn"
      color="danger"
      size="sm"
      onClick={() => onDeleteClick(id)}
    >
      &times;
    </Button>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { deleteItem })(DeleteButton);
