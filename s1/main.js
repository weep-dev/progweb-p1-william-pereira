// s1/main.js — v1
//import { Conta } from './Conta.js';

//const c1 = new Conta('0001', 'Ana Lima');
//const c2 = new Conta('0002', 'Bruno Souza');

//c1.depositar(100);
//c1.sacar(30);

//console.log(c1);
//console.log('Saldo da c2:', c2.saldo); 

//console.log(typeof Conta);
//console.log(Object.getPrototypeOf(c1) === Conta.prototype);
//console.log(Object.hasOwn(c1, 'sacar')); 


// s1/main.js — v2
import { Conta } from './Conta.js';

const conta = new Conta('0001', 'Ana Lima');
conta.depositar(100);
conta.sacar(30);
console.log('Saldo:', conta.saldo);

const tentativas = [
  () => { conta.saldo = -5000; },
  () => conta.depositar(-50),
  () => conta.sacar(1000),
  () => { conta.titular = ''; },
];

for (const tentar of tentativas) {
  try {
    tentar();
  } catch (e) {
    console.log('Bloqueado →', e.message);
  }
}

console.log('Saldo continua:', conta.saldo);
console.log(conta); 

