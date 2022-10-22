import React,{useState,useCallback,useRef} from 'react'
import "./cropping.css"
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

import { generateDownload } from "./utils/cropimage";


function Cropping() {
    const inputRef = useRef();
    const [data,setData]= useState("")
    const [image, setImage] =useState(null)
	const [croppedArea, setCroppedArea] =useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1) 

  const triggerFileSelectPopup = () => inputRef.current.click();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    setCroppedArea(croppedAreaPixels);
  }, [])

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load", () => {
            setImage(reader.result);
        });
    }
};

const onDownload = () => {
  generateDownload(image, croppedArea)
  .then((res)=>{
      console.log(res)
      setData(res)
  })
    console.log(image);
   
  
    
};

  return (
    <>
   
    
   
				{image ? (
					<>
						<div className='cropper'>
						<Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								color='primary'
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>
					</>
				) : null}
			

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</Button>
				<Button variant='contained' color='secondary' onClick={onDownload}>
					Download
				</Button>
			</div>
		
    </>
  )
}

export default Cropping