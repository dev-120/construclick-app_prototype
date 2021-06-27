import {
  IonContent,
  IonItem,
  IonPage,
  IonSelect,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";

import { useEffect, useState } from "react";

import "./BrickCalculator.css";
import BrickImg from "../../../assets/brick.png";
import MortarJoint from "../../../assets/mortar_joint.png";
import Header from "../../../components/Header/Header";
import WhatsappIcon from "../../../assets/whatsapp_icon.png";
import EmailIcon from "../../../assets/email_icon.png";
import TelegramIcon from "../../../assets/telegram_icon.png";
import Brick from "./Brick";

interface BrickCalculatorProps {
  match: {
    params: {
      size: string;
    };
  };
}

const menuBrick = [
  {
    brickType: "Bloque N°10",
    size: "(10 x 20 x 40)",
    linkTo: `/10`,
    sizeBrick: "10",
  },
  {
    brickType: "Bloque N°15",
    size: "(15 x 20 x 40)",
    linkTo: "/15",
    sizeBrick: "15",
  },
  {
    brickType: "Bloque N°20",
    size: "(20 x 20 x 40)",
    linkTo: "/20",
    sizeBrick: "20",
  },
  {
    brickType: "Bloque N°25",
    size: "(25 x 20 x 40)",
    linkTo: "/25",
    sizeBrick: "25",
  },
  {
    brickType: "Ladrillo macizo",
    size: "(Selección dimensiones)",
    linkTo: "/personalized",
  },
];

const BrickCalculator: React.FC<BrickCalculatorProps> = ({ match }) => {
  const [Brick, setBrick] = useState(Object || null);
  const [calculate, setCalculate] = useState<boolean>(false);
  const [wallArea, setWallArea] = useState<number>(0);
  const [wallOpenings, setWallOpenings] = useState<number>(0);
  const [wallThickness, setWallThickness] = useState<number>(0);

  useEffect(() => {
    setBrick(
      menuBrick.filter((item) => item.sizeBrick === match.params.size)[0]
    );
  }, [match]);

  const clickHandler = () => {
    setCalculate(true);
  };

  return (
    <IonPage>
      <Header canBack href="/calculator/walls/brick" />
      <IonContent className="Foundation-content__style">
        {!calculate ? (
          <>
            <IonItem
              className="ion-margin-top ion-margin-horizontal"
              color="primary"
            >
              <img
                slot="start"
                src={BrickImg}
                className="Foundation-sidepanel__img"
              />
              <IonGrid>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonText>
                      <h4>{Brick.brickType}</h4>
                    </IonText>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonText>
                      <h6>{Brick.size}</h6>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem className="ion-margin-horizontal">
              <IonGrid>
                <IonRow>
                  <p>Área del Muro:</p>
                </IonRow>
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <IonCol size="6">
                    <h5>Ingrese Área (m2): </h5>
                  </IonCol>
                  <IonCol size="6" className="ion-text-center">
                    <IonInput
                      value={wallArea}
                      type="number"
                      onIonChange={(e) =>
                        setWallArea(parseInt(e.detail.value!))
                      }
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem className="ion-margin-horizontal">
              <IonGrid>
                <IonRow>
                  <p>Área aperturas:</p>
                </IonRow>
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <IonCol size="6">
                    <h5>Área descontada por (Puertas, Ventanas) (m2): </h5>
                  </IonCol>
                  <IonCol size="6" className="ion-text-center">
                    <IonInput
                      value={wallOpenings}
                      type="number"
                      onIonChange={(e) =>
                        setWallOpenings(parseInt(e.detail.value!))
                      }
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem className="ion-margin-horizontal">
              <IonGrid>
                <IonRow>
                  <p>Área aperturas:</p>
                </IonRow>
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <IonCol size="6">
                    <img src={MortarJoint} />
                  </IonCol>
                  <IonCol size="6" className="ion-text-center">
                    <IonLabel position="floating">Espesor (cm)</IonLabel>
                    <IonInput
                      type="number"
                      value={wallThickness}
                      onIonChange={(e) =>
                        setWallThickness(parseInt(e.detail.value!))
                      }
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonButton
              expand="full"
              size="large"
              className="ion-margin-horizontal"
              onClick={clickHandler}
            >
              Calcular
            </IonButton>
          </>
        ) : (
          <BrickResult {...Brick} />
        )}
      </IonContent>
    </IonPage>
  );
};

interface BrickResultProps {
  brickType: string;
  size: string;
  sizeBrick: string;
}

const BrickResult: React.FC<BrickResultProps> = ({
  brickType,
  size,
  sizeBrick,
}) => {
  return (
    <>
      <IonItem className="ion-margin-top ion-margin-horizontal" color="primary">
        <img
          slot="start"
          src={BrickImg}
          className="Foundation-sidepanel__img"
        />
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonText>
                <h4>{brickType}</h4>
              </IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonText>
                <h6>{size}</h6>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem className="ion-margin-horizontal">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem className="ion-text-center" color="primary">
                <h4>TOTAL MATERIALES</h4>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">Descripción</IonCol>
            <IonCol className="ion-text-center">Cantidad</IonCol>
            <IonCol className="ion-text-center">Unidad</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">Bloques</IonCol>
            <IonCol className="ion-text-center">5357</IonCol>
            <IonCol className="ion-text-center">357</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">Cemento</IonCol>
            <IonCol className="ion-text-center">9,4</IonCol>
            <IonCol className="ion-text-center">Bulto 50Kg</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center" size="4">
              Arena
            </IonCol>
            <IonCol className="ion-text-center" size="4">
              3,085 171,4
            </IonCol>
            <IonCol className="ion-text-center" size="4">
              m3 Latas 18L
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">Agua</IonCol>
            <IonCol className="ion-text-center">1249,6</IonCol>
            <IonCol className="ion-text-center">Litros</IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <img src={WhatsappIcon} className="Foundation-Result__icon" />
            </IonCol>
            <IonCol className="ion-text-center">
              <img src={TelegramIcon} className="Foundation-Result__icon" />
            </IonCol>
            <IonCol className="ion-text-center">
              <img src={EmailIcon} className="Foundation-Result__icon" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
};

export default BrickCalculator;