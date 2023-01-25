class SafeCalculator {
  constructor(calculator) {
    this.calculator = this.calculator
  }
  // proxied method
  divide() {
    // additional validation logic
    const divisor = this.calculator.peekValue()
    if (divisor === 0) {
      throw Error('Division by 0')
    }
    this.calculator.divide()
  }

  putValue(value) {
    this.calculator.putValue(value)
  }

  getValue() {
    return this.calculator.getValue()
  }

  peekValue() {
    return this.calculator.peekValue()
  }

  clear() {
    return this.calculator.clear()
  }

  multiply() {
    return this.calculator.multiply()
  }
}
