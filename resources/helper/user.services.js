import User from '../user/models/user.js';

const UserServices = {
  findByEmail: async (email) => {
    const result = await User.findOne({ email });
    return result;
  },
  findById: async (id) => {
    const result = await User.findById(id);
    return result;
  },
  createUser: async (payload) => {
    const result = await User.create(payload);
    return result;
  },
};

export default UserServices;
