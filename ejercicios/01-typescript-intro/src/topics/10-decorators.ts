function classDecorator<T extends {new (...arg:any[]): {}}> (
    constructor: T
)
{
    return class extends constructor{
        newProperty = 'New Propery';
        hello = 'override';
    }
}

@classDecorator
export class SuperClass{
    
    public myProperty: string = 'Abc1234'
    print(){
        console.log('Hola mundo')
    }

}
console.log( SuperClass)

const myClass = new SuperClass()
console.log(myClass)