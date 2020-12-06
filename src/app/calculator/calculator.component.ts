import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    // firstOperand: number | undefined;
    // secondOperand: number | undefined;
    operator: string | undefined;
    result: number | undefined;
    note: string | undefined;
    firstOperand: number[] = [];
    secondOperand: number[] = [];

    // get hasFirstOperand(): boolean {
    //     return this.firstOperand !== undefined;
    // }

    // get hasSecondOperand(): boolean {
    //     return this.secondOperand !== undefined;
    // }

    get hasResult(): boolean {
        return this.result !== undefined;
    }

    get parseFirstOperand(): number {
        return parseInt(this.firstOperand.join(''), 10);
    }

    get parseSecondOperand(): number {
        return parseInt(this.secondOperand.join(''), 10);
    }

    constructor() {}

    ngOnInit(): void {}

    clear(): void {
        if (this.secondOperand.length) {
            // this.secondOperand = undefined;
            this.secondOperand = [];
            this.result = undefined;
            this.note = undefined;
        } else if (this.operator !== undefined) {
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        } else {
            // this.firstOperand = undefined;
            this.firstOperand = [];
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        }
    }

    clearAll(): void {
        // this.firstOperand = undefined;
        // this.secondOperand = undefined;
        this.operator = undefined;
        this.result = undefined;
        this.note = undefined;
        this.firstOperand = [];
        this.secondOperand = [];
    }

    evaluate(): void {
        // if (this.firstOperand !== undefined && this.secondOperand !== undefined) {
        if (this.firstOperand.length && this.secondOperand.length) {
            switch (this.operator) {
                case '-':
                    // this.result = this.firstOperand - this.secondOperand;
                    this.result = this.parseFirstOperand - this.parseSecondOperand;
                    break;
                case '*':
                    // this.result = this.firstOperand * this.secondOperand;
                    this.result = this.parseFirstOperand * this.parseSecondOperand;
                    break;
                case '/':
                    // this.secondOperand === 0
                    // ? (this.note = 'Cannot divide by zero')
                    // : (this.result = this.firstOperand / this.secondOperand);
                    this.parseSecondOperand === 0
                        ? (this.note = 'Cannot divide by zero')
                        : (this.result = Number((this.parseFirstOperand / this.parseSecondOperand).toFixed(2)));
                    break;
                default:
                    // this.result = this.firstOperand + this.secondOperand;
                    this.result = this.parseFirstOperand + this.parseSecondOperand;
                    console.log(this.result);
                    break;
            }
        }
    }

    setOperand(operand: number): void {
        if (this.hasResult || this.note) {
            this.clearAll();
            // this.firstOperand = operand;
            this.firstOperand.push(operand);
            console.log(this.parseFirstOperand);
        } else if (this.operator !== undefined) {
            // this.secondOperand = operand;
            this.secondOperand.push(operand);
            console.log(this.secondOperand);
        } else {
            // this.firstOperand = operand;
            this.firstOperand.push(operand);
            console.log(this.parseFirstOperand);
        }
    }

    setOperator(operator: string): void {
        if (this.hasResult) {
            const newOperand = this.result;
            const newOperator = operator;
            this.clearAll();
            // this.firstOperand = newOperand;
            // TO DO: preserve decimal
            console.log(newOperand);
            this.firstOperand.push(Number(newOperand));
            console.log(this.parseFirstOperand);
            this.operator = newOperator;
        } else if (this.note) {
            return;
        } else {
            this.operator = operator;
        }
    }
}
