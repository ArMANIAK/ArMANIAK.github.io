class Account {

    cashbackPercentageCreditFunds = 1;
    balance;
    credit;
    creditLimit;
    cashback;
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
        if (this.balance + this.credit < price) {
            throw new Error('Not enough money');
        }
        else if (this.balance >= price) {
            this.balance -= price;
            this.cashbackCathegories.hasOwnProperty(cathegory) ? this.cashback += price * this.cashbackCathegories[cathegory]*.01 : 0;
        }
        else {
            if (this.balance > 0) {
                this.cashback += this.cashbackCathegories.hasOwnProperty(cathegory) 
                                ? this.balance * this.cashbackCathegories[cathegory] * 0.01 + (price - this.balance) * 0.01 
                                : 0;
                this.credit -= price - this.balance;
                this.balance = 0;
            }
            else {
                this.cashback += this.cashbackCathegories.hasOwnProperty(cathegory) 
                                ? (price - this.balance) * 0.01 
                                : 0;
                this.credit -= price;
            }
        }
        this.purchaseHistory.push([price, cathegory]);
    }

    returnItem(price, cathegory) {

        // rewrite this func 

        
        let productIndex = this.purchaseHistory.findIndex(el => {console.log(el == [price, cathegory]); el == [price, cathegory]});
        console.log(productIndex);
        if (productIndex !== -1) {
            this.purchaseHistory[productIndex] = undefined;

            // how to store cahback amount for single purchase???
        }
    }

    withdrawCashback(cashbackAmount) {}
    showBalance() {}
    showCredit() {}
    showCashback() {}
}

module.exports = { Account };