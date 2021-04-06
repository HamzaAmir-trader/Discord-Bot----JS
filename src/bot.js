require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/)
        console.log(CMD_NAME);
        console.log(args);
        if (CMD_NAME === 'kick') {
            if (message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply('you do not have permissions to use that command!')
            }
            if (args.length == 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then(member => message.channel.send(`${member} was kicked`))
                    .catch(err => message.channel.send(`the member was not found :(`))
            } else {
                message.channel.send('that member was not found!')
            }
        } else if (CMD_NAME === 'ban') {
            if (message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply('you do not have permissions to use that command!')
            }
            if (args.length == 0) return message.reply('Please provide an ID');

            try {
                const user = message.guild.members.ban(args[0])
                message.channel.send(`${user} was banned successfully!`)
            } catch (err) {
                console.log(err);
                message.channel.send(`An error occurred!Either an i don't have the permission or the user was not found.`)
            }
        } else if (CMD_NAME === 'announce') {
            console.log(args);
            const msg = args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    console.log('Hello');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '829031540750286898') {
        switch (name) {
            case '🍎':
                member.roles.add('828614808706088982');
                break;
            case '🍇':
                member.roles.add('828955282422890528');
                break;
            case '🍑':
                member.roles.add('828955354712113203');
                break;
            case '🥭':
                member.roles.add('828955494957711401');
                break;
            case '☮️':
                member.roles.add('828280401217978378');
                break;
        }
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    console.log('Hello');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '829031540750286898') {
        switch (name) {
            case '🍎':
                member.roles.remove('828614808706088982');
                break;
            case '🍇':
                member.roles.remove('828955282422890528');
                break;
            case '🍑':
                member.roles.remove('828955354712113203');
                break;
            case '🥭':
                member.roles.remove('828955494957711401');
                break;
            case '☮️':
                member.roles.remove('828280401217978378');
                break;
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);