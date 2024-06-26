
import { Header } from "./_components/Header";
import { LandingImage } from "./_components/LandingImage";
import { ProductCard,AnimatedLabel} from "./_components/ProductCard";
import { FooterLink } from "./_components/FooterLink";
import { Contact } from "./_components/Contact";
import { LoginWarning } from "../components/LoginWarning";
import Link from "next/link";
import db from "@/db/db";
import Image from "next/image";



//get recent products

const getRecentProducts = async () =>{

  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      imagepath: true,
      rating: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return {
    props: {
      products,
    },
  };
}

export default function Home() {


  return (
    <>
    <LoginWarning/>
    <MainSection/>
    <ProductSection/>
    <Footer/>
    <Contact/>  
    
    </>
  );  
}


function MainSection ():JSX.Element{

  return(
    <div className=" w-full h-[90vh] flex justify-between">
    <Header/> 
    <LandingImage/>
    </div>
  )
}

async function ProductSection(){

  const Products = await getRecentProducts();

  return(

    <div className=" w-full h-fit p-[2%] bg-[#C1C2AD] flex justify-center items-center flex-col">

      <div className="w-[92.2%] h-[15%] flex justify-between items-center mb-[2%]">
      <AnimatedLabel strength="10" className=" text-thick relative w-fit sm:text-base md:text-2xl lg:text-4xl">
      Our Favorites
      </AnimatedLabel>

      <AnimatedLabel strength="5" className=" text-thick font-wixMade relative sm:text-[12px] md:text-lg lg:text-xl sm:text-sm xs:text-[8px]">
     Embrace the Palestinian Culture with our best sellers
      </AnimatedLabel>
      </div>
   
    <div className="w-[92.2%] h-[80%] relative flex justify-between">

      {
        Products.props.products.map((product) => {
          return(
            <Link className="w-[33.2%] h-fit" href={`/product/${product.id}`} key={product.id}>
            <ProductCard key={product.id} data={product}>
              <Image width={400} height={400} src={product.imagepath} alt="product" className="w-full"/>
  
            </ProductCard>
            </Link>
          )
        })
      }
     
    </div>
    </div>
  )
}

function Footer():JSX.Element{
  return(

    <div className="w-full h-[40vw] flex justify-center items-center"> 

        <div className="w-[90%] h-[50%] justify-center items-center flex flex-col">

        <AnimatedLabel strength="20" className=" text-textprimary sm:text-xl font-wixMade m-auto xs:text-xs">
        Introducing Our Latest Palestinian Inspired Collections
        </AnimatedLabel>

        <AnimatedLabel strength="20" className=" text-textprimary xl:text-5xl w-[60%] text-center sm:text-3xl m-auto xs:text-sm">
        Add a touch of Palestine to your home and wardrobe
        </AnimatedLabel>

        <FooterLink Style={{
        width: "30%",
        }} Link="/collections">
        Shop Now
        </FooterLink>
          

        </div>
    </div>
)}

