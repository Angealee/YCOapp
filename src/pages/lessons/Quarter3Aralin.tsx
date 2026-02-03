import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonCard,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonChip,
} from "@ionic/react";

import {
  bookOutline,
  sparklesOutline,
  bulbOutline,
  heartOutline,
  volumeHighOutline,
  playCircleOutline,
} from "ionicons/icons";

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { quarter3LessonsById, QuarterLesson, LessonSection } from "../../data/quarter3Lessons";
import "./Quarter1Aralin1.css";

const iconClassByIndex = (index: number): string => {
  const classes = ["bugtong-icon", "palaisipan-icon", "tanaga-icon", "salawikain-icon"];
  return classes[index % classes.length];
};

const iconByIndex = (index: number) => {
  const icons = [bulbOutline, sparklesOutline, bookOutline, heartOutline];
  return icons[index % icons.length];
};

const gradientClassByIndex = (index: number): string => {
  const classes = ["gradient-purple", "gradient-pink", "gradient-blue", "gradient-green"];
  return classes[index % classes.length];
};

const Quarter3Aralin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const aralinId = Number(id);

  const lesson: QuarterLesson | undefined = useMemo(() => {
    if (!Number.isFinite(aralinId)) return undefined;
    return quarter3LessonsById[aralinId];
  }, [aralinId]);

  const [activeSection, setActiveSection] = useState<string>("");
  const [modeBySection, setModeBySection] = useState<Record<string, "read" | "listen" | "watch">>(
    {}
  );

  const sections: LessonSection[] = lesson?.sections ?? [];

  const getSectionMode = (sectionKey: string): "read" | "listen" | "watch" => {
    return modeBySection[sectionKey] ?? "read";
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-aralin-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-aralin-title">
            <div className="title-content">
              <span className="quarter-badge">Q3</span>
              <span className="separator">•</span>
              <span className="aralin-badge">
                Aralin {Number.isFinite(aralinId) ? aralinId : "—"}
              </span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="modern-aralin-content">
        {/* Hero Section */}
        <div className="aralin-hero">
          <div className="hero-bg-gradient" />
          <div className="hero-content-wrapper">
            <div className="hero-icon-badge">
              <IonIcon icon={bookOutline} />
            </div>
            <h1 className="hero-main-title">{lesson?.meta.title ?? "Hindi nakita ang aralin"}</h1>
            <p className="hero-description">
              {lesson?.meta.description ?? "Walang datos para sa araling ito."}
            </p>
            {lesson?.meta.stats ? (
              <div className="hero-stats">
                <div className="stat-item">
                  <IonIcon icon={sparklesOutline} />
                  <span>{lesson.meta.stats.topics} Paksa</span>
                </div>
                <div className="stat-item">
                  <IonIcon icon={bulbOutline} />
                  <span>{lesson.meta.stats.interactive ? "Interactive" : "Pagbabasa"}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {sections.length ? (
          <div className="content-wrapper">
            <IonAccordionGroup
              className="modern-accordion-group"
              onIonChange={(e) => setActiveSection(e.detail.value as string)}
            >
              {sections.map((section, index) => {
                const sectionKey = section.id ?? `s-${index}`;
                const hasIntro = !!section.intro?.trim();
                const hasBullets = !!section.bullets?.length;
                const hasGroups = !!section.multimodalGroups?.length;
                const hasMedia = !!section.media?.audioSrc || !!section.media?.videoSrc;

                return (
                  <IonAccordion key={sectionKey} value={sectionKey} className="modern-accordion">
                    <IonItem slot="header" className="accordion-header" lines="none">
                      <div className="header-content">
                        <div className={`header-icon ${iconClassByIndex(index)}`}>
                          <IonIcon icon={iconByIndex(index)} />
                        </div>
                        <div className="header-text">
                          <IonLabel className="accordion-title">{section.title}</IonLabel>
                          {section.subtitle ? <p className="accordion-subtitle">{section.subtitle}</p> : null}
                        </div>
                        <IonChip className="topic-badge">Paksa {index + 1}</IonChip>
                      </div>
                    </IonItem>

                    <div className="accordion-content" slot="content">
                      {hasMedia ? (
                        <div className="action-chips">
                          <IonChip
                            className={`modern-chip ${getSectionMode(sectionKey) === "read" ? "active" : ""}`}
                            onClick={() =>
                              setModeBySection((prev) => ({ ...prev, [sectionKey]: "read" }))
                            }
                          >
                            <IonIcon icon={bookOutline} />
                            <IonLabel>Pagbabasa</IonLabel>
                          </IonChip>
                          <IonChip
                            className={`modern-chip ${
                              getSectionMode(sectionKey) === "listen" ? "active" : ""
                            }`}
                            onClick={() =>
                              setModeBySection((prev) => ({ ...prev, [sectionKey]: "listen" }))
                            }
                          >
                            <IonIcon icon={volumeHighOutline} />
                            <IonLabel>Pakikinig</IonLabel>
                          </IonChip>
                          <IonChip
                            className={`modern-chip ${getSectionMode(sectionKey) === "watch" ? "active" : ""}`}
                            onClick={() =>
                              setModeBySection((prev) => ({ ...prev, [sectionKey]: "watch" }))
                            }
                          >
                            <IonIcon icon={playCircleOutline} />
                            <IonLabel>Panonood</IonLabel>
                          </IonChip>
                        </div>
                      ) : null}

                      {getSectionMode(sectionKey) === "read" ? (
                        <>
                          {hasIntro ? (
                            <div className="content-intro">
                              <IonText className="intro-text">{section.intro}</IonText>
                            </div>
                          ) : null}

                          {hasBullets ? (
                            <IonCard className={`info-card ${gradientClassByIndex(index)}`}>
                              <IonCardContent>
                                <h1 className="card-title">
                                  <strong>Mahahalagang Punto</strong>
                                </h1>
                                <div className="card-list">
                                  {section.bullets!.map((bullet, bulletIndex) => (
                                    <div key={`${sectionKey}-b-${bulletIndex}`} className="list-item">
                                      <span className="item-number">{bulletIndex + 1}</span>
                                      <div>
                                        <p style={{ margin: 0 }}>{bullet}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </IonCardContent>
                            </IonCard>
                          ) : null}
                        </>
                      ) : null}

                      {hasGroups ? (
                        <div className="info-cards-grid">
                          {section.multimodalGroups!.map((group, groupIndex) => (
                            <IonCard
                              key={`${sectionKey}-g-${groupIndex}`}
                              className={`info-card ${gradientClassByIndex(groupIndex)}`}
                            >
                              <IonCardContent>
                                <h1 className="card-title">
                                  <strong>{group.category}</strong>
                                </h1>
                                <div className="card-list">
                                  {group.items.map((item, itemIndex) => (
                                    <div key={`${sectionKey}-g-${groupIndex}-${itemIndex}`} className="list-item">
                                      <span className="item-number">{itemIndex + 1}</span>
                                      <div>
                                        <p style={{ margin: 0 }}>{item}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </IonCardContent>
                            </IonCard>
                          ))}
                        </div>
                      ) : null}

                      {getSectionMode(sectionKey) === "listen" ? (
                        <IonCard className="info-card gradient-blue">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={volumeHighOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Pakikinig</strong>
                            </h1>
                            {section.media?.audioSrc ? (
                              <audio controls style={{ width: "100%" }} src={section.media.audioSrc} />
                            ) : (
                              <IonText className="intro-text">Wala pang audio para sa bahaging ito.</IonText>
                            )}
                          </IonCardContent>
                        </IonCard>
                      ) : null}

                      {getSectionMode(sectionKey) === "watch" ? (
                        <IonCard className="info-card gradient-green">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={playCircleOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Panonood</strong>
                            </h1>
                            {section.media?.videoSrc ? (
                              <video controls style={{ width: "100%" }} src={section.media.videoSrc} />
                            ) : (
                              <IonText className="intro-text">Wala pang video para sa bahaging ito.</IonText>
                            )}
                          </IonCardContent>
                        </IonCard>
                      ) : null}

                      {activeSection === sectionKey && !hasIntro && !hasBullets && !hasGroups ? (
                        <IonText className="intro-text">Wala pang nilalaman sa bahaging ito.</IonText>
                      ) : null}
                    </div>
                  </IonAccordion>
                );
              })}
            </IonAccordionGroup>
          </div>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Quarter3Aralin;
