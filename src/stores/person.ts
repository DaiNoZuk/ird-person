import { create } from "zustand";
import type { Person } from "../types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const mockPeople: Person[] = [
  {
    id: 1,
    perfix_name: "น.ส.",
    first_name: "ปวีณา",
    last_name: "ศิริวงศ์",
    image_url:
      "https://cdn.pixabay.com/photo/2024/01/15/13/02/ai-woman-8510159_1280.png",
    affiliation: "จุฬาลงกรณ์มหาวิทยาลัย",
    expertise_main: [
      "วิศวกรรมซอฟต์แวร์",
      "ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง",
    ],
    expertise_second: [
      "วิทยาการข้อมูลและการวิเคราะห์ข้อมูล",
      "UX/UI และการออกแบบประสบการณ์ผู้ใช้",
    ],
    retired: false,
    contact: {
      email: "paveena.siriwong@example.com",
      phone: ["081-234-5678", "02-123-4567"],
      address: "แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330",
    },
    bank: {
      bank_name: "ธนาคารกสิกรไทย",
      bank_logo_url: "https://www.kasikornbank.com/favicon.ico",
      bank_number: "012-3-45678-9",
    },
    history: [
      "2558–2562: วิศวกรซอฟต์แวร์ บริษัทฟินเทค",
      "2563–ปัจจุบัน: อาจารย์ ภาควิชาวิศวกรรมคอมพิวเตอร์ จุฬาฯ",
    ],
    characteristic: ["ทำงานเป็นทีม", "ละเอียดรอบคอบ", "ชอบสอน/โค้ชชิ่ง"],
    note: "สนใจโปรเจกต์ที่ใช้ข้อมูลจริงสำหรับเดโมนักศึกษา",
    created_date: "2025-08-20T09:10:00+07:00",
    updated_date: "2025-09-12T15:40:00+07:00",
    created_by: "admin",
    updated_by: "admin",
  },
  {
    id: 2,
    perfix_name: "ดร.ศ.",
    first_name: "ธนวัฒน์",
    last_name: "เกียรติขจร",
    image_url:
      "https://image.cdn2.seaart.me/2023-08-05/52808627712069/977ab6d63599a7c5f5e4a765dc7b4b203c06816a_high.webp",
    affiliation: "สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (สวทช.)",
    expertise_main: [
      "หุ่นยนต์และระบบอัตโนมัติ",
      "อินเทอร์เน็ตของสรรพสิ่ง (IoT)",
    ],
    expertise_second: [
      "นาโนเทคโนโลยีและวัสดุขั้นสูง",
      "ระบบขนส่งและโลจิสติกส์อัจฉริยะ",
    ],
    retired: true,
    contact: {
      email: "thanawat.k@example.com",
      phone: ["089-765-4321"],
      address: "อุทยานวิทยาศาสตร์ประเทศไทย คลองหนึ่ง คลองหลวง ปทุมธานี 12120",
    },
    bank: {
      bank_name: "ธนาคารกรุงเทพ",
      bank_logo_url: "https://www.bangkokbank.com/favicon.ico",
      bank_number: "987-6-54321-0",
    },
    history: [
      "2548–2561: นักวิจัยอาวุโส สวทช.",
      "2562–2567: ผู้อำนวยการโครงการหุ่นยนต์อุตสาหกรรม",
      "2568–ปัจจุบัน: ที่ปรึกษาอิสระด้านระบบอัตโนมัติ",
    ],
    characteristic: ["วิจัยเชิงประยุกต์", "รักการทดลอง", "ทำงานเชิงระบบ"],
    note: "พร้อมรีวิวข้อเสนอโครงการวิจัยและเชื่อมอุตสาหกรรม",
    created_date: "2025-07-05T10:00:00+07:00",
    updated_date: "2025-09-10T08:25:00+07:00",
    created_by: "system",
    updated_by: "editor01",
  },
  {
    id: 3,
    perfix_name: "ศ.ดร.",
    first_name: "ชลธิชา",
    last_name: "นาคิน",
    image_url: "https://i.pravatar.cc/300?u=chonlathicha.nakin",
    affiliation: "มหาวิทยาลัยมหิดล",
    expertise_main: [
      "วิทยาศาสตร์สุขภาพดิจิทัล (Digital Health)",
      "เวชศาสตร์แม่นยำและจีโนมิกส์",
    ],
    expertise_second: ["โภชนาการและอาหารเพื่อสุขภาพ", "สาธารณสุขและระบาดวิทยา"],
    retired: false,
    contact: {
      email: "chonlathicha.nk@mahidol.ac.th",
      phone: ["086-111-2233"],
      address: "ต.ศาลายา อ.พุทธมณฑล จ.นครปฐม 73170",
    },
    bank: {
      bank_name: "ธนาคารไทยพาณิชย์",
      bank_logo_url: "https://www.scb.co.th/favicon.ico",
      bank_number: "111-2-33333-4",
    },
    history: [
      "2555–2560: นักวิจัยคลินิก ม.มหิดล",
      "2561–ปัจจุบัน: อาจารย์แพทย์ ภาควิชาเวชศาสตร์ชุมชน",
    ],
    characteristic: [
      "ตั้งคำถามเก่ง",
      "เน้นหลักฐานเชิงประจักษ์",
      "สื่อสารชัดเจน",
    ],
    note: "สนใจโครงการ telemedicine กับ รพ.เครือข่าย",
    created_date: "2025-08-01T13:20:00+07:00",
    updated_date: "2025-09-14T09:15:00+07:00",
    created_by: "admin",
    updated_by: "admin",
  },
  {
    id: 4,
    perfix_name: "ผศ.",
    first_name: "อภิชาติ",
    last_name: "ใจดี",
    image_url: "https://i.pravatar.cc/300?u=apichat.jaidee",
    affiliation: "มหาวิทยาลัยขอนแก่น",
    expertise_main: ["วิศวกรรมโยธา", "วิศวกรรมทรัพยากรน้ำและอุทกวิทยา"],
    expertise_second: [
      "ภูมิสารสนเทศและการสำรวจระยะไกล (GIS/Remote Sensing)",
      "อนุรักษ์สิ่งแวดล้อมและการเปลี่ยนแปลงสภาพภูมิอากาศ",
    ],
    retired: false,
    contact: {
      email: "apichat.jd@kku.ac.th",
      phone: ["082-456-7890"],
      address: "อ.เมืองขอนแก่น จ.ขอนแก่น 40002",
    },
    bank: {
      bank_name: "ธนาคารกรุงศรีอยุธยา (กรุงศรี)",
      bank_logo_url: "https://www.krungsri.com/favicon.ico",
      bank_number: "222-1-55555-6",
    },
    history: [
      "2557–2563: วิศวกรที่ปรึกษาโครงการเขื่อน",
      "2564–ปัจจุบัน: อาจารย์คณะวิศวกรรมศาสตร์ มข.",
    ],
    characteristic: ["ชอบภาคสนาม", "แก้ปัญหาเชิงระบบ", "ใจเย็น"],
    note: "ทำโมเดลน้ำท่วมร่วมกับหน่วยงานท้องถิ่น",
    created_date: "2025-06-18T14:05:00+07:00",
    updated_date: "2025-09-11T11:45:00+07:00",
    created_by: "editor01",
    updated_by: "editor01",
  },
  {
    id: 5,
    perfix_name: "น.ส.",
    first_name: "อารีย์",
    last_name: "วัฒนากุล",
    image_url: "https://i.pravatar.cc/300?u=aree.wattanakul",
    affiliation:
      "สำนักงานคณะกรรมการส่งเสริมวิทยาศาสตร์ วิจัยและนวัตกรรม (สกสว.)",
    expertise_main: [
      "เศรษฐศาสตร์ประยุกต์และนโยบายสาธารณะ",
      "ธุรกิจนวัตกรรมและสตาร์ทอัพ",
    ],
    expertise_second: [
      "การตลาดดิจิทัลและอีคอมเมิร์ซ",
      "ฟินเทคและระบบการชำระเงินดิจิทัล",
    ],
    retired: false,
    contact: {
      email: "aree.w@nrct.or.th",
      phone: ["081-888-9900"],
      address: "แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพมหานคร 10210",
    },
    bank: {
      bank_name: "ทีเอ็มบีธนชาต (ttb)",
      bank_logo_url: "https://www.ttbbank.com/favicon.ico",
      bank_number: "333-0-77777-8",
    },
    history: [
      "2556–2562: นักวิเคราะห์นโยบายวิจัย",
      "2563–ปัจจุบัน: ผู้จัดการโครงการทุนวิจัยเชิงพาณิชย์",
    ],
    characteristic: ["มองภาพรวมดี", "คุยกับเอกชนคล่อง", "เน้นผลลัพธ์"],
    note: "สนใจโครงการบ่มเพาะสตาร์ทอัพด้านสุขภาพดิจิทัล",
    created_date: "2025-07-30T09:00:00+07:00",
    updated_date: "2025-09-15T16:10:00+07:00",
    created_by: "system",
    updated_by: "admin",
  },
];

