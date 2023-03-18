import TelegramBot from "node-telegram-bot-api";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import area from "./models/area.js";

import { MemberOptionsButton, locationButton } from "./helpers/options.js";
import AreaService from "./service/area-service.js";
import { TimerController, StopTimer } from "./controller/timer-controller.js";
import CallbackQuery from "./controller/callbackQuery.js";
import axios from "axios";

dotenv.config();

const port = 5000;
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const messageHelper = (msg) => (
  `Привет, <b>${msg.from.first_name}!</b> Я бот, который поможет тебе вести учет твоих участков. 

  Список команд: 
  /start - начать работу с ботом
  /create - Определить избирательный участок и отправить фото участка
  /violation  - Добавить фото фактов нарушения 
  /members - Ввести количество новых проголосовавших участников в ручную 

  Для создания локации введите команду /create. Вам будет приходить сообщение от бота с запросом на ввод ФИО, геолокации и фото.
  Если хотите добавить новый участок или вы ввели неверные данные, то введите команду /create и начните сначала.

  Сәлеметсізбе, <b>${msg.from.first_name}!</b> Мен ботпын, Сізге дауыс берген сайлаушылардың санағын өткізуге көмектесемін.
  /start - ботпен жұмысты бастау
  /create - Саулау бөлімшесін анықтау және бөлімше фотосын жіберу
  /violation  - Заңбұзушылық фактінің фотосын жіберу 
  /members - дауыс берген жаңа сайлаушылардың санын енгізу 

  Сайлау бөлімшесінің орналасуын анықтау үшін /create пернесін басыңыз. Осыдан кейін бот Сізден аты-жөніңіз, геолокация және фотоны жіберуіңізді сұрайды. Егер Сіз жаңа сайлау бөлімшесін қосқыңыз келсе немесе қате мәліметтер енгізген жағдайда /create пернесін басып, қайтадан бастаңыз.
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
      { command: '/members', description: 'Количество новых участников' }, // добавить для  второго бота
      { command: '/stop', description: 'Остановить' }, // добавить для  второго бота
    ]);

    const nameUser = {};
    const pollingStation = {};
    let areaId = {};

    bot.onText(/\/start/, async (msg) => {
      bot.sendMessage(msg.chat.id, messageHelper(msg), {
        parse_mode: "HTML"
      });
      const fullname = await bot.sendMessage(msg.chat.id, "Введите ФИО (Ксения Витальевна)", {
        reply_markup: {
          force_reply: true,
        }
      });
      bot.onReplyToMessage(msg.chat.id, fullname.message_id, async (nameMsg) => {
        const name = nameMsg.text;
        // const regex = /^(([a-zA-Zа-яА-Я]+[\-\']?)*([a-zA-Zа-яА-Я]+)?\s)+([a-zA-Zа-яА-Я]+[\-\']?)*([a-zA-Zа-яА-Я]+)?$/
        if (
          name === undefined
        ) {
          await bot.sendMessage(msg.chat.id, "Имя не найдено, чтобы создать участок вы должны нажать на /start");
          return;
        }

        name.toString();

        nameUser[msg.from.id] = name;

        await bot.sendMessage(msg.chat.id, `ФИО сохранено`);
        const pollingStationNumber = await bot.sendMessage(msg.chat.id, "Введите номер избирательного участка", {
          reply_markup: {
            force_reply: true,
          }
        });
        bot.onReplyToMessage(msg.chat.id, pollingStationNumber.message_id, async (nameMsg) => {
          const pollingStationNumber = nameMsg.text;

          if (
            pollingStationNumber === undefined ||
            isNaN(pollingStationNumber)
          ) {
            await bot.sendMessage(msg.chat.id, "Номер избирательного участка не найден, нажмите на /start");
            return;
          }

          pollingStation[msg.from.id] = pollingStationNumber;
          await bot.sendMessage(msg.chat.id, `Номер избирательного участка сохранен`);
        });
      });
    });

    bot.onText(/\/create/, async (msg) => {
      await StopTimer(msg);
      bot.removeTextListener(/\/members/);
      bot.removeTextListener(/\/violation/);
      bot.removeTextListener(/\/stop/);
      // areaId = {};
      if (!nameUser[msg.from.id]) {
        await bot.sendMessage(msg.chat.id, "Имя не найдено, чтобы создать участок вы должны нажать на /start");
        return;
      }

      await bot.sendMessage(msg.chat.id, "Адрес участка", locationButton());

      bot.onText(/\/violation/, async (msg) => {
        const areaObj = await AreaService.getAreaByChatId(msg.chat.id);
        const violation = await bot.sendMessage(msg.chat.id, "Фотогрфия отчета", {
          reply_markup: { force_reply: true },
        });
        bot.onReplyToMessage(msg.chat.id, violation.message_id, async (nameMsg) => {
          const image = nameMsg.photo || nameMsg.document;
          if (image === undefined) {
            await bot.sendMessage(msg.chat.id, "Изображение не найдено, нажмите на /violation");
            return;
          }
          const photoId = image[image.length - 1].file_id || image.file_id;
          const photoUrl = await bot.getFileLink(photoId);

          await bot.sendMessage(msg.chat.id, `Изображение сохранено`);

          const violationText = await bot.sendMessage(msg.chat.id, "Описание отчета", {
            reply_markup: { force_reply: true },
          });

          bot.onReplyToMessage(msg.chat.id, violationText.message_id, async (nameMsg) => {
            const violationText = nameMsg.text;

            if (violationText === undefined || typeof violationText !== 'string') {
              await bot.sendMessage(msg.chat.id, "Описание не найдено, нажмите на /violation");
              return;
            }

            const violationResp = await AreaService.createViolationImage(photoUrl, areaObj._id);
            if (violationResp?.violation?.length > 0) {
              await axios.get(process.env.IMAGE_UPLOAD_URL + areaObj._id);
            }
            await AreaService.createViolationDescription(violationText, areaObj._id);
            await bot.sendMessage(msg.chat.id, `Сохранено`);
          });


        });
      });

      bot.onText(/\/members/, async (msg) => {
        const areaObj = await AreaService.getAreaByChatId(msg.chat.id);
        bot.sendMessage(msg.chat.id, 'Нажмите на кнопку', MemberOptionsButton(areaObj._id));
      })

      bot.onText(/\/stop/, async (msg) => {
        await StopTimer(msg);
      });
    });

    bot.on('location', async (msg) => {
      const location = msg.location;
      if (location === undefined) {
        await bot.sendMessage(msg.chat.id, "Адрес не найден, нажмите на /create");
        return;
      }
      const name = nameUser[msg.from.id];

      await bot.sendMessage(msg.chat.id, `Адрес сохранен`, {
        parse_mode: "HTML"
      });

      const image = await bot.sendMessage(msg.chat.id, "Отправьте фото", {
        reply_markup: {
          force_reply: true,
        },
      });

      bot.onReplyToMessage(msg.chat.id, image.message_id, async (nameMsg) => {
        const image = nameMsg.photo || nameMsg.document;
        if (image === undefined) {
          await bot.sendMessage(msg.chat.id, "Фото не найдено, нажмите на /create");
          return;
        }

        const photoId = image[image.length - 1].file_id || image.file_id;
        const photoUrl = await bot.getFileLink(photoId);

        await AreaService.createArea(name, location, msg.from.username, pollingStation[msg.from.id], msg.chat.id);
        // areaId[msg.from.id] = areaObj._id;
        const areaObj = await AreaService.getAreaByChatId(msg.chat.id);
        console.log(areaObj, 'areaObj')

        const imagesResp = await AreaService.createImage(photoUrl, areaObj._id);
        await bot.sendMessage(msg.chat.id, `Изображение сохранено`, {
          parse_mode: "HTML"
        });
        console.log(imagesResp, 'imagesResp')

        if (imagesResp?.images?.fileId) {
          await axios.get(process.env.IMAGE_UPLOAD_URL + areaObj._id);
        }
      });

      TimerController(bot, msg);
    });



    CallbackQuery(bot); // добавить для для второго бота

  } catch (error) {
    console.log(error);
  }
};

start();