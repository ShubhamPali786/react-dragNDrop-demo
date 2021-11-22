import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Col } from "react-bootstrap";
import { ITaskList } from "../../models/TaskPlannerModels";
import { Task } from "../Task";
import "./styles.css";

interface ColumnProps {
  tasklist: ITaskList;
}

export const Column: React.FC<ColumnProps> = (props) => {
  return (
    <Col className="column-cn">
      <div>
        <h4>{props.tasklist.columnName}</h4>
        <Droppable droppableId={props.tasklist.columnName}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{minHeight:"200px"}}
            >
              {props.tasklist.tasks.length > 0
                ? props.tasklist.tasks.map((item,index) => (
                    <Task key={item.taskdetail} task={item} index={index} />
                  ))
                : ""}
            </div>
          )}
        </Droppable>
      </div>
    </Col>
  );
};
