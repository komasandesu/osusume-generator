import React, { useEffect, useRef, useState } from 'react';
import osusume from './images/osusume2.png'
import seikin from './images/SEIKIN1.png'

const width = 400;
const height = 400;

function App() {
  const [png, setPng] = useState<string | null>(null);
  const [text1, setText1] = useState<string>('SEIKIN');
  const [text2, setText2] = useState<string>('セイキン');


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
          
          ctx!.save();

          ctx!.beginPath();
          ctx!.arc(145, 137, 100, 0, 2*Math.PI, false);
          ctx!.clip();
          ctx!.drawImage(image2, 45, 38, 200, 200);
          
          ctx!.restore();

          const size1 = 74-(4.8*(text1.length));
          const font1 = "bold "+String(size1)+"px 'MS Pゴシック'";
    
          ctx!.font = font1;
          ctx!.textAlign = 'center';
          ctx!.textBaseline = 'middle';
          ctx!.fillStyle = '#000000';
          ctx!.fillText(text1, 285, 240);

          const size2 = 26-(2*(Math.max(4,text2.length)-4));
          const font2 = "bold "+String(size2)+"px 'MS Pゴシック'";
          ctx!.font = font2;
          ctx!.textAlign = 'center';
          ctx!.textBaseline = 'middle';
          ctx!.fillStyle = '#000000';
          ctx!.fillText(text2+'が', 300, 190);
        
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
      ctx!.drawImage(image2, 50, 45, 188, 188);
      

      const size1 = 74-(4.8*(text1.length));
      const font1 = "bold "+String(size1)+"px 'MS Pゴシック'";

      ctx!.font = font1;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillStyle = '#000000';
      ctx!.fillText(text1, 285, 240);

      const size2 = 26-(2*(Math.max(4,text2.length)-4));
      const font2 = "bold "+String(size2)+"px 'MS Pゴシック'";
      ctx!.font = font2;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillStyle = '#000000';
      ctx!.fillText(text2+'が', 300, 190);
      setPng(canvasElem.toDataURL());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text1,text2]);

  const handleTextChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText1(e.target.value);
  };

  const handleTextChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText2(e.target.value);
  };

  return (
    <div>
      <h3>SEIKINがおすすめ!</h3>

      <div>
        <label>テキスト1: </label>
        <input type="text" value={text1} onChange={handleTextChange1} />
      </div>
      <div>
        <label>テキスト2: </label>
        <input type="text" value={text2} onChange={handleTextChange2} />
      </div>

      <div>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileInputChange} />
      </div>

      {png && (
        <div className="comp" style={{ display: 'flex' }}>
          <img alt="osusume" src={png} />
        </div>
      )}

    <p>テキストを変更すると画像が変更されちゃう…</p>
    </div>
  )
}

export default App