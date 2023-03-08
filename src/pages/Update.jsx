import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    const {data, error} = await supabase
      .from("smoothies")
      .update([{ title, method, rating }])
      .select()
      .eq("id", id);


    if (error) {
      setFormError("Please fill in all the fields correctly");
    }
    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };
    fetchData();
  }, [id, navigate]);
  return (
    <div className="page update">
      <h2>Update - {id}</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
