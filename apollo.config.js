module.exports = {
  client: {
    service: {
      name: 'pgtest',
      url: 'http://localhost:5000/graphql',
    },
    includes: ['src/**/*.{ts,tsx,js,jsx,graphql}'],
  },
};
