let accountBalance = 10000; // Default initial value
let cashBalance = 5000;    // Default initial value

const historyTextarea = document.getElementById("historyTextarea");
const currentAccountBalanceSpan = document.getElementById("currentAccountBalance");
const currentCashBalanceSpan = document.getElementById("currentCashBalance");

// Function to update the displayed balances
function updateDisplay() {
    currentAccountBalanceSpan.textContent = accountBalance.toFixed(2);
    currentCashBalanceSpan.textContent = cashBalance.toFixed(2);
}

// Function to log a transaction
function logTransaction(type, amount, success = true) {
    const timestamp = new Date().toLocaleTimeString('th-TH'); // Use Thai locale for time format
    
    // Translate SUCCESS/FAILED
    const status = success ? 'สำเร็จ' : 'ล้มเหลว';
    
    // Translate log entry format
    const logEntry = `[${timestamp}] ${type}: ${amount.toFixed(2)} (${status})\n`;
    
    // Add new log entry to the top of the history
    historyTextarea.value = logEntry + historyTextarea.value;
}

// Requirement 4: Set Balances Button handler
document.getElementById("setBalancesButton").addEventListener('click', () => {
    const newAccountBalance = Number(document.getElementById("accountBalanceInput").value);
    const newCashBalance = Number(document.getElementById("cashBalanceInput").value);

    if (newAccountBalance >= 0 && newCashBalance >= 0) {
        accountBalance = newAccountBalance;
        cashBalance = newCashBalance;
        updateDisplay();
        logTransaction("กำหนดยอดคงเหลือเริ่มต้น", newAccountBalance + newCashBalance, true);
        
        // Translated alert message
        alert(`กำหนดค่ายอดเงินสำเร็จ บัญชี: ${accountBalance}, เงินสด: ${cashBalance}`);
    } else {
        // Translated alert message
        alert("ยอดเงินต้องไม่ติดลบ.");
    }
});

// Requirement 5: Deposit Button handler
document.getElementById("depositButton").addEventListener('click', () => {
    const amountInput = document.getElementById("amountInput");
    const amount = Number(amountInput.value);

    if (amount > 0) {
        if (cashBalance >= amount) {
            accountBalance += amount;
            cashBalance -= amount;
            updateDisplay();
            logTransaction("ฝากเงิน (จากเงินสดเข้าบัญชี)", amount, true);
            amountInput.value = 0; // Clear input after successful transaction
        } else {
            // Translated alert message
            alert("การฝากเงินล้มเหลว: ยอดเงินสดคงเหลือไม่เพียงพอ.");
            logTransaction("ฝากเงิน (จากเงินสดเข้าบัญชี)", amount, false);
        }
    } else {
        // Translated alert message
        alert("จำนวนเงินที่ต้องการฝากต้องมากกว่าศูนย์.");
    }
});

// Requirement 5: Withdraw Button handler
document.getElementById("withdrawButton").addEventListener('click', () => {
    const amountInput = document.getElementById("amountInput");
    const amount = Number(amountInput.value);

    if (amount > 0) {
        if (accountBalance >= amount) {
            accountBalance -= amount;
            cashBalance += amount;
            updateDisplay();
            logTransaction("ถอนเงิน (จากบัญชีเข้าเงินสด)", amount, true);
            amountInput.value = 0; // Clear input after successful transaction
        } else {
            // Translated alert message
            alert("การถอนเงินล้มเหลว: ยอดเงินในบัญชีไม่เพียงพอ.");
            logTransaction("ถอนเงิน (จากบัญชีเข้าเงินสด)", amount, false);
        }
    } else {
        // Translated alert message
        alert("จำนวนเงินที่ต้องการถอนต้องมากกว่าศูนย์.");
    }
});

// Initialize display on load
updateDisplay();