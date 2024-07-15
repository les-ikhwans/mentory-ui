"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Mentor {
  _id: string;
  username: string;
  email: string;
  role: string;
  photo: string;
  about: string;
  YearsInBusiness: string;
  NumberOfMentees: string;
  category: string[];
  YearsOfMentoring: string;
}

const MentorsCards = () => {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [query, setQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[] | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/mentors.json");
        const data = await response.json();
        setMentors(data);
        setFilteredMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const router = useRouter();

  const handleContinueReading = (id: string) => {
    router.push(`/pages/mentorDetails/${id}`);
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      setFilteredMentors(mentors);
    } else {
      const filtered =
        mentors?.filter((mentor) => {
          if (Array.isArray(mentor.category)) {
            return mentor.category.some((cat) =>
              cat.toLowerCase().includes(query.toLowerCase())
            );
          }
          return false;
        }) || null;
      setFilteredMentors(filtered);
    }
  };

  return (
    <div>
      <div className="mb-10 mt-10 items-center flex flex-col gap-4">
        <h2 className="font-bold text-4xl tracking-wide">
          Search <span className="text-green-50">Mentors</span>
        </h2>
        <h2>Search your mentor and book an appointment in one click</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="All Categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="bg-green-600" type="submit" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-4" />
            Search
          </Button>
        </div>
      </div>

      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(filteredMentors || []).map((mentor) => (
              <div
                key={mentor._id}
                className="overflow-hidden bg-white rounded shadow w-full h-full max-w-xs"
              >
                <div className="p-4">
                  <div className="relative">
                    <a
                      href="#"
                      title=""
                      className="block aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={mentor.photo}
                        alt=""
                      />
                    </a>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                        {mentor.category.join(", ")}
                      </span>
                    </div>
                  </div>
                  <span className="block mt-4 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                    {mentor.NumberOfMentees} Mentees
                  </span>
                  <p className="mt-2 text-lg font-semibold">
                    <a href="#" title="" className="text-black">
                      {mentor.username}
                    </a>
                  </p>
                  <p className="mt-2 text-sm text-gray-600">{mentor.about}</p>
                  <button
                    onClick={() => handleContinueReading(mentor._id)}
                    className="inline-flex items-center justify-center pb-0.5 mt-3 text-sm font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
                  >
                    Continue Reading
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-8 space-x-3 lg:hidden">
            <button
              type="button"
              className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorsCards;
