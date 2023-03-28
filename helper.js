// module js on déclare une méthode success pour construire une réponse json structuré
const success = (message, data) =>{
    return {
        message: message,
        data: data
    }
}

exports.success