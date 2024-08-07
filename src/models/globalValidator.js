import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (value) => value.trim() !== '',

  message: ({ path }) => `the value of the ${path} field can't be blank`
});