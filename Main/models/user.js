const {Schema, model} = require('mongoose');

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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
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
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Use the 'userSchema' to create the User model
const User = model('User', userSchema);

module.exports = User;