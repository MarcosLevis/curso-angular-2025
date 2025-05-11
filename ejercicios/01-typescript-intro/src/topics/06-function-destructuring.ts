interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
}

const tablet: Product = {
    description: 'Ipad Air',
    price: 250.0
}

interface TaxCalculationOptions{
    tax: number;
    products: Product[]
}

function taxCalculation( options:TaxCalculationOptions ): [number,number]{
// function taxCalculation( { products, tax}:TaxCalculationOptions ): [number,number]{

    let total = 0;

    let { products , tax} = options
    products.forEach( ({ price })=> {
        total += price;
    });
    return [total, total * tax]
}

const shoppingCart = [phone, tablet]
const tax = 0.15

const [total, taxResult]: number []= taxCalculation({
    products: shoppingCart,
    tax,
})

console.log('Total', total)
console.log('Tax', taxResult)


export {}