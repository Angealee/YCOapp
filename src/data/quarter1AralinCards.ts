export interface Aralin {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  progress: number; // 0 → 1
}

export const quarter1Aralin: Aralin[] = [
  {
    id: 1,
    title: "Aralin 1",
    subtitle: "Kaligirang Pangkasaysayan ng Panitikan",
    description:
      "Pagkilala sa panitikan sa panahon ng katutubo gamit ang bugtong, palaisipan, tanaga at salawikain.",
    progress: 1,
  },
  {
    id: 2,
    title: "Aralin 2",
    subtitle: "Pagsusuring Biswal: Komiks",
    description:
      "Paglikha at pagsusuri ng komiks na nakatuon sa tauhan at biswal na pagsasalaysay.",
    progress: 0.2,
  },
  {
    id: 3,
    title: "Aralin 3",
    subtitle: "Hudhud: Epiko ng Ifugao",
    description:
      "Pag-unawa sa epiko bilang panitikang bayan gamit ang awit, larawan, at salaysay.",
    progress: 0.3,
  },
  {
    id: 4,
    title: "Aralin 4",
    subtitle: "Tekstong Ekspositori",
    description:
      "Pagkakatulad at pagkakaiba gamit ang malinaw na paliwanag at biswal.",
    progress: 0.1,
  },
];
