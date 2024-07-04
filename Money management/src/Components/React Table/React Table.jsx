


import React, { useState, useEffect } from 'react';
import { db, auth } from '../Firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './React Table.module.css'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('Food & Beverage');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        loadExpenses(user.uid);
      } else {
        setUser(null);
        setExpenses([]);
        setTotalAmount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadExpenses = async (userId) => {
    const expensesCollection = collection(db, 'users', userId, 'expenses');
    const expensesSnapshot = await getDocs(expensesCollection);
    const expensesList = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setExpenses(expensesList);
    const total = expensesList.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  };

  const addExpense = async () => {
    const amountNum = Number(amount);
    if (category === '') {
      alert('Please select a category');
      return;
    }
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (date === '') {
      alert('Please select a date');
      return;
    }

    const newExpense = { category, amount: amountNum, date };
    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'expenses'), newExpense);
      setExpenses([...expenses, { ...newExpense, id: docRef.id }]);
      setTotalAmount(totalAmount + amountNum);
      setAmount('');
      setDate('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteExpense = async (index) => {
    const expenseToDelete = expenses[index];
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'expenses', expenseToDelete.id));
      setTotalAmount(totalAmount - expenseToDelete.amount);
      setExpenses(expenses.filter((_, i) => i !== index));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className={styles.App}>
      {/* <h1>Expense Tracker App</h1> */}
      {user ? (
        <>
          <div className={styles.inputSection}>
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Rent">Rent</option>
              <option value="Transport">Transport</option>
              <option value="Relaxing">Relaxing</option>
              <option value="Medical">Medical</option>
              <option value="School Fees">School Fees</option>
              <option value="Shopping">Shopping</option>
              <option value="sports">Sports</option>
              <option value="Other Expenses">Other Expenses</option>
            </select>
            <label htmlFor="amount-input">Amount:</label>
            <input
              type="number"
              id="amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="date-input">Date:</label>
            <input
              type="date"
              id="date-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button id={styles.addBtn} onClick={addExpense}>
              Add
            </button>
          </div>
          <div className={styles.expensesList}>
            <h2>Expenses List</h2>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody id="expense-table-body">
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.category}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteExpense(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total:</td>
                  <td id="total-amount">{totalAmount}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <p>Please log in to track your expenses.</p>
      )}
    </div>
  );
}

export default App;
