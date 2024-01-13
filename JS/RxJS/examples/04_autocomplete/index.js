const { fromEvent } = rxjs;
const { tap, map, mergeMap, filter, debounceTime, distinctUntilChanged } =
  rxjs.operators;
const { ajax } = rxjs.ajax;

const search = document.getElementById('search');
const layer = document.getElementById('suggestLayer');
const loading = document.getElementById('loading');

const keyup$ = fromEvent(search, 'keyup').pipe(
  debounceTime(300),
  map((event) => event.target.value),
  distinctUntilChanged()
);

const user$ = keyup$.pipe(
  filter((query) => query.trim().length > 0),
  tap(showLoading),
  mergeMap((query) => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
  tap(hideLoading)
);

const reset$ = keyup$.pipe(
  filter((query) => query.trim().length === 0),
  tap((value) => (layer.innerHTML = ''))
);

user$.subscribe((value) => drawLayer(value.items));
reset$.subscribe();

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
