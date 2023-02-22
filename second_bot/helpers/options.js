
export const MemberOptionsButton = (id) => {
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Участники", callback_data: id, }],
      ],
    }),
  }
};

export const locationButton = () => {
  return {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: "Отправить местоположение", request_location: true }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  }
};

export const BotDescriptionHelper = (bot, msg) => {
  bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name}! Я бот, который поможет тебе вести учет твоих участков. Для начала работы нажми на кнопку "Добавить участок"`);
}