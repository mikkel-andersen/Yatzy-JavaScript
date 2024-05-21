import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next) {
    const user = this;
    next();
  });
  
  const User = mongoose.model('User', userSchema);
  
  export default User;