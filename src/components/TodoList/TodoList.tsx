import cn from 'classnames';
import { useState } from 'react';
import { FilterState } from '../../types/FilterState';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterState: FilterState;
};

export const TodoList: React.FC<Props> = ({
  todos,
  filterState,
}) => {
  const visibleTodos = todos.filter(todo => {
    switch (filterState) {
      case FilterState.Active:
        return !todo.completed;
      case FilterState.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const [isEditing] = useState(false);

  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo',
            { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          {isEditing ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                defaultValue={todo.title}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
              >
                ×
              </button>
            </>
          )}

          <div
            data-cy="TodoLoader"
            className="modal overlay"
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

    </section>
  );
};
