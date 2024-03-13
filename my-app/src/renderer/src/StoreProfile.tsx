import { useParams } from 'react-router-dom';
import Background from './components/_DashComponent/bg';
import TopBar from './components/_StoreProfile/TopBar';
import BottomBar from './components/_StoreProfile/BottomBar';

export default function StoreProfile(): JSX.Element {

    const { id } = useParams<{ id: string }>();
    id;
    return (
        <>
        <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondar animate-[400ms_fadeIn_forwards]'>Store Profile</h2>
        <Background/>

        <div className='absolute w-[78.9vw] h-[83.3vh] left-[14.4vw] top-[11.2vh]  flex flex-col'>
        <TopBar />
        <BottomBar />
        </div>
        
        </>
    )
}