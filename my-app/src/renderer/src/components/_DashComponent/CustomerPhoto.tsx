
type CustomerPhotoProps = {
    ColorID: string;
    Name: string;
}

export default function CustomerPic({ColorID,Name}: CustomerPhotoProps) {

    const ColorMap = {
        '1':{BackgroundColor:"#D8E6FF",textColor:"#5790FF"},
        '2':{BackgroundColor:"#FFD8D8",textColor:"#FF5757"},
        '3':{BackgroundColor:"#fff0db",textColor:"#f4b35f"},
        '4':{BackgroundColor:"#cff1f0",textColor:"#2dc2be"},
        '5':{BackgroundColor:"#ede4ff",textColor:"#8f5ffc"},
        '6':{BackgroundColor:"#dcf4fe",textColor:"#55baea"},
        '7':{BackgroundColor:"#f1f1d2",textColor:"#c4c348"},
        '8':{BackgroundColor:"#fee9e4",textColor:"#f48167"},
        '9':{BackgroundColor:"#d8f8e8",textColor:"#32bf75"},
        '10':{BackgroundColor:"#FFF2D8",textColor:"#FFBC57"},
        '11':{BackgroundColor:"#E6EEE7",textColor:"#61AC68"},
    }
    const {BackgroundColor, textColor} = ColorMap[ColorID] || ColorMap['10'];



    return (
        <div style={{backgroundColor:BackgroundColor}} className="relative w-[1.43vw] h-[2.525vh] rounded-full flex justify-center items-center mr-2 ml-2">
                <h2 style={{color:textColor}} className="  text-xl">{Name.split(' ')[0][0].toUpperCase()}</h2>
            </div> 
    )
}
