const view = document.getElementById('carousel');
const container = document.querySelector('.container');
const PANEL_COUNT = container.querySelectorAll('.panel').length;

const SUPPORT_TOUCH = 'ontouchstart' in window;
const THRESHOLD = 30;
const EVENTS = {
  start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
  end: SUPPORT_TOUCH ? 'touchend' : 'mouseup',
};

function translateX(posX) {
  container.style.transform = `translate3d(${posX}px, 0, 0)`;
}

function toPos(obs) {
  return obs.pipe(
    map((v) => (SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX))
  );
}

const { fromEvent, merge } = rxjs;
const { scan, share, withLatestFrom, startWith, map, first, takeUntil, switchMap } =
  rxjs.operators;

const startStream = fromEvent(view, EVENTS.start).pipe(toPos);
const moveStream = fromEvent(view, EVENTS.move).pipe(toPos);
const endStream = fromEvent(view, EVENTS.end);

const sizeStream = fromEvent(window, 'resize').pipe(
  startWith(0),
  map((_) => view.clientWidth)
);

const dragStream = startStream.pipe(
  switchMap((start) =>
    moveStream.pipe(
      map((move) => move - start),
      takeUntil(endStream)
    )
  ),
  share(),
  map((distance) => ({ distance }))
);

const dropStream = dragStream.pipe(
  switchMap((drag) =>
    endStream.pipe(
      map((event) => drag),
      first()
    )
  ),
  withLatestFrom(sizeStream, (drag, size) => {
    return { ...drag, size };
  })
);

const carouselStream = merge(dragStream, dropStream).pipe(
  scan(
    (store, { distance, size }) => {
      const updateStore = {
        from: -store.index * store.size + distance,
      };

      if (size === undefined) {
        updateStore.to = updateStore.from;
      } else {
        let toBeIndex = store.index;
        if (Math.abs(distance) >= THRESHOLD) {
          toBeIndex =
            distance < 0
              ? Math.min(toBeIndex + 1, PANEL_COUNT - 1)
              : Math.max(toBeIndex - 1, 0);
        }
        updateStore.index = toBeIndex;
        updateStore.to = -toBeIndex * size;
        updateStore.size = size;
      }
      return { ...store, ...updateStore };
    },
    {
      from: 0,
      to: 0,
      index: 0,
      size: 0,
    }
  )
);

carouselStream.subscribe((store) => {
  console.log('carousel', store);
  translateX(store.to);
});
// dragStream.subscribe((distance) => console.log('distance', distance));
// sizeStream.subscribe((width) => console.log('width', width));
// dropStream.subscribe((arr) => console.log('drop', arr));

