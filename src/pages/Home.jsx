import supabase from "../config/supabaseClient";
import { SmoothieCard } from "../components/SmoothieCard";
import { useState, useEffect } from "react";


const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const deleteHandler = (id)=> {
    setSmoothies(prevSmoothies=> {
      return prevSmoothies.filter(sm=> sm.id !== id)
    })
  }
  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .select('*')
      .order(orderBy, {ascending: false})
    
    if (error) {
      setFetchError('Could not fetch the smoothies')
      setSmoothies(null)
    }
    if (data) {
      setSmoothies(data)
      setFetchError(null)
    }
  }

  useEffect(() => {
    fetchSmoothies()

  }, [orderBy])
  
  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
        <div className="order-by">
          <p>Order by:{orderBy}</p>
          <button onClick={()=> setOrderBy('created_at')}>Time Created</button>
          <button onClick={()=> setOrderBy('title')}>Title</button>
          <button onClick={()=> setOrderBy('rating')}>Rating</button>
        </div>
          <div className="smoothie-grid">
          {smoothies.map(smoothies => (
            <SmoothieCard key={smoothies.id} smoothie={smoothies} onDelete={deleteHandler} />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
