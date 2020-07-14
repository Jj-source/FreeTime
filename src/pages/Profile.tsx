import { IonContent, IonList, IonListHeader, IonItem, IonLabel, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRadioGroup, IonRadio, IonRange, useIonViewWillEnter} from '@ionic/react';
import React, { useState } from 'react';
import { beerOutline, pizza, film, walk, trophyOutline} from 'ionicons/icons';
import { environment } from '../environments/environment';
import { user } from './Settings';
import { pool } from './Settings';

let ListCosa = [
  { value: 'Mangiare fuori', ic: pizza },
  { value: 'Film', ic: film },
  { value: 'Birra', ic: beerOutline },
  { value: 'Passeggiata', ic: walk },
  { value: 'poker', ic:trophyOutline}
];
let ListDove = [
  { id: 'Vitto'},
  { id: 'Tesoriera'},
  { id: 'Parchetto'},
  { id: 'Sansa'},
  { id: 'Ruffini'},
  { id: 'Casa'}
];
const Profile: React.FC = () => {

  const [value, setValue] = useState(0);
  const [place, setPlace] = useState("");
  const [act, setAct] = useState("");
  const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 8, upper: 24 });

  async function updateUser(user: any) {
  try {
    user.oramin = rangeValue.lower;
    user.oramax = rangeValue.upper;
    user.place = place;
    user.act = act;
    console.log(environment.update);
    console.log('calling update endpoint with id ' + user.id);

    const requestBody = {
      roomCode:pool,
      id: user.id,
      name:user.name,
      tel:user.tel,
      oramin: user.oramin,
      oramax:user.oramax,
      place:user.place,
      act:user.act
    };

    const updateResponse =
      await fetch(environment.update + user.id, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers:{
          'Content-Type': 'application/json'
        }
      });
    console.log('Success');
    console.log(updateResponse.status);
  } catch (error) {
    console.log(error);
  }
}

async function selectPosti(){
  try {
    console.log(environment.readPosti);
    console.log('calling read posti');
    const output = await fetch(environment.readPosti);
    const outputJSON = await output.json();
    ListDove = Array.from(outputJSON);
    console.log('Success');
    console.log(outputJSON);
  } catch (error) {
    console.log(error);
  }
};
useIonViewWillEnter(() => {
  console.log('ionViewWillEnter pf');
  selectPosti();
});

  return (
    <IonPage>
    <IonHeader translucent>
    <IonToolbar>
      <IonTitle>Che si fa?</IonTitle>
    </IonToolbar>
  </IonHeader>
    <IonContent fullscreen >

      <IonList>
      <IonRadioGroup onIonChange={(e:any) => setAct(e.target.value)}>
      <IonListHeader>Cosa?</IonListHeader>
        {ListCosa.map(({value, ic}, i) => (
          <IonItem key={i}>
            <IonLabel>{value}</IonLabel>
            <IonRadio value={value} slot="start" />
            <IonIcon icon={ic} />
          </IonItem>
        ))}

      </IonRadioGroup>

      <IonRadioGroup onIonChange={(e:any) => setPlace(e.target.value)} >
      <IonListHeader>Dove?</IonListHeader>
      {ListDove.map(({id}, i) => (
        <IonItem key={i}>
          <IonLabel>{id}</IonLabel>
          <IonRadio slot="start" value={id}/>
        </IonItem>
      ))}
      </IonRadioGroup>

        <IonListHeader>Quando?</IonListHeader>
        <IonItem>
          <IonRange dualKnobs={true} min={8} max={24} step={0.5} snaps={true} onIonChange={e => setRangeValue(e.detail.value as any)} />
        </IonItem>
        <IonItem>
          <IonLabel>Dalle {rangeValue.lower} alle {rangeValue.upper}</IonLabel>
        </IonItem>
        <div className="ion-padding">
          <IonButton expand="block" color="tertiary" className="ion-activatable ripple-parent"  onClick={() => updateUser(user)}>
            invia
          </IonButton>
        </div>
      </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Profile;
