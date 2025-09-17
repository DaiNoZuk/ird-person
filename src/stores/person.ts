import { create } from "zustand";
import type { Person } from "../types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const mockPeople: Person[] = [
  {
    id: 1,
    frist_name: "นางสาว ปวีณา",
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
      bank_logo_url:
        "https://e7.pngegg.com/pngimages/641/984/png-clipart-kasikornbank-money-payment-credit-card-wavy-lines-leaf-text-thumbnail.png",
      bank_number: "012-3-45678-9",
    },
    history: [
      "2558–2562: วิศวกรซอฟต์แวร์ บริษัทฟินเทค",
      "2563–ปัจจุบัน: อาจารย์ ภาควิชาวิศวกรรมคอมพิวเตอร์ จุฬาฯ",
    ],
    characteristic: ["ทำงานเป็นทีม", "ละเอียดรอบคอบ", "ชอบสอน/โค้ชชิ่ง"],
    note: "สนใจโปรเจกต์ที่ใช้ข้อมูลจริงสำหรับเดโมนักศึกษา",
  },
  {
    id: 2,
    frist_name: "ดร.ศ. ธนวัฒน์",
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
      bank_logo_url:
        "https://f.ptcdn.info/801/022/000/1409170288-b60f8c1e0e-o.png",
      bank_number: "987-6-54321-0",
    },
    history: [
      "2548–2561: นักวิจัยอาวุโส สวทช.",
      "2562–2567: ผู้อำนวยการโครงการหุ่นยนต์อุตสาหกรรม",
      "2568–ปัจจุบัน: ที่ปรึกษาอิสระด้านระบบอัตโนมัติ",
    ],
    characteristic: ["วิจัยเชิงประยุกต์", "รักการทดลอง", "ทำงานเชิงระบบ"],
    note: "พร้อมรีวิวข้อเสนอโครงการวิจัยและเชื่อมอุตสาหกรรม",
  },
];

type PersonStore = {
  person: Person[];
  addPerson: (p: Person) => void;
  updatePerson: (id: number, dataUpdate: Person) => void;
  removePerson: (id: number) => void;
  nextId: () => number;
};

export const usePersonStore = create<PersonStore>()(
  devtools(
    persist(
      (set,get) => ({
        person: mockPeople,
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

// export const usePersonStore = create<PersonStore>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         person: mockPeople,

//         addPerson: (newPerson) =>
//           set((state) => ({ person: [...state.person, newPerson] })),

//         updatePerson: (id, patch) =>
//           set((state) => ({
//             person: state.person.map((x) => (x.id === id ? { ...x, ...patch } : x)),
//           })),

//         removePerson: (id) =>
//           set((state) => ({ person: state.person.filter((x) => x.id !== id) })),

//         replaceAll: (people) => set({ person: people }),

//         reset: () => set({ person: mockPeople }),

//         nextId: () => {
//           const ids = get().person.map((p) => p.id);
//           return ids.length ? Math.max(...ids) + 1 : 1;
//         },
//       }),
//       {
//         name: "person-store",
//         storage: createJSONStorage(() => localStorage),
//       }
//     )
//   )
// );
