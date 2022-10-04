import {
  Divider,
  List,
  Table,
  Tag,
  Space,
  Checkbox,
  Input,
  Button,
  Modal,
} from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import "antd/dist/antd.css";

import React, { useReducer, useState } from "react";
function tasksReducer(tasks, { type, task }) {
  console.log(type, task);
  switch (type) {
    case "added": {
      return [
        ...tasks,
        {
          id: task.id,
          text: task.text,
          done: false,
        },
      ];
    }
    case "edited": {
      return tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== task.id);
    }
    default: {
      throw Error("Unknown action: " + type);
    }
  }
}
const App = () => {
  const [enterdTodo, setenterdTodo] = useState("");
  const [id, setId] = useState(1);
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const columns = [
    {
      title: "Status",
      dataIndex: "name",
      key: "name",
      render: (text) => <Checkbox defaultChecked={false} />,
    },
    {
      title: "Todos",
      dataIndex: "text",
      key: "text",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <EditFilled
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleEdit(record)}
          />
          <DeleteFilled
            style={{ color: "red", fontSize: "1.5rem", marginLeft: "12px" }}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (task) => {
    console.log("in edit");
  };
  const handleDelete = (task) => {
    Modal.confirm({
      title: `Do you want to delete ${task.text} todo`,
      okText: `Yes`,
      okType: "danger",
      onOk: () => dispatch({ type: "deleted", task }),
    });
  };
  const handleAdd = () => {
    setId(id + 1);
    dispatch({
      type: "added",
      task: { id, text: enterdTodo, done: false },
    });
    setenterdTodo("");
  };
  return (
    <main>
      <div style={{ display: "flex" }}>
        <Input
          placeholder="Enter a new todo"
          value={enterdTodo}
          onChange={(e) => setenterdTodo(e.target.value)}
        />
        <Button type="primary" onClick={handleAdd}>
          Add todo
        </Button>
      </div>
      <Divider orientation="left">To do list</Divider>
      <Table columns={columns} dataSource={tasks} />
    </main>
  );
};

export default App;
