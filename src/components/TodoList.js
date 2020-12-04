import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemAction';
import DeleteButton from './DeleteButton';
import UpdateItemModal from './updateItemModal';
import CompleteTask from './CompleteTask';
import { useQuery } from 'urql';

function TodoList(props) {
  const [result] = useQuery({
    query: `
    {
      allTodos {
        data {
          _id
          name
          completed
        }
      }
    }
  `,
  });
  const { data, fetching } = result;

  const {
    getItems,
    item: { items },
  } = props;
  useEffect(() => {
    if (!fetching) {
      console.clear();
      console.log('data', data);
      getItems(data.allTodos.data);

      console.log(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name, completed }, index) => {
            return (
              <CSSTransition key={index} timeout={500} classNames="fade">
                <ListGroupItem>
                  <DeleteButton id={_id} />
                  <CompleteTask completed={completed} id={_id} name={name} />
                  <UpdateItemModal id={_id} ccompleted={completed} />
                  {name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(TodoList);
