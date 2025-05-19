export class Person{
    // public name: string | undefined;
    // private address: string;

    // constructor(name: string, addres: string) {
    //     this.name = 'Fernando';
    //     this.address = 'La Plata'
    // }
    constructor(
        public name: string, 
        private address: string = 'No Address'
    ) {}
}

export class Hero {

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person

    ){
        this.person = person
    }

}
// export class Hero extends Person {

//         constructor(
//             public alterEgo: string,
//             public age: number,
//             public realName: string

//         ){
//             super(realName, 'New York')
//         }

// }

const tony = new Person('Tony Stark', 'New York')
const ironman = new Hero('Iron', 45,'Tony', tony)
console.log(ironman)