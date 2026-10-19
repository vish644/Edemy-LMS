import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Button from "../../common/Button";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { courseId } = useParams();
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (!Array.isArray(enrolledCourses) || !courseId) {
      setCourseData(null);
      return;
    }

    const matchedCourse = enrolledCourses.find(
      (course) => course._id === courseId,
    );
    setCourseData(matchedCourse || null);
  }, [enrolledCourses, courseId]);

  // const getCourseData = () => {
  //   enrolledCourses.map((course) => {
  //     if (course._id === courseId) {
  //       setCourseData(course);
  //     }
  //   });
  // };

  // useEffect(() => getCourseData());

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 ms:px-36">
        {/* Left column  */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5 max-w-2xl">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div
                  key={chapter.chapterId || index}
                  className="border border-gray-300 bg-white mb-2 rounded "
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow down"
                        className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {Array.isArray(chapter.chapterContent)
                        ? chapter.chapterContent.length
                        : 0}{" "}
                      lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openSections[index] ? " max-h-96" : " max-h-0"}`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-e-gray-300">
                      {Array.isArray(chapter.chapterContent) ? (
                        chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className="flex items-start gap-2 py-1">
                            <img
                              src={
                                false ? assets.blue_tick_icon : assets.play_icon
                              }
                              alt="Play icon"
                              className="w-4 h-4 mt-1"
                            />
                            <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2">
                                {lecture.lectureUrl && (
                                  <p
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() =>
                                      setPlayerData({
                                        ...lecture,
                                        chapter: index + 1,
                                        lecture: i + 1,
                                      })
                                    }
                                  >
                                    Watch
                                  </p>
                                )}
                                <p>
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] },
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="py-1 text-sm">No lectures available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* Right column   */}
        <div>
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl?.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <Button
                  text={false ? "Completed" : "Mark as complete"}
                  className="text-blue-600"
                />
              </div>
            </div>
          ) : courseData ? (
            <img src={courseData.courseThumbnail} alt="course thumbnail" />
          ) : (
            <div className="rounded border border-dashed border-gray-300 p-6 text-gray-500">
              No course data available for this lesson.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
