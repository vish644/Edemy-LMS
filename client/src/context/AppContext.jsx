import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allcourses, setallCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  // Fetch all courses
  const fetchAllCourses = async () => {
    setallCourses(dummyCourses);
  };

  // Function to calculate average rating of a course or a direct numeric rating
  const calculateRating = (courseOrRating) => {
    if (typeof courseOrRating === "number") {
      return courseOrRating;
    }

    if (!courseOrRating || !Array.isArray(courseOrRating.courseRatings)) {
      return 0;
    }

    if (courseOrRating.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    courseOrRating.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / courseOrRating.courseRatings.length;
  };

  // Function to calculate course chapter type
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach(
      (lecture) => (time += lecture.lectureDuration),
    );

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
  };

  // Function to calculate No. of lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allcourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
