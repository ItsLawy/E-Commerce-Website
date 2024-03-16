import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import Stats from './components/_DashComponent/dash-status'
import Table from './components/_DashComponent/order-table'
import Company from './components/_DashComponent/company'
import Arrow from './components/_DashComponent/Arrows'
import Labels from './components/_DashComponent/labels'
import Add_Button from './components/_DashComponent/add_button'
import { createContext, useState,useEffect } from 'react'
import EditBox from './components/_DashComponent/EditBox'

type ShowType = {
  visiable: boolean;
  setVisiable: (value: boolean) => void;
};



type DataType = {
  User:string,
  Company:string,
  Amount:number,
  Price:number,
  FabricType:string,
  Unit:string,
  Status:string,
  CreatedAt:string,
  OrderID?:string,
}

type DataContextType = {
  Data: DataType;
  setData: (value: any) => void;
};
export const DataContext = createContext<DataContextType>({
  Data: {User:'', Company:'', Amount:0, Price:0, FabricType:'', Unit:'', Status:'', CreatedAt:''},
  setData: (value: any) => {value},
})

export const ShowContext = createContext<ShowType>({
  visiable: false,
  setVisiable: (value: boolean) => {value},
})




export default function App(): JSX.Element {
  const [visiable, setVisiable] = useState(false);
  const [Data, setData] = useState<any>({
    User:'',
    Company:'',
    Amount:0,
    Price:0,
    FabricType:'',
    Unit:'',
    Status:'',
    CreatedAt:'',
  });
  useEffect(() => {
    setData({User:'', Company:'', Amount:0, Price:0, FabricType:'', Unit:'', Status:'', CreatedAt:''});
  },[visiable]);
  


  return (
    <> 
    <DataContext.Provider value={{Data, setData}}>
    <ShowContext.Provider value={{visiable, setVisiable}}>
    <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards]'>Dashboard</h2>
    <Buttons/>
    <Background/>
    <Stats/>
    <Table/>
    <Company/>
    <Labels/>
    <Arrow/>
    <Add_Button/>
    <EditBox/>
    </ShowContext.Provider>
    </DataContext.Provider>
    </>
  )
}


