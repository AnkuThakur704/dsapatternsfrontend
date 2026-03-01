import { useState,useEffect } from 'react'
import './App.css'
function App() {
  const backendurl = "https://dsapatterns.onrender.com"
  const [quotetext, setquotetext] = useState("")
  const [patterns, setpatterns] = useState([])
  const quote = async()=>{
    //https://api.api-ninjas.com/v2/quotes?categories=success,wisdom,inspirational,courage
    //https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom
    const q = await fetch('https://api.api-ninjas.com/v2/quotes?categories=success,inspirational',{method:"GET",
      headers:{
        "X-Api-Key": import.meta.env.VITE_API_KEY
      }
    });
    const qd = await q.json()
    setquotetext(qd)
    console.log("quote:",qd)
  }

  const listpatterns = async()=>{
    const r = await fetch(`${backendurl}/getpatterns`)
    const d = await r.json()
    setpatterns(d)
    console.log("this is patterns: ",patterns)
  }

  useEffect(() => {
    quote()
    listpatterns()
  }, [])
  
  const [formdata, setformdata] = useState({})
  const handlesubmit = async(e)=>{
    e.preventDefault()
    if(!(formdata.pname.trim()===""||formdata.desc.trim()===""||formdata.trigger.trim()===""||formdata.ques.trim()==="")){
      console.log(formdata)
    const r = await fetch(`${backendurl}`,{method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        pname: formdata.pname,
        desc:formdata.desc,
        trigger: formdata.trigger,
        ques: formdata.ques
      })
    })
    const data = await r.json()
    if(data.success){
      console.log("data insterted")
    }
    else{
      console.log("not insterted")
    }
    listpatterns()
    }
  }

  return (
    <>
      <div className='w-screen h-screen bg-zinc-900 text-zinc-300 text-2xl flex flex-col items-center p-2'>
        <p>DSA Patterns encountered so far</p>
        <div className='w-screen h-0.5 bg-gray-500 mt-3'></div>
        <p className='text-[17px] mt-2 text-white'>{quotetext[0]?quotetext[0].quote:"Loading quote for today..."}</p>
        <div className='flex items-center mt-5 gap-3'>
          <div className='w-[80vw] h-150 bg-zinc-900 rounded-2xl border border-zinc-700 grid grid-cols-2 gap-2 p-3 overflow-y-auto'>
            {patterns.map((item,key)=>{
              return(
                <div
  key={key}
  className="bg-zinc-800/70 backdrop-blur-md border border-zinc-700 
             rounded-2xl p-6 shadow-lg hover:shadow-xl 
             hover:border-indigo-500/40 transition-all duration-300 
             hover:-translate-y-1 h-fit"
>
  <div className="space-y-4">

    <div className='flex justify-between'>
      <div>
      <p className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
        Pattern Name
      </p>
      <p className="text-lg font-semibold text-white mt-1">
        {item.pname}
      </p>
    </div>
    <div className='text-gray-400 text-sm'>{item.pdate}</div>
    </div>

    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
        Description
      </p>
      <p className="text-zinc-300 mt-1 text-sm leading-relaxed">
        {item.desc}
      </p>
    </div>

    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
        Trigger Signals
      </p>
      <p className="text-emerald-400 mt-1 text-sm font-medium">
        {item.trigger}
      </p>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-zinc-700">
      <p className="text-xs text-zinc-400 uppercase tracking-wider">
        Question No.
      </p>
      <span className="px-3 py-1 text-xs font-semibold rounded-full 
                       bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
        {item.ques}
      </span>
    </div>

  </div>
</div>
              )
            })}
          </div>
            <div className='w-full max-w-lg max-md:mx-auto bg-[#00A63E]/0 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-h-[80vh] overflow-y-auto'>
        <form className='space-y-6 text-sm'>
            <div>
                <label className='block text-white text-sm mb-2'>Pattern Name</label>
                <input 
                    type="text" 
                    required
                    onChange={(e)=>setformdata({...formdata,pname:e.target.value})}
                    spellCheck={false}
                    value={formdata.pname}
                    autoComplete='off'
                    placeholder="Traversing two arrays simultaneously..." 
                    className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                />
            </div>

            <div>
                <label className='block text-white text-sm mb-2'>Description</label>
                <textarea 
                    placeholder="Write pattern description here..." 
                    rows="4"
                    required
                    onChange={(e)=>setformdata({...formdata,desc:e.target.value})}
                    spellCheck={false}
                    autoComplete='off'
                    className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition resize-none'
                ></textarea>
            </div>

            <div>
                <label className='block text-white text-sm mb-2'>Trigger Signals</label>
                <input 
                    type="text" 
                    required
                    onChange={(e)=>setformdata({...formdata,trigger:e.target.value})}
                    spellCheck={false}
                    autoComplete='off'
                    placeholder="Find common string among two arrays..." 
                    className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                />
            </div>
            <div>
                <label className='block text-white text-sm mb-2'>Question Number</label>
                <input 
                    type="text" 
                    required
                    onChange={(e)=>setformdata({...formdata,ques:e.target.value})}
                    spellCheck={false}
                    autoComplete='off'
                    placeholder="Leetcode 499..." 
                    className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                />
            </div>

            <div className='flex items-center justify-between'>
                <button type="submit" onClick={(e)=>handlesubmit(e)} className='bg-green-700 hover:bg-green-600 text-white text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer'>
                    Submit
                </button>
            </div>
        </form>
    </div>
        </div>
      </div>
    </>
  )
}

export default App
