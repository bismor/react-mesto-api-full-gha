const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const HTTP_STATUS_CODE = require('../utils/http-status-code');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports.getUsers = async (req, res, next) => {
  try {
    const data = await user.find({});
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar,
    } = req.body;

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = await user.create({
      name,
      about,
      avatar,
      email: req.body.email,
      password: passwordHash, // записываем хеш в базу
    });
    const safeData = userData.toObject({ useProjection: true });

    res.status(HTTP_STATUS_CODE.OK).send({ safeData });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('некорректное поле аватар'));
    } else next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const data = await user.findById(req.params.userId);
    if (data === null) {
      throw new NotFoundError('Передан "userId" несуществующего пользователя');
    }
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const data = await user.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (data === null) {
      throw new NotFoundError('Передан "userId" несуществующего пользователя');
    }
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const data = await user.findByIdAndUpdate(
      req.user._id,
      { avatar },

      { new: true, runValidators: true },
    );
    if (data === null) {
      throw new NotFoundError('Передан "_id" несуществующего пользователя');
    }
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await user.findOne({ email }).select('+password');

    if (userData === null) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: userData._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(HTTP_STATUS_CODE.OK).send({ token });
  } catch (error) {
    next(error);
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await user.findById(userId);

    if (data === null) {
      throw new NotFoundError('Передан "userId" несуществующего пользователя');
    }
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};
