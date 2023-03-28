// module js on déclare une méthode success pour construire une réponse json structuré
exports.success = (message, data) => {
  return { message, data}
};