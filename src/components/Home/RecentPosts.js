import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";

const sortedBlogs = [
  {
    title: 'Truth, Dare, and AI Surprises: AI crafts exciting truths and dares tailored just for you!',
    description: 'Experience truth and dares like never before with AI-generated questions and challenges tailored just for you!',
    image: {
      filePath: '../public/truth-or-dare.jpg',
      relativeFilePath: '../../public/blogs/emile-perron-xrVDYZRGdw4-unsplash.jpg',
      format: 'jpeg',
      height: 1080,
      width: 1920,
      aspectRatio: 1.7777777777777777,
      blurhashDataUrl: 'data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAcEAABBQADAAAAAAAAAAAAAAACAAEDBAYRIUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAAMAAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8Agewigzxx17BVrtcXGMm7YibzlERWIVn/2Q=='
    },
    url: '/truth-or-dare'
  },
  {
    title: "Never Have I Ever with AI's Twist: Discover What You’ve Never Done & prepare for unexpected!",
    description: "Dive into a world of AI-crafted challenges! ‘Never Have I Ever’ has never been this unpredictable. Get ready for wild confessions and fun revelations tailored just for you!",
    image: {
      filePath: '../public/never_have_i_ever.webp',
      relativeFilePath: '../../public/blogs/emile-perron-xrVDYZRGdw4-unsplash.jpg',
      format: 'webp',
      height: 1080,
      width: 1920,
      aspectRatio: 1.7777777777777777,
      blurhashDataUrl: 'data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAcEAABBQADAAAAAAAAAAAAAAACAAEDBAYRIUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAAMAAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8Agewigzxx17BVrtcXGMm7YibzlERWIVn/2Q=='
    },
    url: '/never-have-i-ever'
  }

]


const RecentPosts = () => {
  return (
    <section className="w-full  mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {sortedBlogs.map((blog, index) => {
          return (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPosts;
