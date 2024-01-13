const { fromEvent } = rxjs;
const { tap, map, mergeMap, filter, debounceTime, distinctUntilChanged } =
  rxjs.operators;
const { ajax } = rxjs.ajax;

const users$ = fromEvent(document.getElementById('search'), 'keyup').pipe(
  debounceTime(300),
  map((e) => e.target.value),
  filter((q) => q.trim().length > 0),
  distinctUntilChanged(),
  tap(showLoading),
  mergeMap((q) => ajax.getJSON(`https://api.github.com/search/users?q=${q}`)),
  tap(hideLoading)
);
users$.subscribe((value) => drawLayer(value.items));

const layer = document.getElementById('suggestLayer');

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

const loading = document.getElementById('loading');

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}
