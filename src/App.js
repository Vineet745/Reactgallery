import React, { useEffect, useState } from "react";
import axios from "axios";
import loader from "./assets/loader.gif";
import "./App.css";
import ReactPaginate from "react-paginate";
function App() {
   
  const [images, setimages] = useState([])


  const getImages = async (count = 1)=>{
    try {
      const {data}= await axios.get(`https://picsum.photos/v2/list?page=${count}&limit=10`)
      setimages(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getImages();
  },[])

  const handlePageClick = ({selected}) => {
    getImages(selected + 1);
    console.log(selected)
  };

  let imagelist = [];
  
if(images.length >0) {
  imagelist = images.map((image,index)=>(
    <div className="card me-3 mb-3" style={{width: "15vmax"}}>
  <img  key={index} src={image.download_url} className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">{image.author}</p>
  </div>
</div>
))

}

  return (
    <>
    <div className="container">
        <h1 className="my-2 text-center" style={{color:"white"}}>Gallery Task</h1>
      <div className="childcontainer">
     {images.length >0 ?(imagelist):(<img  src={loader} alt="" />)}
     </div>
     
     <ReactPaginate 
                className="pagination"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={10}
                previousLabel="<"
            />
        </div>

     
    </>
  );
}

export default App;
