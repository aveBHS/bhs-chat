exports.getUser = function(userId, render, renderTo){
    const request = require('request');

    let reqUrl = "http://localhost:3000/api/users/" + userId;
    request.get(reqUrl, (err, response) => {
        if(err || response.statusCode != 200){
            render(renderTo, JSON.parse(response.body).err, null);
        }
        else{
            render(renderTo, null, JSON.parse(response.body));
        }
    });
}

exports.renderUser = function(renderTo, error, data){
    console.log(error);
    if(error == null){
        renderTo.innerHTML = `
        <b>Аватарка: </b><br>\n
        <img src="${data.ava}" width="100px" height="100px"><br>\n
        <b>ФИО: </b> ${data.name}<br>\n
        <b>Возраст: </b> ${data.age} лет<br>\n
        <b>Пол: </b> ${["Мужчина", "Женщина"][data.sex]}<br>\n
        <b>Место жительства: </b> ${data.contry}<br>
        `;
    }
    else{
        renderTo.innerHTML = `<b style='color: red;'>ERROR: ${error}</br>`;
    }
}