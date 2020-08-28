class Account {

    CB_PERCENT_CREDIT = 1;
    TAXES_FEE = 20;
    balance;
    credit;
    creditLimit;
    cashback;
    MINIMAL_CB_WITHDRAWAL = 100;
    cashbackCathegories = {
        'food': 5,
        'fuel': 10,
        'gold': 15,
        'medicine': 10,
        'pets': 20,
        'girls': 40
    };
    purchaseHistory = [];

    constructor(balance = 0, credit = 0) {
        this.balance = balance;
        this.credit = credit;
        this.creditLimit = credit;
        this.cashback = 0;
    }

    buyItem(price, cathegory) {
        let cashback = 0;
        if (this.balance + this.credit < price) {
            throw new Error('Not enough money');
        }
        else if (this.balance >= price) {
            this.balance -= price;
            this.cashbackCathegories.hasOwnProperty(cathegory) ? cashback += price * this.cashbackCathegories[cathegory] * this.CB_PERCENT_CREDIT / 100 : 0;
        }
        else {
            if (this.balance > 0) {
                cashback += this.cashbackCathegories.hasOwnProperty(cathegory) 
                            ? this.balance * this.cashbackCathegories[cathegory] * this.CB_PERCENT_CREDIT / 100 + (price - this.balance) * this.CB_PERCENT_CREDIT / 100 
                            : 0;
                this.credit -= price - this.balance;
                this.balance = 0;
            }
            else {
                cashback += this.cashbackCathegories.hasOwnProperty(cathegory) 
                            ? (price - this.balance) * this.CB_PERCENT_CREDIT / 100 
                            : 0;
                this.credit -= price;
            }
        }
        this.purchaseHistory.push([price, cathegory, cashback]);
        this.cashback += cashback;
    }

    returnItem(price, cathegory) {
        let productIndex = this.purchaseHistory.findIndex(el => el[0] == price && el[1] == cathegory);
        if (productIndex !== -1) {
            this.refund(price);                                                 // refunding money for returned item
            this.refundCashback(this.purchaseHistory[productIndex][2]);         // refunding cash
            delete this.purchaseHistory[productIndex];                          // deleting from history            
        }
    }

    refund(sum) {
        if (this.credit == this.creditLimit) {
            this.balance += sum;
        }
        else if (this.credit + sum <= this.creditLimit) {
            this.credit += sum;
        }
        else {
            this.balance += sum - (this.creditLimit - this.credit);
            this.credit = this.creditLimit;
        }
    }

    withdrawCashback(cashbackAmount) {
        if (cashbackAmount >= this.MINIMAL_CB_WITHDRAWAL) {
            this.refund(cashbackAmount * (1 - this.TAXES_FEE / 100));
        } 
        else throw new Error(`Minimal amount for withdrawal is ${this.MINIMAL_CB_WITHDRAWAL}`);
    }
    
    refundCashback(sum) {
        if (sum <= this.cashback) {
            this.cashback -= sum;
        }
        else {
            let notRefundedCashback = (sum - this.cashback) * 1.25;
            this.cashback = 0;
            if (notRefundedCashback >= this.balance) {
                this.balance -= notRefundedCashback;
            }
            else if (this.credit + this.balance >= notRefundedCashback) {
                this.credit -= notRefundedCashback - this.balance;
                this.balance = 0;
            }
            else throw new Error('Some error occcur while transaction');
        }
    }
}

module.exports = { Account };