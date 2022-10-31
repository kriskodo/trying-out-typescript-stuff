type ExistingValue<T> = {
  [key in keyof T]: T[Extract<key, keyof T>];
};

type Constructable<T> = {
  new (data: ExistingValue<T>): T;
};

function create<C>(
  ctor: Constructable<C>,
  data: { [key in keyof C]: C[Extract<key, keyof C>] }
): C {
  return new ctor(data);
}

type IPerson = {
  name: string;
  age: number;
};

class Person implements IPerson {
  name: string;
  age: number;

  constructor(data: { name: string; age: number }) {
    this.name = data.name;
    this.age = data.age;
  }
}

const person = create<IPerson>(Person, { name: "kris", age: 21 });
console.log(person.name, person.age);

abstract class Animal {
  name: string;
  legs: number;
  owner?: IPerson | undefined;
  canFly?: boolean | undefined = false;
  isDomestic?: boolean | undefined = false;
  hasFur?: boolean | undefined = false;

  constructor(data: {
    name: string;
    legs: number;
    owner?: IPerson;
    canFly?: boolean;
    isDomestic?: boolean;
    hasFur?: boolean;
  }) {
    this.name = data.name;
    this.legs = data.legs;
    this.owner = data.owner ?? this.owner;
    this.canFly = data.canFly ?? this.canFly;
    this.isDomestic = data.isDomestic ?? this.isDomestic;
    this.hasFur = data.hasFur ?? this.hasFur;
  }
}

class Dog extends Animal {}

class Bird extends Animal {}

const dog = create<Animal>(Dog, { name: "bob", legs: 4 });
const bird = create<Animal>(Bird, { name: "birdie", legs: 2 });
console.log(dog);
console.log(bird);
