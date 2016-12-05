class Test {
  constructor(){
    this.counter = 1;
  }

  increment(){
    this.counter++
    console.log(this.counter)
  }
}

var test = new Test()
test.increment()
test.increment()
