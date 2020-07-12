import { IonContent, IonHeader,IonGrid,IonRow,IonCol, IonPage, IonTitle, IonToolbar, IonCard,IonCardHeader,IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonRange, useIonViewWillEnter} from '@ionic/react';
import React from 'react';
import './Home.css';
import { environment } from '../environments/environment';
import { pool } from './Settings';

let Users = [
  {id:"id1", name: 'nome1', oramin: 8, oramax:12, act:"mangiare", place:"a casa" },
  {id:"id2", name: 'nome2', oramin: 8, oramax:12, act:"mangiare", place:"a casa" },
  {id:"id3", name: 'nome3', oramin: 8, oramax:12, act:"mangiare", place:"a casa" },
  {id:"id4", name: 'nome4', oramin: 8, oramax:12, act:"mangiare", place:"a casa" }
];

const Home: React.FC = () => {

  async function selectAll(){
    try {
      console.log(environment.readAll+pool);
      console.log('calling read all endpoint');
      const output = await fetch(environment.readAll+ pool);
      const outputJSON = await output.json();
      Users = Array.from(outputJSON);
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  };
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter home');
    selectAll();
  });

  return (
    <IonPage>
    <IonHeader translucent>
    <IonToolbar>
      <IonTitle>Home</IonTitle>
    </IonToolbar>
  </IonHeader>
      <IonContent fullscreen>
      <IonList>
      {Users.map(({id, name, oramin, oramax}, i) => (
        <IonItem key={i}>
          <IonLabel>{name}</IonLabel>
          <IonRange id={"questo"} dualKnobs={true} disabled={true} min={8} max={24} step={0.5} snaps={true} />
        </IonItem>
      ))}
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
