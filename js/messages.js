exports.getMessages = function(userId, token, render, renderTo){
    const request = require('request');

    let reqUrl = "http://localhost:3000/api/messages/get?token=" + token + "&userId=" + userId;
    request.get(reqUrl, (err, response) => {
        if(err || response.statusCode != 200){
            render(renderTo, JSON.parse(response.body).err, null);
        }
        else{
            render(renderTo, null, JSON.parse(response.body));
        }
    });
}

exports.renderMessages = function(renderTo, error, data){
    console.log(error);
    let users = data.users;
    let messages = data.messages;
    renderTo.innerHTML = "";
    messages.forEach((data) => {
        if(error == null){
            renderTo.innerHTML += `
            <b>${users[data.fromId].name}:</b>\n
            <p>${data.text}</p>
            ${(data.attacments == "" ? "" : `<b>Attachments: ${data.attacments}</b>`)}
            <hr>
            `;
        }
        else{
            renderTo.innerHTML = `<b style='color: red;'>ERROR: ${error}</br>`;
        }
    });
}