export interface LessonMeta {
  quarter: string;
  aralin: string;
  title: string;
  description: string;
  stats: {
    topics: number;
    interactive: boolean;
  };
}

export interface QuarterLesson {
  meta: LessonMeta;
  sections: any[];
}

export const quarter2Lesson1: QuarterLesson = {
  meta: {
    quarter: "Q2",
    aralin: "Aralin 1",
    title: "Kuwentong Bayan sa Panahon ng Katutubo: Alamat",
    description:
      "Ang alamat ay isang uri ng panitikan na naglalahad ng pinagmulan ng isang bagay, pook, o kababalaghan. Karaniwang ipinapaliwanag nito kung paano nagkaroon ng isang bagay sa pamamagitan ng kuwento ng mga tauhan, diyos, o pangyayaring mahiwaga.",
    stats: {
      topics: 3,
      interactive: true,
    },
  },

  sections: [
    {
      id: "Kahulugan ng Alamat",
      title: "Kahulugan",
      subtitle: "Alamat",
      intro: `Ang alamat ay isang uri ng panitikan na naglalahad ng pinagmulan ng isang bagay, pook, o kababalaghan. Karaniwang ipinapaliwanag nito kung paano nagkaroon ng isang bagay sa pamamagitan ng kuwento ng mga tauhan, diyos, o pangyayaring mahiwaga.`,
      alamatImportance: [
        { title: "Karaniwang may pangunahing tauhan." },
        { title: "Naglalahad ng paliwanag o pinagmulan ng isang bagay." },
        { title: "May halong totoo at kathang-isip." },
        { title: "Madalas may aral o leksyon." },
        { title: "Nagpapakita ng kultura at paniniwala ng mga tao noon." },
      ],
    },
    {
      id: "Mga Elemento ng Alamat",
      title: "Mga Elemento",
      subtitle: "Alamat",
      alamatElementsIntro:
        "Upang mas lubos na maunawaan ang alamat, mahalagang kilalanin ang mga elemento nito:",
      alamatElements: [
        {
          title: "Tauhan (Characters)",
          points: [
            "Sila ang gumaganap sa kuwento.",
            "Maaaring tao, hayop, o diyos.",
            "Halimbawa: si Maria Makiling sa alamat ng bundok, si Bernardo sa alamat ng Pinya.",
          ],
        },
        {
          title: "Tagpuan (Setting)",
          points: [
            "Lugar at panahon kung saan nagaganap ang kuwento.",
            "Halimbawa: bundok, ilog, bayan, o lungsod noong unang panahon.",
          ],
        },
        {
          title: "Banghay (Plot)",
          points: [
            "Ang sunod-sunod na pangyayari sa kuwento.",
            "Karaniwang may simula, gitna, at wakas.",
            "Simula: Pagpapakilala sa tauhan at tagpuan.",
            "Gitna: Pagsubok o problema na nararanasan ng tauhan.",
            "Wakas: Solusyon o kinalabasan ng kuwento.",
          ],
        },
        {
          title: "Suliranin (Conflict)",
          points: [
            "Ang problema o hamon na kinakaharap ng tauhan.",
            "Halimbawa: panlilinlang, kasakiman, o kakulangan ng kaalaman.",
          ],
        },
        {
          title: "Aral (Moral Lesson)",
          points: [
            "Ang leksyon o pamanang moral na matututuhan ng mambabasa.",
            "Halimbawa: pagiging masipag, matapat, matulungin.",
          ],
        },
        {
          title: "Katutuhanan o Pinagmulan (Origin/Explanation)",
          points: [
            "Ipinaliwanag ang pinagmulan ng bagay o pangyayari.",
            "Halimbawa: bakit mayroong bulkang Mayon o bakit mahaba ang Pinya.",
          ],
        },
      ],
    },
    {
      id: "Halimbawa ng Alamat",
      title: "Halimbawa",
      subtitle: "Alamat",
      intro: "Basahin ang halimbawa ng alamat.",
      examples: [
        {
          id: 1,
          label: "Halimbawa: Ang Alamat ni Maria Makiling",
          text: `
Noong unang panahon, sa bayan ng Los Baños, Laguna, may isang bundok na tinawag na Bundok Makiling. Sa bundok na iyon naninirahan ang isang magandang diwata na nagngangalang Maria Makiling. Kilala siya sa kanyang kagandahan at kabutihang loob. Lagi siyang tumutulong sa mga mahihirap, nagbabantay sa mga magsasaka, at nagbibigay ng proteksyon sa mga tao laban sa panganib.

Si Maria Makiling ay isang magandang dalaga na may mahabang buhok, maputing balat, at mga mata na kasing-linaw ng kristal. Bagamat siya ay diwata, palagi niyang nakikihalubilo sa mga tao sa paligid. Tinulungan niya ang mga magsasaka sa kanilang pagtatanim at pag-aani, at ibinibigay niya ang pagkain sa mga nagugutom. Lahat ay humahanga at nagmamahal sa kanya dahil sa kanyang kabutihan.

Isang araw, may isang binatang nagngangalang Juan ang napadpad sa bundok. Si Juan ay masipag at mabait, ngunit siya ay mahirap. Nakita ni Maria Makiling si Juan at agad siyang naakit sa kanyang kabutihan. Nagsimula silang magkasundo at unti-unting nahulog ang loob ni Maria kay Juan. Ngunit sa kabila ng kanilang pagmamahalan, dumating ang panahon na nagkaroon ng hindi pagkakaunawaan. Ayon sa kuwento, si Juan ay nakalimot o nagkaroon ng ibang plano, kaya't labis itong nakasakit kay Maria.

Dahil sa pagkabigo at lungkot, nagpasya si Maria Makiling na maglaho at manatili sa bundok bilang diwata. Sinasabing mula noon, nakatira siya sa Bundok Makiling at paminsan-minsan ay nakikita pa rin ng mga tao sa bundok. Ang kanyang presensya ay patuloy na nagbibigay ng kabutihan at proteksyon sa mga tao sa paligid.

Dahil sa alamat na ito, ang bundok ay tinawag na Bundok Makiling, bilang alaala at parangal kay Maria Makiling, ang diwata na puno ng kagandahan at kabutihan.`,
        },
      ],
    },
  ],
};

