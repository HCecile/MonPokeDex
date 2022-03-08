import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    pointCombat: Number,
    pointVie: Number,
})

const Pokemon = mongoose.model('pokemon', pokemonSchema)

export default Pokemon;