import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonChip,
  IonRippleEffect,
  IonBackButton,
  IonButtons
} from '@ionic/react';

import {
  bookOutline,
  volumeHighOutline,
  imageOutline,
  gameControllerOutline,
  createOutline,
  eyeOutline
} from 'ionicons/icons';

import './Quarter1Aralin1.css';

const Quarter1Aralin1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger ">
           <IonButtons slot="start">
            <IonBackButton text={'Ibalik'}></IonBackButton>
          </IonButtons>
          <IonTitle>Quarter 1 • Aralin 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="q1-aralin1">

        {/* HERO SECTION */}
        <IonCard className="hero-card">
          <IonCardHeader>
            <IonCardTitle>
              Panitikan sa Panahon ng Katutubo
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              Bago pa man dumating ang mga mananakop, mayaman na ang mga Pilipino
              sa panitikan—ipinapasa sa pamamagitan ng salita, awit, laro,
              at karanasan.
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* ACCORDION CONTENT */}
        <IonAccordionGroup multiple>

          {/* BUGTONG */}
          <IonAccordion value="bugtong">
            <IonItem slot="header">
              <IonLabel>Bugtong</IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonText>
                Ang bugtong ay isang maikling patulang palaisipan na gumagamit ng
                talinghaga upang ilarawan ang isang bagay o ideya.
              </IonText>

              <div className="chip-row">
                <IonChip><IonIcon icon={bookOutline} style={{paddingRight:"8.5px" }}/> Pagbabasa</IonChip>
                <IonChip><IonIcon icon={volumeHighOutline} style={{paddingRight:"8.5px" }} /> Pakikinig</IonChip>
              </div>

              <IonCard>
                <IonCardContent>
                  <IonText>
                    <strong>Halimbawa:</strong><br />
                    Hindi tao, hindi hayop,<br />
                    Ngunit marunong magsalita;<br />
                    Sa isang pindot mo lamang,<br />
                    Buong mundo’y makikita.
                  </IonText>
                  <IonText color="medium"><br />Sagot: Cellphone</IonText>
                </IonCardContent>
              </IonCard>

              <IonButton expand="block" color="secondary">
                Subukan ang Bugtong Game
              </IonButton>
            </div>
          </IonAccordion>

          {/* PALAISIPAN */}
          <IonAccordion value="palaisipan">
            <IonItem slot="header">
              <IonLabel>Pala-isipan</IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonText>
                Ang palaisipan ay humahamon sa lohikal at malikhaing pag-iisip
                gamit ang hindi tuwirang tanong.
              </IonText>

              <IonCard>
                <IonCardContent>
                  <IonText>
                    <strong>Tanong:</strong><br />
                    Ano ang bagay na habang kinukuha mo ay lalo mong pinapalaki?
                  </IonText>
                  <IonText color="medium"><br />Sagot: Butas</IonText>
                </IonCardContent>
              </IonCard>

              <IonButton expand="block" color="tertiary">
                Interactive Logic Challenge
              </IonButton>
            </div>
          </IonAccordion>

          {/* TANAGA */}
          <IonAccordion value="tanaga">
            <IonItem slot="header">
              <IonLabel>Tanaga</IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonText>
                Ang tanaga ay apat na taludtod na tula na may pitong pantig bawat
                linya (7-7-7-7) at may tugma.
              </IonText>

              <IonCard>
                <IonCardContent>
                  <IonText>
                    Wika’y ating yaman,<br />
                    Sa puso’y pinagyayaman;<br />
                    Sa bawat salitang bigkas,<br />
                    Pagka-Pilipino’y lantad.
                  </IonText>
                </IonCardContent>
              </IonCard>

              <IonButton expand="block">
                Gumawa ng Sariling Tanaga
              </IonButton>
            </div>
          </IonAccordion>

          {/* SALAWIKAIN & KASABIHAN */}
          <IonAccordion value="salawikain">
            <IonItem slot="header">
              <IonLabel>Salawikain at Kasabihan</IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonText>
                Ang salawikain at kasabihan ay mga pahayag ng karunungan na
                nagmumula sa karanasan ng mga Pilipino.
              </IonText>

              <IonCard>
                <IonCardContent>
                  <IonText>
                    “Ang hindi marunong lumingon sa pinanggalingan ay hindi
                    makararating sa paroroonan.”
                  </IonText>
                </IonCardContent>
              </IonCard>

              <IonButton expand="block" fill="outline">
                Tukuyin ang Aral
              </IonButton>
            </div>
          </IonAccordion>

        </IonAccordionGroup>

        {/* FOOTER CTA */}
        <IonCard className="next-card">
          <IonCardContent>
            <IonText>
              Handa ka na bang subukan ang iyong kaalaman?
            </IonText>
            <IonButton expand="block" color="success">
              Simulan ang Mini Quiz
            </IonButton>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Quarter1Aralin1;
