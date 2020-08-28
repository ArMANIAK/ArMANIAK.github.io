'use strict'

const account = require('./script');

test('creation of account', () => {
    const acc = new account.Account(1000, 10);
    expect(acc).toBeDefined();
});

test('Constructor testing', () => {
    const acc = new account.Account(1000, 10);
    expect(acc.balance).toBe(1000);
    expect(acc.credit).toBe(10);
    expect(acc.cashback).toBe(0);
});

test('Testing default constructor', () => {
    const acc = new account.Account();
    expect(acc.balance).toBe(0);
    expect(acc.credit).toBe(0);
    expect(acc.cashback).toBe(0);
});

test('Regular buying item', () => {
    const acc = new account.Account(1000, 10);
    acc.buyItem(15, 'food');
    expect(acc.balance).toBe(985);
    expect(acc.purchaseHistory).toContainEqual([15, "food", 0.75]);
    expect(acc.purchaseHistory).not.toContainEqual([17, "food", 0.77]);
});

test('Buying item with partial funding', () => {
    const acc = new account.Account(10, 10);
    acc.buyItem(15, 'food');
    expect(acc.balance).toBe(0);
    expect(acc.credit).toBe(5);
    expect(acc.purchaseHistory).toContainEqual([15, "food", 0.55]);
});

test('Buying item fully via credit limit', () => {
    const acc = new account.Account(0, 20);
    acc.buyItem(15, 'food');
    expect(acc.balance).toBe(0);
    expect(acc.credit).toBe(5);
    expect(acc.purchaseHistory).toContainEqual([15, "food", 0.15]);
});

test('Not enough money', () => {
    const acc = new account.Account(10, 0);
    expect(() => {acc.buyItem(15, 'food');}).toThrow();
    expect(() => {acc.buyItem(15, 'food');}).toThrow(Error);
    expect(acc.purchaseHistory).not.toContainEqual([15, "food"]);
    expect(acc.balance).toBe(10);
    expect(acc.cashback).toBe(0);
    expect(acc.credit).toBe(0);
});

test('Cashback while buying', () => {
    const acc = new account.Account(1000, 200);
    acc.buyItem(100, 'food');
    expect(acc.cashback).toBe(5);
    const acc2 = new account.Account(0, 200);
    acc2.buyItem(100, 'food');
    expect(acc2.cashback).toBe(1);
    const acc3 = new account.Account(40, 200);
    acc3.buyItem(100, 'food');
    expect(acc3.cashback).toBe(2.6);
    const acc4 = new account.Account(1000, 200);
    acc4.buyItem(100, 'food');
    acc4.buyItem(200, 'fuel');
    acc4.buyItem(100, 'girls');
    expect(acc4.cashback).toBe(65);
    const acc5 = new account.Account(1000, 200);
    acc5.buyItem(100, 'food');
    acc5.buyItem(200, 'fun stuff');
    expect(acc5.cashback).toBe(5);
});

test('Refunding', () => {
    const acc = new account.Account(100, 100);
    acc.buyItem(100, 'food');
    acc.refund(50);
    expect(acc.balance).toBe(50);
    expect(acc.credit).toBe(100);
    acc.buyItem(100, 'food');
    acc.refund(40);
    expect(acc.balance).toBe(0);
    expect(acc.credit).toBe(90);
    acc.refund(30);
    expect(acc.balance).toBe(20);
    expect(acc.credit).toBe(100);
});

test('Item return', () => {
    const acc = new account.Account(1000, 100);
    acc.buyItem(100, 'food');
    acc.buyItem(150, 'food');
    expect(acc.purchaseHistory).toHaveLength(2);
    acc.returnItem(100, 'food');
    expect(acc.purchaseHistory).not.toContainEqual([100, 'food', 5]);
    expect(acc.balance).toBe(850);
});

test('Cashback operations', () => {
    const acc = new account.Account(1000, 100);
    acc.buyItem(1100, 'fuel');
    expect(acc.cashback).toBe(101);
})