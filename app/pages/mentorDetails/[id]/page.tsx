"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-tailwindcss-datepicker";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import Reviews from "@/app/_components/reviews";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Mentor {
  _id: string;
  username: string;
  email: string;
  role: string;
  photo: string;
  about: string;
  YearsInbusiness: string;
  NumberOfMentees: string;
  category: string;
  YearsOfMentoring: string;
  rating: number;
}
interface Client {
  userId: string;
}

const MentorDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = params.id;
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [Client, setClient] = useState<Client | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");

  interface DecodedToken extends JwtPayload {
    userId: string;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found."); //replace with toast
      return;
    }
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log("le decodedToken est:", decodedToken);
      const userId = decodedToken.userId;
      console.log("le userId IN decodedToken est:", userId);
      setClient((prevData) => ({ ...prevData, userId }));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [router]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/mentors.json");
        const mentors = await response.json();
        const selectedMentor = mentors.find((m: Mentor) => m._id === id);
        if (selectedMentor) {
          setMentor(selectedMentor);
        } else {
          console.error("Mentor not found with id:", id);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, [id]);

  const handleDateChange = (newDate: any) => {
    console.log("newDate:", newDate);
    setDate(newDate?.startDate || null);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleTimeChange = (selectedTime: string) => {
    setTime(selectedTime);
  };

  if (!mentor) return <div>Loading...</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      toast.error("You need to be logged in to continue.", {
        onClose: () => {
          router.push("/pages/login");
        },
      });
    } else {
      toast.success(
        "Your session is added to cart, thank you for trying out our demo.",
        {
          autoClose: 2500,
          onClose: () => {
            router.push("/");
          },
        }
      );
    }
  };

  return (
    <div>
      <section className="mb-9  ml-[300px] ">
        <div className=" max-w-[1170px] px-5 mx-auto ">
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] ">
            <div className="lg:col-span-2">
              <div className="mt-8">
                <div className="flex items-center gap-4 mb-0">
                  <figure className="max-w-[200px] max-h-[200px]">
                    <img src={mentor.photo} alt="" />
                  </figure>
                  <div>
                    <span className="bg-[#CCF0F3] text-[#25c7c7] py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px]leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                      {mentor.category}
                    </span>
                    <h3 className="text-[22px] leading-9 font-bold text-black mt-3">
                      {mentor.username}
                    </h3>
                    <div className="flex items-center gap-[6px] ">
                      <span className="flex items-center gap-[6px] text-black text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                        <svg
                          className="w-4 fill-[#facc15]"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>

                        {mentor.rating}
                      </span>
                    </div>
                    <p className="font-[15px] lg:max-w-[390px] leading-6 "></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[22px] leading-9 font-bold text-green-600 mt-3">
                    about of
                    <span className="text-[#25c7c7] ml-1 font-bold text-[24px] leading-9">
                      {mentor.username}
                    </span>
                  </h3>
                  <p className="">{mentor.about}</p>
                </div>
                <div>
                  <section className="py-10  sm:py-16 lg:py-9 ">
                    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                      <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                          Numbers tell the story
                        </h2>
                        <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                          Amet minim mollit non deserunt ullamco est sit aliqua
                          dolor do amet sint. Velit officia consequat duis.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-9 sm:gap-x-8 md:grid-cols-3">
                        <div>
                          <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                              {" "}
                              {mentor.YearsInbusiness} +{" "}
                            </span>
                          </h3>
                          <p className="mt-4 text-xl font-medium text-gray-900">
                            Years in business
                          </p>
                          <p className="text-base mt-0.5 text-gray-500">
                            Creating the successful path
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                              {mentor.NumberOfMentees}
                            </span>
                          </h3>
                          <p className="mt-4 text-xl font-medium text-gray-900">
                            Number of Mentees
                          </p>
                          <p className="text-base mt-0.5 text-gray-500">
                            In last 6 years
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                              {" "}
                              {mentor.YearsOfMentoring} +
                            </span>
                          </h3>
                          <p className="mt-4 text-xl font-medium text-gray-900">
                            Years of Mentoring
                          </p>
                          <p className="text-base mt-0.5 text-gray-500">
                            Working for your success
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-screen">
        <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
            Book an appointment
          </h1>
          <p className="mt-6 text-lg text-white">
            Get an appointment with our experienced accountants
          </p>
          <img
            className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>

        <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
          <form onSubmit={handleSubmit}>
            <div>
              <p className="font-serif text-xl font-bold text-blue-900">
                Select a service
              </p>
              <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    value="300"
                    onChange={handleServiceChange}
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                    htmlFor="radio_1"
                  >
                    <span className="mt-2- font-medium">300 $</span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    value="600"
                    onChange={handleServiceChange}
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                    htmlFor="radio_2"
                  >
                    <span className="mt-2 font-medium">500 $</span>
                    <span className="text-xs uppercase">
                      with follow-up of results
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_3"
                    type="radio"
                    name="radio"
                    value="800"
                    onChange={handleServiceChange}
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                    htmlFor="radio_3"
                  >
                    <span className="mt-2 font-medium">800$</span>
                    <span className="text-xs uppercase">
                      meeting in real life
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                Select a date
              </p>
              <div className="relative mt-4 w-56">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <DatePicker
                  value={{ startDate: date, endDate: date }}
                  onChange={handleDateChange}
                  showFooter={true}
                  showShortcuts={false}
                  asSingle={true}
                  displayFormat={"DD/MM/YYYY"}
                  classNames={{
                    input: () =>
                      "datepicker-input block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm",
                  }}
                />
              </div>
            </div>

            <div>
              <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                Select a time
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                {["12:00", "14:00", "09:00", "15:00"].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleTimeChange(t)}
                    className={`rounded-lg px-4 py-2 font-medium ${
                      time === t
                        ? "bg-emerald-700 text-white"
                        : "bg-emerald-100 text-emerald-900"
                    } active:scale-95`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MentorDetails;
