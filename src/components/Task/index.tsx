import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "react-bootstrap";
import { ITask } from "../../models/TaskPlannerModels";
import "./styles.css";

interface TaskProps {
  task: ITask;
  index : number;
}

export const Task: React.FC<TaskProps> = (props) => {
  return (
    <Draggable draggableId={props.task.taskId!} index={props.index}>
      {(provided, snapshot) => (
        <Container
          className="task-cn"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{props.task.taskdetail}</p>
          <div className="task-tags-cn">
            {props.task.tags.map(item=><p>{item}</p>)}
          </div>
        </Container>
      )}
    </Draggable>
  );
};
