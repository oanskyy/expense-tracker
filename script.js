// 01. Select all the DOM elements we need

const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Clothes", amount: 150 }
]

//global state for transaction, later will link up local storage
let transactions = dummyTransactions

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign, in order to distinguish the income from the expense
  const sign = transaction.amount < 0 ? "-" : "+"
  const item = document.createElement("li")

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus")
  item.innerHTML = ` 
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
  `

  list.appendChild(item)
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions
    .map(transaction => transaction.amount)
  console.log(amounts)

  const total = amounts
    .reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  console.log(income);
  console.log(expense);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Init app
function init() {
  list.innerHTML = ""

  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()


