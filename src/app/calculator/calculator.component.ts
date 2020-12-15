import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    firstOperandInput = '';
    firstOperand: number | undefined;
    secondOperandInput = '';
    secondOperand: number | undefined;
    operator: string | undefined;
    result: number | undefined;
    note: string | undefined;

    get hasResult(): boolean {
        return this.result !== undefined;
    }

    constructor() {}

    ngOnInit(): void {}

    setFirstOperand(input: string): void {
        this.firstOperand = parseInt(input, 10);
    }

    setSecondOperand(input: string): void {
        this.secondOperand = parseInt(input, 10);
    }

    clear(): void {
        if (this.secondOperand !== undefined) {
            this.secondOperand = undefined;
            this.secondOperandInput = '';
            this.result = undefined;
            this.note = undefined;
        } else if (this.operator !== undefined) {
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        } else {
            this.firstOperand = undefined;
            this.firstOperandInput = '';
            this.operator = undefined;
            this.result = undefined;
            this.note = undefined;
        }
    }

    clearAll(): void {
        this.operator = undefined;
        this.result = undefined;
        this.note = undefined;
        this.secondOperand = undefined;
        this.secondOperandInput = '';
        this.firstOperand = undefined;
        this.firstOperandInput = '';
    }

    clearOperation(): void {
        this.operator = undefined;
        this.result = undefined;
        this.secondOperand = undefined;
        this.secondOperandInput = '';
        this.firstOperand = undefined;
        this.firstOperandInput = '';
    }

    evaluate(): void {
        if (this.firstOperand !== undefined && this.secondOperand !== undefined) {
            switch (this.operator) {
                case '-':
                    this.result = this.firstOperand - this.secondOperand;
                    break;
                case '×':
                    this.result = this.firstOperand * this.secondOperand;
                    break;
                case '÷':
                    if (this.secondOperand === 0) {
                        this.note = 'Cannot divide by zero';
                        this.clearOperation();
                    } else this.result = Number((this.firstOperand / this.secondOperand).toFixed(2));
                    break;
                default:
                    this.result = this.firstOperand + this.secondOperand;
                    break;
            }
        }
    }

    setOperand(operand: string): void {
        if (this.note) {
            this.clearAll();
            this.setFirstOperand(operand);
        } else if (this.hasResult) {
            this.clearAll();
            this.result = undefined;
            this.setFirstOperand(operand);
        } else if (this.operator !== undefined) {
            this.secondOperandInput = this.secondOperandInput.concat(operand);
            this.setSecondOperand(this.secondOperandInput);
        } else if (this.operator === undefined) {
            this.firstOperandInput = this.firstOperandInput.concat(operand);
            this.setFirstOperand(this.firstOperandInput);
        }
    }

    setOperator(operator: string): void {
        if (this.hasResult) {
            const newOperand = this.result;
            const newOperator = operator;
            this.clearAll();
            this.firstOperand = newOperand;
            this.operator = newOperator;
        } else if (this.note) {
            this.clearAll();
        } else this.operator = operator;
    }

    invertOperand(): void {
        if (this.result !== undefined) {
            this.result = this.result * -1;
        } else if (this.secondOperand !== undefined) {
            this.secondOperand = this.secondOperand * -1;
        } else if (this.firstOperand !== undefined) {
            this.firstOperand = this.firstOperand * -1;
        }
    }
}
