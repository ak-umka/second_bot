import TelegramBot from "node-telegram-bot-api";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { MemberOptionsButton, locationButton } from "./helpers/options.js";
import AreaService from "./service/area-service.js";
import { TimerController, StopTimer } from "./controller/timer-controller.js";
import CallbackQuery from "./controller/callbackQuery.js";

dotenv.config();

const port = 5000;
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const messageHelper = (msg) => (
  `Привет, <b>${msg.from.first_name}!</b> Я бот, который поможет тебе вести учет твоих участков. 

  Список команд: 
  /start - начать работу с ботом
  /create - Начать работу с локацией
  /report - добавить нарушения 
  /members - добавить количество проголосовавших участников (потом добавть в messageHelper для голосования)
  /stop - остановить таймер

  Для создания локации введите команду /create. Вам будет приходить сообщение от бота с запросом на ввод ФИО, геолокации и фото.
  
  Если хотите добавить новый участок или вы ввели 
  неверные данные, то введите команду /create и начните 
  сначала.
  
  После создание участка, каждый час (13:00, 14:00 и т.д.) 
  будет отправляться сообщение с напоминанием о том,
  что нужно добавить количество проголосовавших
  участников.
  Если вы хотите остановить таймер, то введите команду / stop.
  `
);

const start = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log('Connected to DB!')
    })
    console.log(`Server started on port ${port}`);

    bot.setMyCommands([
      { command: '/start', description: 'Старт' },
      { command: '/create', description: 'Создать участок' },
      { command: '/violation', description: 'Отчет' },
      { command: '/members', description: 'Участники' }, // добавить для  второго бота
      { command: '/stop', description: 'Остановить' }, // добавить для  второго бота
    ]);

    const nameUser = {};

    bot.onText(/\/start/, async (msg) => {
      bot.sendMessage(msg.chat.id, messageHelper(msg), {
        parse_mode: "HTML"
      });
      const fullname = await bot.sendMessage(msg.chat.id, "Введите ФИО", {
        reply_markup: {
          force_reply: true,
        }
      });
      bot.onReplyToMessage(msg.chat.id, fullname.message_id, async (nameMsg) => {
        const name = nameMsg.text;
        nameUser[msg.from.id] = name;
        await bot.sendMessage(msg.chat.id, `ФИО сохранено`);
      });
    });

    // bot.on('location', async (msg) => {
    //   console.log(msg, 'msgLOCATION');
    // })

    bot.onText(/\/create/, async (msg) => {
      // const fullname = await bot.sendMessage(msg.chat.id, "Введите ФИО", {
      //   reply_markup: {
      //     force_reply: true,
      //   }
      // });
      // bot.onReplyToMessage(msg.chat.id, fullname.message_id, async (nameMsg) => {
      // const name = nameMsg.text;

      const area = await bot.sendMessage(msg.chat.id, "Адрес участка", locationButton());


      bot.onReplyToMessage(msg.chat.id, area.message_id, async (nameMsg) => {
        console.log(nameMsg, 'nameMsgLOCATION');
        const location = nameMsg.location;

        const name = nameUser[msg.from.id];
        const areaObj = await AreaService.createArea(name, location, msg.from.username);
        await bot.sendMessage(msg.chat.id, `Адрес сохранен`, {
          parse_mode: "HTML"
        });
        const image = await bot.sendMessage(msg.chat.id, "Отправьте фото", {
          reply_markup: {
            force_reply: true,
          },
        });

        bot.onReplyToMessage(msg.chat.id, image.message_id, async (nameMsg) => {
          console.log(nameMsg, 'nameMsgIMAGE');
          const image = nameMsg.photo || nameMsg.document;
          console.log(image, 'image')
          await AreaService.createImage(image, areaObj._id);
          await bot.sendMessage(msg.chat.id, `Изображение сохранено`, {
            parse_mode: "HTML"
          });
          await bot.sendMessage(msg.chat.id, 'Нажмите на кнопку', MemberOptionsButton(areaObj._id)); // добавить для для второго бота
        });

        TimerController(bot, msg, areaObj); // добавить для для второго бота

        bot.onText(/\/violation/, async (msg) => {
          const violation = await bot.sendMessage(msg.chat.id, "Фотогрфия отчета", {
            reply_markup: { force_reply: true },
          });
          bot.onReplyToMessage(msg.chat.id, violation.message_id, async (nameMsg) => {
            const violationImage = nameMsg.photo || nameMsg.document;
            console.log(violationImage, 'violationImage');
            await AreaService.createViolationImage(violationImage, areaObj._id);
            await bot.sendMessage(msg.chat.id, `Изображение сохранено`);
            const violationText = await bot.sendMessage(msg.chat.id, "Описание отчета", {
              reply_markup: { force_reply: true },
            });
            bot.onReplyToMessage(msg.chat.id, violationText.message_id, async (nameMsg) => {
              const violationText = nameMsg.text;
              await AreaService.createViolationDescription(violationText, areaObj._id);
              await bot.sendMessage(msg.chat.id, `Сохранено`);
            });
          });
        });

        bot.onText(/\/members/, async (msg) => {
          await bot.sendMessage(msg.chat.id, 'Нажмите на кнопку', MemberOptionsButton(areaObj._id));
        }) // добавить для для второго бота

        bot.onText(/\/stop/, async (msg) => {
          await StopTimer(msg);
        }); // добавить для для второго бота

      });

    });


    CallbackQuery(bot); // добавить для для второго бота

  } catch (error) {
    console.log(error);
  }
};

start();