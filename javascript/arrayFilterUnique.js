//myArray.filter(arrayFilterUnique);
const arrayFilterUnique = (value, index, self) => (self.indexOf(value) === index);
/*
min:
const arrayFilterUnique=(v,i,s)=>(s.indexOf(v)===i);
*/
