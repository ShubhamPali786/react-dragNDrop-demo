import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ITaskList } from "../models/TaskPlannerModels";
import { Column } from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./styles.css";
import { TaskModal } from "./AddTaskModal";
import { TagOptions } from "./data";

export interface TagOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export const TaskPlanner: React.FC<{}> = (props) => {
  const [taskList, setTaskList] = useState<ITaskList[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [tagOptions, setTagOptions] = useState<TagOption[]>(TagOptions);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { destination, source } = result;
    if (
      destination?.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination?.droppableId) {
      const tasklist = [...taskList];
      const sourceCol = tasklist.find(
        (n) => n.columnName === source.droppableId
      )!;
      let task = sourceCol.tasks.splice(source.index, 1);
      sourceCol.tasks.splice(destination.index, 0, task[0]);
      setTaskList(tasklist);
      return;
    } else if (destination != null) {
      const tasklist = [...taskList];
      const sourceCol = tasklist.find(
        (n) => n.columnName === source.droppableId
      )!;
      let task = sourceCol.tasks.splice(source.index, 1);
      const destCol = tasklist.find(
        (n) => n.columnName === destination.droppableId
      )!;
      destCol.tasks.splice(destination.index, 0, task[0]);
      setTaskList(tasklist);
      return;
    }
  };

  useEffect(() => {
    const tasks: ITaskList[] = [
      {
        columnName: "TO-DO",
        tasks: [
          {
            taskdetail:
              "Goal: Brainstorme ideas to drive customer engagements.",
            tags: ["Backlog", "Deadline - Aug 2021"],
            taskId: "task1",
          }
        ],
      },
      {
        columnName: "IN PROGRESS",
        tasks: [],
      },
      {
        columnName: "ON HOLD",
        tasks: [],
      },
      {
        columnName: "DONE",
        tasks: [],
      },
    ];
    setTaskList(tasks);
  }, []);

  const onSave = (taskdetail: string, selectedTags: string[]) => {
    setShowPopup(false);
    const tasklist = [...taskList];
    let column = taskList.find((n) => n.columnName === "TO-DO")!;
    column.tasks.push({
      taskdetail: taskdetail,
      tags: selectedTags,
      taskId: Math.random().toString(36).substr(2, 5),
    });
    setTaskList(tasklist);
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container fluid>
          <Row>
            <Col>
              <Row className="taskplanner-header-cn">
                <Col>
                  <h2>KANBAN BOARD</h2>
                </Col>
                <Col className="text-start">
                  <Button variant="primary" onClick={() => setShowPopup(true)}>
                    Add Task
                  </Button>
                </Col>
              </Row>
              <Row className="pt-4 taskplanner-column-cn">
                {taskList?.map((item) => (
                  <Column key={item.columnName} tasklist={item} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </DragDropContext>
      <TaskModal
        show={showPopup}
        onClose={() => {
          setShowPopup(false);
        }}
        onSave={onSave}
        tagOptions={tagOptions}
        setTagOption={(newTagValue: TagOption) =>
          setTagOptions([...tagOptions, newTagValue])
        }
        
      />
    </React.Fragment>
  );
};
