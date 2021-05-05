module.exports = {
  name: 'error',
	once: true,
  on: true,
    async (client, error) {
    console.log(`Zdarzenie błędu zostało wysłane przez Discord.js: \n${JSON.stringify(error)}`, "error");
  }
};
