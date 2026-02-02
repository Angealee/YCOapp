export interface Aralin {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  progress: number; // 0 → 1
}

export const quarter2Aralin: Aralin[] = [
  {
    id: 1,
    title: "Aralin 1",
    subtitle: "Kuwentong Bayan sa panahon ng katutubo: Alamat",
    description:
      "Ang alamat ay isang uri ng panitikan na naglalahad ng pinagmulan ng isang bagay, pook, o kababalaghan. Karaniwang ipinapaliwanag nito kung paano nagkaroon ng isang bagay sa pamamagitan ng kuwento ng mga tauhan, diyos, o pangyayaring mahiwaga.",
    progress: 1,
  },
  {
    id: 2,
    title: "Aralin 2",
    subtitle: "Minanang Kaugalian isinabuhay ko: Pabula",
    description:
      "Ang pabula ay isang maikling kuwento na karaniwang hayop ang tauhan, ngunit may katangian ng tao tulad ng pagsasalita, pag-iisip, at paggawa ng desisyon. Layunin ng pabula na magbigay ng aral o leksyon sa mga mambabasa, lalo na tungkol sa mabuting asal, katapangan, kasipagan, o talino.",
    progress: 0.2,
  },
  {
    id: 3,
    title: "Aralin 3",
    subtitle: "Komiks",
    description:
      "Ang komiks ay isang anyo ng sining at panitikan na naglalahad ng kuwento sa pamamagitan ng magkakasunod na larawan at teksto. Karaniwang binubuo ito ng dialogue, narration, at illustration.",
    progress: 0.3,
  },
  {
    id: 4,
    title: "Aralin 4",
    subtitle: "Disenyo at pabalat ng Brochure",
    description:
      "Ang brochure ay isang uri ng print na materyal na naglalaman ng impormasyon tungkol sa produkto, serbisyo, proyekto, o isang paksa. Tinatalakay rito ang disenyo, pabalat, at mga uri ng brochure.",
    progress: 0.1,
  },
];
