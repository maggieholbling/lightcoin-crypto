class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let result = 0;

    for (const transaction of this.transactions) {
      result += transaction.value;
    }

    return result;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    } else return console.log("Transaction not allowed, amount exceeds remaining balance.");

  }

}

class Withdrawal extends Transaction {

  get value() {
    return - this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();

t2 = new Withdrawal(9.99, myAccount);
t2.commit();

t3 = new Deposit(20.25, myAccount);
t3.commit();

t4 = new Deposit(5.99, myAccount);
t4.commit();

console.log('Balance:', myAccount.balance);

console.log('Account:', myAccount);