type PersonStore = {
  person: Person[];
  isLoading: boolean;
  // getPerson: () => Person[] | undefined;
  getById: (id: number) => Person | undefined;
  addPerson: (p: Person) => void;
  updatePerson: (id: number, dataUpdate: Person) => void;
  removePerson: (id: number) => void;
  nextId: () => number;
};

export const usePersonStore = create<PersonStore>()(
  devtools(
    persist(
      (set, get) => ({
        person: mockPeople,
        isLoading: false,
        getById: (id: number) => get().person.find((p) => p.id == id),
        addPerson: (newPerson: Person) =>
          set((state) => ({ person: [...state.person, newPerson] })),
        updatePerson: (id: number, dataUpdate: Person) => {
          set(
            (state) => ({
              person: state.person.map((p) => (p.id == id ? dataUpdate : p)),
            }),
            false,
            { type: "updatePerson", id }
          );
        },
        removePerson: (id: number) =>
          set(
            (state) => ({ person: state.person.filter((p) => p.id != id) }),
            false,
            { type: "removePerson", id }
          ),
        nextId: () => {
          const ids = get().person.map((p) => p.id);
          return ids.length ? Math.max(...ids) + 1 : 1;
        },
      }),
      {
        name: "person-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

localStorage.removeItem("person-store");
