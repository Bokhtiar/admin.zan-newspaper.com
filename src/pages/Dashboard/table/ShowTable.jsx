import DataTable from "react-data-table-component";
import img from "../../../assets/assets/images/exam_category.png";

// Updated News Data
const newsData = [
  {
    id: 1,
    image: img,
    title: "Govt Announces Major Economic Reforms",
    category: "Politics",
    time: "10:30 AM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/bd.png",
  },
  {
    id: 2,
    image: img,
    title: "Tech Conference Highlights AI Breakthroughs",
    category: "Technology",
    time: "09:20 AM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    id: 3,
    image: img,
    title: "New Species Discovered in Amazon Forest",
    category: "Environment",
    time: "08:00 AM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/br.png",
  },
  {
    id: 4,
    image: img,
    title: "Stock Market Hits All-Time High",
    category: "Business",
    time: "11:00 AM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    id: 5,
    image: img,
    title: "International Football Cup Kicks Off Today",
    category: "Sports",
    time: "12:45 PM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    id: 6,
    image: img,
    title: "Healthcare Reform Bill Passed in Senate",
    category: "Health",
    time: "01:15 PM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/fr.png",
  },
  {
    id: 7,
    image: img,
    title: "Film Festival Attracts Global Stars",
    category: "Entertainment",
    time: "02:00 PM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/in.png",
  },
  {
    id: 8,
    image: img,
    title: "New Study Reveals Climate Change Impact",
    category: "Science",
    time: "03:10 PM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/ca.png",
  },
  {
    id: 9,
    image: img,
    title: "Cybersecurity Breach Affects Millions",
    category: "Technology",
    time: "04:20 PM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/ru.png",
  },
  {
    id: 10,
    image: img,
    title: "Local Election Results Announced",
    category: "Politics",
    time: "05:00 PM",
    date: "2025-05-07",
    flag: "https://flagcdn.com/w40/es.png",
  },
];


// Table Columns
const newsColumns = [
  {
    name: "Category",
    selector: (row) => row.category,
    cell: (row) => (
      <span className="text-sm font-medium">{row.category}</span>
    ),
    sortable: true,
    grow: 1,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    cell: (row) => (
      <span className="text-sm font-semibold">{row.title}</span>
    ),
    grow: 2,
  },
  {
    name: "Image",
    selector: (row) => row.image,
    cell: (row) => (
      <img
        src={row.image}
        alt="news"
        className="w-12 h-12 object-cover rounded-md"
      />
    ),
    center: true,
  },
  {
    name: "Location",
    selector: (row) => row.flag,
    cell: (row) => (
      <img
        src={row.flag}
        alt="flag"
        className="w-5 h-5 rounded-full"
      />
    ),
    center: true,
  },
  {
    name: "Time",
    selector: (row) => row.time,
    center: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    center: true,
  },
];

const ShowTable = () => {
  return (
    <div className="p-5 rounded-lg shadow-md text-lightTitle dark:text-darkTitle bg-lightCard dark:bg-dark">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Today's Top 10 News</h2>

      </div>
      <DataTable
        columns={newsColumns}
        data={newsData}
        responsive
        highlightOnHover
        pagination
        className="rdt_Table"
      />
    </div>
  );
};

export default ShowTable;
