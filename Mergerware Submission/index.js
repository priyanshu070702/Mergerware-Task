const users = [];
const loans = [];
const payments = [];

function render() {
    renderUsers();
    renderLoans();
    renderPayments();
}

function renderUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    for (const user of users) {
        const li = document.createElement('li');
        li.textContent = `${user.email} (${user.role}) - ${user.status}`;
        userList.appendChild(li);
    }
}

function renderLoans() {
    const loanList = document.getElementById('loan-list');
    loanList.innerHTML = '';
    for (const loan of loans) {
        const li = document.createElement('li');
        li.textContent = `${loan.borrower} - $${loan.amount} - ${loan.status}`;
        loanList.appendChild(li);
    }
}

function renderPayments() {
    const paymentList = document.getElementById('payment-list');
    paymentList.innerHTML = '';
    for (const payment of payments) {
        const li = document.createElement('li');
        li.textContent = `Loan ID ${payment.loan_id} - $${payment.amount}`;
        paymentList.appendChild(li);
    }
}

function registerUser() {
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    users.push({ email, role, status: 'Pending' });
    render();
}

function requestLoan() {
    const amount = parseFloat(document.getElementById('amount').value);
    loans.push({ borrower: getCurrentUser().email, amount, status: 'Pending' });
    render();
}

function confirmPayment() {
    const amount = parseFloat(document.getElementById('payment-amount').value);
    const loanId = loans.findIndex(loan => loan.status === 'Pending');
    if (loanId !== -1) {
        payments.push({ loan_id: loanId, amount });
        loans[loanId].status = 'Paid';
        render();
    }
}

function getCurrentUser() {
    return users[0];
}

render();