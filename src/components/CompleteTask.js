import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { markAsCompleted } from '../actions/itemAction';
import { useMutation } from 'urql';
const updateTodo = /* GraphQL */ `
  mutation UpdateTodo($id: ID!, $data: TodoInput!) {
    updateTodo(id: $id, data: $data) {
      _id
      name
      completed
    }
  }
`;
function CompleteTask({ completed, id, name, markAsCompleted }) {
  const [, markAsCompletedTask] = useMutation(updateTodo);
  async function taskCompleted(taskId) {
    try {
      const mark = {
        id,
        data: {
          name,
          completed: !!!completed,
        },
      };
      markAsCompletedTask(mark).then((result) => {
        const {
          data: { updateTodo },
        } = result;
        markAsCompleted(updateTodo);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      className="remove-btn"
      color="primary "
      onClick={() => taskCompleted(id)}
    >
      {completed === true ? '✔' : '⚪'}
    </Button>
  );
}
const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { markAsCompleted })(CompleteTask);
