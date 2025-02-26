export const config = {
  redis: {
    url: 'redis://localhost:6379',
  },
  producer: {
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'],
  },
  consumer: {
    receiveTimeAboutMS: 10,
    lossRate: 0,
    failureRate: 0,
    processTimeAboutMS: 50,
  },
};
