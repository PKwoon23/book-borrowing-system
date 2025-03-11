export const booksData = [
    { id: "01", title: "JavaScript Basics", status: "ว่าง" },
    { id: "02", title: "React for Beginners", status: "ว่าง" },
    { id: "03", title: "Next.js Handbook", status: "มีผู้ยืมแล้ว" },
    { id: "04", title: "Node.js in Action", status: "ว่าง" },
    { id: "05", title: "CSS Mastery", status: "ว่าง" },
    { id: "06", title: "Vue.js Essentials", status: "มีผู้ยืมแล้ว" },
    { id: "07", title: "GraphQL Guide", status: "ว่าง" },
    { id: "08", title: "Tailwind CSS Complete", status: "ว่าง" },
    { id: "09", title: "TypeScript Deep Dive", status: "มีผู้ยืมแล้ว" },
    { id: "10", title: "Fullstack Development", status: "ว่าง" },
  ];
  
  export function getBooks() {
    const savedBooks = localStorage.getItem("booksData");
  
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
  
    localStorage.setItem("booksData", JSON.stringify(booksData));
    return booksData;
  }