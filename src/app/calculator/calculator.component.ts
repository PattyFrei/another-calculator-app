import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    operator: string | undefined;
    result: number | undefined;
    note: string | undefined;
    firstOperand: number[] = [];
    secondOperand: number[] = [];

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
            this.secondOperand = [];
            this.result = undefined;
            this.note = undefined;
        } else if (this.operator !== undefined) {
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        } else {
            this.firstOperand = [];
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        }
    }

    clearAll(): void {
        this.operator = undefined;
        this.result = undefined;
        this.note = undefined;
        this.firstOperand = [];
        this.secondOperand = [];
    }

    evaluate(): void {
        if (this.firstOperand.length && this.secondOperand.length) {
            switch (this.operator) {
                case '-':
                    this.result = this.parseFirstOperand - this.parseSecondOperand;
                    break;
                case '*':
                    this.result = this.parseFirstOperand * this.parseSecondOperand;
                    break;
                case '/':
                    this.parseSecondOperand === 0
                        ? (this.note = 'Cannot divide by zero')
                        : (this.result = Number((this.parseFirstOperand / this.parseSecondOperand).toFixed(2)));
                    break;
                default:
                    this.result = this.parseFirstOperand + this.parseSecondOperand;
                    break;
            }
        }
    }

    setOperand(operand: number): void {
        if (this.hasResult || this.note) {
            this.clearAll();
            this.firstOperand.push(operand);
        } else if (this.operator !== undefined) {
            this.secondOperand.push(operand);
        } else {
            this.firstOperand.push(operand);
        }
    }

    setOperator(operator: string): void {
        if (this.hasResult) {
            const newOperand = this.result;
            const newOperator = operator;
            this.clearAll();
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
