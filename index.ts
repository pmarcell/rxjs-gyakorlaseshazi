import './style.css';

import { of, map, Observable, Subject, finalize, filter, tap, BehaviorSubject } from 'rxjs';

const myObservable = new Observable<number>((subscriber) => {
  let counter = 0;
  const interval = setInterval(() => {
    counter < 5 ? subscriber.next(counter++) : subscriber.complete();
  }, 500);
  return () => {
    console.log('clean up');
    clearInterval(interval);
  };
}).pipe(
  finalize(() => console.log('finally')),
  tap((value) => console.log('tap', value)),
  map((value) => value+2 )
);
const mySubject = new Subject<number>();
myObservable.subscribe(mySubject);


mySubject.pipe(filter((value) => value % 2 !== 0)).subscribe({
  next: (value) => console.log(value),
  error: (e) => console.log('error', e),
  complete: () => console.log('complete'),
});
//instant vissza adja az értéket, később is belehet állítani
const mySubject2= new BehaviorSubject(undefined);
mySubject2.next(10);
mySubject2.subscribe((value)=> console.log(10));

//debounceTime pl gomblenyomás után  x időt várok
//distinctUntilChanged ha nem változik az esemény nem iratkozik fel addig