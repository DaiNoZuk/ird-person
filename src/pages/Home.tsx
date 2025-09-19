import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import DialogSearch from "../components/DialogSearch";
import { PiNewspaperClipping } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { usePersonStore } from "../stores/person";
import type { Person } from "../types";
import { image } from "../assets/images";
import { useAffiliationStore } from "../stores/affiliation";
import { useExpertiseStore } from "../stores/expertise";
import { BsDatabaseFillX } from "react-icons/bs";
import DialogLoading from "../components/DialogLoding";

function Home() {
  const navigate = useNavigate();
  const { person } = usePersonStore();
  const { affiliation } = useAffiliationStore();
  const { expertise } = useExpertiseStore();

  const [search, setSearch] = useState("");
  const [selectedAffiliation, setselectedAffiliation] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [dataPerson, setDataPerson] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      filterPerson();
    }, 300);
  }, [person, selectedAffiliation, selectedExpertise]);

  const filterPerson = () => {
    const textSearch = (search || "").trim().toLowerCase();

    if (!textSearch && !selectedAffiliation && !selectedExpertise) {
      setDataPerson(person);
      return;
    }

    const filterData = person.filter((p) => {
      const firstName = (p.first_name || "").toLowerCase();
      const lastName = (p.last_name || "").toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();
      const affiliation = (p.affiliation || "").toLowerCase();
      const expertise = Array.isArray(p.expertise_main) ? p.expertise_main : [];
      let matchAffiliation = true;

      const matchRetired = person.filter(
        (e) => e.retired == ("เกษียณ" == selectedAffiliation)
      );

      const matchSearch =
        !textSearch ||
        firstName.startsWith(textSearch) ||
        lastName.startsWith(textSearch) ||
        fullName.includes(textSearch);

      if (selectedAffiliation) {
        if (selectedAffiliation === "เกษียณ") {
          matchAffiliation = p.retired === true;
        } else {
          matchAffiliation = selectedAffiliation === affiliation;
        }
      }
      const matchExpertise =
        !selectedExpertise ||
        expertise.some((x) => (x || "").toLowerCase() === selectedExpertise);

      return matchSearch && matchAffiliation && matchExpertise && matchRetired;
    });

    setDataPerson(filterData);
  };

  return (
    <div className="px-6 w-full">
      <>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative w-96">
              <input
                type="text"
                className="py-2 px-2 rounded-lg w-full pr-10 bg-primary-100 outline-1 outline-primary-600 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
                placeholder="ชื่อ - นามสกุล ผู้ทรงคุณวุฒิ"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      filterPerson();
                    }, 300);
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    filterPerson();
                  }, 300);
                }}
                className="absolute right-0 top-5 -translate-y-1/2 text-primary-50 focus:outline-none py-2 px-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 border-none"
              >
                <IoSearchSharp className="w-6 h-6" />
              </button>
            </div>
            <div className="relative w-60">
              <DialogSearch
                dataValues={affiliation}
                value={selectedAffiliation}
                onChange={(value) => {
                  setselectedAffiliation(value);
                }}
                defaultValue="--สังกัด--"
                placeholderInput="ค้นหาสังกัด"
                lable="เลือกสังกัด"
              />
            </div>
            <div className="w-60">
              <DialogSearch
                dataValues={expertise}
                value={selectedExpertise}
                onChange={(value) => setSelectedExpertise(value)}
                defaultValue="--ความชำนาญ--"
                placeholderInput="ค้นหาความชำนาญ"
                lable="เลือกความชำนาญ"
              />
            </div>
          </div>
          <button
            onClick={() => navigate("create-person")}
            className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-4 py-2 hover:bg-hv-success-bg hover:border-hv-success-border cursor-pointer"
          >
            <FaPlus className="inline mr-2" />
            <span>ผู้ทรงคุณวุฒิ</span>
          </button>
        </div>
        {isLoading ? (
          <DialogLoading isLoading={isLoading} />
        ) : (
          <>
            {dataPerson.length <= 0 ? (
              <div className="w-full mt-20 text-4xl flex flex-col items-center justify-center">
                <BsDatabaseFillX />
                <p>ไม่พบข้อมูลที่ค้นหา</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 pb-6 ">
                {dataPerson &&
                  dataPerson.map((item: Person, index: number) => (
                    <div
                      key={index}
                      className="mt-4  px-4 py-2 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center "
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={
                            item.image_url == ""
                              ? `${image.user}`
                              : `${item.image_url}`
                          }
                          alt=""
                          className="w-56 h-56 rounded-2xl shadow-[0px_0px_8px_2px_rgba(0,0,0,0.25)]"
                        />
                        <p className="text-2xl">
                          {item.perfix_name} {item.first_name} {item.last_name}
                        </p>
                      </div>
                      <div className="flex flex-col items-start justify-start gap-2 mt-2 w-full h-full">
                        {item.retired ? (
                          <p>เกษียณอายุ</p>
                        ) : (
                          <p>สังกัด :{item.affiliation ?? "ไม่มี"}</p>
                        )}
                        <p className="underline">ความเชี่ยวชาญ </p>
                        {item.expertise_main.length > 0 ? (
                          item.expertise_main.map((e, i) => (
                            <p key={i} className="text-md">
                              - {e}
                            </p>
                          ))
                        ) : (
                          <p>ไม่มี</p>
                        )}
                        <button
                          onClick={() => navigate(`/person/${item.id}`)}
                          className="flex items-center gap-2 rounded-lg outline bg-wait-text outline-primary-600 text-wait-bg px-4 py-1 hover:bg-hv-wait-text hover:border-hv-wait-border cursor-pointer"
                        >
                          <PiNewspaperClipping />
                          <span>รายละเอียด</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Home;
