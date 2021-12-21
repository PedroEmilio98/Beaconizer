/**
 * Este Model cria o schema para os Beacons. Title se refere ao aviso principal, 
 * content se refere aos detalhes do aviso e category se refere a quem ele se direciona
 */

const mongoose = require('mongoose');

const BeaconSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    category: {
        type: String
    }
})

const Beacon = mongoose.model('Beacon', BeaconSchema);
module.exports = Beacon;