export const quarter2Lesson2: QuarterLesson = {
  meta: {
    quarter: "Q2",
    aralin: "Aralin 2",
    title: "Minanang Kaugalian isinabuhay ko: Pabula",
    description:
      "Ang pabula ay isang maikling kuwento na karaniwang hayop ang tauhan, ngunit may katangian ng tao tulad ng pagsasalita, pag-iisip, at paggawa ng desisyon. Layunin ng pabula na magbigay ng aral o leksyon sa mga mambabasa, lalo na tungkol sa mabuting asal, katapangan, kasipagan, o talino.",
    stats: {
      topics: 3,
      interactive: false,
    },
  },
  sections: [
    {
      id: "Kahulugan ng Pabula",
      title: "Kahulugan ng Pabula",
      subtitle: "Aralin 2",
      intro:
        "Ang pabula ay isang maikling kuwento na karaniwang hayop ang tauhan, ngunit may katangian ng tao tulad ng pagsasalita, pag-iisip, at paggawa ng desisyon. Layunin ng pabula na magbigay ng aral o leksyon sa mga mambabasa, lalo na tungkol sa mabuting asal, katapangan, kasipagan, o talino.",
      pabulaCharacteristics: [
        { title: "Maikling kuwento at simple ang banghay." },
        { title: "Karaniwang hayop ang pangunahing tauhan, pero may ugali ng tao." },
        { title: "May malinaw na aral o leksyon sa wakas." },
        { title: "Ginagamit upang turuan ang kabutihan at tamang asal." },
      ],
    },
    {
      id: "Mga Elemento ng Pabula",
      title: "Mga Elemento ng Pabula",
      subtitle: "Mga Bahagi",
      pabulaElementsIntro:
        "Upang mas lubos na maunawaan ang pabula, mahalagang kilalanin ang mga elemento nito:",
      pabulaElements: [
        {
          title: "Tauhan (Characters)",
          points: [
            "Hayop o bagay na may kakayahang kumilos at magsalita tulad ng tao.",
            "Halimbawa: kuneho, pagong, leon, uwak, aso.",
          ],
        },
        {
          title: "Tagpuan (Setting)",
          points: [
            "Lugar at panahon kung saan nagaganap ang kuwento.",
            "Maaaring kagubatan, bukid, ilog, o bahay.",
          ],
        },
        {
          title: "Banghay (Plot)",
          points: [
            "Sunod-sunod na pangyayari mula sa simula, gitna, at wakas.",
            "Karaniwan ay may problema na haharapin ng tauhan at solusyon sa huli.",
          ],
        },
        {
          title: "Suliranin (Conflict)",
          points: [
            "Ang hamon o problema na kailangan lutasin ng pangunahing tauhan.",
            "Halimbawa: paligsahan, gutom, pagkakaaway, o panganib.",
          ],
        },
        {
          title: "Aral (Moral Lesson)",
          points: [
            "Ang leksyon o payo na matututunan ng mambabasa.",
            'Halimbawa: "Ang sipag at tiyaga ay nagbubunga ng tagumpay."',
          ],
        },
      ],
    },
    {
      id: "Halimbawa ng Pabula",
      title: "Halimbawa ng Pabula",
      subtitle: "Basahin",
      intro: "Basahin ang halimbawa at tukuyin ang aral sa dulo.",
      examples: [
        {
          id: 1,
          label: "Ang Langgam at ang Tipaklong (Orihinal)",
          text: `
Sa isang bukid, masipag na nag-iipon ng pagkain ang mga langgam araw-araw. Samantala, ang tipaklong ay palaging umaawit at nagtatawanan sa tabi ng damuhan.

Isang hapon, lumapit ang tipaklong sa mga langgam.
"Mga kaibigan, bakit kayo nagmamadali? Ang sarap ng hangin at ang ganda ng araw!" sabi ng tipaklong.

"Nag-iipon kami para kapag dumating ang tag-ulan at malamig na panahon, may makakain kami," sagot ng langgam.

"Ah, matagal pa 'yon!" tugon ng tipaklong. At nagpatuloy siya sa pag-awit.

Paglipas ng mga linggo, dumating ang malakas na ulan. Lumamig ang hangin at nabasa ang mga damo. Nagutom ang tipaklong dahil wala siyang naitabi.

Kumatok siya sa tirahan ng mga langgam.
"Mga langgam, maaari bang humingi ng kaunting pagkain? Wala na akong makain," pakiusap niya.

Nagtinginan ang mga langgam. Hindi sila nangutya, ngunit pinaalala nila ang sinabi noon.
"Tutulungan ka namin sa ngayon," sabi ng langgam, "pero sana sa susunod ay maghanda ka rin."

Mula noon, natuto ang tipaklong na mag-ipon at magsumikap, lalo na kapag may pagkakataon pa.

Aral: Ang taong masipag at handang magtiyaga ay hindi magugulat kapag dumating ang pagsubok.
          `.trim(),
        },
      ],
    },
  ],
};

