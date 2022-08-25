const animals = [
    {
    type: 'Dog',
    mammal: true,
    },
    {
    type: 'Snake',
    mammal: false,
    },
    {
    type: 'Cheetah',
    mammal: true,
    },
    ]
    
const mammales = animals.reduce((m, animal)=>{
    if (animal.mammal) {m.push(animal)}
    return m;
},[]);
console.log(mammales);

const animalsList = Array.from(document.querySelectorAll('.mammal-value'));
const mammalsList = animalsList.filter((item)=> item.innerHTML==="true");
const onlyMammals= document.querySelector('#only-mammals');
console.log(onlyMammals);
mammalsList.forEach((mammal)=> {
    // const elem = document.createElement('div');
    // elem.innerHTML(mammal);
     return onlyMammals.appendChild(mammal.parentElement.parentElement);});