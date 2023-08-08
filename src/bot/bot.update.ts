import { BotService } from './bot.service';
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    // console.log(ctx);

    // return 'Assalomu alaykum ';
    return this.botService.start(ctx);
  }
  @Command('stop')
  async onStop(@Ctx() ctx: Context) {
    return this.botService.onStop(ctx);
  }
  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  // @On('photo')
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ('photo' in ctx.message) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
  //     );
  //   }
  // }
  // @On('video')
  // async onVideo(@Ctx() ctx: Context) {
  //   if ('video' in ctx.message) {
  //     await ctx.replyWithPhoto(String(ctx.message.video.file_name));
  //   }
  // }
  // @On('sticker')
  // async onSticker(@Ctx() ctx: Context) {
  //   if ('sticker' in ctx.message) {
  //     await ctx.reply('👍');
  //   }
  // }

  // @On('animation')
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ('animation' in ctx.message) {
  //     await ctx.reply('Animate1');
  //   }
  // }

  // @On('contact')
  // async onContact(@Ctx() ctx: Context) {
  //   if ('contact' in ctx.message) {
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }

  // @On('location')
  // async onLocation(@Ctx() ctx: Context) {
  //   if ('location' in ctx.message) {
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //   }
  // }

  // @On('channel_post')
  // async onChanelPost(@Ctx() ctx: Context) {
  //   if ('channel_post' in ctx.message) {
  //     await ctx.reply(String(ctx.message.channel_post));
  //   }
  // }

  // // Telegram orqali tulovlarda ishlatiladi
  // @On('invoice')
  // async onInvoice(@Ctx() ctx: Context) {
  //   if ('invoice' in ctx.message) {
  //     await ctx.reply(String(ctx.message.invoice.title));
  //   }
  // }
  // // ovozli habarlarni ushlaash un
  // @On('voice')
  // async onvoice(@Ctx() ctx: Context) {
  //   if ('voice' in ctx.message) {
  //     await ctx.reply(String(ctx.message.voice.duration)); // durat
  //   }
  // }

  // @On('document')
  // async onDocument(@Ctx() ctx: Context) {
  //   if ('document' in ctx.message) {
  //     await ctx.reply(String(ctx.message.document.file_name));
  //   }
  // }
  // //elektron visitka
  // @On('venue')
  // async onVenue(@Ctx() ctx: Context) {
  //   if ('venue' in ctx.message) {
  //     await ctx.reply(String(ctx.message.venue.address));
  //   }
  // }
  // @Hears('hi')
  // async hears(@Ctx() ctx: Context) {
  //   await ctx.reply('Hey there');
  // }

  // @Command('inline_keyboard')
  // async InlineButton(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       { text: 'Button 1', callback_data: 'button1' },
  //       { text: 'Button 2', callback_data: 'button2' },
  //       { text: 'Button 3', callback_data: 'button3' },
  //     ],
  //     [{ text: 'Button 5', callback_data: 'button5' }],
  //     [{ text: 'Button 6', callback_data: 'button6' }],
  //   ];
  //   ctx.reply('Choose a inline button:', {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // // @Action('button+[]')
  // // async onActionButton(@Ctx() ctx: Context) {
  // //   await ctx.reply('You pressed Button 1!');
  // // }

  // @Action('button1')
  // async onActionButton1(@Ctx() ctx: Context) {
  //   await ctx.reply('You pressed Button 1!');
  // }
  // @Action('button2')
  // async onActionButton2(@Ctx() ctx: Context) {
  //   await ctx.reply('You pressed Button 2!');
  // }
  // @Action('button3')
  // async onActionButton3(@Ctx() ctx: Context) {
  //   await ctx.reply('You pressed Button 3!');
  // }
  // @Action('button4')
  // async onActionButton4(@Ctx() ctx: Context) {
  //   await ctx.reply('You pressed Button 4!');
  // }
  // @Action('button5')
  // async onActionButton5(@Ctx() ctx: Context) {
  //   await ctx.reply('You pressed Button 5!');
  // }
  // @Action('button6')
  // async onActionButton6(@Ctx() ctx: Context) {
  //   await ctx.reply('You pressed Button 6!');
  // }
  // @Command('main_keyboard')
  // async mainButton(@Ctx() ctx: Context) {
  //   ctx.reply(`Choose a main button:`, {
  //     parse_mode: 'HTML',
  //     ...Markup.keyboard([
  //       ['Bir', 'Ikki', 'Uch'],
  //       ['Turt'],
  //       [Markup.button.contactRequest('Telefon raqamni yuborish')],
  //       [Markup.button.locationRequest('Joylashuvni yuborish')],
  //     ])
  //       .oneTime()
  //       .resize(),
  //   });
  // }
  // @Hears('Bir')
  // async onBirButton(@Ctx() ctx: Context) {
  //   await ctx.reply('Bir bosildi');
  // }
  // @Hears('Ikki')
  // async onIkkiButton(@Ctx() ctx: Context) {
  //   await ctx.reply('Ikki bosildi');
  // }
  // @Hears('Uch')
  // async onUchButton(@Ctx() ctx: Context) {
  //   await ctx.reply('Uch bosildi');
  // }
  // @Hears('Turt')
  // async onTurtButton(@Ctx() ctx: Context) {
  //   await ctx.reply('Turt bosildi');
  // }

  // @On('text')
  // async hears(@Ctx() ctx: Context) {
  //   await ctx.reply('Hey there');
  // }
}
