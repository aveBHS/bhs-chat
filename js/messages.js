exports.getMessages = function(userId, token, render, renderTo){
    const request = require('request');

    let reqUrl = "http://localhost:3000/api/messages/get?token=" + token + "&userId=" + userId;
    request.get(reqUrl, (err, response) => {
        if(err || response.statusCode != 200){
            render(renderTo, JSON.parse(response.body).err, null, null);
        }
        else{
            if(JSON.parse(response.body).err != undefined){
                render(renderTo, JSON.parse(response.body).err, null, null);
            }
            else{
                render(renderTo, null, JSON.parse(response.body), userId);
            }
        }
    });
}

exports.sendMessage = function(userId, token, text, attacments, callback){
    const request = require('request');

    let reqUrl = "http://localhost:3000/api/messages/send?token=" + token + 
    "&userId=" + userId + 
    "&text=" + encodeURIComponent(text) + 
    "&attachments=" + attacments;
    request.get(reqUrl, (err, response) => {
        if(err){
            callback(err);
        }
        else{
            if(JSON.parse(response.body).err != undefined){
                callback(JSON.parse(response.body).err);
            }
            else{
                callback("OK");
            }
        }
    });
}

exports.renderMessages = function(renderTo, error, data, userId){
    if(error != null){
        renderTo.innerHTML = `<b style='color: red;'>ERROR: ${error}</br>`;
        console.log(error);
        return;
    }

    let users = data.users;
    let messages = data.messages;
    renderTo.innerHTML = "";

    messages.forEach((data) => {
        if(error == null){
            renderTo.innerHTML += `<div style="${userId != data.fromId ? "background: #EEE" : ""}">
            <b>${users[data.fromId].name}:</b>\n
            <p>${data.text}</p>
            ${(data.attacments == "" ? "" : `<b>Attachments: ${data.attacments}</b>`)}
            </div>
            `;
        }
        else{
            renderTo.innerHTML = `<b style='color: red;'>ERROR: ${error}</br>`;
        }
    });
}