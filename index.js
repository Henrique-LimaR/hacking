function decoretor(prototypeClass) {
 const fns = Reflect.ownKeys(prototypeClass).filter(item => item != "constructor");
 
    for(const fn of fns){
      prototypeClass[fn] = new Proxy(prototypeClass[fn], {
        __proto__: null,
        
        apply(fn, thisArgs, argList){
          console.log(`[${fn.name}] was called with: ${JSON.stringify(argList)} args`);
          
          console.time('speed')
          const result = fn.apply(thisArgs, argList);
          console.timeEnd('speed') 
          return result;
        }
      })
    }
};

class Database {
  person = new Proxy({ name : ""}, {
    set(currentContext, propertyKey, newValue) {
      console.log({
        currentContext,
        propertyKey,
        newValue,
      });
      
      currentContext[propertyKey] = newValue;
      return true;
    }
  }) 
  
  constructor() {
    decoretor(Database.prototype);
  };
  
  create() {
    console.log('creating...');
 
    const counter = 10e4;
    for(let i=0; i<= counter; i++);

    this.person.name = "test";
   
    return 'created!';
  };
};

const database = new Database();

console.log('created database: ', database.create({name: "Henrique"}));
console.log('created person: ', database.person);
