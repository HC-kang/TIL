const view = document.getElementById('carousel');
const container = document.querySelector('.container');
const PANEL_COUNT = container.querySelectorAll('.panel').length;

const SUPPORT_TOUCH = 'ontouchstart' in window;
const EVENTS = {
  start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
  end: SUPPORT_TOUCH ? 'touchend' : 'mouseup',
};

const { fromEvent, merge } = rxjs;
const { share, withLatestFrom, startWith, map, first, takeUntil, switchMap } =
  rxjs.operators;

const startStream = fromEvent(view, EVENTS.start) //
  .pipe(toPos);
const moveStream = fromEvent(view, EVENTS.move) //
  .pipe(toPos);
const endStream = fromEvent(view, EVENTS.end);

const dragStream = startStream.pipe(
  switchMap((start) =>
    moveStream.pipe(
      map((move) => move - start),
      takeUntil(endStream),
      share(),
    )
  )
);

const sizeStream = fromEvent(window, 'resize') //
  .pipe(
    startWith(0),
    map((event) => view.clientWidth)
  );

const dropStream = dragStream.pipe(
  switchMap((drag) =>
    endStream.pipe(
      map((event) => drag),
      first()
    )
  ),
  withLatestFrom(sizeStream)
);

const carouselStream = merge(dragStream, dropStream);

carouselStream.subscribe(val => console.log('carousel', val));
// dragStream.subscribe((distance) => console.log('distance', distance));
// sizeStream.subscribe((width) => console.log('width', width));
// dropStream.subscribe((arr) => console.log('drop', arr));

function toPos(obs) {
  return obs.pipe(
    map((v) => (SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX))
  );
}
