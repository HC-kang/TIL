export const config = {
  redis: {
    url: 'redis://localhost:6379',
  },
  producer: {
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'],
  },
  consumer: {
    lossRate: 0.2,
    failureRate: 0.1,
    processTimeAboutMS: 50,
  },
};
