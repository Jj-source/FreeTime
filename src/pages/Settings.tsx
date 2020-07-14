import React, { useState } from 'react';
import { IonPage,IonToast, IonHeader, IonToolbar, IonTitle, IonInput, IonCol, IonRow, IonList, IonItem, IonLabel, IonButton, IonContent, IonIcon, IonToggle, IonCard, IonCardContent} from '@ionic/react';
import { moon } from 'ionicons/icons';
import { environment } from '../environments/environment';

let user={
  id:"",
  name:"",
  tel:"",
  oramin: "",
  oramax:"",
  place:"",
  act:""
};
let temporaryUser={tel:""};
let pool="Serata Epica";

const Settings: React.FC = () => {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);

    const toggleDarkModeHandler = () => {
      document.body.classList.toggle("dark");
    };

    async function saveUser(user: any) {
      try {
        user.id = name;
        user.name = name;
        user.tel=tel;
        pool=roomCode;
        console.log(environment.create);
        console.log('calling create user endpoint with: ' + user.name);

        const requestBody = {
          roomCode:roomCode,
          id:user.id,
          name:user.name,
          tel:user.tel,
          oramin:user.oramin,
          oramax:user.oramax,
          place:user.place,
          act:user.act
        };
        console.log(requestBody);

        const createResponse =
          await fetch(environment.create, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
              'Content-Type': 'application/json'
            }
          });
        console.log('Success');
        console.log(createResponse.status);
        if(createResponse.status === 200){
            setShowToast1(true);
        }else{
            setShowToast3(true);
        }
      } catch (error) {
    console.log(error);
  }
};

function handleClickNewUser(e:any) {
  if(name==="" || roomCode==="" || tel===""){
    setShowToast3(true);
    return
  }else{
  saveUser(e);
}}
function handleClickOldUser(e:any) {
  if(name==="" || roomCode==="" || tel===""){
    setShowToast3(true);
    return
  }else{
    user.id = name;
    user.name = name;
    user.tel=tel;
    pool=roomCode;
    selectTel();
}}
async function selectTel(){
  try {
    console.log(environment.readAll+pool+"/"+name);
    const output = await fetch(environment.readAll+pool+"/"+name);
    const outputJSON = await output.json();
    temporaryUser = outputJSON;
  } catch (error) {
    console.log(error);
  }
  if(temporaryUser.tel===tel){
    setShowToast1(true);
  }else{
    setShowToast2(true);
    user.id = "";
    user.name = "";
    user.tel= "";
    pool="";
  }
  temporaryUser={tel:""};
};

   return (
     <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <IonList className="ion-margin-top">
        <IonItem>
          <IonIcon slot="start" icon={moon} />
            <IonLabel>Dark Mode</IonLabel>
              <IonToggle
                slot="end"
                name="darkMode"
                onIonChange={toggleDarkModeHandler}
              />
        </IonItem>
      </IonList>

      <IonCard>
      <IonCardContent>
      <IonList lines="full" className="ion-margin-top">
        <IonItem>
          <IonLabel position="stacked">Nickname</IonLabel>
          <IonInput required type="text" onIonChange={(e:any) => setName(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Codice</IonLabel>
          <IonInput required type="text" placeholder="La tua password" onIonChange={(e:any) => setTel(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Room</IonLabel>
          <IonInput required type="text" placeholder="scrivi un nome facile da condividere!" onIonChange={(e:any) => setRoomCode(e.target.value)}></IonInput>
        </IonItem>
      </IonList>

      <IonRow className="ion-padding">
        <IonCol>
          <IonButton expand="block" color="tertiary" className="ion-activatable ripple-parent" onClick={() => handleClickNewUser(user) }>
           Crea
          </IonButton>
          <IonButton expand="block" color="tertiary" className="ion-activatable ripple-parent" onClick={() => handleClickOldUser(user) }>
           Entra
          </IonButton>
        </IonCol>
      </IonRow>

      </IonCardContent>
      </IonCard>

      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Benvenuto!"
        duration={500}
      />
      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Codice sbagliato! Esiste già un account a questo nome"
        duration={500}
      />
      <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message="C'è stato un errore, riprova"
        duration={500}
      />
    </IonContent>
    </IonPage>
  );
};

export default Settings;
export {user};
export {pool};
