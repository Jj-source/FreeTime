import { IonContent, IonText,IonHeader,IonGrid,IonRow,IonCol, IonPage, IonTitle, IonToolbar, IonCard,IonCardHeader,IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonRange, useIonViewWillEnter} from '@ionic/react';
import React from 'react';
import './Home.css';
import { environment } from '../environments/environment';
import { pool } from './Settings';

let Users = [
  {id:"id1", name: 'Jacopo', oramin: 15, oramax:24, act:"Mangiare fuori", place:"Tesoriera" },
];
let nomeSerata="Home";
let postoVoto="Tesoriera";
let oraMinVoto="15";
let oraMaxVoto="24";
const Home: React.FC = () => {

  async function selectAll(){
    try {
      console.log(environment.readAll+pool);
      console.log('calling read all endpoint');
      const output = await fetch(environment.readAll+pool);
      const outputJSON = await output.json();
      Users = Array.from(outputJSON);
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
    voto();
  };
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter home');
    selectAll();
    if(pool === ""){}else{nomeSerata=pool;}
  });

function voto(){
  
}

  return (
    <IonPage>
    <IonHeader translucent>
    <IonToolbar>
      <IonTitle>{nomeSerata}</IonTitle>
    </IonToolbar>
  </IonHeader>
      <IonContent fullscreen>
      <IonList>
        <IonItem>
          <p>Posto più votato: {postoVoto}</p>
        </IonItem>
        <IonItem>
          <p>Orario migliore: dalle {oraMinVoto} alle {oraMaxVoto}</p>
        </IonItem>
      </IonList>

      {Users.map(({name, place, act, oramin, oramax}, i) => (
        <IonItem key={i}>
        <IonCard >
        <IonCardHeader>
            <IonCardTitle>{name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel>{place} | {act} | dalle {oramin} alle {oramax}</IonLabel>
        </IonCardContent>
        </IonCard>
        </IonItem>
      ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
