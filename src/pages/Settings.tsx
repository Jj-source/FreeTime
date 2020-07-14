import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonCol, IonRow, IonList, IonItem, IonLabel, IonButton, IonContent, IonIcon, IonToggle, IonCard, IonCardContent} from '@ionic/react';
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
let pool="roomCode";
const Settings: React.FC = () => {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [roomCode, setRoomCode] = useState("");

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
      } catch (error) {
    console.log(error);
  }
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
          <IonLabel position="stacked">N. Telefono</IonLabel>
          <IonInput required type="text" onIonChange={(e:any) => setTel(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Room</IonLabel>
          <IonInput required type="text" placeholder="scrivi un nome facile da condividere!" onIonChange={(e:any) => setRoomCode(e.target.value)}></IonInput>
        </IonItem>
      </IonList>

      <IonRow className="ion-padding">
        <IonCol>
          <IonButton expand="block" color="tertiary" className="ion-activatable ripple-parent" onClick={() => saveUser(user) }>
           entra
          </IonButton>
        </IonCol>
      </IonRow>

      </IonCardContent>
      </IonCard>


    </IonContent>
    </IonPage>
  );
};

export default Settings;
export {user};
export {pool};
