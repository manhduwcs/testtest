const { app } = require('./server');
const PORT = 4321;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PRODUCTION] Backend running on port ${PORT}`);
});
// re-test CI !
