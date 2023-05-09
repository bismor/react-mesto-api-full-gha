/* eslint-disable no-unused-vars */
const card = require('../models/card');
const HTTP_STATUS_CODE = require('../utils/http-status-code');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = async (req, res, next) => {
  try {
    const data = await card.find({}).populate(['likes', 'owner']);
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const {
      name, link,
    } = req.body;
    const userId = req.user._id;

    const createCards = await card.create({ name, link, owner: userId });

    const data = await card.find({ _id: createCards._id }).populate(['likes', 'owner']);
    console.log(data);
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cardData = await card.findById(req.params.cardId).populate('owner');

    if (!cardData) {
      throw new NotFoundError('Нет карточки по заданному ID');
    }

    if (userId !== cardData.owner._id.toString()) {
      throw new ForbiddenError('Нельзя удалять чужую карточку');
    }

    const cardDelete = await card.findByIdAndRemove({ _id: cardData._id.toString() }).select('-owner');

    res.status(HTTP_STATUS_CODE.OK).send({ cardDelete });
  } catch (error) {
    next(error);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).populate(['likes', 'owner']);

    if (!data) {
      throw new NotFoundError('карточка не найдена');
    }

    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).populate(['likes', 'owner']);

    if (!data) {
      throw new NotFoundError('карточка не найдена');
    }

    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};