export const quarter2Lesson3: QuarterLesson = {
  meta: {
    quarter: "Q2",
    aralin: "Aralin 3",
    title: "Komiks",
    description:
      "Ang komiks ay isang anyo ng sining at panitikan na naglalahad ng kuwento sa pamamagitan ng magkakasunod na larawan at teksto. Karaniwang binubuo ito ng dialogue, narration, at illustration.",
    stats: {
      topics: 3,
      interactive: false,
    },
  },
  sections: [
    {
      id: "Kahulugan ng Komiks",
      title: "Kahulugan ng Komiks",
      subtitle: "Aralin 3",
      intro:
        "Ang komiks ay isang anyo ng sining at panitikan na naglalahad ng kuwento sa pamamagitan ng magkakasunod na larawan at teksto. Karaniwang binubuo ito ng dialogue, narration, at illustration. Ginagamit ang komiks upang magpaliwanag, magkwento, o magbigay-aliw sa mambabasa.",
      komiksCharacteristics: [
        { title: "May sunod-sunod na pangyayari." },
        { title: "Gumagamit ng larawan at salita." },
        { title: "Maikling linya o pangungusap ang dialogue." },
        { title: "Madalas may aral o mensahe." },
        { title: "Nakakatawag ng pansin sa visual at kulay." },
      ],
    },
    {
      id: "Mga Teknikal na Aspeto ng Komiks",
      title: "Mga Teknikal na Aspeto ng Komiks",
      subtitle: "Teknikal",
      komiksTechnicalIntro:
        "Upang maging maayos at epektibo ang paggawa ng komiks, mahalagang isaalang-alang ang mga sumusunod na teknikal na aspeto:",
      komiksTechnicalAspects: [
        {
          title: "Panel",
          points: [
            "Ito ang kahon o lalagyan ng bawat eksena ng kuwento.",
            "Maaaring malaki o maliit, depende sa bigat ng eksena.",
            "Ang sunod-sunod na panel ang bumubuo sa daloy ng kuwento.",
          ],
        },
        {
          title: "Layout",
          points: [
            "Tumutukoy sa ayos ng mga panel sa pahina.",
            "Maaari itong linear (mula kaliwa papuntang kanan, pataas pababa) o dynamic depende sa estilo ng kuwento.",
          ],
        },
        {
          title: "Tauhan",
          points: [
            "Maaaring tao, hayop, o bagay.",
            "Kailangan malinaw ang hitsura, kilos, at emosyon ng bawat tauhan.",
            "May primary at secondary na tauhan depende sa papel sa kuwento.",
          ],
        },
        {
          title: "Dialogue (Usapan)",
          points: [
            "Mga sinasabi ng tauhan.",
            "Karaniwang inilalagay sa speech bubble o 'bubble' na may linya na nagtuturo sa tauhan.",
          ],
        },
        {
          title: "Narration",
          points: [
            "Ang salaysay o paglalahad ng tagapagsalaysay.",
            "Karaniwang inilalagay sa rectangle o box na hiwalay sa dialogue.",
          ],
        },
        {
          title: "Sound Effects (Onomatopoeia)",
          points: [
            "Mga tunog sa komiks tulad ng 'BANG!', 'CRASH!', 'SWOOSH!'",
            "Ginagamit upang mas buhayin ang aksyon.",
          ],
        },
        {
          title: "Background",
          points: [
            "Nagbibigay ng konteksto at lokasyon sa eksena.",
            "Maaaring simpleng kulay, pattern, o detalyadong larawan ng lugar.",
          ],
        },
        {
          title: "Coloring at Shading",
          points: [
            "Nakakatulong sa emosyon, mood, at pokus ng eksena.",
            "Halimbawa, madilim na kulay para sa nakakatakot na eksena, maliwanag para sa masayang eksena.",
          ],
        },
      ],
    },
    {
      id: "Mga Hakbang sa Paggawa ng Komiks",
      title: "Mga Hakbang sa Paggawa ng Komiks",
      subtitle: "Proseso",
      komiksSteps: [
        {
          title: "Pumili ng Paksa o Kuwento",
          points: ["Halimbawa: alamat, pabula, kwento ng kabataan, o aral sa buhay."],
        },
        {
          title: "Gumawa ng Script",
          points: [
            "Ilahad ang sunod-sunod na pangyayari.",
            "Tukuyin ang dialogue, narration, at sound effects.",
          ],
        },
        {
          title: "Gumawa ng Storyboard o Rough Sketch",
          points: [
            "Iguhit ang panel at layout.",
            "Ilagay ang posisyon ng tauhan, dialogue, at background.",
          ],
        },
        {
          title: "Drawing / Illustration",
          points: [
            "Gumuhit ng final art sa bawat panel.",
            "Iayos ang proporsyon at ekspresyon ng tauhan.",
          ],
        },
        {
          title: "Paglalagay ng Dialogue at Narration",
          points: [
            "Ilagay ang speech bubble at text box.",
            "Siguraduhing malinaw at madaling basahin.",
          ],
        },
        {
          title: "Pagpapakulay at Pagpapaganda",
          points: [
            "Kulayan ang tauhan, background, at highlight para mas kaakit-akit.",
          ],
        },
        {
          title: "Final Editing",
          points: [
            "Siguraduhing walang mali sa teksto at drawing.",
            "Ayusin ang flow ng kwento mula sa simula hanggang wakas.",
          ],
        },
      ],
    },
  ],
};

