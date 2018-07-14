const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');

const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const prefix = '#';

client.on('ready', function() {
	console.log(`i am ready ${client.user.username}`);
	client.user.setGame('#Play');
});




client.login(process.env.BOT_TOKEN);
