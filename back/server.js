// On importe le package http de node
const http = require("http");
// On importe l'app
const app = require("./app");

// Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
      const port = parseInt(val, 10);

      if (isNaN(port)) {
            return val;
      }
      if (port >= 0) {
            return port;
      }
      return false;
};

// On indique à l'application express sur quel port elle s'exécute
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = (error) => {
      if (error.syscall !== "listen") {
            throw error;
      }
      const address = server.address();
      const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
      switch (error.code) {
            case "EACCES":
                  console.error(bind + " requires elevated privileges.");
                  process.exit(1);
                  break;
            case "EADDRINUSE":
                  console.error(bind + " is already in use.");
                  process.exit(1);
                  break;
            default:
                  throw error;
      }
};

// On créé un serveur grâce au package http
const server = http.createServer(app);

// On enregistre la fonction errorHandler dans le serveur
server.on("error", errorHandler);
// Ecouteur d'évènements qui consigne le port sur lequel le serveur s'exécute dans la console
server.on("listening", () => {
      const address = server.address();
      const bind = typeof address === "string" ? "pipe " + address : "port " + port;
      console.log("Listening on " + bind);
});

// Le serveur écoute les requêtes envoyées
server.listen(port);
