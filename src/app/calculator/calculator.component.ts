import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    firstOperand: number | undefined;
    secondOperand: number | undefined;
    operator: string | undefined;
    result: number | undefined;
    calculation: string | undefined;
    note: string | undefined;

    get hasFirstOperand(): boolean {
        return this.firstOperand !== undefined;
    }

    get hasSecondOperand(): boolean {
        return this.secondOperand !== undefined;
    }

    get hasResult(): boolean {
        return this.result !== undefined;
    }

    constructor() {}

    ngOnInit(): void {}

    clear(): void {
        if (this.secondOperand !== undefined) {
            this.secondOperand = undefined;
            this.result = undefined;
            this.note = undefined;
        } else if (this.operator !== undefined) {
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        } else {
            this.firstOperand = undefined;
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        }
    }

    clearAll(): void {
        this.firstOperand = undefined;
        this.secondOperand = undefined;
        this.operator = undefined;
        this.result = undefined;
        this.note = undefined;
    }

    evaluate(): void {
        if (this.firstOperand !== undefined && this.secondOperand !== undefined) {
            switch (this.operator) {
                case '-':
                    this.result = this.firstOperand - this.secondOperand;
                    break;
                case '*':
                    this.result = this.firstOperand * this.secondOperand;
                    break;
                case '/':
                    this.secondOperand === 0
                        ? (this.note = 'Cannot divide by zero')
                        : (this.result = this.firstOperand / this.secondOperand);
                    break;
                default:
                    this.result = this.firstOperand + this.secondOperand;
                    break;
            }
        }
    }

    setOperand(operand: number): void {
        if (this.hasResult || this.note) {
            this.clearAll();
            this.firstOperand = operand;
        } else if (this.operator !== undefined) {
            this.secondOperand = operand;
        } else {
            this.firstOperand = operand;
        }
    }

    setOperator(operator: string): void {
        if (this.hasResult || this.note) {
            const newOperand = this.result;
            const newOperator = operator;
            this.clearAll();
            this.firstOperand = newOperand;
            this.operator = newOperator;
        } else {
            this.operator = operator;
        }
    }
}
