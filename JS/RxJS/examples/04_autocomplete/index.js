const { fromEvent, Subject } = rxjs;
const {
  share,
  publish,
  multicast,
  finalize,
  retry,
  catchError,
  switchMap,
  switchAll,
  partition,
  tap,
  map,
  mergeMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} = rxjs.operators;
const { ajax } = rxjs.ajax;

const search = document.getElementById('search');
const layer = document.getElementById('suggestLayer');
const loading = document.getElementById('loading');

const keyup$ = fromEvent(search, 'keyup').pipe(
  debounceTime(300),
  map((event) => event.target.value),
  distinctUntilChanged(),
  tap((value) => console.log('keyup: ', value)),
  // multicast(new Subject())
  // publish(),
  share(),
);

let [user$, reset$] = keyup$.pipe(
  partition((query) => query.trim().length > 0)
);

user$ = user$.pipe(
  tap(showLoading),
  // mergeMap((query) => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),

  // map((query) => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
  // switchAll(),

  switchMap((query) =>
    ajax.getJSON(`https://api.github.com/search/users?q=${query}`)
  ),
  tap(hideLoading),
  // catchError((error, orgObservable) => {
  //   console.log('error and resume', error.message);
  //   return orgObservable;
  // })
  retry(2),
  finalize(hideLoading),
  tap((value) => console.log('user: ', value)),
);

reset$ = reset$.pipe(
  tap((_) => (layer.innerHTML = '')),
  tap((value) => console.log('reset: ', value)),
);

user$.subscribe(
  (value) => drawLayer(value.items),
  (error) => {
    console.error(error);
    alert(error.message);
  }
);
reset$.subscribe();

keyup$.connect();

function drawLayer(items) {
  layer.innerHTML = items
    .map((user) => {
      return `
    <li class="user">
      <img src="${user.avatar_url}" width: "50px" height="50px" />
      <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
    </li>
    `;
    })
    .join('');
}

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}
