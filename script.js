// 01. Select all the DOM elements we need

const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
)

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : []

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Clothes", amount: 150 }
// ]

//global state for transaction, later will link up local storage
// let transactions = dummyTransactions;

// Add transactions
function addTransaction(e) {
  // pass in our event parameter. first thing we want to do is to prevent default since this is a sumbit form and we dont actually want it to submit
  e.preventDefault()

  if (text.value.trim() === "" && amount.value.trim() === "") {
    alert("Please add text and amount")
  } else {
    const transaction = {
      ID: generateID(),
      text: text.value,
      amount: +amount.value
    }

    // Add it to total transactions
    transactions.push(transaction)
    addTransactionDOM(transaction)
    updateValues()
    updateLocalStorage()

    text.value = ""
    amount.value = ""

    console.log(transaction)
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000)
}

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
    <button class="delete-btn"  onClick="removeTransaction(${
      transaction.id
    })">x</button>
  `

  list.appendChild(item)
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount)
  console.log(amounts)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  console.log(income)
  console.log(expense)

  balance.innerText = `$${total}`
  money_plus.innerText = `$${income}`
  money_minus.innerText = `$${expense}`
}

// Remove transaction by ID
function removeTransaction(id) {
  // !!! this looks like a bug, should be transactions.filter() not transaction
  transactions = transaction.filter(transaction => transaction.id !== id)

  updateLocalStorage()
  init()
}

// Update localStorage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

// Init app
function init() {
  list.innerHTML = ""

  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()

form.addEventListener("submit", addTransaction)
