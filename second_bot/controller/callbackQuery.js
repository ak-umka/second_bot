import AreaService from "../service/area-service.js";

const CallbackQuery = (bot) => {
  bot.on('callback_query', async (query) => {
    const data = query.data;
    const chatId = query.message.chat.id;
    console.log(data, 'data-callback-query')

    const members = await bot.sendMessage(chatId, "Введите количество новых проголосовавших изберателей", {
      reply_markup: {
        force_reply: true,
      }
    });

    bot.onReplyToMessage(chatId, members.message_id, async (nameMsg) => {
      const countMembers = nameMsg.text;

      if (
        isNaN(countMembers) ||
        countMembers === null ||
        countMembers === undefined ||
        countMembers === ''
      ) {
        await bot.sendMessage(chatId, "Неверный формат количества участников, нажмите на кнопку");
        return;
      }

      await AreaService.updateCountMembers(countMembers, data);
      console.log(countMembers, 'members')
      await bot.sendMessage(nameMsg.chat.id, 'Сохранено', {
        parse_mode: "HTML"
      });
    });
  });
};

export default CallbackQuery;




// bot.on('callback_query', async (query) => {
//   const data = query.data;
//   const chatId = query.message.chat.id;

//   const members = await bot.sendMessage(chatId, "Укажите количество участников", {
//     reply_markup: {
//       force_reply: true,
//     }
//   });

//   bot.onReplyToMessage(chatId, members.message_id, async (nameMsg) => {
//     const countMembers = nameMsg.text;
//     await AreaService.updateCountMembers(countMembers, data);
//     console.log(countMembers, 'members')
//     await bot.sendMessage(nameMsg.chat.id, 'Сохранено', {
//       parse_mode: "HTML"
//     });
//   });
// });