'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const currencies = {
  USD: '$',
  EGP: '£',
  EUR: '€'
}
let currency = currencies.USD;

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [1000, -500],
  interestRate: 1.2, // %
  pin: 1111,
  balance: 0
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [1000, -500],
  interestRate: 1.5,
  pin: 2222,
  balance: 0
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [1000, -500],
  interestRate: 0.7,
  pin: 3333,
  balance: 0
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [1000, -500],
  interestRate: 1,
  pin: 4444,
  balance: 0
};
const account5 = {
  owner: 'Ahmed Mousa',
  movements: [1000, -500],
  interestRate: 1,
  pin: 3141,
  balance: 0
};

const accounts = [account1, account2, account3, account4, account5];
createUserName(accounts);
usersCalcBalance(accounts);
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelAccList = document.querySelector('.acc-list');
const absoluteWindow = document.querySelector('.absolute');
const absoluteMsg = document.querySelector('.window');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogOut = document.querySelector('.logout-btn');
const btnInfo = document.querySelector('.info')

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


let session;
function accList() {
  alert(accounts.map((acc) => `${acc.username} : ${acc.pin}\n`).join(''));

}

// Displays user movements
const displayMovements = function (movements) {
  // containerMovements.innerHTML = '';
  let elements = movements.map((mov, i) => {
    mov = calcBalance(mov);
    const type = mov > 0 ?
      'deposit' :
      'withdrawal';
    const value = mov > 0 ?
      `${currency}${mov}`
      : `-${currency}${Math.abs(mov)}`;
    const row = `
     <div class="movements__row">
        <div
        class="movements__type movements__type--${type}"
        >${type.toUpperCase()}</div>
        <div class="movements__value">${value}</div>
      </div>
    `;
    return row;
  });
  containerMovements.innerHTML = elements.reverse().join('');
};

function createUserName(accs) {
  accs.forEach(acc => {
    acc.username = acc.owner.toLowerCase().split(' ').map(x => x[0]).join('');
  });
};
function usersCalcBalance(users) {
  users.forEach(account => {
    account.balance = calcStats(account).balance
  });
}
// Showing and hiding the UI
const app = {
  show() {
    containerApp.classList.remove('hidden');
  },
  hide() {
    containerApp.classList.add('hidden');
  }
}
// Fetches user Data if exists
function findUser(username) {
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    if (account.username === username) {
      return account;
    };
  };
};
// Displays Greeting based on the hour of the day
function timeMessage() {
  const hour = new Date().getHours()
  if (hour < 12)
    return 'Good Morning, ';
  if (hour < 15)
    return 'Good Afternoon, ';
  if (hour < 20)
    return 'Good Evening, ';
  return 'Good Night, ';
};
// Displayes a message when login fails
function processMsg(msg, element) {
  const placeHolder = element.placeholder
  element.value = '';
  element.placeholder = msg;
  setTimeout(() => {
    element.placeholder = placeHolder;
  }, 2000);
}
function calcStats(user) {
  let cashIn = 0;
  let cashOut = 0;
  for (let i = 0; i < user.movements.length; i++) {
    const element = user.movements[i];
    if (element > 0) {
      cashIn += element
    } else {
      cashOut += element
    }
  }
  return {
    balance: cashIn + cashOut,
    in: cashIn,
    out: Math.abs(cashOut),
    interest: (cashIn - cashOut) * user.interestRate
  }
}
function displayStats(user) {
  usersCalcBalance(accounts)
  let stats = calcStats(user)
  labelSumIn.textContent = `${currency}${stats.in}`
  labelSumOut.textContent = `${currency}${stats.out}`
  labelSumInterest.textContent = `${currency}${stats.interest}`
  labelBalance.textContent = `${currency}${calcBalance(user.balance)}`
  labelSumInterest.textContent = `${currency}${user.balance * user.interestRate}`
}
function calcBalance(balance) {
  if (currency === '€') {
    balance *= 0.96;
  } else if (currency === '£') {
    balance *= 50, 61;
  };
  return Math.round(balance);
};
function toUSD(balance) {
  if (currency === currencies.EGP) {
    return balance *= 0.020;
  } else if (currency === currencies.EUR) {
    return balance *= 1.1;
  };
  return balance;
};
// Displays user Data on login
function displayAll(user) {
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  const msg = timeMessage() + user.owner.split(' ')[0];
  labelWelcome.textContent = msg;
  displayMovements(user.movements);
  displayStats(user)
}
// Logs a user in
function userIn(user) {
  displayAll(user);
  animate();
  if (!session) {
    app.show();
  } else {
    app.hide();
    setTimeout(() => {
      app.show();
    }, 1000);
  };
  session = user;
};
// Logo spin Animation
function animate() {
  const element = document.querySelector('img');
  element.classList.add('spin');
  element.classList.remove('logo');

  setTimeout(() => {
    element.classList.remove('spin');
    element.classList.add('logo');
  }, 1000);
};

// Login logic
function logUser(username, password) {
  password = Number(password);
  const user = findUser(username);
  if (!user) return alert('User not found');
  if (isNaN(password))
    return processMsg('Nums only', inputLoginPin);
  if (user.username === username && user.pin === password) {
    return userIn(user);
  };
  processMsg('wrong pin', inputLoginPin);
};

// Submit login
btnLogin.addEventListener('click', (event) => {
  event.preventDefault();

  let username = inputLoginUsername.value;
  let pin = inputLoginPin.value;
  logUser(username, pin);
});
btnInfo.addEventListener('click', accList)
///////////////////////////////////////////////
// Transactions section
function transfer(money, to) {
  money = Number(money)
  let recipient = findUser(to);
  if (money <= 0)
    return processMsg('wrong input', inputTransferAmount)
  if (!recipient)
    return processMsg('not found', inputTransferTo);
  if (recipient.owner === session.owner)
    return processMsg('That\'s you', inputTransferTo)
  if (session.balance < money)
    return processMsg('Exceeds balace', inputTransferAmount);
  processMsg(`to ${recipient.owner}`, inputTransferTo);
  processMsg(money, inputTransferAmount);
  animate()
  session.movements.push(-money);
  recipient.movements.push(money);
}
function requestLoan(user, amount) {
  if (amount <= 0)
    return processMsg('wrong input', inputLoanAmount);
  animate()
  processMsg('Granted', inputLoanAmount)
  user.movements.push(amount);
}
btnTransfer.addEventListener('click', (event) => {
  event.preventDefault();

  transfer(inputTransferAmount.value, inputTransferTo.value);
  displayAll(session)
});

btnLoan.addEventListener('click', (event) => {
  event.preventDefault();

  requestLoan(session, Number(inputLoanAmount.value));
  displayAll(session)
})

// Log out
btnLogOut.addEventListener('click', () => {
  session = null;
  app.hide()
  animate()
  labelWelcome.textContent = 'Log in to get started'
})
