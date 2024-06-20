//images
import Thumbnail_1 from "../images/blog1.jpg";
import Thumbnail_2 from "../images/blog2.jpg";
import Thumbnail_3 from "../images/blog3.jpg";
import Thumbnail_4 from "../images/blog4.jpg";

//DUMMYS
export const DUMMYS_POSTS = [
  {
    id: 1,
    thumbnail: Thumbnail_1,
    category: "education",
    title:
      "education education this is ipsum dolor sit amet, consectetur adipiscing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    authorID: 3,
  },
  {
    id: 2,
    thumbnail: Thumbnail_2,
    category: "science",
    title: "science science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    authorID: 1,
  },
  {
    id: 3,
    thumbnail: Thumbnail_3,
    category: "weather",
    title: "weather weather",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    authorID: 13,
  },
  {
    id: 4,
    thumbnail: Thumbnail_4,
    category: "farming",
    title: "farming farming",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    authorID: 11,
  },
];

// para React-Quill instancia
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export const formats = [
  "header",
  "bold",
  "italic",
  "undeline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const post_categories = [
  "Uncategorized",
  "Agriculture",
  "Business",
  "Education",
  "Entertainement",
  "Art",
  "Investment",
  "Weather",
];
