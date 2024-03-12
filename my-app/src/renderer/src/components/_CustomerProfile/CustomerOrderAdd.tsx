import { useForm } from "react-hook-form"
import { useMutation ,useQuery,useQueryClient } from '@tanstack/react-query';
import Autocomplete from "../_DashComponent/AutoComplete";
import { useState,useEffect } from "react";
const { ipcRenderer } = require('electron')
const date = new Date();

interface Order {
    user: string;
    amount: number;
    address: string;
    status: string;
    createdAt: string;
    price: number;
    company: string;
    unit: string;
    respose : boolean;
    autocomplete: string;
}
const submitFormData = async (formData: FormData): Promise<void> => {
    
    try {
        
        // Send data via ipcRenderer
      await ipcRenderer.invoke('add-order', formData);
    } catch (error) {   
        // Handle errors
        console.error('Mutation failed:', error);
        throw error;
    }
};

const fetchAll = async () => {
    return await ipcRenderer.invoke('fetch-All');
};



export default  function CustomerAddForm({name}): JSX.Element {
    const queryClient = useQueryClient();
    const [companyNames, setCompanyNames] = useState<string[]>([]); // Specify string[] as the type
    const [fabricType, setFabricType] = useState<string[]>([]); // Specify string[] as the type

    const [empty, isEmpty] = useState(false);

    const GetAllData =  useQuery({queryKey: ["fetch-All"], queryFn: fetchAll});
    useEffect(() => {

        const data = GetAllData.data as { 
            users: { name: string }[]; 
            companies: { name: string }[]; 
            fabricType: { fabricType: string }[]; 
            // Add other properties as needed 
          };

        if (GetAllData.isSuccess && GetAllData.data!==undefined) {
            const companyNamesSet = new Set<string>(); // Specify string as the type
            const fabricTypeSet = new Set<string>(); // Specify string as the type

            data.companies.forEach((company) => {
                companyNamesSet.add(company.name);
            }
            );

            data.fabricType.forEach((fabric) => {
                fabricTypeSet.add(fabric.fabricType);

            });
            setCompanyNames(Array.from(companyNamesSet));
            setFabricType(Array.from(fabricTypeSet));
        }
    }, [GetAllData.isSuccess, GetAllData.data]);



    const {
         register,
            formState,
            handleSubmit,
            reset,
            setValue,


        } = useForm<Order>({
            defaultValues: {
                user: name,
                address: "",
                status: "Pending",
                createdAt: formatDate(date),
                company: "",    
                unit :"Meters",
                autocomplete: "",
            }
        });
        const { errors } = formState;

        const NewOrder = useMutation({
            mutationFn: submitFormData,
            onError: (error) => {
                    throw error;
            },
            onSuccess: () => {
                isEmpty(!empty);
                reset();
                queryClient.refetchQueries({queryKey: ['CustomerStatus']});
                queryClient.refetchQueries({queryKey: ['CustomerOverview']});
                queryClient.refetchQueries({queryKey: ['Customer']});
                queryClient.refetchQueries({queryKey: ['fetch-All']});

            },
        }); 
    
        
        const onSubmit = async (formData: any) => {
            try {
                setValue('autocomplete','')
                NewOrder.mutate(formData)
            } catch (error) {
                console.error('Mutation failed:', error);
            }
        };
        

    return (
      <>
      <div className="form-div absolute w-[34.8vw] h-[39.7vh] bg-default rounded-lg right-[3vw] bottom-[46vh] shadow-[0px_4px_23.8px_7px_#68B6FF1C] z-[999]">
        <form className="relative w-[100%] h-[100%] flex" onSubmit={handleSubmit(onSubmit)}>



            <div className="form-box-1 relative h-[23.7vh] w-[14.1vw]  flex flex-col mr-auto ml-auto top-[3.5vh]">
                 
            <label >AMOUNT</label>

            <input type="number" step=".01"{...register("amount" ,{required:true ,valueAsNumber:true})} />
            {errors.amount ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a proper amount</p>
                </h1>

                ) : (
                <h1></h1>
                )}

                    
                    
                    
                
            <label >FABRIC</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="address" options={fabricType} placeholder="" value={''} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('address', value, { shouldValidate: true});
        }}/>

                      <label >DATE</label>
                <input type="date" {...register("createdAt" ,{required:true})} />
                {errors.createdAt ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper address</p>
                </h1>

                ) : (
                <h1></h1>
                )}

               
        

            </div>

            <div className="form-box-2 relative h-[23.7vh] w-[14.1vw] flex flex-col ml-auto mr-auto top-[3.8vh]">

            <label >STATUS</label>
                <input type="text" {...register("status" ,{required:true})}/>
                {errors.status ? (  
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper state</p>
                </h1>
                    
                ) : (
                <h1></h1>
                )}
                      
            <label >UNIT PRICE</label>
            <input className="unit" type="number" step=".01" {...register("price" ,{required:true , valueAsNumber:true})} />
            {errors.price ? (
                <h1 className="unit-h1 " style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a value.</p>
                </h1>

                ) : (
                <h1 className="unit-h1"></h1>
                )}
            
            
            
         
           
           
                      
            <label >STORE</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="company" options={companyNames} placeholder="" value={''} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('company', value, { shouldValidate: true});
        }}/>

            </div>

            <input style={{backgroundColor: formState.isValid?'#68B6FF':'#d6d7d8'
            ,pointerEvents: formState.isValid?'auto':'none'
            , position:"absolute"
            ,top:"29.9vh"
            , left:"26.2vw"
            ,borderRadius:"8px"
            ,color:"#FEFEFE"
            ,fontSize:"16px"
            ,transitionDuration:"0.2s"
            ,padding:"1.6vh 2.7vw"}} type="submit" value='ADD'/>

            <div className=" absolute left-[30vw] top-[16.7vh] h-[3.5vh] w-fit ">
            <input className="unit-type" {...register("unit" ,{required:true ,maxLength:6})} />
            <h1 className="unit-type-h1"></h1> 
            </div>  
                           
        </form>
        

      </div>
      
      </>
      
    ) 
  }


  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 