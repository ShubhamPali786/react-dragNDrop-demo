import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { TagOption } from "../TaskPlanner";

export interface TaskModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (taskdetail:string, selectedTags:string[]) => void;
  tagOptions: TagOption[];
  setTagOption: (newValue: TagOption) => void;
}

export const TaskModal: React.FC<TaskModalProps> = (props) => {
  const [show, setShow] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [taskDetail, setTaskDetail] = useState<string>("");

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onSelectChange = (
    newValue: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>
  ) => {
    setSelectedTags(newValue.map((n) => n.label));
    if (actionMeta.action === "create-option" && actionMeta.option?.__isNew__) {
      props.setTagOption(actionMeta.option);
    }
  };

  const onSubmit =()=>{
    props.onSave(taskDetail,selectedTags);
    setSelectedTags([]);
    setTaskDetail("");
  } 

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Add a task </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Detail</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={taskDetail}
            onChange={(e) => {
              setTaskDetail(e.currentTarget.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formmultiselect">
          <Form.Label>Tags</Form.Label>
          <CreatableSelect
            isMulti
            onChange={onSelectChange}
            options={props.tagOptions}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
