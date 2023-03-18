import cron from 'node-cron';
import AreaService from "../service/area-service.js";

let job = {};

const TimerController = async (bot, msg) => {
    const areaObj = await AreaService.getAreaByChatId(msg.chat.id);
    const task = cron.schedule('0 */1 * * *', async () => {             //every hour
        // const task = cron.schedule('* * * * *', async () => {           //every minute
        const timer = await bot.sendMessage(msg.chat.id, 'Сколько участников', { reply_markup: { force_reply: true } });
        bot.onReplyToMessage(msg.chat.id, timer.message_id, async (nameMsg) => {
            const countMembers = nameMsg.text;
            if (
                countMembers === undefined ||
                isNaN(countMembers)
              ) {
                await bot.sendMessage(msg.chat.id, "Номер не найден");
                return;
              }
            console.log(countMembers, 'time')
            await AreaService.updateCountMembers(countMembers, areaObj._id);
            await bot.sendMessage(nameMsg.chat.id, 'Сохранено', {
                parse_mode: "HTML"
            });
        });
    });
    job[msg.chat.id] = task;
}

const StopTimer = (msg) => {
    if (job[msg.chat.id]) {
        job[msg.chat.id].stop();
    }
}

export { TimerController, StopTimer };