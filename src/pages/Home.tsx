import { IonContent, IonText,IonHeader,IonGrid,IonRow,IonCol, IonPage, IonTitle, IonToolbar, IonCard,IonCardHeader,IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonRange, useIonViewWillEnter} from '@ionic/react';
import React from 'react';
import './Home.css';
import { environment } from '../environments/environment';
import { pool } from './Settings';

let Users = [
  {name: 'Jacopo', oramin: 15, oramax:24, act:"Mangiare fuori", place:"Tesoriera" },
];
let nomeSerata="Home";
let postoVoto="Ruffini";
let orario="Orario migliore:";
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
    votoPosto();
    votoOrario();
  };
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter home');
    selectAll();
    if(pool === ""){}else{nomeSerata=pool;}
  });

function votoPosto(){
  let votes = new Map();
  Users.forEach(element => {
    if(votes.has(element.place)){
      votes.set(element.place, votes.get(element.place) + 1)
    }else{
      votes.set(element.place, 1)
    }
  });
  let maxvotes = 0;
  votes.forEach((value, key) => {
    if(votes.get(key)>maxvotes){
      maxvotes = votes.get(key);
      postoVoto = key;
    }
  });
}

function votoOrario(){
  let oraMinProv = Users[0].oramin;
  let oraMaxProv = Users[0].oramax;
  for (let i=0;i<Users.length;i++){
    let r1s=oraMinProv;
    let r1e=oraMaxProv;
    let r2s=Users[i].oramin;
    let r2e=Users[i].oramax;
    if (r1s >= r2s && r1s <= r2e || r1e >= r2s && r1e <= r2e || r2s >= r1s && r2s <= r1e || r2e >= r1s && r2e <= r1e) {
              oraMinProv = r1s > r2s ? r1s : r2s;
              oraMaxProv = r1e < r2e ? r1e : r2e;
        } else {
          orario="Non ci sono orari compatibili";
          return;
        }
    }
    orario="Orario migliore: dalle "+oraMinProv+" alle "+oraMaxProv;
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
          <p>{orario}</p>
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
