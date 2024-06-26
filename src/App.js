import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';
import Card from './Card';
import YT from './log.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [link, setLink] = useState("");
  const [videoData, setVideoData] = useState(undefined);
  const [isLoading,setisLoading]=useState(false)

  const handleChange = (e) => {
    setLink(e.target.value);
  }

  const getData = async () => {
    let id = link || "";

    if (link.includes("shared")) {
      const shared = link.split("/")[3]
      if(shared==="shorts")
        {
          const shared = link.split("/")[4]
          id=shared.slice(0,11)
          // console.log("for Shared shorts=>",id)
          toast.success("Link is Valid..")

        }else
        {
          const shared = link.split("/")[3]

          id=shared.slice(0,11)
          // console.log("for Shared video=>",id)
          toast.success("Link is Valid..")

        }
    }
    else if (link.includes("/shorts/")) {
      const path = link.split("/shorts/")[1];
        id=path.slice(0,11)
      // console.log("For Browse short=>",id)
      toast.success("Link is Valid..")

    } 
    else if (link.includes("?v=")) {
      const path = link.split("=")[1];
      id=path.slice(0,11)
      // console.log("For browse Video=>",id)
      toast.success("Link is Valid..")

    }
    else if (link.includes("?si=")) {
      const path = link.split("/")[3]
      id=path.split("?")[0]
      // console.log("For dots Video=>", id);
      toast.success("Link is Valid..")

    } 
    else
    {
      if(id.length!==11)
        {
          toast.error("Please Enter valid Link...")
        }
    }

    

    if (id) {
      const options = {
        method: 'GET',
        url: `https://youtube-to-mp4-mp3.p.rapidapi.com/shorts/getVideo/${id}`,
        headers: {
          'x-rapidapi-key': '2a432247c1mshc79c8ff875339f2p1d10fajsn1c8a0840e79e',
          'x-rapidapi-host': 'youtube-to-mp4-mp3.p.rapidapi.com'
        }
      };

      try {
        setisLoading(true)
        const response = await axios.request(options);
        setisLoading(false)
        setVideoData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="App">
        <hr />
        <div className='d-flex align-content-center justify-content-center'>
        <img src={YT} alt='YTlogo' width={100}/><h2 className='align-self-center'>Youtube Video Downloader</h2>
        </div>
        <hr />
        <input 
          type='text' 
          placeholder='Enter Video Link....' 
          value={link} 
          onChange={handleChange} 
        />
        <button onClick={getData} style={{ marginLeft: '13px' }}>
          Download
        </button>
      </div>
      <div className='d-flex justify-content-center mt-5'>
        <ToastContainer/>
      { isLoading?<p>Loading......</p>:''}
        {videoData !== undefined && <Card videoData={videoData} />}
      </div>
    </>
  );
}

export default App;
