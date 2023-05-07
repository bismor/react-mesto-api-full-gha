const mongoose = require('mongoose');

const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          return httpRegex.test(v);
        },
        message: (props) => `${props.value} поле аватар должно быть ссылкой.`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} неверный email.`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    // https://github.com/Automattic/mongoose/issues/9118
    // Это костыль вокруг бага механизма projection при создании
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
);

module.exports = mongoose.model('user', userSchema);
