export interface Aralin {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  modalities: {
    reading?: boolean;
    audio?: boolean;
    video?: boolean;
    activity?: boolean;
  };
}

export const quarter1Aralin: Aralin[] = [
  {
    id: 1,
    title: "Aralin 1",
    subtitle: "Kaligirang Pangkasaysayan ng Panitikan",
    description: "Pagkilala sa panitikan sa panahon ng katutubo gamit ang bugtong, palaisipan, tanaga at salawikain.",
    modalities: {
      reading: true,
      audio: true,
      video: true,
      activity: true,
    },
  },
  {
    id: 2,
    title: "Aralin 2",
    subtitle: "Pagsusuring Biswal: Komiks",
    description: "Paglikha at pagsusuri ng komiks na nakatuon sa tauhan at biswal na pagsasalaysay.",
    modalities: {
      reading: true,
      video: true,
      activity: true,
    },
  },
  {
    id: 3,
    title: "Aralin 3",
    subtitle: "Hudhud: Epiko ng Ifugao",
    description: "Pag-unawa sa epiko bilang panitikang bayan gamit ang awit, larawan, at salaysay.",
    modalities: {
      reading: true,
      audio: true,
      video: true,
    },
  },
  {
    id: 4,
    title: "Aralin 4",
    subtitle: "Tekstong Ekspositori",
    description: "Pagkakatulad at pagkakaiba gamit ang malinaw na paliwanag at biswal.",
    modalities: {
      reading: true,
      activity: true,
    },
  },
  {
    id: 5,
    title: "Aralin 5",
    subtitle: "Sanhi at Bunga ng Pagpapasya",
    description: "Pagkilala sa pananagutan at epekto ng desisyon sa buhay.",
    modalities: {
      reading: true,
      video: true,
      activity: true,
    },
  },
];
