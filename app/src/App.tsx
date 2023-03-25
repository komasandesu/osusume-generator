import React, { useEffect, useRef, useState } from 'react';
import osusume from './images/osusume2.png'
import seikin from './images/SEIKIN1.png'

const width = 800;
const height = 800;

function App() {
  const [png, setPng] = useState<string | null>(null);
  const [text1, setText1] = useState<string>('SEIKIN');
  const [text2, setText2] = useState<string>('セイキン');

  const [img, setImg] = useState<string>(seikin);

  const image2 = new Image();
  image2.src = seikin;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const canvasElem = document.createElement('canvas');
  canvasElem.width = width;
  canvasElem.height = height;
  let ctx = canvasElem.getContext('2d');

  const handleFileInputChange = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image2.src = reader.result as string;
      image2.onload = () => {
        ctx!.clearRect(0, 0, width, height);
        const image = new Image();
        image.src = osusume;
        image.onload = () => {
          ctx!.drawImage(image, 0, 0, width, height);
          ctx!.drawImage(image2, 135, 120, 310, 310);

          const size = 150-(10*(text1.length));
          const font1 = "bold "+String(size)+"px 'MS Pゴシック'";
    
          ctx!.font = font1;
          ctx!.textAlign = 'center';
          ctx!.textBaseline = 'middle';
          ctx!.fillStyle = '#000000';
          ctx!.fillText(text1, 570, 480);

          ctx!.font = "bold 50px 'MS Pゴシック'";
          ctx!.textAlign = 'center';
          ctx!.textBaseline = 'middle';
          ctx!.fillStyle = '#000000';
          ctx!.fillText(text2+'が', 600, 380);
        
          setPng(canvasElem.toDataURL());
        };
      };
    };
  };

  useEffect(() => {
    const image = new Image();
    image.src = osusume;
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, width, height);
      
      ctx!.drawImage(image2, 135, 120, 310, 310);

      const size = 150-(10*(text1.length));
      const font1 = "bold "+String(size)+"px 'MS Pゴシック'";

      ctx!.font = font1;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillStyle = '#000000';
      ctx!.fillText(text1, 570, 480);

      ctx!.font = "bold 50px 'MS Pゴシック'";
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillStyle = '#000000';
      ctx!.fillText(text2+'が', 600, 380);
      setPng(canvasElem.toDataURL());
    };
  }, [text1,text2]);

  const handleTextChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText1(e.target.value);
  };

  const handleTextChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText2(e.target.value);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.value);
  };

  return (
    <div>
      <h3>SEIKINがおすすめ!</h3>
      <div>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileInputChange} />
      </div>

      <div>
        <label>テキスト1: </label>
        <input type="text" value={text1} onChange={handleTextChange1} />
      </div>
      <div>
        <label>テキスト2: </label>
        <input type="text" value={text2} onChange={handleTextChange2} />
      </div>

      {png && (
        <div className="comp" style={{ display: 'flex' }}>
          <img alt="icon" src={png} />
        </div>
      )}
    </div>
  )
}

export default App