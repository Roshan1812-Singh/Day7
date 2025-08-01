import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Variable storing Task Manager Data
const TaskManager = () => {
      // useState hook used to declare the state and update teh states later
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // useEffect used to perform operation as side effect which is storing teh data in local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

 //  function for adding the tasks 
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };
// function for toggling the tasks
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // function for deleting the tasks
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // function for updating the tasks
  const updateTaskText = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

// filter condition used to mark completed and incompleted tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  // return statement used to render the JSX elements
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }} >
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#f0f7ff", borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        {" "}
        Task Manager{" "}
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button variant="contained" onClick={addTask}>
          Add
        </Button>
      </Box>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
        <ToggleButton value="incomplete">Incomplete</ToggleButton>
      </ToggleButtonGroup>
      <List>
        {filteredTasks.map((task, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => deleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <TextField
              variant="standard"
              value={task.text}
              onChange={(e) => updateTaskText(index, e.target.value)}
              fullWidth
              InputProps={{
                style: {
                  textDecoration: task.completed ? "line-through" : "none",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      </Paper>
    </Container>
  );
};

export default TaskManager;