export const quarter2Lesson4: QuarterLesson = {
  meta: {
    quarter: "Q2",
    aralin: "Aralin 4",
    title: "Disenyo at pabalat ng Brochure",
    description:
      "Ang brochure ay isang uri ng print na materyal na naglalaman ng impormasyon tungkol sa produkto, serbisyo, proyekto, o isang paksa. Karaniwang madaling dalhin, maikli, at malinaw ang nilalaman nito.",
    stats: {
      topics: 3,
      interactive: false,
    },
  },
  sections: [
    {
      id: "Kahulugan ng Brochure",
      title: "Kahulugan ng Brochure",
      subtitle: "Aralin 4",
      intro:
        "Ang brochure ay isang uri ng print na materyal na naglalaman ng impormasyon tungkol sa produkto, serbisyo, proyekto, o isang paksa. Karaniwang madaling dalhin, maikli, at malinaw ang nilalaman nito.\n\nLayunin: magbigay ng impormasyon, makapaniwala, o makahikayat ng aksyon sa mambabasa.",
    },
    {
      id: "Disenyo at Pabalat ng Brochure",
      title: "Disenyo at Pabalat ng Brochure",
      subtitle: "Disenyo",
      brochureDesignIntro:
        "Ang disenyo ng brochure ay mahalaga upang makatawag pansin at madaling basahin. Narito ang mga aspeto:",
      brochureDesignAspects: [
        {
          title: "Layout",
          points: [
            "Ayusin ang teksto at larawan sa malinaw at organisadong paraan.",
            "Maaaring tri-fold (tatlong bahagi), bi-fold (dalawang bahagi), o simpleng single page.",
            "Magkaroon ng malinaw na flow ng impormasyon mula sa simula hanggang wakas.",
          ],
        },
        {
          title: "Pamagat o Title",
          points: [
            "Dapat malinaw at kaakit-akit.",
            "Ito ang unang nakikita ng mambabasa, kaya dapat nakakakuha ng pansin.",
            'Halimbawa: "Kaligtasan sa Panahon ng Kalamidad" o "Mga Alituntunin sa Pagpapatupad ng Proyekto".',
          ],
        },
        {
          title: "Larawan o Graphics",
          points: [
            "Gumamit ng makulay at malinaw na larawan o graphics.",
            "Nakakatulong ito para mas maunawaan ang mensahe.",
            "Huwag masyadong marami upang huwag magulo ang pabalat.",
          ],
        },
        {
          title: "Kulay at Tema",
          points: [
            "Piliin ang kulay na tugma sa tema ng brochure.",
            "Halimbawa, para sa kalikasan – berde at asul; para sa edukasyon – dilaw at pula.",
          ],
        },
        {
          title: "Mga Bahagi ng Brochure",
          points: [
            "Pabalat (Cover Page): May pamagat, larawan, at maikling panimula o tagline.",
            "Gitnang Bahagi: Detalyadong impormasyon, paliwanag, larawan, at listahan ng mahahalagang puntos.",
            'Huling Bahagi: Impormasyon sa kontak, social media, website, o call to action (hal. "Tumawag na ngayon!").',
          ],
        },
        {
          title: "Font o Tipo ng Sulat",
          points: [
            "Gumamit ng malinaw at madaling basahin na font.",
            "Iwasan ang sobrang artisitikong font sa pangunahing teksto.",
            "Maaaring gamitin ang mas malaking font sa pamagat at mas maliit sa katawan ng teksto.",
          ],
        },
      ],
      brochureCoverIntro:
        "Ang pabalat ng brochure ang unang makikita ng mambabasa, kaya dapat ito ay:",
      brochureCoverPoints: [
        "Kaakit-akit – nakakaengganyo at propesyonal.",
        "Maikli ngunit malinaw – nagpapakita agad ng paksa o tema.",
        "May larawan o graphic – nakatutulong sa visual appeal.",
        "May tagline o maikling panimula – nagbibigay ng ideya sa nilalaman.",
      ],
      brochureCoverExample: {
        title: 'Halimbawa ng pabalat: "Kaligtasan sa Kalamidad"',
        points: [
          "Larawan: Isang bahay na ligtas sa baha at apoy, o isang pamilya na handa sa kalamidad.",
          'Tagline: "Alamin ang tamang hakbang para sa ligtas na pamumuhay!"',
        ],
      },
    },
    {
      id: "Mga Uri ng Brochure",
      title: "Mga Uri ng Brochure",
      subtitle: "Uri",
      brochureTypes: [
        {
          title: "Bi-Fold Brochure",
          points: [
            "Paglalarawan: Nahahati sa dalawang bahagi; may isang dobleng pahina lang.",
            "Katangian: Simple, madaling gawin at basahin.",
            "Halimbawa: Brochure para sa isang produkto o serbisyo, gaya ng sabon o kape.",
          ],
        },
        {
          title: "Tri-Fold Brochure",
          points: [
            "Paglalarawan: Nahahati sa tatlong bahagi, na karaniwang ginagamit sa promosyon at impormasyon.",
            "Katangian: May malinaw na simula, gitna, at wakas sa impormasyon.",
            "Halimbawa: Brochure tungkol sa kalikasan, proyekto sa paaralan, o programa ng pamahalaan.",
          ],
        },
        {
          title: "Z-Fold Brochure",
          points: [
            "Paglalarawan: Nahahati sa tatlong bahagi ngunit nagkukuwento sa zig-zag na paraan (Z-shaped).",
            "Katangian: Magandang gamitin para sa sunod-sunod na impormasyon o step-by-step na gabay.",
            "Halimbawa: Instruksyon sa kaligtasan, gabay sa kalinisan o wastong paghuhugas ng kamay.",
          ],
        },
        {
          title: "Gate-Fold Brochure",
          points: [
            "Paglalarawan: May dalawang flap na bumubukas mula sa gitna, parang pintuan.",
            "Katangian: Nakakaakit at madalas ginagamit sa espesyal na anunsiyo o event.",
            "Halimbawa: Imbitasyon sa isang malaking pagtitipon, exhibit, o fair.",
          ],
        },
        {
          title: "Booklet-Style Brochure",
          points: [
            "Paglalarawan: Kahit maliit, parang aklat; maraming pahina at detalyado.",
            "Katangian: Mas detalyado, pwedeng may maraming larawan at impormasyon.",
            "Halimbawa: School handbook, guide sa kalusugan, o programang pang-edukasyon.",
          ],
        },
        {
          title: "Leaflet",
          points: [
            "Paglalarawan: Karaniwang isang pahina lamang, hindi binabaluktot o dine-dobleng pahina.",
            "Katangian: Madaling ipamigay at mabilis basahin.",
            "Halimbawa: Paalala sa kalinisan, poster ng event, o quick guide.",
          ],
        },
      ],
    },
  ],
};

export const quarter2LessonsById: Record<number, QuarterLesson> = {
  1: quarter2Lesson1,
  2: quarter2Lesson2,
  3: quarter2Lesson3,
  4: quarter2Lesson4,
};

export const quarter2Lessons: QuarterLesson[] = [
  quarter2Lesson1,
  quarter2Lesson2,
  quarter2Lesson3,
  quarter2Lesson4,
];
