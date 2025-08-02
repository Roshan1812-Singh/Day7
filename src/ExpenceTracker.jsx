import {
  Box,
  Button,
  List,
  Select,
  TextField,
  ListItem,
  ListItemText,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const ExpenceTracker = () => {
  // Setting states of all the values
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");

  //   Load income and expenses from localStorage once on mount
  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("income")) || [];
    setExpenses(storedIncomes);
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  //  Saving income and expenses to localStorage when values change
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  //   handler for adding transactions
  const handleAddTransactions = () => {
    if (!amount || !date) return;

    const newTransaction = { amount: parseFloat(amount), date, id: Date.now() };
    if (type === "income") {
      setIncome([...income, newTransaction]);
    } else {
      setExpenses([...expenses, newTransaction]);
    }
    setAmount("");
    setDate("");
  };

  //   filter transactions by months if fillterMonth is set
  const filterByMonth = (transactions) => {
    if (!filterMonth) return transactions;

    return transactions.filter((t) => t.date.startsWith(filterMonth));
  };

  const filteredIncomes = filterByMonth(income);
  const filteredExpenses = filterByMonth(expenses);

  //   Total calculation of income
  const totalIncome = filteredIncomes.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  //   Total calculation of expenses
  const totalExpenses = filteredExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  //   The total amount of balance left
  const balance = totalIncome - totalExpenses;

   return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Income/Expense Tracker
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        variant="outlined"
        label="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <TextField
        fullWidth
        type="month"
        value={date}
        variant="outlined"
        label="Date"
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 2 }}
      ></TextField>

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 3 }}
        onClick={handleAddTransactions}
      >
        Add
      </Button>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="filter-month">Filter by Month</InputLabel>
        <Select
          labelId="filter-month"
          label="Filter by Month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="january">January 2025</MenuItem>
          <MenuItem value="februuary">February 2025</MenuItem>
          <MenuItem value="march">March 2025</MenuItem>
          <MenuItem value="april">April 2025</MenuItem>
          <MenuItem value="may">May 2025</MenuItem>
          <MenuItem value="june">June 2025</MenuItem>
          <MenuItem value="july">July 2025</MenuItem>
          <MenuItem value="august">August 2025</MenuItem>
          <MenuItem value="september">September 2024</MenuItem>
          <MenuItem value="october">October 2024</MenuItem>
          <MenuItem value="november">Noveember 2024</MenuItem>
          <MenuItem value="descember">December 2024</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6">Balance : ${balance.toFixed(2)}</Typography>

      <Typography variant="subtitle1">Incomes</Typography>

      <Paper>
        <List>
          {filteredIncomes.map(({ id, amount, date }) => (
            <ListItem key={id}>
              <ListItemText primary={`$${amount}`} secondary={date} />
            </ListItem>
          ))}
          {filteredIncomes.length === 0 && (
            <ListItem>
              <ListItemText primary="No Incomes" />
            </ListItem>
          )}
        </List>
      </Paper>

      <Typography variant="subtitle1">
        Expenses
      </Typography>
      <Paper>
        <List>
          {filteredExpenses.map(({ id, amount, date }) => (
            <ListItem key={id}>
              <ListItemText primary={`$${amount}`} secondary={date} />
            </ListItem>
          ))}
          {filteredExpenses.length === 0 && (
            <ListItem>
              <ListItemText primary="No Expenses" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default ExpenceTracker;
