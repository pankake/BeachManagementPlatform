
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var cors = require('cors')
var path = require('path')
var http = require('http').createServer(app);
var PORT = 3000;

const {WIND_STRENGTH} = require('./wind_strength_tresholds');
const {ALERTS} = require('./alerts');
const {UV_INTESITY} = require("./uv_protection_tresholds");

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

const Beach = require('./database/models/beach');
const __views = './views';

global.appRoot = path.resolve(__dirname);
mongoose.connect('mongodb://localhost/beachmp_db', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())
app.use(express.json());


io.on('connection', (socket) => {
  console.log('node server - new connection made');

  socket.on('eventWind', (city, wind) => {
    console.log('[node server] - received wind data: ');
    console.log(city);
    console.log('wind: ' + wind);
    elaborateWindData(socket, city, wind);
  });

  socket.on('eventUV', (city, uv) => {
    console.log('[node server] - received UV data: ');
    console.log(city);
    console.log('uv index: ' + uv);
    elaborateUVData(socket, city,uv)
  });
});

function sendWindAlert(socket, message, alertType) {
  console.log('message: ' + message);
  console.log('alertType: ' + alertType);

  socket.emit('eventAlert', {
    message: message, alertType
  });
  socket.broadcast.emit('eventAlert',{
    message: message, alertType
  });
}

function sendUVAlert(socket, message, alertType) {
  console.log('message: ' + message);
  console.log('alertType: ' + alertType);

  socket.timeout(5000).emit('eventAlertUV', {
    message: message, alertType
  });
  socket.timeout(5000).broadcast.emit('eventAlertUV',{
    message: message, alertType
  });
}

function elaborateUVData(socket, city, uv) {

  if (parseInt(uv) < 3)
    sendUVAlert(socket, elaborateUVMsg(ALERTS.notify, UV_INTESITY.low, city, uv), ALERTS.notify)

  else if (parseInt(uv) >= 3 && parseInt(uv) < 7)
    sendUVAlert(socket, elaborateUVMsg(ALERTS.warning, UV_INTESITY.medium, city, uv), ALERTS.warning)

  else if (parseInt(uv) >= 7 && parseInt(uv) < 11)
    sendUVAlert(socket, elaborateUVMsg(ALERTS.warning, UV_INTESITY.high, city, uv), ALERTS.warning)

  else if (parseInt(uv) >= 11)
    sendUVAlert(socket, elaborateUVMsg(ALERTS.danger, UV_INTESITY.very_high, city, uv), ALERTS.danger)
}

function elaborateWindData(socket, city, wind) {

  if (parseInt(wind) < 1)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.notify, WIND_STRENGTH.level_0, city, wind), ALERTS.notify);

  else if (parseInt(wind) >= 1 && parseInt(wind) < 6)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.notify, WIND_STRENGTH.level_1, city, wind), ALERTS.notify);

  else if (parseInt(wind) >= 6 && parseInt(wind) < 12)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.notify, WIND_STRENGTH.level_2, city, wind), ALERTS.notify);

  else if (parseInt(wind) >= 12 && parseInt(wind) < 20)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.notify, WIND_STRENGTH.level_3, city, wind), ALERTS.notify);

  else if (parseInt(wind) >= 20 && parseInt(wind) < 29)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.warning, WIND_STRENGTH.level_4, city, wind), ALERTS.warning);

  else if (parseInt(wind) >= 29 && parseInt(wind) < 39)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.warning, WIND_STRENGTH.level_5, city, wind), ALERTS.warning);

  else if (parseInt(wind) >= 39 && parseInt(wind) < 50)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.warning, WIND_STRENGTH.level_6, city, wind), ALERTS.warning);

  else if (parseInt(wind) >= 50 && parseInt(wind) < 62)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.warning, WIND_STRENGTH.level_7, city, wind), ALERTS.warning);

  else if (parseInt(wind) >= 62 && parseInt(wind) < 75)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.danger, WIND_STRENGTH.level_8, city, wind), ALERTS.danger);

  else if (parseInt(wind) >= 75 && parseInt(wind) < 89)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.danger, WIND_STRENGTH.level_9, city, wind), ALERTS.danger);

  else if (parseInt(wind) >= 89 && parseInt(wind) < 103)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.danger, WIND_STRENGTH.level_10, city, wind), ALERTS.danger);

  else if (parseInt(wind) >= 103 && parseInt(wind) < 118)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.danger, WIND_STRENGTH.level_11, city, wind), ALERTS.danger);

  else if (parseInt(wind) >= 118)
    sendWindAlert(socket, elaborateWindMsg(ALERTS.danger, WIND_STRENGTH.level_12, city, wind), ALERTS.danger);
}

