const {Schema, model} = require('mongoose');

// Create 'userSchema'
const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
        } 
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }], 
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
},
);

// Create a virtual called 'friendCount' that retrieves the length of the user's 'friends' array field on query

// Use the 'userSchema' to create the User model
const User = model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;