import { Temporal } from '@js-temporal/polyfill';

const now = Temporal.Now.zonedDateTimeISO()
const before9Hours = now.add({ hours: -9 })

console.log(before9Hours.toLocaleString())
