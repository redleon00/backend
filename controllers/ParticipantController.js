const mongoose= require('mongoose')
const ParticipantModel = require('../models/participantes')
const Participant = mongoose.model('Participants')

//Animal for competition register
const register = async (req, res) => {
    console.log(req.body.owner)
    const name = req.body.name.toUpperCase();
    const state = req.body.state.toUpperCase();
    const owner = req.body.owner;
    const breeder = req.body.breeder;
     
    
        let newParticipant = new Participant({
            name : name, 
            state : state, 
            owner : owner, 
            breeder : breeder, 
        })
        newParticipant.save(function(err, participant) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
            
                return res.json({status:200, message: "Participante registrado"});
            }
        });


}

const list =   async (req, res) => {
    try {
        let participants = await Participant.find({}).exec();
        return res.json(participants);    
    } catch (error) {
        console.log(error)
    }
    

}

const deleted = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    try {
        let participants = await Participant.deleteOne({ '_id': id }).exec();
        return res.json({ participants, message: "Participante eliminado" });    
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    console.log(req.body)
    const id = req.params.id
    const name = req.body.name.toUpperCase();
    const state = req.body.state.toUpperCase();
    const owner = req.body.owner;
    const breeder = req.body.breeder;
    
 
try {
    let participant = await Participant.updateOne(
        { '_id': id },
        { $set :
            {   'name': name,
                'state': state,
                'owner': owner,
                'breeder':breeder,
                updated_at: new Date() 
        } 
    }).exec();
    return res.json({ participant, message: "Participante actualizado" });    
} catch (error) {
    console.log(error)
}
}
module.exports = {register, list, deleted, update}