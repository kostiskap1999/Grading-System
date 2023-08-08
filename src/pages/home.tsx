export default function HomePage() {


  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <div style={{backgroundColor: "red", flex: 1}}>User Data</div>
      <div style={{display: "flex", flexDirection: "row", flex: 5}}>
        <div style={{backgroundColor: "green", flex: 1}}>Subjects List</div>
        <div style={{backgroundColor: "blue", flex: 1}}>Projects List</div>
      </div>
    </div>
  );
}
