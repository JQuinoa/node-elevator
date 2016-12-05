class Person {
  constructor(name = "Ironhacker", floor = 0) {
      this.name  = name;
      this.floor = floor;
  }
  notify(msg) {
    console.log(`${this.name} | ${msg}`)
  }
}

module.exports = Person;
