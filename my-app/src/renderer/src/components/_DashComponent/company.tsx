import Money from '../../public/Money.svg';
import Orders_pic from '../../public/Orders.svg';
import Arrowbtn from '../../public/Arrow-btn.svg';
import Setting from '../../public/Setting.svg';
import Store_1 from '../../public/Store_1.png';
import {motion,AnimatePresence} from 'framer-motion';
import { useQuery } from '@tanstack/react-query';


const { ipcRenderer } = require('electron')

const getCompany = async () => {
  return await ipcRenderer.invoke('fetch-company');
};


export default  function Company_Holder(): JSX.Element {

  const fetchCompany = useQuery({queryKey: ["Company"], queryFn: getCompany});
  if (fetchCompany.isLoading) return <div>Loading...</div>;
  if (fetchCompany.isError) return <div>Error:</div>;
    return (
      <div className="flex absolute w-[75.5vw] h-[20.5vh] top-[73.7vh] left-[14.6vw] animate-[400ms_slideUp_forwards]" >
        
          {fetchCompany.data.slice(0, 2).map((company: any,index:number) => (
            <Companies key={company.companyId} data={company.companyName} Revenue={(company.total_revenue)} Orders={company.total_orders} style={index === 0 ? "mr-auto" : "ml-auto"}
             />
          ))}

      </div>
    ) 
  }
  

  const Companies = ({data,Revenue,Orders,style}) => {
    const priceString = (Revenue).toFixed(0).toString();
    const formattedPrice = `$${priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    return (
     
      <AnimatePresence>
      <motion.div className={` w-[32.8vw] h-[20.5vh] bg-default rounded-2xl ${style} top-[2.7] relative shadow-[2px_4px_4px_#68B6FF0D]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      >

      <h2 className="text-2xl font-medium text-secondary absolute left-[9.2vw] top-[3.2vh]">{data}</h2>

        <div className="h-[11.2vh] w-[6.2vw] bg-company rounded-xl relative left-[1.6vw] top-[3.2vh] ">
          <img src={Store_1} />
        </div>
        <div className="h-[3.6vh] w-[2vw] bg-company rounded-xl absolute left-[9.2vw] top-[7.8vh] bg-[length:32px_32px] bg-no-repeat bg-center"style={{ backgroundImage: `url(${Money})` }} />

        <label className="text-secondary absolute left-[11.8vw] top-[7.5vh] text-[14px] font-medium">Revenue</label>
        <label className="text-secondary absolute left-[11.8vw] top-[9.5vh] text-[14px] font-bold">{formattedPrice}</label>
        <div className="h-[3.6vh] w-[2vw] bg-company rounded-xl absolute left-[21.5vw] top-[7.8vh] bg-[length:32px_32px] bg-no-repeat bg-center"style={{ backgroundImage: `url(${Orders_pic})` }}/>
        <label className="text-secondary absolute left-[24.1vw] top-[7.5vh] text-[14px] font-medium">Orders</label> 
        <label className="text-secondary absolute left-[24.1vw] top-[9.5vh] text-[14px] font-bold">{Orders}</label><br />
        <button className="h-[4.8vh] w-[9.5vw] bg-[#F1F8F2] rounded-xl left-[8.9vw] top-[13vh] absolute bg-[length:27px_27px] bg-no-repeat bg-[1vh] hover:bg-[#E6EEE7] transition duration-150" style={{ backgroundImage: `url(${Setting})` }}><label  className=" text-[#96CB9C] cursor-pointer relative left-[0.3vw]  text-[14px]">Manage Shop</label></button> 
        <button className="h-[4.8vh] w-[9.5vw] bg-[#70B877] rounded-xl left-[21.3vw] top-[13vh] absolute bg-[length:32px_32px] bg-no-repeat bg-[12vh] hover:bg-[#61AC68] transition duration-150" style={{ backgroundImage: `url(${Arrowbtn})` }}><label className=" text-[#FEFEFE] cursor-pointer relative right-[1vw] text-[14px] ">View Store</label></button>    


    </motion.div>
    </AnimatePresence>  
    )
  }