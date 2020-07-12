const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-api-9a206..firebaseio.com"
});
const db = admin.firestore();


const express = require('express');
const app = express();
const cors = require('cors');
app.use( cors({origin:true}));


// crea la room e l'utente, o aggiunge utente alla room

app.post('/api/create', (req, res) => {
    (async () => {
        try {
          await db.collection(req.body.roomCode).doc('/' + req.body.id + '/')
              .create({
                name: req.body.name,
                oramin: req.body.oramin,
                oramax: req.body.oramax,
                place:req.body.place,
                act: req.body.act
              });
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

    // read item
app.get('/api/read/:roomCode/:user_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection(req.params.roomCode).doc(req.params.user_id);
            let user = await document.get();
            let response = user.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

    // read all
        app.get('/api/read/:roomCode', (req, res) => {
    (async () => {
        try {
            let query = db.collection(req.params.roomCode);
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedUser = {
                  id: doc.id,
                  name: doc.data().name,
                  oramin: doc.data().oramin,
                  oramax: doc.data().oramax,
                  place:doc.data().place,
                  act: doc.data().act
                };
                response.push(selectedUser);
            } return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

        // update, può aggiungere campi all'user
        app.put('/api/update/:user_id', (req, res) => {
        (async () => {
            try {
                const document = db.collection(req.body.roomCode).doc(req.params.user_id);
                await document.update({
                    name: req.body.name,
                    oramin: req.body.oramin,
                    oramax: req.body.oramax,
                    place:req.body.place,
                    act: req.body.act
                });
                return res.status(200).send();
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            })();
        });

        // delete
        app.delete('/api/delete/:roomCode', (req, res) => {
        (async () => {
            try {
                const document = db.collection(req.params.roomCode);
                await document.delete();
                return res.status(200).send();
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            })();
        });


exports.app = functions.https.onRequest(app);
