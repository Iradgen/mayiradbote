const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "+";

Client.on("ready", () => {
    console.log("bot oppérationnel");
    Client.user.setActivity('Bot en développement par Iradgeniusman#0001', {type : 'PLAYING'})
});

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé !");
    member.guild.channels.cache.find(channel => channel.id === "851537558050701312").send(member.displayName + " est arrivé, bienvenue a toi !\nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur");
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre nous a quitté.");
    member.guild.channels.cache.find(channel => channel.id === "851537558050701312").send(member.displayName + "Un membre nous a quitté. :sob: ");
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    var embed = new Discord.MessageEmbed()
        .setColor("FC0000")
        .setTitle("Règlement du serveur")
        .setURL("")
        .setAuthor("Règlement écrit par Zaiider10", "https://cdn.discordapp.com/attachments/688801446073860182/855717762655846400/MOSHED-2021-6-18-23-21-24.gif", "https://twitch.tv/ZaiiDer10")
        .setDescription("Bonjour et bienvenue, voici le règlement a respecter sur le serveur.")
        .setThumbnail("")
        .addField("Titre", "contenu", false)
        .addField("\u200B" , false)
        .addField("Titre du champs2", "contenu2", true)
        .addField("Titre du champs3", "contenu3", false)
        .setImage("")
        .setTimestamp()
        .setFooter("Embed par Iradgeniusman#0001", "https://cdn.discordapp.com/attachments/688801446073860182/855460343172825088/MOSHED-2021-6-10-19-19-34.gif")
        ;
        


    if(message.member.permissions.has(["ADMINISTRATOR"])){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre Non ou Mal Mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a bien été banni");
                }
                else {
                    message.reply("Je ne peux pas bannir ce membre.")

                }
            }
        
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre Non ou Mal Mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a bien été kick.")
                }
                else {
                    message.reply("Je ne peux pas kick ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre Non ou Mal Mentionné.");
            }
            else {
                mention.roles.add("858082065626038272")
                mention.roles.remove("858082075147632730")
                message.reply(mention.displayName + " a bien été mute.")
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre Non ou Mal Mentionné.")
            }
            else {
                mention.roles.remove("858082065626038272")
                mention.roles.add("858082075147632730")
                message.channel.send(mention.displayName + " a bien été unmute.")
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Mention Non ou Mal Mentionné.")
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("858082065626038272")
                mention.roles.remove("858082075147632730")
                message.channel.send("<@" + mention.id + "> Tu as été mute pour un certain temps.")
                setTimeout(function() {
                    mention.roles.remove("858082065626038272")
                    mention.roles.add("858082075147632730")
                    message.channel.send("<@" + mention.id + "> Tu peux désormais parler.");
                }, args [2] * 1000);
                
            }
        }
    }

    if(message.content == prefix + "fdp"){
        message.channel.send("<@668852741354815544> est un fdp")
    }

    if(message.content == prefix + "Aquenta"){
        message.channel.send("<@668852741354815544> est le co-fondateur du serveur !")
    }

    if(message.content == prefix + "Co-Fondateur"){
        message.channel.send("<@668852741354815544> est le co-fondateur du serveur !")
    }
    
    //+ping
    if(message.content == prefix + "ping"){
        message.reply("pong");
    }

    if(message.content == prefix + "stats"){
        message.channel.send("**" + message.author.username + "** qui a pour id : __" + message.author.id + "__ a envoyé un message.");
    }
});

Client.on("message", message => {
    if(message.member.permissions.has("SEND_MESSAGES")){
        if(message.content == prefix + "regles"){
            message.reply("tu peux trouver le règlement dans le salon <#858082097633558528> !")
        }
    }
})

Client.on("message", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de messages non ou mal déffini.");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Nombre de messages non ou mal déffini.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + messages.size + " messages effectuée.");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    })
                }
            }
        }
    }
})

client.login(process.env.BOT_TOKEN);