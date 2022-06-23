import HomePage from "./Pages/HomePage";

export const config = {
  endPoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
};

export const PagesLimit = 5;
export const DataPerPage = 10;

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
