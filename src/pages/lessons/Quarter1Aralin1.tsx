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
  eyeOutline,
  bookmark,
  bookSharp,
  bookmarkSharp
} from 'ionicons/icons';

import './Quarter1Aralin1.css';
import { useState } from 'react';

const Quarter1Aralin1: React.FC = () => {
  const [isAudio, setIsAudio ] = useState(false);
  const changeState =  () =>{
    setIsAudio(!isAudio)
  }
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

        {/* CONTENT SECTION */}
        <IonCard className="hero-card">
          <IonCardHeader>
            <IonCardTitle>
             <strong>
              Kaligirang Pangkasaysayan ng Panitikan sa Panahon ng Katutubo
              </strong> 
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText className= "text-content">
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
              <IonLabel>
                <strong>
                  Bugtong
                </strong></IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonText className='text-content'>
                Ang bugtong ay isang maikling patulang palaisipan na naglalarawan ng isang bagay, hayop, tao, o pangyayari sa pamamagitan ng pahiwatig o talinghaga. < br /> 
                <br />
                Hindi tuwiran ang paglalarawan; kailangan ng mambabasa o nakikinig na gumamit ng imahinasyon, lohika, at kaalaman sa wika upang mahulaan ang sagot. Ang bugtong ay isang anyo ng panitikan na nag-uugnay sa wika at kultura, at karaniwang ginagamit sa mga tradisyunal na laro at paligsahan sa barangay at paaralan.
              </IonText>
              <div className='halimbawa-content'>
                <IonCard>
                  <IonCardContent>
                    <IonText className='title-text-content'>
                      <strong>Katangian ng Bugtong</strong><br />
                    </IonText>
                    <IonText className='text-content'>
                      <strong>1. Maikli at Patula </strong>– karaniwan ay may tugma at sukat upang madaling matandaan.
                      <br />
                      <strong>2. May Talinghaga </strong>– gumagamit ng paglalarawan na di-tuwer o simboliko, kaya’t pinipilit ang utak ng mambabasa o tagapakinig na mag-isip.
                      <br />
                      <strong>3. Naglalarawan ng isang bagay o kaisipan </strong>– maaaring tao, hayop, bagay, halaman, o pangyayari.
                      <br />
                      <strong>4. Layunin </strong>–  aliwin ang nakikinig, hamunin ang katalinuhan, at palawakin ang kaalaman sa wika at kultura.
                      <br />
                    </IonText>
                    <br />
                    <IonText className='title-text-content'>
                      <strong>Kahalagahan ng Bugtong</strong><br />
                    </IonText>

                    <IonText className='text-content'>

                      <strong>1. Nagpapatalas ng isip at lohika </strong>– sapagkat ang tamang sagot ay kailangan tuklasin at i-analisa.
                      <br />
                      <strong>2. Nagpapalawak ng bokabularyo at kaalaman sa wika </strong>– nakikilala ang mga salitang Filipino at kasanayan sa paggamit ng wika.
                      <br />
                      <strong>3. Nagpapaunlad ng imahinasyon at malikhaing pag-iisip </strong>– dahil ang mga pahiwatig ay hindi literal, kailangang gamitin ang imahinasyon.
                      <br />
                      <strong>4. Nagpapahalaga sa kulturang Pilipino </strong>–  aliwin ang nakikinig, hamunin ang katalinuhan, at palawakin ang kaalaman sa wika at kultura.
                      <br />
                      <strong>5. Naglilinang ng pakikipag-ugnayan at pakikisalamuha </strong>–  karaniwang ginagamit sa laro, paligsahan, o pagtuturo sa silid-aralan.
                      <br />
                    </IonText>

                  </IonCardContent>
                </IonCard>
              </div>

              <div className="chip-row">
                <IonChip><IonIcon icon={bookOutline} style={{paddingRight:"8.5px" }} onClick={changeState}/> Pagbabasa</IonChip>
                <IonChip><IonIcon icon={volumeHighOutline} style={{paddingRight:"8.5px" }}  onClick={changeState} /> Pakikinig</IonChip>
                <IonChip><IonIcon icon={bookmarkSharp} style={{paddingRight:"8.5px" }}  onClick={changeState} /> Halimbawa ng Bugtong</IonChip>
              </div>

            { isAudio ? 
                <IonCard>
                <IonCardContent >
                  <IonText>
                      Play Audio
                  </IonText>
                  <IonText color="medium"><br />Sagot: Cellphone</IonText>
                </IonCardContent>
              </IonCard>
              : 
              <IonCard>
                <IonCardContent >
                  <IonText>
                    <strong>Halimbawa:</strong><br />
                    Hindi tao, hindi hayop,<br />
                    Ngunit marunong magsalita;<br />
                    Sa isang pindot mo lamang,<br />
                    Buong mundo’y makikita.
                  </IonText>
                  <IonText color="medium"><br />Sagot: Cellphone</IonText>
                </IonCardContent>
              </IonCard>}
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
