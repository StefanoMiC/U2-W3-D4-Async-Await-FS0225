const getUsersThen = () => {
  fetch("https://randomuser.me/api/?results=5", {
    method: "GET",
    headers: {
      Authorization: "Bearer [token]"
    }
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("errore nel reperimento dei dati");
      }
    })
    .then(results => console.log(results))
    .catch(error => console.log(error));

  console.log("Finito");
};

// getUsersThen();

const getUsersAsync = async function () {
  //   Metodo 2 - ASYNC / AWAIT

  // una volta che una funzione viene dichiarata come async verrà eseguita riga per riga, dall'alto verso il basso in un ordine lineare di esecuzione
  // FERMANDOSI sui punti nel quale è impostato un AWAIT

  // quando usiamo async/await occorre anche trovare un modo per gestire gli eventuali errori (come facevamo prima)
  // il try...catch ci viene in soccorso. è una struttura che non è specifica per la gestione di codice sincorno, ma possiamo applicarla come se fosse una
  // "rete di protezione" che catturi qualsiasi errore che cerchi di risalire in superficie

  // qualsiasi cosa si "rompa" (produca errore) all'interno del blocco try verrà cartturato e passato come argomento al blocco catch, nel quale possiamo
  // gestire l'errore occorso in questo livello

  try {
    const resp = await fetch("https://randomuser.me/api/?results=5", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token // token è la variabile creata nel file token.js già importato in index.html
      }
    });
    console.log(resp);

    if (resp.ok) {
      const results = await resp.json();

      console.log("random users", results);
    } else {
      throw new Error("errore nel reperimento dei dati");
    }
  } catch (err) {
    console.log(err);
  }
};

const getStarWarsChars = async () => {
  try {
    const resp = await fetch("https://www.swapi.tech/api/people");
    const results = await resp.json();

    console.log("swapi results", results);
  } catch (error) {
    console.log(error);
  }
};

// window.onload = function () {
//   // in questo contesto le due funzioni asincrone hanno la possibilità di partire in concomitanza.
//   // una non dipende dall'altra.
//   // se sono due chiamate distinte vale la pena farle eseguire in parallelo.
//   getUsersAsync();
//   getStarWarsChars();
// };

// come gestire una funzione asincrona che produce un valore? (es. per demandare l'utilizzo del valore ritornato ad un'altra funzione)
// essendo che le funzioni asincrone gestiscono internamente delle promise, che richiedono tempo per produrre un valore,
// va da sé che anche la funzione esterna richieda del tempo per produrre il suo valore di ritorno. ed infatti lei stessa viene considerata una Promise!

const getUsersAsyncAndReturn = async function () {
  try {
    const resp = await fetch("https://randomuser.me/api/?results=5", {
      method: "GET",
      headers: {
        Authorization: "Bearer [token]"
      }
    });
    console.log(resp);

    if (resp.ok) {
      const usersObj = await resp.json();
      //   qui stiamo ritornando un valore, ma il return avverrà dopo un tempo variabile, dovrà essere aspettato con uno dei due metodi. (VEDI SOTTO)
      return usersObj;
    } else {
      throw new Error("errore nel reperimento dei dati");
    }
  } catch (err) {
    console.log(err);
  }
};

window.onload = () => {
  // metodo 1) utilizzo il classico then. questo ha il vantaggio di non costringermi a dichiarare questo contesto come async e
  // di essere ancora libero di avviare più operazioni asincrone in "parallelo"
  getUsersAsyncAndReturn().then(usersObj => console.log(usersObj));
};

// window.onload = async () => {
//   // metodo 2) dichiaro la funzione come async e permetto al codice di aspettare il valore di ritorno della funzione prima di utilizzarlo
//   const usersObj = await getUsersAsyncAndReturn();
//   console.log(usersObj);
// };

// questo secondo metodo però mi impone di definire la funzione di onload come async, impedendomi di far eseguire in concomitanza più promise
// puoi risolvere questo problema creando un'altra funzione che gestisca internamente il suo contesto async,
// che verrà richiamata dentro la funzione di onload che rimarrà invece sincrona

// const multiplePromises = async () => {
//   const result1 = await promise1();
//   const result2 = await promise2();
//   const result3 = await promise3();

//   return { result1, result2, result3 };
// };

// window.onload = () => {
//   multiplePromises().then(results => console.log(results));
//   getUsersAsyncAndReturn().then(usersObj => console.log(usersObj));

// //   questo contesto rimane libero di eseguire più promise allo stesso tempo perché questa funzione esterna non è dichiarata come async
// };