function elaborateWindMsg(type, text, city, wind) {

  let msg = '';
  let msg_top = '';

  if(type == ALERTS.notify)
    msg_top = ' with winds at ' + wind;
  else if(type == ALERTS.warning)
    msg_top = ': pay attention to children';
  else if(type == ALERTS.danger)
    msg_top = ': danger to children';

  console.log("msg top " + msg_top);

  msg = '[' + type + '] ' + text + ' today in ' + city + msg_top;

  return msg;
}

function elaborateUVMsg(type, text, city, uv) {

  let msg = '';
  let msg_top = '';

  if(type == ALERTS.notify)
    msg_top = ' with UV index at: ' + uv;
  else if(type == ALERTS.warning)
    msg_top = ': protect yourself with sunscreen';
  else if(type == ALERTS.danger)
    msg_top = ': avoid sun exposure';

  console.log("msg top " + msg_top);

  msg = '[' + type + '] Solar radiation ' + text + ' in ' + city + msg_top;

  return msg;
}

/* Beach URLs */
app.get('/beaches', (req, res) => {
  Beach.find({})
    .then(beaches => {
      if (!beaches.length)
        res.status(204);
      res.send(beaches);
    })
    .catch((error) => console.log(error));
});

app.post('/beaches', (req, res) => {
  (new Beach({ '_beachId': req.params.beachId, 'title': req.body.title, 'city': req.body.city, 'address': req.body.address,
    'services': req.body.services, 'picture': req.body.picture, 'gallery': req.body.gallery, 'coordinates': req.body.coordinates}))
    .save()
    .then((beach) => res.send(beach))
    .catch((error) => console.log(error));
});

/* get beach from title */
app.get('/beaches/:title', (req, res) => {
  Beach.find({ title: req.params.title })
    .then((beach) => res.send(beach))
    .catch((error) => console.log(error));
})

/* update from title */
app.patch('/beaches/:title', (req, res) => {
  Beach.findOneAndUpdate({ 'title': req.params.title}, { $set: req.body })
    .then((beach) => res.send(beach))
    .catch((error) => console.log(error));
})

/*
/!* delete from title *!/
app.delete('/beaches/:title', (req, res) => {
  Beach.findOneAndDelete({ title: req.params.title }, { $set: req.body })
    .then((beach) => res.send(beach))
    .catch((error) => console.log(error));
});
*/

/* delete from id */
app.delete('/beaches/:beachId', (req, res) => {
  Beach.findByIdAndDelete(req.params.beachId, { $set: req.body })
    .then((beach) => res.send(beach))
    .catch((error) => console.log(error));
});

/*
app.delete('/lists/:listId', (req, res) => {
  const deleteTasks = (list) => {
Beach.deleteMany({ _listId: list._id })
  .then(() => list) // ritorna la lista eliminata
  .catch((error) => console.log(error));
  };
  const list = List.findByIdAndDelete(req.params.listId)
    .then((list) => res.send(deleteTasks(list)))
    .catch((error) => console.log(error));
  res.status(200).send(list);
}) */

http.listen(PORT, function () {
  console.log('Node API server started on port '+PORT);
});


